import { gsap } from "gsap";

export class MusicVisualizer {
  constructor(container, bars = 64) {
    this.container = container;
    this.barCount = bars;
    this.items = [];
    this.timer = null;
    this.colorMode = "single"; // default
  }

  setColorMode(mode) {
    this.colorMode = mode; // "single" or "random"
  }

  start() {
    this.container.innerHTML = "";
    this.container.id = "music-visualizer";

    for (let i = 0; i < this.barCount; i++) {
      const bar = document.createElement("div");
      bar.className = "music-bar";
      bar.style.height = "12px";
      bar.style.backgroundColor = "#ffcc00"; // default
      this.container.appendChild(bar);
      this.items.push(bar);
    }

    this.animate();
  }

  animate() {
    const colors = [
      "#ff0000", "#00ff00", "#0000ff",
      "#ffff00", "#ff00ff", "#00ffff",
      "#ff8800", "#00ffaa"
    ];

    this.timer = setInterval(() => {
      this.items.forEach((bar, index) => {
        const h = 10 + Math.random() * 90;

        let color = "#ffcc00";
        if (this.colorMode === "random") {
          color = colors[Math.floor(Math.random() * colors.length)];
        }

        gsap.to(bar, {
          height: h,
          backgroundColor: color,
          duration: 0.25,
          ease: "power1.out",
          delay: index * 0.003
        });
      });
    }, 180);
  }

  pulse() {
    gsap.fromTo("#music-visualizer",
      { scale: 0.95 },
      { scale: 1.02, duration: .35, repeat: 1, yoyo: true }
    );
  }

  stop() {
    clearInterval(this.timer);
    this.items.forEach(bar => {
      gsap.to(bar, {
        height: 10,
        backgroundColor: "#ffcc00",
        duration: .5
      });
    });
  }
}
