// 3D flag (simple plane with texture)
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('flag3D'), alpha:true});
renderer.setSize(innerWidth, innerHeight);
const texture = new THREE.TextureLoader().load('assets/tiranga.jpg');
const flag = new THREE.Mesh(
  new THREE.PlaneGeometry(5,3,20,20),
  new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide})
);
scene.add(flag);
camera.position.z = 5;

function animate(){
  requestAnimationFrame(animate);
  flag.rotation.y = Math.sin(Date.now()*0.001)*0.2;
  renderer.render(scene,camera);
}
animate();

// GSAP scroll animations
gsap.from("#heroTxt",{duration:2,y:-100,opacity:0,ease:"bounce"});
gsap.from("#enterBtn",{duration:1.5,delay:1,y:50,opacity:0});

// Load admin message
const msg = localStorage.getItem('adminMsg') || "आज पूरे स्कूल में स्वतंत्रता दिवस की हार्दिक शुभकामनाएँ!";
document.getElementById('msgTxt').textContent = msg;
