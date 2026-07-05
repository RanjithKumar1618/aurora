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

            console.log(
                "Playing Scene:",
                scene.constructor.name
            );

            await scene.play();

            this.currentScene++;

        }

        console.log("Aurora Journey Complete ❤️");

    }

    reset() {

        this.currentScene = 0;

        this.isRunning = false;

    }

}