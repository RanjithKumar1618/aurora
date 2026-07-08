import { gsap } from "gsap";
import { MusicPlayer } from "../components/MusicPlayer";
import { ParticleBackground } from "../components/ParticleBackground";
import { MusicVisualizer } from "../components/MusicVisualizer";
import { PhotoFrame } from "../components/PhotoFrame";

export class PhotoScene {
  async play() {
    return new Promise((resolve) => {
      const music = new MusicPlayer();
      const BASE = import.meta.env.BASE_URL;

      document.body.innerHTML = `
      <div id="photo-scene">
        <div id="photo-bg-glow"></div>
        <div id="photo-light"></div>
        <div id="photo-container">
          <div id="frame-holder"></div>
          <div id="visualizer"></div>
        </div>
        <div id="aurora-layer"></div>
        <div id="heart-layer"></div>
        <div id="star-layer"></div>
        <div id="reveal-star"></div>
      </div>`;

      const particles = new ParticleBackground(document.getElementById("photo-scene"), 220);
      particles.create();

      const frame = new PhotoFrame(document.getElementById("frame-holder"));
      const visualizer = new MusicVisualizer(document.getElementById("visualizer"), 64);
visualizer.setColorMode("random"); // this activates rainbow colors
visualizer.start();

      music.fadeInReveal(2);

      const photos = [
        `${BASE}photos/1.jpg`, `${BASE}photos/2.jpg`, `${BASE}photos/3.jpg`,
        `${BASE}photos/4.jpg`, `${BASE}photos/5.jpg`, `${BASE}photos/6.jpg`,
        `${BASE}photos/7.jpg`
      ];

      const frameStyles = ["love-frame","neon-frame","vintage-frame","crystal-frame","galaxy-frame"];
      const exitStyles = ["fade-white","fade-black","rotate-out","zoom-blur","slide-away"];

      let current = 0;
      const duration = 7000;

      // 🌟 Small blinking stars
      function spawnBlinkingStars() {
        const layer = document.getElementById("star-layer");
        for (let i = 0; i < 30; i++) {
          const s = document.createElement("div");
          s.innerHTML = "✶";
          s.style.position = "fixed";
          s.style.left = Math.random() * window.innerWidth + "px";
          s.style.top = Math.random() * window.innerHeight + "px";
          s.style.fontSize = (Math.random() * 20 + 10) + "px";
          s.style.color = "white";
          s.style.opacity = 0;
          layer.appendChild(s);

          gsap.to(s, {
            opacity: 1,
            duration: 0.5,
            yoyo: true,
            repeat: -1,
            delay: Math.random() * 2
          });
        }
      }

      const heartBurst = () => {
        const layer = document.getElementById("heart-layer");
        for (let i = 0; i < 20; i++) {
          const h = document.createElement("div");
          h.innerHTML = "❤";
          h.style.position = "fixed";
          h.style.left = (window.innerWidth / 2) + "px";
          h.style.top = (window.innerHeight / 2) + "px";
          layer.appendChild(h);
          gsap.to(h, {
            x: (Math.random() - 0.5) * 500,
            y: (Math.random() - 0.5) * 500,
            opacity: 0,
            rotation: Math.random() * 720,
            duration: 2,
            onComplete: () => h.remove()
          });
        }
      };

      function revealPhoto() {
        if (current >= photos.length) { finishScene(); return; }

        const style = frameStyles[current % frameStyles.length];
        frame.create(style);
        frame.setImage(photos[current]);
        heartBurst();
        frame.shine();

        gsap.fromTo("#photo-frame",
          { scale: .05, opacity: 0, filter: "brightness(5) blur(10px)" },
          { scale: 1, opacity: 1, filter: "brightness(1) blur(0px)", duration: 2, ease: "power4.out" }
        );

        gsap.to("#photo-light", {
          opacity: .6,
          repeat: 1,
          yoyo: true,
          duration: 1.2
        });

        // Exit animation style
        const exitStyle = exitStyles[current % exitStyles.length];
        setTimeout(() => {
          switch(exitStyle) {
            case "fade-white":
              gsap.to("#photo-frame",{ opacity:0, scale:.9, backgroundColor:"white", duration:1 });
              break;
            case "fade-black":
              gsap.to("#photo-frame",{ opacity:0, scale:.9, backgroundColor:"black", duration:1 });
              break;
            case "rotate-out":
              gsap.to("#photo-frame",{ opacity:0, rotation:90, scale:.5, duration:1 });
              break;
            case "zoom-blur":
              gsap.to("#photo-frame",{ opacity:0, scale:2, filter:"blur(20px)", duration:1 });
              break;
            case "slide-away":
              gsap.to("#photo-frame",{ opacity:0, x:500, duration:1 });
              break;
          }
        }, duration - 1000);

        current++;
        setTimeout(revealPhoto, duration);
      }

      function finishScene() {
        visualizer.stop();
        particles.destroy();
        music.fadeOutReveal(2);

        gsap.to("#star-layer", { opacity: 0, duration: 2 });

        gsap.to("#photo-scene", {
          opacity: 0,
          duration: 2,
          onComplete: () => {
            document.body.innerHTML = "";
            resolve();
          }
        });
      }

      // ✶ Big star reveal faster + blinking stars
      gsap.fromTo("#reveal-star",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            gsap.to("#reveal-star", {
              scale: 6,
              duration: 1.2,
              ease: "power3.out",
              onComplete: () => {
                gsap.to("#reveal-star", {
                  scale: 25,
                  opacity: 0,
                  duration: 2,
                  ease: "power4.out",
                  onStart: () => {
                    spawnBlinkingStars(); // ✶ spawn when MATCH FOUND
                  },
                  onComplete: revealPhoto
                });
              }
            });
          }
        }
      );
    });
  }
}
