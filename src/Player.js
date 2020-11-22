import { useRecoilValue } from "recoil"

import {
    playerPositionState,
  } from "./gameState"

function Player (props) {
    const player = useRecoilValue(playerPositionState)
  
    return (
      <group position={[player.position.x, player.position.y, player.position.z]} scale={[1, 1, 1]}>
        <mesh
            {...props}
            position={[0, 0.5, 0]}
        >
            <coneBufferGeometry args={[0.1,0.4, 5]} />
            <meshStandardMaterial color={'red'} />
        </mesh>
        <mesh
            {...props}
            position={[0, 0, 0]}
            rotation={[0, Math.PI / 4, 0]}
        >
            <boxBufferGeometry args={[0.1, 0.5, 1.5]} />
            <meshStandardMaterial color={'grey'} />
        </mesh>

        <mesh
            {...props}
            position={[0, 0, 0]}
            rotation={[0, -Math.PI / 4, 0]}
        >
            <boxBufferGeometry args={[0.1, 0.5, 1.5]} />
            <meshStandardMaterial color={'grey'} />
        </mesh>
      </group>
    )
  }

export default Player