import * as Utils from './utils.js';

export function createCoin(type) {
	let object = new THREE.Object3D();
    let geo = new THREE.CylinderGeometry(10, 10, 4, 32);
    let mat = new THREE.MeshPhongMaterial({ color: Utils.Colors.white, flatShading: false });
	let coin = new THREE.Mesh(geo, mat);
	object.add(coin);

    //random vertical position
    object.position.y = Utils.getRandomInt(-2, 2) * 40;
    object.position.x = Utils.Edges.rightX;
    object.rotation.x = Math.PI / 2;

    return {
        mesh: object,
        type: 'coin',
        coinType: type,
        box3: new THREE.Box3().setFromObject(object),
        update: function(speed) {
            this.box3 = new THREE.Box3().setFromObject(this.mesh);
            this.mesh.position.x -= speed;
            this.mesh.rotation.z -= .1;
        }
    }
}

export function createSatellite() {
	let object = new THREE.Object3D();
    let geo = new THREE.BoxGeometry(16, 16, 16, 32);
    let mat = new THREE.MeshPhongMaterial({ color: Utils.Colors.blue, flatShading: false });
	let sat = new THREE.Mesh(geo, mat);
	object.add(sat);

    //random vertical position
    object.position.y = Utils.getRandomInt(-2, 2) * 40;
    object.position.x = Utils.Edges.rightX;
    object.rotation.x = Math.PI / 2;

    return {
        mesh: object,
        type: 'satellite',
        box3: new THREE.Box3().setFromObject(object),
        update: function(speed) {
            this.box3 = new THREE.Box3().setFromObject(this.mesh);
            this.mesh.position.x -= speed;
            this.mesh.rotation.z -= .05;
        }
    }
}

export function createComet() {
	let object = new THREE.Object3D();
    let geo = new THREE.BoxGeometry(16, 16, 16, 32);
    let mat = new THREE.MeshPhongMaterial({ color: Utils.Colors.brownDark, flatShading: false });
	let sat = new THREE.Mesh(geo, mat);
	object.add(sat);

    //random vertical position
    object.position.y = Utils.getRandomInt(-2, 2) * 40;
    object.position.x = Utils.Edges.rightX;
    object.rotation.x = Math.PI / 2;

    return {
        mesh: object,
        type: 'comet',
        box3: new THREE.Box3().setFromObject(object),
        update: function(speed) {
            this.box3 = new THREE.Box3().setFromObject(this.mesh);
            this.mesh.position.x -= speed * 1.6;
            this.mesh.rotation.z -= .05;
        }
    }
}

export function createPlayer() {
	let object = new THREE.Object3D();

    let geoBody = new THREE.BoxGeometry(30, 10, 10, 1, 1, 1);
	let matBody = new THREE.MeshPhongMaterial({ color: Utils.Colors.red, flatShading: true });
	let body = new THREE.Mesh(geoBody, matBody);
    object.add(body);

	let geoRoof = new THREE.BoxGeometry(2, 8, 9, 1, 1, 1);
	let matRoof = new THREE.MeshPhongMaterial({ color: Utils.Colors.white, flatShading: true });
	let roof = new THREE.Mesh(geoRoof, matRoof);
	roof.position.set(4, 8, 0);
	roof.rotation.z = 0.2;
    object.add(body);

    object.position.x = -100;

    return {
        mesh: object,
        type: 'player',
        box3: new THREE.Box3().setFromObject(object),
        targetYPosition: object.position.y,
        update: function() {
            this.box3 = new THREE.Box3().setFromObject(this.mesh);

            object.position.x += (-100 - object.position.x) * 0.1;

            // Move the car at each frame by adding a fraction of the remaining distance
            object.position.y += (this.targetYPosition - object.position.y) * 0.1;
        
            //Rotate the car proportionally to the remaining distance
            object.rotation.z = (this.targetYPosition - object.position.y) * 0.0128;
            object.rotation.x = (object.position.y - this.targetYPosition) * 0.0064;
        }
    }
}