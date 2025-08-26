const getCurrentCamPos = (camRef) => {
    console.log(`get current campos`)
    const pos = camRef.current.position
    console.log(pos)
}
const updateSavedCamPos = (camRef) => {
    const pos = camRef.current.position
    // console.log({ pos })
    const stringPos = JSON.stringify(pos)
    
    sessionStorage.setItem("camPos", stringPos)
}

const getSavedCamPos = () => {
    const defaultPos = JSON.stringify({x: 0,y: 20,z: 100})
    const camPos = sessionStorage.getItem("camPos")
    return camPos ?? defaultPos
}

export { getCurrentCamPos, getSavedCamPos, updateSavedCamPos }