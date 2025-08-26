import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { Edges } from '@react-three/drei'
import * as THREE from 'three'
// import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

const ContainerBox = ({ initPos, args }) => {
    const  meshRef = useRef()
    const bodyRef = useRef()

    const [color, setColor] = useState(new THREE.Color())

    const test = (args=undefined, initPos=undefined) => {
        console.log({ args, initPos})
        const size = args ?? { width: 50, height: 100, depth: 30 }
        const pos = initPos ?? {x: 0, y: 0, z: 0}
        return {size, pos}

    }

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
            // <mesh position={[0,25,0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
            //     <planeGeometry args={[30,100]} />
            //     <meshStandardMaterial color={`black`} />
            // </mesh>
            // <mesh position={[0,-25,0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
            //     <planeGeometry args={[30,100]} />
            //     <meshStandardMaterial color={`black`} side={THREE.DoubleSide}/>
            // </mesh>
            top: {
                position: [pos.x, pos.y + size.width / 2, pos.z],
                size: [size.depth, size.height],
                rotation: [[-Math.PI / 2, 0, -Math.PI / 2]]
            },
            bottom: {
                position: [pos.x, pos.y - size.width / 2, pos.z],
                size: [size.depth, size.height],
                rotation: [[-Math.PI / 2, 0, -Math.PI / 2]]
            },
            // <mesh position={[50,0,0]} rotation={[0, -Math.PI / 2, 0]}>
            //     <planeGeometry args={[30,50]} />
            //     <meshStandardMaterial color={`black`} />
            // </mesh>
            // <mesh position={[-50,0,0]} rotation={[0, -Math.PI / 2, 0]}>
            //     <planeGeometry args={[30,50]} />
            //     <meshStandardMaterial color={`black`} />
            // </mesh>
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

    // const faces = createFaces({ args: undefined, initPos: undefined })
    const faces = createFaces({ args: {width: 10, height: 10, depth: 10}, initPos: {x: 5, y: 5, z: 5}})
    const facesArr = Object.values(faces)
    console.log({ faces, facesArr })
    return (
            <>
            {/* <RigidBody ref={bodyRef} linearDamping={4} canSleep position={ initPos ?? [0,0,0] } colliders={"cuboid"} gravityScale={hasGravity}>
                <mesh ref={meshRef} >
                    <boxGeometry args={[100,50,30]} />
                    <meshStandardMaterial transparent opacity={0} />
                    <Edges lineWidth={1} scale={1} color={`black`} />
                </mesh>
                
            </RigidBody> */}
            <mesh position={[0,0,-15]}>
                <planeGeometry args={[100,50]} />
                <meshStandardMaterial color={`pink`} />
            </mesh>
            <mesh position={[0,0,15]} >
                <planeGeometry args={[100,50]}  />
                <meshStandardMaterial  color={`red`} side={THREE.DoubleSide}/>
            </mesh>
            
            <mesh position={[0,25,0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
                <planeGeometry args={[30,100]} />
                <meshStandardMaterial color={`black`} />
            </mesh>
            <mesh position={[0,-25,0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
                <planeGeometry args={[30,100]} />
                <meshStandardMaterial color={`black`} side={THREE.DoubleSide}/>
            </mesh>
            <mesh position={[50,0,0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[30,50]} />
                <meshStandardMaterial color={`black`} />
            </mesh>
            <mesh position={[-50,0,0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[30,50]} />
                <meshStandardMaterial color={`black`} />
            </mesh>
            </>
            
    );
}

export default ContainerBox;
