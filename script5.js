const ROCKET_MODEL_URL = "";
const NOSE_VARIANTS = { nose1: "", nose2: "", nose3: "", nose4: "", nose5: "" };
let scene, camera, renderer, raycaster, rocket = null, noseMesh = null;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 5, 5);
    scene.add(directionalLight);
    
    raycaster = new THREE.Raycaster();
    loadRocketModel();
    
    window.addEventListener("resize", onWindowResize);
}

function loadRocketModel() {
    new THREE.GLTFLoader().load(ROCKET_MODEL_URL, (gltf) => {
        rocket = gltf.scene;
        scene.add(rocket);
        noseMesh = rocket.getObjectByName("nose") || console.warn('No "nose" mesh found.');
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();
