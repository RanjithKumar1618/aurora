import { SceneManager } from "../components/SceneManager";

export class SceneController {
  constructor() {
    this.scenes = [];
    this.currentScene = 0;
    this.isRunning = false;
  }

  add(scene) {
    this.scenes.push(scene);
  }

  async start() {
    if (this.isRunning) return;
    this.isRunning = true;

    while (this.currentScene < this.scenes.length) {
      const scene = this.scenes[this.currentScene];
      console.log("🎬 Playing Scene:", scene.constructor.name);

      // Get the scene container (each scene should have a root element)
      const container = document.getElementById(scene.rootId || "photo-scene");

      // Fade in scene container
      if (container) await SceneManager.fadeIn(container, 1.2);

      // Play the scene
      await scene.play();

      // Fade out scene container
      if (container) await SceneManager.fadeOut(container, 1.2);

      this.currentScene++;
    }

    console.log("🌌 Aurora Journey Complete ❤️");
    this.isRunning = false;
  }

  reset() {
    this.currentScene = 0;
    this.isRunning = false;
  }
}
