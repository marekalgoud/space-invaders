import React, {useState } from 'react'
import { Canvas } from 'react-three-fiber'
import { PerspectiveCamera, Stars, Html } from '@react-three/drei'
import { RecoilRoot, useRecoilValue, useResetRecoilState } from "recoil"
import Invader from './Invader'
import Player from './Player'
import GameController from './GameController'

import {
  invadersPositionState,
  missilesPositionState,
  scoreState,
  missilesSentState
} from "./gameState"

function Invaders() {
  const invaders = useRecoilValue(invadersPositionState)
  return (
    <group>
      {invaders.map(invader => (
        <Invader position={[invader.current.x, invader.current.y, invader.current.z]} key={`${invader.id}`} />
      ))}
    </group>
  )
}

function Missiles(props) {
  const missiles = useRecoilValue(missilesPositionState)

  return (
    <group>
      {missiles.map(missile => (
        <mesh position={[missile.x, missile.y, missile.z]} key={`${missile.id}`}>
          <boxBufferGeometry args={[0.1, 0.2, 0.1]} />
          <meshStandardMaterial color={'yellow'} />
        </mesh>
      ))}
    </group>
  )
}


function Score () {
  const invaders = useRecoilValue(invadersPositionState)
  const score = useRecoilValue(scoreState)
  const missilesSent = useRecoilValue(missilesSentState)
  const resetInvader = useResetRecoilState(invadersPositionState)
  const resetScore = useResetRecoilState(scoreState)
  const resetMissilesSent = useResetRecoilState(missilesSentState)

  const reset = () => {
    resetInvader()
    resetScore()
    resetMissilesSent()
  }

  return (
      <Html prepend fullscreen>
        {invaders.length === 0 ?
        <>
          <div class="result">
            <div class="score">Score : {Math.round(score / missilesSent * 1000)}</div>
            <button class="reset" onClick={reset}>Restart</button>
          </div>
          
        </>
        :null}
      </Html>
  )
}


function App() {

  const [keyPressed, setKeyPressed] = useState()

  function handleKeyDown(event) {
    setKeyPressed(event.keyCode)
  }

  function handleKeyUp() {
    setKeyPressed(null)
  }

  return (
    <>
    <h1>Space invader</h1>
      <Canvas tabIndex="0" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
        <RecoilRoot>
          <Score />
          <PerspectiveCamera makeDefault position={[0, -22, 15]} rotation={[Math.PI / 4, 0, 0]} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Invaders />
          <Missiles />
          <Player />
          <GameController keyPressed={keyPressed} />
        <Stars />
        </RecoilRoot>
      </Canvas>
    </>
  );
}

export default App;
