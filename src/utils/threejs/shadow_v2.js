import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(300, 500);
renderer.shadowMap.enabled  = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// 摄像机
const camera = new THREE.PerspectiveCamera(75, 300 / 500, 0.01, 1000);
camera.position.set(0, 20, 0);
camera.lookAt(0, 0, 0);

// 场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0096ff);

// 控制器
const control = new OrbitControls(camera, renderer.domElement);

// 地板
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshPhysicalMaterial({ 
    side: THREE.BackSide,
    color: 0x748ae8
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotateX(Math.PI / 2);
scene.add( plane );

// 环境光源
const light = new THREE.AmbientLight(0xffffff, 1); // 柔和的白光
scene.add( light );

// 平行光
const directLight = new THREE.DirectionalLight(0xffffff, 3);
directLight.castShadow = true;
directLight.position.set(3, 7, 3);
directLight.lookAt(0, 0, 0);
directLight.shadow.mapSize.set(512, 512);
scene.add(directLight);

// 物体
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    metalness: 0.0,
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 1.1, 0);
cube.castShadow = true;
scene.add(cube);


const camera2 = new THREE.PerspectiveCamera(75, 300 / 500, 0.01, 1000);
camera2.position.set(0, 20, 0);
camera2.lookAt(0, 0, 0);
const cameraHelp = new THREE.CameraHelper(camera2)
const directLightHelp = new THREE.DirectionalLightHelper(directLight);
scene.add(camera2)
scene.add(cameraHelp)
scene.add(directLightHelp)

function animate() {
    renderer.render(scene, camera);
    control.update();

    cube.position.y += 0.1;
    if (cube.position.y > directLight.position.y) cube.position.y = 1;

    requestAnimationFrame(animate);
}

export { renderer, scene, animate }