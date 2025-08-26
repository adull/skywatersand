import { useRef, useEffect, useState, useMemo } from 'react'

import { GRAVITY } from '../helpers/const'
import BoxComponent from './BoxComponent'
import CameraHelperButtons from './CameraHelperButtons'
import ContainerBox from './ContainerBox'
import { extend, render, useFrame } from '@react-three/fiber'
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js'

import * as THREE from 'three'

extend({ MarchingCubes })

const Water = ({ numParticles = 300, bounds }) => {
    const ballPos = []
    const {minX, maxX, minY, maxY, minZ, maxZ} = bounds
    const marchingRef = useRef()
    const frameCountRef = useRef(0)

    const particles = useMemo(() => {
        const arr = []

        const spacing = 0.5
        const jitter = 0.05
        const nx = 10
        const ny = 5
        const nz = 10
        
            for (let i = 0; i < nx; i++) {
                for (let j = 0; j < ny; j++) {
                  for (let k = 0; k < nz; k++) {
                    arr.push({
                      pos: {
                        x: i * spacing + (Math.random() - 0.5) * jitter,
                        y: j * spacing + (Math.random() - 0.5) * jitter,
                        z: k * spacing + (Math.random() - 0.5) * jitter
                      },
                      vel: { x: 0, y: 0, z: 0 },
                      acc: { x: 0, y: 0, z: 0 },
                      density: 0,
                      pressure: 0
                    })
                  }
                }
              }
        console.log({ arr })
        return arr
    }, [numParticles])

    console.log(particles)

    useFrame((state, delta) => {
        // renderFrame(delta)
    })
    const renderFrame = (delta) => {
        stepSPH(particles, delta)
        // dumstepsph(particles, 0.016)
        const mc = marchingRef.current
        mc.reset()

        const ps = []

        for(let p of particles) {
            // console.log({ p })
            const xNorm = (p.pos.x - minX) / (maxX - minX)
            const yNorm = (p.pos.y - minY) / (maxY - minY)
            const zNorm = (p.pos.z - minZ) / (maxZ - minZ)
            const item = { xNorm, yNorm, zNorm, strength: 0.2, subtract: 0.3}
            // if(xNorm > 1 || yNorm > 1 || zNorm > 1) {
            //     console.log({xNorm, yNorm, zNorm})
            // }
            // console.log({xNorm, yNorm, zNorm})
            ps.push(item)

            mc.addBall(xNorm, yNorm, zNorm, 0.2, 0.3)
        }
        // ballPos.push(ps)
        // console.log({ ps })
        // if(frameCountRef.current < 20) {
        //     ballPos.push(ps)
        //     frameCountRef.current ++
        // } else if(frameCountRef.current === 20) {
        //     console.log({ballPos})
        //     frameCountRef.current ++
        // }
        mc.update()

    }

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if(e.key === 'k') {
                for(let i = 0; i < 10; i ++) {
                    renderFrame()
                }
            }
        })
    }, [])



    return (
        <marchingCubes ref={marchingRef} args={[32, new THREE.MeshStandardMaterial({ color: 'skyblue', transparent: true, opacity: 0.7 }), true, true]}
        position={[-50,0,-50]} scale={[10,10,10]} />
    )
}

const poly6Kernel = (r, h) => {
    if(r >= 0 && r <= h) {
        const hr2 = h*h - r*r
        return 315 / (64 * Math.PI * Math.pow(h, 9)) * Math.pow(hr2, 3)
    }
    return 0
}

const spikyGradient = (rVec, r, h) => {
    if(r > 0 && r <= h) {
        const factor = -45 / (Math.PI * Math.pow(h,6)) * Math.pow(h - r, 2)
        return {
            x: factor * (rVec.x / r),
            y: factor * (rVec.y / r),
            z: factor * (rVec.z / r)
        }
    } return { x: 0, y: 0, z: 0}
}

const dumstepsph = (particles, delta) => {
    for (let p of particles) {
        p.vel.y += -9.8 * delta
        p.pos.x += p.vel.x * delta
        p.pos.y += p.vel.y * delta
        p.pos.z += p.vel.z * delta
        if (p.pos.y < 0) { 

            // console.log(p.pos.y)
            p.pos.y = 0; p.vel.y *= -0.5 
        }
      }

}

const stepSPH = (particles, delta) => {
    // console.log({ delta })
    const h = 1
    const mass = 1
    const restDensity = 1000
    const k = 100
    const mu = 0.1
    const gravity = {x: 0, y: GRAVITY, z: 0}
    for(let i = 0; i < particles.length; i ++) {
        const pi = particles[i]
        pi.density = 0
        for(let j = 0; j < particles.length; j ++) {
            // if (i === j) continue
            const pj = particles[j]
            const dx = pi.pos.x - pj.pos.x
            const dy = pi.pos.y - pj.pos.y
            const dz = pi.pos.z - pj.pos.z

            const r = Math.sqrt(dx*dx + dy*dy + dz*dz)
            pi.density += mass * poly6Kernel(r,h)

        }
        pi.pressure = k * (pi.density - restDensity)
    }

    for(let i = 0; i < particles.length; i ++) {
        const pi = particles[i]
        pi.acc = {...gravity}
        for(let j = 0; j < particles.length; j ++) {
            if(i === j) continue
            const pj = particles[j]
            const dx = pi.pos.x - pj.pos.x
            const dy = pi.pos.y - pj.pos.y
            const dz = pi.pos.z - pj.pos.z
            
            const r = Math.sqrt(dx*dx + dy*dy + dz*dz)
            if(r < h && r > 0) {
                const grad = spikyGradient({x: dx, y: dy, z: dz}, r, h)
                
                const fPressure = (pi.pressure + pj.pressure) / 2 * pj.density
                pi.acc.x -= fPressure * grad.x
                pi.acc.y -= fPressure * grad.y
                pi.acc.z -= fPressure * grad.z

                pi.acc.x += mu * (pj.vel.x - pi.vel.x) / pj.density
                pi.acc.y += mu * (pj.vel.y - pi.vel.y) / pj.density
                pi.acc.z += mu * (pj.vel.z - pi.vel.z) / pj.density


            }
        }
    }

    for(let p of particles) {
        p.vel.x += p.acc.x * delta
        p.vel.y += p.acc.y * delta
        p.vel.z += p.acc.z * delta

        p.pos.x += p.vel.x * delta
        p.pos.y += p.vel.y * delta
        p.pos.z += p.vel.z * delta
    }


}

export default Water;
