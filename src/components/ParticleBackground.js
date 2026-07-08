import { gsap } from "gsap";

export class ParticleBackground {
  constructor(container, count = 180) {
    this.container = container;
    this.count = count;
    this.layer = null;
    this.particles = [];
  }

  create() {
    this.layer = document.createElement("div");
    this.layer.id = "particle-layer";
    this.container.appendChild(this.layer);

    for (let i = 0; i < this.count; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      const size = 2 + Math.random() * 6;
      particle.style.width = size + "px";
      particle.style.height = size + "px";

      particle.style.left = Math.random() * window.innerWidth + "px";
      particle.style.top = Math.random() * window.innerHeight + "px";
      particle.style.opacity = 0.2 + Math.random() * 0.8;

      this.layer.appendChild(particle);
      this.animateParticle(particle);
      this.particles.push(particle);
    }

    // 🌟 Add global star-layer pulsing effect
    gsap.to("#star-layer", {
      opacity: () => 0.5 + Math.random() * 0.5,
      duration: 0.3,
      repeat: -1,
      yoyo: true
    });

    window.addEventListener("mousemove", this.onMouseMove);
  }

  animateParticle(particle) {
    gsap.to(particle, {
      x: () => (Math.random() - 0.5) * 300,
      y: () => (Math.random() - 0.5) * 300,
      duration: 5 + Math.random() * 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  onMouseMove = (e) => {
    this.particles.forEach((particle) => {
      const rect = particle.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        gsap.to(particle, { scale: 2, duration: 0.3 });
      } else {
        gsap.to(particle, { scale: 1, duration: 0.5 });
      }
    });
  }

  destroy() {
    window.removeEventListener("mousemove", this.onMouseMove);
    if (this.layer) this.layer.remove();
    this.particles = [];
  }
}
