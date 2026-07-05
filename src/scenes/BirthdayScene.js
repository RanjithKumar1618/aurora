import { gsap } from "gsap";

import { ParticleBackground } from "../components/ParticleBackground";
import { Confetti } from "../components/Confetti";
import { TypeWriter } from "../components/TypeWriter";

export class BirthdayScene {

    async play() {

        return new Promise(async (resolve) => {
document.body.innerHTML = `

<div id="birthday-scene">

    <div id="birthday-content">

        <div id="birthday-glow"></div>

        <h1 id="title">
            Happy Birthday
        </h1>

        <h2 id="person">
            Gayathri Praharshitha
        </h2>

        <div id="letter"></div>

        <button id="replay">
            Replay Journey
        </button>

    </div>

</div>

`;
            //-----------------------------
            // Background Particles
            //-----------------------------
            const particles = new ParticleBackground(
                document.getElementById("birthday-scene"),
                220
            );
            particles.create();
            //-----------------------------
            // Confetti
            //-----------------------------
            const confetti = new Confetti(
                document.getElementById("birthday-scene")
            );
            confetti.start();
            //-----------------------------
            // Intro Animation
            //-----------------------------
            gsap.from("#title",{
                y:50,
                opacity:0,
                duration:1.5
            });

            gsap.from("#person",{

                scale:0.5,

                opacity:0,

                delay:0.6,

                duration:1.2

            });

            //-----------------------------
            // Letter
            //-----------------------------

            const writer = new TypeWriter(
                document.getElementById("letter"),
                15
            );

            await writer.write(

`Some people simply exist...
Some people become unforgettable.
May every smile you share return to you a thousand times.
May every dream waiting in your heart find its way to reality.
Keep shining,
keep smiling,
Happy Birthday.
Have a beautiful year ahead. ❤️`

            );

            //-----------------------------
            // Replay Button
            //-----------------------------
            gsap.from("#replay",{
                opacity:0,
                y:15,
                duration:1,
                delay:.5

            });
            document
                .getElementById("replay")
                .onclick = () => {

                location.reload();

            };

            resolve();

        });

    }

}