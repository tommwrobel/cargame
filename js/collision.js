export function checkCollision(obj1, obj2, scene, action) {
    obj2.forEach(obj2 => {
        let obBox1 = new THREE.Box3().setFromObject(obj1.mesh);
        let obBox2 = new THREE.Box3().setFromObject(obj2.mesh);
    
        if (obBox1.intersectsBox(obBox2)) {
            action(obj1, obj2, scene);
        }
        return false;
    });
}