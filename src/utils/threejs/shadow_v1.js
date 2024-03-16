import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(800, 600);
renderer.shadowMap.enabled  = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// 摄像机
const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.01, 1000);
camera.position.set(0, 20, 0);
camera.lookAt(0, 0, 0);

// 场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0096ff);

// 控制器
const control = new OrbitControls(camera, renderer.domElement);

// 光源
const light = new THREE.AmbientLight(0xffffff, 1); // 柔和的白光
scene.add( light );
/**
 * color
 * intensity 光强度
 * distance 光源照射到的最大距离。距离内会从最大值衰减到0
 * decay 衰减的速率。现实世界，距离增加一倍，光减少到原来的四分之一
 * new THREE.PointLight(0xffffff, 1, 40, 0);
 */
const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 3.3, 0, 0);
spotLight.position.set(0, 10, 0);
spotLight.lookAt(0, 0, 0);
spotLight.castShadow = true;
scene.add(spotLight);

const spotLightHelp = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelp)

// 地板
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, color: 0x748ae8 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotateX(Math.PI / 2)
scene.add( plane );

// 物体
const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
// const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00e300 });
const cubeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    metalness: 1.0,
    roughness: 0.6,
    envMap: new THREE.CubeTextureLoader().setPath("/assets/images/环境光4/").load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.y = 3;
cube.castShadow = true;
scene.add(cube);

function animate() {
    renderer.render(scene, camera);
    control.update();
    requestAnimationFrame(animate);
}

export { renderer, scene, animate }