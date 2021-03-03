import * as THREE from "three"
let container;
let camera;
let renderer;
let scene;
let house;


class animation3D{
    container: HTMLElement;
    

    constructor(){

        this.container = document.querySelector('.scene')! as HTMLElement;


        //creating scene;

        const scene = new THREE.Scene();


        const fov = 35;

        const aspect = this.container.clientWidth / this.container.clientHeight;

        const near = 0.1;

        const far = 500;
    

        // camera set up
        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        camera.position.set(10,0,350);

        const ambient = new THREE.AmbientLight(0x404040,5);
        scene.add(ambient);

        const light  = new THREE.DirectionalLight(0xffffff, 5);

        light.position.set(10,10,10);
        scene.add(light);

        // Renderer 
        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
        renderer.setSize(this.container.clientWidth,this.container.clientHeight );

        renderer.setPixelRatio(window.devicePixelRatio);

        // add all dependent to HTML 

        this.container.appendChild(renderer.domElement)

        

        // load model

        let loader = new THREE.GLTFLoader();
        loader.load('./3d/scene.gltf',function(gltf){

            scene.add(gltf.scene);
            house = gltf.scene.children[0];
            renderer.render(scene, camera)
           

        });
        
        this.animate();

    }
    
    animate(){
        requestAnimationFrame(animate);
        house.rotation.z += 0.005;
        renderer.render(scene, camera)
    }

}

const d3Animate = new animation3D;