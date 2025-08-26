import { useEffect, useState } from 'react'
import { RigidBody } from '@react-three/rapier'
import { Edges } from '@react-three/drei'
import * as THREE from 'three'

import BoxComponent from './BoxComponent'

const ContainerBox = ({ initPos, args }) => {
    const [color, setColor] = useState(new THREE.Color())

    const createFaces = ({args={ width: 50, height: 100, depth: 30 }, initPos={ x: 0, y: 0, z: 0 }} = {}) => {
        const size = args
        const pos = initPos 
        return {
            front: {
                position: [pos.x, pos.y, pos.z - size.depth / 2],
                size: [size.height, size.width],
                rotation: [0, 0, 0]
            },
            back: {
                position: [pos.x, pos.y, pos.z + size.depth / 2],
                size: [size.height, size.width],
                rotation: [0, 0, 0]
            },
            top: {
                position: [pos.x, pos.y + size.width / 2, pos.z],
                size: [size.depth, size.height],
                rotation: [-Math.PI / 2, 0, -Math.PI / 2]
            },
            bottom: {
                position: [pos.x, pos.y - size.width / 2, pos.z],
                size: [size.depth, size.height],
                rotation: [-Math.PI / 2, 0, -Math.PI / 2]
            },
            left: {
                position: [pos.x + size.height / 2, pos.y, pos.z],
                size: [size.depth, size.width],
                rotation: [0, -Math.PI / 2, 0]
            },
            right: {
                position: [pos.x - size.height / 2, pos.y, pos.z],
                size: [size.depth, size.width],
                rotation: [0, -Math.PI / 2, 0]
            }
        }
    }

    useEffect(() => {
        console.log(THREE)
        // console.log(LineGeometry)
        const clearColor = color.lerp(color, 1)
        console.log({ clearColor })
        setColor(clearColor)
    }, [])
    

    const hasGravity = 0
    const faces = createFaces({ args, initPos })
    const facesArr = Object.values(faces)
    console.log({ faces, facesArr })
    return (
            <>
            {facesArr.map((face, i) => {
                return (
                    <RigidBody linearDamping={4} canSleep position={ face.position } rotation={face.rotation} colliders={"cuboid"} gravityScale={hasGravity} key={i}>
                        <mesh>
                            <planeGeometry args={face.size} />
                            <meshStandardMaterial transparent opacity={0} />
                            <Edges lineWidth={1} scale={1} color={`black`} />
                        </mesh>
                        
                    </RigidBody>
                )
            })}
            <BoxComponent gravity={true} />
            </>
            
    );
}

export default ContainerBox;
