import { useRef } from 'react'
import Three from './Three'
import CameraHelperButtons from './CameraHelperButtons';

const Body = () => {
    const camRef = useRef(null)
    return (
        <div className="container mx-auto pb-6 h-[700px]">
            <div className="flex flex-col h-full">
                <Three camRef={camRef} updateCamRef={(newCamRef) => camRef.current = newCamRef.current } />
            </div>
        </div>

    );
}

export default Body;
