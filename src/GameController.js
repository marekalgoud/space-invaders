import { useRecoilState } from "recoil"
import { useFrame } from 'react-three-fiber'

import {
  playerPositionState,
  invadersPositionState,
  missilesPositionState,
  missilesSentState,
  scoreState
} from "./gameState"

// This component runs game logic on each frame draw to update game state.
export default function GameController({ keyPressed }) {
    
    function distance(p1, p2) {
        const a = p2.x - p1.x
        const b = p2.y - p1.y
        const c = p2.z - p1.z
        return Math.sqrt(a * a + b * b + c * c)
    }
    
    const [playerPosition, setPlayerPosition] = useRecoilState(playerPositionState)
    const [missiles, setMissiles] = useRecoilState(missilesPositionState)
    const [invaders, setInvaders] = useRecoilState(invadersPositionState)
    const [score, setScore] = useRecoilState(scoreState)
    const [missilesSent, setMissilesSent] = useRecoilState(missilesSentState)
  
    const VELOCITY = 0.1
    const MISSILE_VELOCITY = 0.7
  
    useFrame(() => {
      // console.log(missiles)
      let nextMissiles = [...missiles]
      
      if(keyPressed === 32) {
        // Only shoot next missile if previous is out
        if(nextMissiles.length === 0) {
          nextMissiles.push({
            id: Math.random(),
            x: playerPosition.position.x,
            y: playerPosition.position.y,
            z: playerPosition.position.z
          })
          setMissilesSent(missilesSent + 1)
        }
      }
  
      if(keyPressed === 37) {
        // move player left
        setPlayerPosition({
          position: { x: playerPosition.position.x - VELOCITY, y: playerPosition.position.y, z: playerPosition.position.z },
          rotation: { }
        })
      }
  
      if(keyPressed === 39) {
        // move player right
        setPlayerPosition({
          position: { x: playerPosition.position.x + VELOCITY, y: playerPosition.position.y, z: playerPosition.position.z },
          rotation: { }
        })
      }
  
  
      // Calculate hits and remove lasers and enemies, increase score.
      const hitInvaders = invaders
        ? invaders.map(
            invader =>
              missiles.filter(
                () =>
                missiles.filter(missile => distance(invader.current, missile) < 0.7).length > 0
              ).length > 0
          )
        : [];
  
  
      if (hitInvaders.includes(true) && invaders.length > 0) {
        setScore(score + 1);
      }
  
          // Every frame move missiles on y axis
          setMissiles(
            nextMissiles
              .map(missile => ({
                id: missile.id,
                x: missile.x,
                y: missile.y + MISSILE_VELOCITY,
                z: missile.z
              }))
              .filter(missile => missile.y < 10) // remove missile too far
              .filter((missile, idx) => !(idx === 0 && hitInvaders.includes(true) && invaders.length > 0)) 
          )
  
      // Move all of the enemies. Remove enemies that have been destroyed, or passed the player.
      setInvaders(
        invaders
          .map(invader => {
            let nextInvader = {...invader}
            if(nextInvader.current.x >= nextInvader.initial.x + 8 || nextInvader.current.x <= nextInvader.initial.x - 8) {
              nextInvader.inc = -nextInvader.inc
            }
            nextInvader.current = { x: nextInvader.current.x + nextInvader.inc, y: nextInvader.current.y, z: nextInvader.current.z }
            return nextInvader
          })
          .filter((invader, idx) => !hitInvaders[idx])
      );
  
    });
    return null;
  }