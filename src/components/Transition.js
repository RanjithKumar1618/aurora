import { gsap } from "gsap";

export class Transition {

    constructor() {

        this.overlay = document.createElement("div");

        this.overlay.id = "transition-overlay";

        document.body.appendChild(this.overlay);

    }

    fadeToBlack() {

        return new Promise((resolve) => {

            gsap.to(this.overlay, {

                opacity: 1,

                duration: 0.8,

                ease: "power2.inOut",

                onComplete: resolve

            });

        });

    }

    fadeFromBlack() {

        return new Promise((resolve) => {

            gsap.to(this.overlay, {

                opacity: 0,

                duration: 0.8,

                ease: "power2.inOut",

                onComplete: resolve

            });

        });

    }

    whiteFlash() {

        return new Promise((resolve) => {

            this.overlay.style.background = "#ffffff";

            gsap.fromTo(
                this.overlay,
                {
                    opacity: 0
                },
                {
                    opacity: 1,
                    duration: 0.15,
                    yoyo: true,
                    repeat: 1,
                    onComplete: () => {

                        this.overlay.style.background = "#000000";

                        resolve();

                    }
                }
            );

        });

    }

}