import { Colors, Edges, getRandomInt, speed } from './globals.js';

var Object = function(type) {
    this.mesh = new THREE.Object3D();
    this.type = type;

	// Create the cabin
	var geomCockpit = new THREE.CylinderGeometry(10, 10, 2, 16);
	var matCockpit = new THREE.MeshPhongMaterial({ color: Colors.yellow, flatShading: true });
	var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;
	this.mesh.add(cockpit);
}

export var objects = [];

export function createObject(scene) {

    let objectTypes = ['eth', 'btc'];

	let object = new Object(objectTypes[getRandomInt(0, 1)]);

    object.mesh.position.y = getRandomInt(-2, 2) * 40;
    object.mesh.position.x = Edges.rightX;
    object.mesh.rotation.x = Math.PI / 2;
    console.log(object.type);
	scene.add(object.mesh);
    objects.push(object);
}

export function updateObject(scene) {
    objects.forEach((object, index, objects) => {
        if (object != null) {
            object.mesh.position.x -= speed;
            object.mesh.rotation.z -= .1;
        
            if (object.mesh.position.x < -Edges.rightX) {
                scene.remove(object.mesh);
                objects[index] = null;
            }
        }
    });
}