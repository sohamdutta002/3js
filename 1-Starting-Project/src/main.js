import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const scene = new THREE.Scene()

//LoadingManager
const loadingManager=new THREE.LoadingManager()
loadingManager.onStart=()=>{
  console.log("Start")
}
loadingManager.onLoad=()=>{
  console.log("Loading...")
}
loadingManager.onProgress=()=>{
  console.log("Progress")
}
loadingManager.onError=()=>{
  console.log("Error!")
}

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//Texture
const textureloader=new THREE.TextureLoader()
const concreteTexture=textureloader.load('/textures/concrete.jpg')

//TextureLoader
const cubetextureLoader=new THREE.CubeTextureLoader();
const envTexture=cubetextureLoader.load([  '/textures/cube/px.jpg',
  '/textures/cube/nx.jpg',
  '/textures/cube/py.jpg',
  '/textures/cube/ny.jpg',
  '/textures/cube/pz.jpg',
  '/textures/cube/nz.jpg'
])  //six images are added and they become the env images
scene.background=envTexture


// Cube
const geometry = new THREE.BufferGeometry()
const verticesamount=1000;
const positionArray=new Float32Array(verticesamount*2)
for(let i=0;i<3000;i++){
  positionArray[i]=(Math.random()-0.5)*2
}
geometry.setAttribute("position",new THREE.BufferAttribute(positionArray,3))
// const geometry = new THREE.PlaneGeometry(1,1,64,64)
// const geometry = new THREE.PlaneGeometry(1,1)
// const geometry = new THREE.BoxGeometry()
console.log(geometry)
// const geometry=new THREE.BufferGeometry()
// const verticesArray= new Float32Array(
//   [
//     0,0,0,
//     0,1,0,
//     1,0,0
//   ]
// )
// const positionsAttribute=new THREE.BufferAttribute(verticesArray,3)
// geometry.setAttribute('position',positionsAttribute)
const material = new THREE.PointsMaterial({ color:"skyblue" })
material.map=concreteTexture
material.transparent=true
material.depthTest=false
material.size=0.02
// const material = new THREE.PointsMaterial({ map: concreteTexture })
// const material = new THREE.MeshBasicMaterial({ color: "purple" })
// const material = new THREE.MeshStandardMaterial({ map: concreteTexture })
// const material = new THREE.MeshToonMaterial({ map: concreteTexture })
// const material = new THREE.MeshBasicMaterial({ map: concreteTexture })
// const material = new THREE.MeshNormalMaterial({ map: concreteTexture })
// const material = new THREE.MeshMatcapMaterial({ map: concreteTexture })
//In meshbasicmaterial the most used properties are
// material.wireframe=true
// material.transparent=true
// material.opacity=0.4
// material.side=THREE.DoubleSide/THREE.BackSide
// material.visible=false
// const cube = new THREE.Mesh(geometry, material)
const cube = new THREE.Points(geometry, material)
scene.add(cube)

// TorusKnot
// const geometryT = new THREE.TorusKnotGeometry( 0.3, 0.2, 32, 32 );
// const bumptexture=textureloader.load('/textures/bump.jpg')
// const materialT = new THREE.MeshStandardMaterial({bumpMap:bumptexture} );
// // materialT.roughness=0.5
// materialT.envMap=envTexture
// const torusKnot = new THREE.Mesh( geometryT, materialT );
// scene.add( torusKnot );

//Lights
//Texture needs light
const ambientLight=new THREE.AmbientLight(0xffffff,0.4)
scene.add(ambientLight)

const directionalLight=new THREE.DirectionalLight(0xffffffff,1)
directionalLight.position.set(2,2,5)
scene.add(directionalLight)

camera.position.z = 3

//OrbitControls
const orbitControls=new OrbitControls(camera,renderer.domElement)
orbitControls.enableDamping=true
orbitControls.autoRotate=true
orbitControls.autoRotateSpeed=0.5

const clock=new THREE.Clock()
function animate() {
  requestAnimationFrame(animate)
  const elapsedTime=clock.getElapsedTime()
  // cube.rotation.x = elapsedTime* Math.PI/2
  // torusKnot.rotation.x = elapsedTime* Math.PI
  orbitControls.update()
  renderer.render(scene, camera)
}

animate()
