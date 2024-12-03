
  // Initialize GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Animate sections on scroll
  gsap.utils.toArray('section').forEach(section => {
      gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse"
          }
      });
  });

  // Add fade-in animation to timeline items
  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        toggleClass: 'visible',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true
      },
      opacity: 1,
      x: 0,
      duration: 1,
      delay: i * 0.2
    });
  });
