import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Set background color to white

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 1.2;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("modelcontainer").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

document.addEventListener("DOMContentLoaded", function () {
  var loader = new GLTFLoader();
  loader.load(
    "public/airpods_max_silver/airpods_max_sky_blue/scene.gltf",
    function (gltf) {
      const scale = 7;
      gltf.scene.scale.set(scale, scale, scale);
      // Move the model to the center of the div
      gltf.scene.position.set(0, -0.4, 0);

      scene.add(gltf.scene);
    }
  );
});

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Ambient light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Main directional light
directionalLight.position.set(1, 1, 1).normalize();

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8); // Additional directional light
directionalLight2.position.set(-1, -1, -1).normalize();

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.5); // Additional directional light
directionalLight3.position.set(0, 1, 0).normalize();

scene.add(ambientLight);
scene.add(directionalLight);
scene.add(directionalLight2);
scene.add(directionalLight3);

// Hemisphere light for ambient lighting
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xd0d0d0, 1);
scene.add(hemisphereLight);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
//GSAP timeles
gsap.fromTo(
  ".intro-image",
  {
    scale: 3,
    opacity: 0,
  },
  {
    scale: 1,
    duration: 1.8,
    ease: "none",
    opacity: 1,
  }
);

gsap.fromTo(
  ".image-text",
  {
    opacity: 0,
  },
  {
    duration: 0.6,
    ease: "none",
    opacity: 1,
    delay: 1,
  }
);

const tlIntro = gsap.timeline({
  scrollTrigger: {
    trigger: ".first-page",
    start: "0%",
    end: "100%",
    pin: true,
    pinSpacing: false,
  },
});

const tlH = gsap.timeline({
  scrollTrigger: {
    trigger: ".second-page",
    scrub: true,
    start: "-40%",
    end: "40%",
    markers: true,
  },
});

tlH.fromTo(
  ".highlight-text",
  { color: "rgba(255, 255, 255, 0.4)" },
  {
    color: "rgba(255, 255, 255,1)",
    stagger: 1,
  }
);

const tlHRemove = gsap.timeline({
  scrollTrigger: {
    trigger: ".second-page",
    scrub: true,
    start: "-20%",
    end: "60%",
    markers: true,
  },
});

tlHRemove.to(".highlight-text", {
  color: "rgba(255, 255, 255,0.4)",
  stagger: 1,
});

const tlPodsCloseup = gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll-text-page",
    start: "0%",
    end: "center",
    markers: true,
  },
});

tlPodsCloseup.fromTo(
  ".image-pods-closeup",
  { opacity: 0, x: -100 },
  { opacity: 1, x: 0, duration: 3 }
);

// const tlHideNav = gsap.timeline({
//   scrollTrigger: {
//     trigger: "nav",
//     start: "bottom",
//     end: 99999,
//     markers: true,
//   },
// });

// const tlShowNav = gsap.timeline({
//   scrollTrigger: {
//     trigger: "nav",
//     start: "top",
//     markers: true,
//   },
// });

// tlShowNav.set(".first-nav-row", {
//   yPercent: 0,
//   opacity: 1,
// });

// tlHideNav.fromTo(
//   ".first-nav-row",
//   {
//     opacity: 1,
//     yPercent: 0,
//   },
//   {
//     yPercent: -200,
//     opacity: 0,
//   }
// );

// tlHideNav.fromTo(
//   ".second-nav-row",
//   {
//     yPercent: 0,
//   },
//   {
//     yPercent: -100,
//   }
// );

// tlHideNav.to(".outer-nav-link-container", {
//   height: 36,
// });

ScrollTrigger.create({
  trigger: ".gallery",
  start: "top top",
  end: "bottom bottom",
  pin: ".right",
});

const tlTextScroll = gsap.timeline({
  scrollTrigger: {
    trigger: ".details-1",
    scrub: true,
    markers: true,
    start: "top",
    end: "bottom",
  },
});

const tlTextScroll2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".details-2",
    scrub: true,
    markers: true,
    start: "top",
    end: "bottom",
  },
});

const tlTextScroll3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".details-3",
    scrub: true,
    markers: true,
    start: "top",
    end: "bottom",
  },
});

tlTextScroll.fromTo(".headline-1", { opacity: 1 }, { opacity: 0, duration: 3 });
tlTextScroll2.fromTo(
  ".headline-2",
  { opacity: 1 },
  { opacity: 0, duration: 3 }
);
tlTextScroll3.fromTo(
  ".headline-3",
  { opacity: 1 },
  { opacity: 0, duration: 3 }
);

const swatches = document.querySelectorAll(".swatches div");
const gallery = document.querySelector(".phone-gallery");
const slides = document.querySelectorAll(".phone-gallery-container");

let currentSwatch = "silver";
let topIndex = 2;

swatches.forEach((swatch, index) => {
  const coord = slides[index].getBoundingClientRect().left;

  swatch.addEventListener("click", (e) => {
    let swatchName = e.target.getAttribute("swatch");
    let closeUp = document.querySelector("." + swatchName);

    console.log(swatchName);
    console.log(closeUp);
    console.log(currentSwatch);

    if (currentSwatch === swatchName) return;
    gsap.set(closeUp, { zIndex: topIndex });
    gsap.fromTo(closeUp, { opacity: 0 }, { opacity: 1, duration: 1 });

    gsap.to(gallery, { x: -coord, duration: 1, ease: "back.out(1)" });

    topIndex++;
    currentSwatch = swatchName;
  });
});

const secondNavRow = document.querySelector(".second-nav-row");
const secondNavRowInitialTop = secondNavRow.getBoundingClientRect().top;

gsap.to(".first-nav-row", {
  y: "-200%", // Slide up
  duration: 2, // Animation duration,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "body", // Trigger when scrolling starts
    start: "top top", // Start when scrolling starts
    end: secondNavRowInitialTop, // End when the second nav row reaches the top
    scrub: true, // Smooth animation
  },
});

gsap.to(".outer-nav-link-container", {
  height: 36,
  duration: 2,
  ease: "power2.out",
});

// Slide up the second nav row to take the first one's place
gsap.to(".second-nav-row", {
  y: "-100%", // Slide up
  duration: 2,
  ease: "power2.out", // Animation duration
  scrollTrigger: {
    trigger: "body", // Trigger when scrolling starts
    start: "top top", // Start when scrolling starts
    end: secondNavRowInitialTop, // End when the second nav row reaches the top
    scrub: true, // Smooth animation
  },
});
