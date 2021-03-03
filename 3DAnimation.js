"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = __importStar(require("three"));
var container;
var camera;
var renderer;
var scene;
var house;
var animation3D = /** @class */ (function () {
    function animation3D() {
        this.container = document.querySelector('.scene');
        //creating scene;
        var scene = new THREE.Scene();
        var fov = 35;
        var aspect = this.container.clientWidth / this.container.clientHeight;
        var near = 0.1;
        var far = 500;
        // camera set up
        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(10, 0, 350);
        var ambient = new THREE.AmbientLight(0x404040, 5);
        scene.add(ambient);
        var light = new THREE.DirectionalLight(0xffffff, 5);
        light.position.set(10, 10, 10);
        scene.add(light);
        // Renderer 
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        // add all dependent to HTML 
        this.container.appendChild(renderer.domElement);
        // load model
        var loader = new THREE.GLTFLoader();
        loader.load('./3d/scene.gltf', function (gltf) {
            scene.add(gltf.scene);
            house = gltf.scene.children[0];
            renderer.render(scene, camera);
        });
        this.animate();
    }
    animation3D.prototype.animate = function () {
        requestAnimationFrame(animate);
        house.rotation.z += 0.005;
        renderer.render(scene, camera);
    };
    return animation3D;
}());
var d3Animate = new animation3D;
