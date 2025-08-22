import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

const Three = ({ update }) => {
    const  meshRef = useRef(0)
    useEffect(() => {
        // console.log({ state })
        update()
    }, [])

    useFrame(() => {
        if(meshRef.current) {
            meshRef.current.rotation.z += 0.01
        }
    })

    return (
        <mesh ref={meshRef} position={[0,0,0]}>
            <boxGeometry args={[10,10,10]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
    }

export default Three;
