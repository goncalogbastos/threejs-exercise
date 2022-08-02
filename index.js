import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,  
  MOUSE,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Spherical,
  Box3,
  Sphere,
  Raycaster,
  MathUtils,
  Clock,
  MeshLambertMaterial,
  DirectionalLight,
  Color,
  MeshPhongMaterial,
  TextureLoader,
  AmbientLight,
  SphereGeometry,
  AxesHelper,
  GridHelper,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments
} from "three";

import CameraControls from "camera-controls";
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js'
import gsap from 'gsap';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';


// 1 The Scene

const scene = new Scene();
const canvas = document.getElementById("three-canvas");

const axes = new AxesHelper();
axes.material.depthTest = false;
axes.renderOrder =2;
scene.add(axes);

const grid = new GridHelper();
grid.renderOrder=1;
scene.add(grid);


// 2 The Objects

const loader = new GLTFLoader();
const loadingScreen = document.getElementById('loader-container');
const progressText = document.getElementById('progress-text');

loader.load('./police_station.glb',
(gltf)=>{
  scene.add(gltf.scene);
  loadingScreen.classList.add('hidden');
},
(progress)=>{
  console.log(progress);
  const progressPercent = Math.trunc(progress.loaded/progress.total * 100);
  progressText.textContent = `Loading: ${progressPercent}%`
},
(error)=>{
  console.log(error);
}
);


// 3 The camara

const camera = new PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight
);
camera.lookAt(axes.position);
scene.add(camera);




// 4 The Renderer

const renderer = new WebGLRenderer({ canvas });
const pixelRat = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(pixelRat);
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
renderer.setClearColor(0x3E3E3E,1);



// 5 Lights

const light1 = new DirectionalLight();
light1.position.set(3,2,1).normalize();
scene.add(light1);

const ambientLight = new AmbientLight(0xfffff,0.2);
scene.add(ambientLight);

/* const light2 = new DirectionalLight();
light2.position.set(-3,2,-1).normalize();
scene.add(light2); */



// 6 Responsivity

window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
});



// 7 Controls
const subsetOfTHREE = {
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils: {
      DEG2RAD: MathUtils.DEG2RAD,
      clamp: MathUtils.clamp
    }
  };
CameraControls.install({THREE: subsetOfTHREE});
const clock = new Clock();
const cameraControls = new CameraControls(camera,canvas);
cameraControls.dollyToCursor = true; // Zoom to the cursor
cameraControls.setLookAt(18,20,22,0,10,0);


// 8 Animation
function animate() {
  const delta = clock.getDelta();
  cameraControls.update(delta);

  renderer.render(scene, camera);
  requestAnimationFrame(animate); // run in an infinite loop
}

animate();


/* // 9 Debugging

const gui = new GUI();

const min =-3;
const max = 3;
const step = 0.01;

const transformationFolder = gui.addFolder('Sun Position')

transformationFolder.add(sun.position,'x',min,max,step).name("Position X");
transformationFolder.add(sun.position,'y',min,max,step).name("Position Y");
transformationFolder.add(sun.position,'z',min,max,step).name("Position Z");

gui.addFolder('Sun visibility').add(sun,'visible');

const colorParam = {
  value: 0xff0000
}

gui.addColor(colorParam,'value').name('Color').onChange(()=>{
  sun.material.color.set(colorParam.value);
})

const functionParam = {
  spin: () => {
    gsap.to(sun.rotation, {y: sun.rotation.y +10, duration: 5})
  }
}

gui.add(functionParam, 'spin');
 */