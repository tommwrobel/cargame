export function Car() {
    const car = new THREE.Group();


    const carBody = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4, 4, 12),
        new THREE.MeshLambertMaterial({ color: 0x333333 })
    );
    car.add(carBody);

    return car;
}