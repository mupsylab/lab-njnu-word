import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const width = 300, height = 500;

// 渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.shadowMap.enabled  = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// 摄像机
const camera = new THREE.PerspectiveCamera(25, 300 / 500, 0.01, 1000);
// camera.position.set(0, 0, 5);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

// 场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe7e7e7);

// 控制器
const control = new OrbitControls(camera, renderer.domElement);

// 模拟面光源：点光源 + 平行光
const lightGroup = new THREE.Object3D();
const directLight = new THREE.DirectionalLight(0xffffff, 3);
directLight.castShadow = true;
directLight.position.set(0, 0, 0);
directLight.lookAt(0, 0, -1);
lightGroup.add(directLight);

function getEightPos(dist) {
    return [[dist, 0, 0],
            [-dist, 0, 0],
            [0, dist, 0],
            [0, -dist, 0],
            [dist, dist, 0],
            [dist, -dist, 0],
            [-dist, dist, 0],
            [-dist, -dist, 0]]
}

const pointLights = [];
getEightPos(0.29).forEach(v => {
    const pointLight = new THREE.PointLight(0xffffff, 1, 10, 1);
    pointLight.position.set(v[0], v[1], 0);
    pointLight.lookAt(v[0], v[1], -1);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.set(256, 256);
    pointLights.push(pointLight);
});
pointLights.forEach(v => {
    lightGroup.add(v);
});

lightGroup.position.set(0, 2, 5);
lightGroup.lookAt(0, 0, 0);
scene.add(lightGroup);

// 地板
const plane1Geometry = new THREE.PlaneGeometry(6, 6);
const plane1Material = new THREE.MeshPhysicalMaterial({ 
    side: THREE.DoubleSide,
    emissive: 0x000000
});
const plane1 = new THREE.Mesh(plane1Geometry, plane1Material);
plane1.position.set(0, 0, -0.36);
scene.add( plane1 );

const plane2Geometry = new THREE.PlaneGeometry(0.92, 1.6);
const plane2Material = new THREE.MeshPhysicalMaterial({ 
    side: THREE.DoubleSide,
    color: 0x748ae8,
    metalness: 0,
    roughness: 0.5,
    ior: 1.45,
    emissive: 0x000000 // 自发光
});
const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
plane2.receiveShadow = true;
scene.add( plane2 );

// 物体
const cubeGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.02);
const cubeMaterial = new THREE.MeshPhysicalMaterial({
    metalness: 0.0,
    emissive: 0x000000,
    transmission: 0.5,
    opacity: 1.0
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 0, 0.3);
cube.castShadow = true;
scene.add(cube);

function animate() {
    renderer.render(scene, camera);
    control.update();

    // cube.position.z += 0.01;
    // if (cube.position.z == 3) cube.position.z = 0.01;

    requestAnimationFrame(animate);
}

export { renderer, scene, animate }