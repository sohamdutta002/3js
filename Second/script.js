import * as THREE from "./three.module.min.js"
// Scene Mesh Camera Renderer

//Scene
const scene=new THREE.Scene()

//Mesh
const geometry=new THREE.BoxGeometry(1,1,1)
const material=new THREE.MeshBasicMaterial({color:"purple"})
const mesh=new THREE.Mesh(geometry,material)

scene.add(mesh)

//Camera
const aspect={
    width:window.innerWidth,
    height:window.innerHeight
}
const camera=new THREE.PerspectiveCamera(75,aspect.width/aspect.height)
camera.position.z=3
camera.position.y=1
scene.add(camera)

//Renderer
const canvas=document.querySelector(".draw")    //select the canvas
const renderer=new THREE.WebGLRenderer({canvas})    //add webgl renderer
renderer.setSize(aspect.width,aspect.height)    
// renderer.render(scene,camera)   //draw what the camera inside the scene captures

//Clock Class
const clock=new THREE.Clock()   //since different fps montiors thus different movements to make it constant on all screens we use clock

const animate=()=>{
    //GetElapsedTime is the number of seconds that has passed since the user has entered the site
    const elapsedTime=clock.getElapsedTime()
    mesh.rotation.y=elapsedTime*Math.PI //on rotating by pi mesh moves 180 deg for 1 pi for each second passed
    renderer.render(scene,camera)
    window.requestAnimationFrame(animate)
}
animate()