import { gsap } from "gsap";
import { MusicPlayer } from "../components/MusicPlayer";

export class BootScene {

    async play() {

        return new Promise((resolve) => {

            const music = new MusicPlayer();

            document.body.innerHTML = `

            <div id="boot-screen">

                <div id="boot-panel">

                    <div id="boot-title">
                        AURORA AI
                    </div>

                    <div id="terminal"></div>

                    <div id="progress">

                        <div id="progress-fill"></div>

                    </div>

                    <div id="percent">

                        0%

                    </div>

                    <button id="beginBtn">

                        CLICK TO BEGIN

                    </button>

                </div>

            </div>

            `;

            const btn = document.getElementById("beginBtn");
            const terminal = document.getElementById("terminal");
            const progress = document.getElementById("progress-fill");
            const percent = document.getElementById("percent");

            btn.onclick = () => {

                btn.remove();

                music.playIntro();

                const lines = [

                    "Aurora AI v2.0",
                    "",
                    "Initializing Neural Engine...",
                    "Loading Emotional Intelligence...",
                    "Connecting to Universe...",
                    "Searching 8,000,000,000 Humans...",
                    "",
                    "Analyzing Smile...",
                    "Analyzing Kindness...",
                    "Analyzing Heart...",
                    "",
                    "ONE SOUL FOUND ❤️"

                ];

                let index = 0;

                function typeNext() {

                    if (index >= lines.length) {

                        finishBoot();

                        return;

                    }

                    const line = document.createElement("div");

                    terminal.appendChild(line);

                    let i = 0;

                    const text = lines[index];

                    const timer = setInterval(() => {

                        line.innerHTML += text.charAt(i);

                        i++;

                        if (i > text.length) {

                            clearInterval(timer);

                            index++;

                            setTimeout(typeNext,250);

                        }

                    },35);

                }

                typeNext();

                gsap.to(progress,{

                    width:"100%",

                    duration:8,

                    ease:"none"

                });

                gsap.to({},{

                    duration:8,

                    onUpdate:function(){

                        percent.innerHTML =
                        Math.floor(this.progress()*100)+"%";

                    }

                });

            };

            function finishBoot(){

                setTimeout(()=>{

                    music.stopIntro();

                    gsap.to("#boot-screen",{

                        opacity:0,

                        duration:2,

                        onComplete:()=>{

                            document.body.innerHTML="";

                            resolve();

                        }

                    });

                },1500);

            }

        });

    }

}