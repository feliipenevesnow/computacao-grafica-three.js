import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'dat.gui';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
const planeMaterial = new THREE.MeshNormalMaterial({color: 0xffffff});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);


plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);


const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
const cubeMaterial = new THREE.MeshNormalMaterial({color: 0xff0000});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);


cube.position.x = -9;
cube.position.y = 3;
cube.position.z = 0;
scene.add(cube);

const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
const sphereMaterial = new THREE.MeshNormalMaterial({color: 0x7777ff});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.position.x = 20;
sphere.position.y = 0;
sphere.position.z = 2;
scene.add(sphere);

const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 20);
const cylinderMaterial = new THREE.MeshNormalMaterial({color: 0x77ff77});
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

cylinder.position.set(0, 0, 1);

scene.add(cylinder);


// position and point the camera to the center of the scene
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);


const ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);


const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);

scene.add(spotLight);

// call the render function
var step = 0;
var scalingStep = 0;

var controle = new function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
    this.scalingSpeed = 0.03;
};

const gui = new GUI();
gui.add(controle, 'rotationSpeed', 0, 0.5);
gui.add(controle, 'bouncingSpeed', 0, 0.5);
gui.add(controle, 'scalingSpeed', 0, 0.5);


const controls = new OrbitControls(camera, renderer.domElement);

const stats = Stats();
document.body.appendChild(stats.dom);

const animate = () => {
    requestAnimationFrame( animate );

    cube.rotation.x += controle.rotationSpeed;
    cube.rotation.y += controle.rotationSpeed;
    cube.rotation.z += controle.rotationSpeed;

    step += controle.bouncingSpeed;
    sphere.position.x = 20 + ( 10 * (Math.cos(step)));
    sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));


    scalingStep += controle.scalingSpeed;
    var scaleX = Math.abs(Math.sin(scalingStep / 4));
    var scaleY = Math.abs(Math.cos(scalingStep / 5));
    var scaleZ = Math.abs(Math.sin(scalingStep / 7));
    cylinder.scale.set(scaleX, scaleY, scaleZ);

     stats.update();
    controls.update();

    renderer.render( scene, camera );
}

animate();