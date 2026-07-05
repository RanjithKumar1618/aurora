import { gsap } from "gsap";
import { MusicPlayer } from "../components/MusicPlayer";
import { ParticleBackground } from "../components/ParticleBackground";
import { MusicVisualizer } from "../components/MusicVisualizer";
import { PhotoFrame } from "../components/PhotoFrame";

export class PhotoScene {

    async play() {

        return new Promise((resolve) => {

            const music = new MusicPlayer();

            document.body.innerHTML = `

            <div id="photo-scene">

                <div id="photo-bg-glow"></div>

                <div id="photo-light"></div>

                <div id="photo-container">

                    <div id="frame-holder"></div>

                    <div id="visualizer"></div>

                </div>

            </div>

            `;

            //-------------------------
            // Background Particles
            //-------------------------

            const particles = new ParticleBackground(

                document.getElementById("photo-scene"),

                220

            );

            particles.create();

            //-------------------------
            // Premium Photo Frame
            //-------------------------

            const frame = new PhotoFrame(

                document.getElementById("frame-holder")

            );

            frame.create();

            //-------------------------
            // Music Visualizer
            //-------------------------

            const visualizer = new MusicVisualizer(

                document.getElementById("visualizer"),

                64

            );

            visualizer.start();

            //-------------------------
            // Music
            //-------------------------

            music.fadeInReveal(2);

            //-------------------------
            // Photos
            //-------------------------

            const photos = [

                "/photos/1.jpg",
                "/photos/2.jpg",
                "/photos/3.jpg",
                "/photos/4.jpg",
                "/photos/5.jpg",
                "/photos/6.jpg",
                "/photos/7.jpg"

            ];

            let current = 0;

            const duration = 7000;

            function revealPhoto() {

                if (current >= photos.length) {

                    finishScene();

                    return;

                }

                frame.setImage(

                    photos[current]

                );

                //-------------------------
                // Initial Reveal
                //-------------------------

                gsap.fromTo(

                    "#photo-frame",

                    {

                        scale:0.65,

                        opacity:0,

                        rotation:-4

                    },

                    {

                        scale:1,

                        opacity:1,

                        rotation:0,

                        duration:2,

                        ease:"power3.out"

                    }

                );

                //-------------------------
                // Background Light Pulse
                //-------------------------

                gsap.fromTo(

                    "#photo-light",

                    {

                        opacity:0

                    },

                    {

                        opacity:.55,

                        repeat:1,

                        yoyo:true,

                        duration:1.5

                    }

                );

                //-------------------------
                // Slow Camera Zoom
                //-------------------------

                gsap.to(

                    "#photo-frame",

                    {

                        scale:1.08,

                        duration:duration/1000,

                        ease:"none"

                    }

                );

                //-------------------------
                // Floating Motion
                //-------------------------

                gsap.to(

                    "#photo-frame",

                    {

                        y:-12,

                        repeat:-1,

                        yoyo:true,

                        duration:3,

                        ease:"sine.inOut"

                    }

                );

                //-------------------------
                // Light Sweep
                //-------------------------

                frame.shine();

                //-------------------------
                // Fade Out
                //-------------------------

                setTimeout(()=>{

                    gsap.to(

                        "#photo-frame",

                        {

                            opacity:0,

                            scale:.92,

                            duration:1

                        }

                    );

                },duration-1000);

                current++;

                setTimeout(

                    revealPhoto,

                    duration

                );

            }
                        function finishScene() {

                visualizer.stop();

                particles.destroy();

                music.fadeOutReveal(2);

                gsap.to(

                    "#photo-scene",

                    {

                        opacity:0,

                        duration:2,

                        onComplete:()=>{

                            document.body.innerHTML="";

                            resolve();

                        }

                    }

                );

            }

            //-------------------------
            // Scene Intro
            //-------------------------

            gsap.fromTo(

                "#photo-scene",

                {

                    opacity:0

                },

                {

                    opacity:1,

                    duration:2,

                    onComplete:()=>{

                        revealPhoto();

                    }

                }

            );

        });

    }

}