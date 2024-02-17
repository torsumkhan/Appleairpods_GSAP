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
