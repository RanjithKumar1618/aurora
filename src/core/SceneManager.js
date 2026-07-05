import { gsap } from "gsap";

export class SceneManager {

    static async fadeOut(element, duration = 1) {

        return new Promise(resolve => {

            gsap.to(element, {

                opacity: 0,

                duration,

                ease: "power2.inOut",

                onComplete: resolve

            });

        });

    }

    static async fadeIn(element, duration = 1) {

        return new Promise(resolve => {

            gsap.fromTo(

                element,

                {

                    opacity: 0

                },

                {

                    opacity: 1,

                    duration,

                    ease: "power2.inOut",

                    onComplete: resolve

                }

            );

        });

    }

    static async zoomIn(element) {

        return new Promise(resolve => {

            gsap.fromTo(

                element,

                {

                    scale: 0.8,

                    opacity: 0

                },

                {

                    scale: 1,

                    opacity: 1,

                    duration: 1.2,

                    ease: "back.out(1.7)",

                    onComplete: resolve

                }

            );

        });

    }

}