import React, { useMemo } from 'react'
import { BoxBufferGeometry, MeshBasicMaterial} from 'three'

function Invader(props) {
    const t = true
    const f = false
    const pixels = [
        [f,f,t,f,f,f,f,f,t,f,f],
        [f,f,f,t,f,f,f,t,f,f,f],
        [f,f,t,t,t,t,t,t,t,f,f],
        [f,t,t,f,t,t,t,f,t,t,f],
        [t,t,t,t,t,t,t,t,t,t,t],
        [t,f,t,t,t,t,t,t,t,f,t],
        [t,f,t,t,t,t,t,t,t,f,t],
        [f,f,f,t,t,f,t,t,f,f,f]
      ]

    const geom = useMemo(() => new BoxBufferGeometry(1, 1, 1), [])
    const mat = useMemo(() => new MeshBasicMaterial({color: 'yellow'}), [])
  
    return (
      <group
        {...props}
        scale={[0.1, 0.1, 0.1]}
      >
        {pixels.map((line, y) => {
            return line.map((box, x) => {
                return (
                    box?
                    <mesh geometry={geom} material={mat}
                        position={[x * 1.2 - ((line.length / 2) * 1.2), 0, -y * 1.2 - ((pixels.length / 2) * 1.2)]}
                        key={'box_'+x+'_'+y}
                    />
                :null
                )
            }
          )
        })
        }
      </group>
    )
}

export default Invader