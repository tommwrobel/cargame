import { Colors } from './global.js';

var container = document.getElementById('universe');
var WIDTH = container.getBoundingClientRect().width;
var HEIGHT = container.getBoundingClientRect().height;
var rotationUp = true;
var rotationLeft = true;

var Car = function() {
	
	this.mesh = new THREE.Object3D();
	
	// Create the cabin
	var geomCockpit = new THREE.BoxGeometry(100, 50, 50, 1, 1, 1);
	var matCockpit = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
	var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;
	this.mesh.add(cockpit);
};

export var car;

export function createCar(scene){ 
	car = new Car(Colors);
	car.mesh.scale.set(.25,.25,.25);
	car.mesh.position.y = 100;
	scene.add(car.mesh);
}

export function animateCar() {
    car.mesh.rotate.z += .01
}

export function updateCar(){

	// let's move the airplane between -100 and 100 on the horizontal axis, 
	// and between 25 and 175 on the vertical axis,
	// depending on the mouse position which ranges between -1 and 1 on both axes;
	// to achieve that we use a normalize function (see below)
	
	var targetX = normalize(mousePos.x, -1, 1, -100, 100);
	var targetY = normalize(mousePos.y, -1, 1, 25, 175);

	// update the airplane's position
	car.mesh.position.y = targetY;
	car.mesh.position.x = targetX;

    if (car.mesh.rotation.z > 0.2) rotationUp = false;
    if (car.mesh.rotation.z < -0.2) rotationUp = true;
    car.mesh.rotation.z += rotationUp ? 0.002 : -0.002;

    if (car.mesh.rotation.y > 0.2) rotationLeft = false;
    if (car.mesh.rotation.y < -0.2) rotationLeft = true;
    car.mesh.rotation.y += rotationLeft ? 0.005 : -0.005;
}

function normalize(v,vmin,vmax,tmin, tmax){

	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;

}

var mousePos={x:0, y:0};

// now handle the mousemove event

export function handleMouseMove(event) {

	// here we are converting the mouse position value received 
	// to a normalized value varying between -1 and 1;
	// this is the formula for the horizontal axis:
	
	var tx = 0;

	// for the vertical axis, we need to inverse the formula 
	// because the 2D y-axis goes the opposite direction of the 3D y-axis
	
	var ty = 1 - (event.clientY / HEIGHT) * 2;
	mousePos = {x:tx, y:ty};

}