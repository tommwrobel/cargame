import { Colors, Center } from './global.js';

export var sky;

export function createSky(scene){
	sky = new Sky();
	scene.add(sky.mesh);
}

var Sky = function(){

	this.mesh = new THREE.Object3D();
	this.numberOfStars = 100;
	this.skyElements = [];

    // star generator
    for(let i = 0; i < this.numberOfStars; i++) {
        
        let geom = new THREE.BoxGeometry(8, 8, 8);
	    let mat = new THREE.MeshPhongMaterial({ color: Colors.white });

        let star = new THREE.Mesh(geom, mat); 
        this.skyElements.push(star);
    }

    let stepAngle = Math.PI * 2 / this.skyElements.length;

    // random position generator
    this.skyElements.forEach((skyElement, index) => {

        let a = stepAngle * index;
        let h = 2000 + Math.random() * 600;

        skyElement.position.set(
            Math.cos(a)*h,
            Center.y - 1200 + Math.random() * 2400,
            Math.sin(a)*h
        );

        this.mesh.add(skyElement);
    });
}