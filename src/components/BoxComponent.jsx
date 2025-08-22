import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'

const Three = ({ initPos, gravity, update }) => {
    const  meshRef = useRef()
    const bodyRef = useRef()
    useEffect(() => {
        update()
    }, [])

    useFrame(() => {
        if(meshRef.current) {
            meshRef.current.rotation.z += 0.01
        }
    })

    const hasGravity = gravity ? 1 : 0
    console.log({ hasGravity})
    return (
        
            <RigidBody ref={bodyRef} linearDamping={4} canSleep position={ initPos ?? [0,0,0] } colliders={"cuboid"} gravityScale={hasGravity}>
                <mesh ref={meshRef} >
                    <boxGeometry args={[10,10,10]} />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>
    );
}

export default Three;
