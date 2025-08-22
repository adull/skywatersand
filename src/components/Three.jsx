import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

import BoxComponent from './BoxComponent'
import { Physics } from '@react-three/rapier'

const Three = () => {
    const camRef = useRef(null)
    const gridRef = useRef(null)
    const controlsRef = useRef(null)

    const [forceUpdate, setForceUpdate] = useState(1)

    const update = () => {
        setForceUpdate((prev) => prev + 1)
    }


    useEffect(() => {
        const cam = camRef.current;
        if(gridRef.current && cam) {
            console.log(`yeah its here`)
            gridRef.current.position.y = 0
            cam.position.set(120, 5, -40);
        }
    }, [forceUpdate])

    return (
        <div className="w-full h-full">
            <Canvas className="h-full">
                <PerspectiveCamera makeDefault ref={camRef}/>
                <directionalLight color="white" position={[0, 0, 5]} />
                <directionalLight color="white" position={[0, 5, 0]} />
                <Physics gravity={[0, -90.81, 0]}>
                    <BoxComponent update={update} gravity={true} />
                    <BoxComponent update={update} gravity={false} initPos={[0,-5,0]} />
                    <BoxComponent update={update} gravity={false} initPos={[20,0,0]} />
                </Physics>
                
                <OrbitControls ref={controlsRef} autoRotateSpeed={0.2} autoRotate makeDefault />
                <gridHelper
                    ref={gridRef}
                    args={[10000, 100, '#000000', '#cccccc']}
                    position={[0, 0, 0]}
                    rotation={[0, -Math.PI / 2, 0]}
                    />
            </Canvas>
        </div>
    );
    }

export default Three;
