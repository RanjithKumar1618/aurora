import { SceneController } from "./core/SceneController";

import { BootScene } from "./scenes/BootScene";
import { SearchScene } from "./scenes/SearchScene";
import { PhotoScene } from "./scenes/PhotoScene";
import { BirthdayScene } from "./scenes/BirthdayScene";

export class App {

    constructor() {

        this.controller = new SceneController();

    }

    async start() {

        this.controller.add(new BootScene());

        this.controller.add(new SearchScene());

        this.controller.add(new PhotoScene());

        this.controller.add(new BirthdayScene());

        await this.controller.start();

    }

}