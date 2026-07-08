import { gsap } from "gsap";
import { MusicPlayer } from "../components/MusicPlayer";

export class SearchScene {

    async play() {

        return new Promise((resolve) => {

            // -------------------------
            // Search Music
            // -------------------------

            const music = new MusicPlayer();

            music.playSearch();

            document.body.innerHTML = `
            <div id="search-screen">

                <div id="scan-title">
                    AI GLOBAL SEARCH
                </div>

                <div id="scanner">
                    <div id="scanner-ring"></div>
                    <div id="scanner-core"></div>
                    <div id="scanner-line"></div>
                </div>

                <div id="scan-status">
                    Searching Across Earth...
                </div>

                <div id="progress">
                    <div id="progress-fill"></div>
                </div>

                <div id="percentage">
                    0%
                </div>

            </div>
            `;

            const style = document.createElement("style");

            style.innerHTML = `

            body{

                background:black;

            }

            #flash{

                position:fixed;

                inset:0;

                background:white;

                opacity:0;

                pointer-events:none;

                z-index:10000;

            }

            `;

            document.head.appendChild(style);

            const status = document.getElementById("scan-status");

            const percent = document.getElementById("percentage");

            //-----------------------
            // Progress
            //-----------------------

            gsap.to("#progress-fill",{

                width:"100%",

                duration:10,

                ease:"none"

            });

            gsap.to({},{

                duration:10,

                onUpdate:function(){

                    percent.innerHTML=

                        Math.floor(

                            this.progress()*100

                        )+"%";

                }

            });

            //-----------------------
            // Scanner
            //-----------------------

            const scannerTween = gsap.to(

                "#scanner-line",

                {

                    rotation:360,

                    repeat:-1,

                    duration:2,

                    ease:"none",

                    transformOrigin:"50% 100%"

                }

            );

            //-----------------------
            // Messages
            //-----------------------
            const messages = [

    "> Connecting To Global Satellite Network...",

    "✔ Connection Established",

    "> Facial Recognition Engine Loading...",

    "█ █ █ █ █ █ █ █ █ █ █ █ █ █ 100%",

    "> AI Neural Match...",

    "Analyzing 8,942,351 Profiles...",

    "> Confidence Level",

    "99.99998%",

    "IDENTITY CONFIRMED ❤️",

    "",

    "TARGET REACHED ...",
    

];

let index = 0;

const timer = setInterval(() => {

    status.style.opacity = 0;

    gsap.to(status, {

        opacity: 1,

        duration: 0.50

    });

    status.innerHTML = messages[index];

    //------------------------
    // Progress Bar Sync
    //------------------------

    const progress = Math.min(

        ((index + 1) / messages.length) * 100,

        100

    );

    gsap.to("#progress-fill", {

        width: progress + "%",

        duration: 0.8,

        ease: "power2.out"

    });

    percent.innerHTML = Math.floor(progress) + "%";

    //------------------------
    // Final Stage
    //------------------------

    if (messages[index] === "TARGET REACHED ...") {

        clearInterval(timer);

        scannerTween.pause();

        music.fadeOutSearch(2);

        gsap.to("#scan-status", {

            color: "#00ff88",

            textShadow: "0 0 25px #00ff88",

            duration: 0.5

        });

        setTimeout(() => {

            finishSearch(resolve);

        }, 1800);

    }

    index++;

}, 1200);



        });

    }

}

//----------------------------------------------------
// Transition
//----------------------------------------------------

function finishSearch(resolve){

    gsap.to(

        "#search-screen",

        {

            opacity:0,

            duration:1.5,

            ease:"power2.out",

            onComplete:()=>{

                photoSceneReveal(resolve);

            }

        }

    );

}

//----------------------------------------------------
// Photo Reveal
//----------------------------------------------------

function photoSceneReveal(resolve){

    document.body.innerHTML=`

        <div id="photo-scene"></div>

    `;

    const style=document.createElement("style");

    style.innerHTML=`

        body{

            background:black;

        }

        #photo{

            position:fixed;

            left:50%;

            top:50%;

            transform:

                translate(-50%,-50%)

                scale(.05);

            opacity:0;

            filter:

                blur(20px)

                brightness(2);

        }

    `;

    document.head.appendChild(style);

    gsap.to(

        "#photo",

        {

            scale:1,

            opacity:1,

            filter:

                "blur(0px) brightness(1)",

            duration:3,

            ease:"power3.out",

            onComplete:resolve

        }

    );

}