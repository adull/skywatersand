import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Physics } from '@react-three/rapier'

import { getSavedCamPos } from '../helpers'
import { GRAVITY } from '../helpers/const'

import BoxComponent from './BoxComponent'
import CameraHelperButtons from './CameraHelperButtons'
import ContainerBox from './ContainerBox'
import Water from './Water'


const Three = () => {
    const [height, setHeight] = useState(0)
    const camRef = useRef(null)
    const gridRef = useRef(null)
    const controlsRef = useRef(null)

    const domRef = useRef(null)
    
    const domId = `canvasContainer`

    const ugh = getSavedCamPos()
    console.log({ ugh })
    const cp = JSON.parse(ugh)
    const cameraPos = [cp.x,cp.y,cp.z]

    useEffect(() => {
        const el = domRef.current
        const parent = el

        const parentHeight = parent.clientHeight
        const parentChildren = Array.from(parent.childNodes)

        const domIndex = Array.from(parentChildren).findIndex(item => item.id === domId)
        let nonCanvasHeight = 0
        parentChildren.forEach((item, index) => {
            if(index !== domIndex) {
                nonCanvasHeight += item.clientHeight
            }
        })
        
        setHeight(parentHeight - nonCanvasHeight)
    }, [])

    const containerArgs = { width: 50, height: 100, depth: 30 }
    const containerPos = { x: 0, y: 10, z: 0 }
    const bounds = { minX: containerPos.x - containerArgs.width / 2, maxX: containerPos.x + containerArgs.width / 2, 
                     minY: containerPos.y - containerArgs.height / 2, maxY: containerPos.y + containerArgs.height / 2, 
                     minZ: containerPos.z - containerArgs.depth /2, maxZ: containerPos.x + containerArgs.depth / 2 }

    return (
        <div className="w-full h-full"  ref={domRef}>
            <Canvas className="h-full" id={domId} style={{height}}>
                <PerspectiveCamera makeDefault ref={camRef} position={cameraPos} rotation={[0, -Math.PI, 0]} />
                <directionalLight color="white" position={[0, 0, 50]} />
                <directionalLight color="white" position={[0, 50, 0]} />
                <directionalLight color="white" position={[50, 50, -50]} />
                <Physics gravity={[0, GRAVITY, 0]}>
                    <ContainerBox args={containerArgs} initPos={containerPos}>
                        {/* <BoxComponent gravity={true} /> */}
                        <Water bounds={bounds} />
                    </ContainerBox>
                </Physics>
                
                <OrbitControls ref={controlsRef} makeDefault />
                <gridHelper
                    ref={gridRef}
                    args={[10000, 30, '#000000', '#cccccc']}
                    position={[-4000, 0, 330]}
                    rotation={[0, -Math.PI / 2, 0]}
                    opacity={0}
                    />
            </Canvas>
            <CameraHelperButtons enabled={['getCurrentCamPos', 'updateSavedCamPos']} camRef={camRef} />
        </div>
    );
    }

export default Three;
