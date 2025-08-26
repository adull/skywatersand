import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { Edges } from '@react-three/drei'
import * as THREE from 'three'
// import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

const ContainerBox = ({ initPos }) => {
    const  meshRef = useRef()
    const bodyRef = useRef()

    const [color, setColor] = useState(new THREE.Color())

    useEffect(() => {
        console.log(THREE)
        // console.log(LineGeometry)
        const clearColor = color.lerp(color, 1)
        console.log({ clearColor })
        setColor(clearColor)
    }, [])
    

    const hasGravity = 0
    return (
            <>
            <RigidBody ref={bodyRef} linearDamping={4} canSleep position={ initPos ?? [0,0,0] } colliders={"cuboid"} gravityScale={hasGravity}>
                <mesh ref={meshRef} >
                    <boxGeometry args={[100,50,30]} />
                    <meshStandardMaterial transparent opacity={0} />
                    <Edges lineWidth={1} scale={1} color={`black`} />
                </mesh>
                
            </RigidBody>
            <mesh position={[0,0,-15]}>
                <planeGeometry args={[100,50]} />
                <meshStandardMaterial color={`black`} />
            </mesh>
            <mesh position={[0,0,15]} side={THREE.DoubleSide}>
                <planeGeometry args={[100,50]} side={THREE.DoubleSide} />
                <meshStandardMaterial  color={`red`} side={THREE.DoubleSide}/>
            </mesh>
            <mesh position={[50,0,0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[30,50]} />
                <meshStandardMaterial color={`black`} />
            </mesh>
            <mesh position={[-50,0,0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[30,50]} />
                <meshStandardMaterial color={`black`} />
            </mesh>
            <mesh position={[-50,0,0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[30,50]} />
                <meshStandardMaterial color={`black`} />
            </mesh>
            <mesh position={[0,0,0]} rotation={[Math.PI, 0, -Math.PI / 2]}>
                <planeGeometry args={[30,50]} />
                <meshStandardMaterial color={`black`} side={THREE.DoubleSide}/>
            </mesh>
            </>
            
    );
}

export default ContainerBox;
