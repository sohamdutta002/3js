import * as THREE from 'three'
import './style.css'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Cube
// const geometry = new THREE.BoxGeometry()
const geometry=new THREE.BufferGeometry()
const verticesArray= new Float32Array(
  [
    0,0,0,
    0,1,0,
    1,0,0
  ]
)
const positionsAttribute=new THREE.BufferAttribute(verticesArray,3)
geometry.setAttribute('position',positionsAttribute)
const material = new THREE.MeshBasicMaterial({ color: "purple", wireframe:true })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// TorusKnot
// const geometryT = new THREE.TorusKnotGeometry( 0.3, 1, 200, 20 );
// const materialT = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
// const torusKnot = new THREE.Mesh( geometryT, materialT );
// scene.add( torusKnot );


camera.position.z = 3
const clock=new THREE.Clock()
function animate() {
  requestAnimationFrame(animate)
  const elapsedTime=clock.getElapsedTime()
  cube.rotation.x = elapsedTime* Math.PI
  // torusKnot.rotation.x = elapsedTime* Math.PI
  renderer.render(scene, camera)
}

animate()
