import { Colors, Dimensions, Edges, getRandomInt, speed } from './globals.js';

var Object = function() {
    this.mesh = new THREE.Object3D();
	
	// Create the cabin
	var geomCockpit = new THREE.CylinderGeometry(10, 10, 2, 8);
	var matCockpit = new THREE.MeshPhongMaterial({ color:Colors.yellow, shading:THREE.FlatShading });
	var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;
	this.mesh.add(cockpit);
}

export var object;

export function createObject(scene) { 
	object = new Object();

    object.mesh.position.y = getRandomInt(-2, 2) * 40;
    object.mesh.position.x = Edges.rightX;
    object.mesh.rotation.x = Math.PI / 2;

	scene.add(object.mesh);
}

export function updateObject(scene) {
    object.mesh.position.x -= speed;
    object.mesh.rotation.z -= .1;
    if (object.mesh.position.x < -Edges.rightX) {
        scene.remove( object.mesh );
        createObject(scene);
    }
}