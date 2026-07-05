import { gsap } from "gsap";

export class SearchScene {

    async play() {

        return new Promise((resolve) => {

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

            const status = document.getElementById("scan-status");
            const percent = document.getElementById("percentage");

            gsap.to("#progress-fill",{

                width:"100%",

                duration:10,

                ease:"none"

            });

            gsap.to({},{

                duration:10,

                onUpdate:function(){

                    percent.innerHTML =
                        Math.floor(this.progress()*100)+"%";

                }

            });

            gsap.to("#scanner-line",{

                rotation:360,

                repeat:-1,

                duration:2,

                ease:"none",

                transformOrigin:"50% 100%"

            });

            const messages=[

                "Searching Asia...",

                "Searching Europe...",

                "Searching America...",

                "Searching Africa...",

                "Searching Australia...",

                "Scanning Millions Of Hearts...",

                "Analyzing Smile...",

                "Analyzing Kindness...",

                "MATCH FOUND ❤️"

            ];

            let i=0;

            const timer=setInterval(()=>{

                status.innerHTML=messages[i];

                i++;

                if(i>=messages.length){

                    clearInterval(timer);

                }

            },1100);

            setTimeout(()=>{

                gsap.to("#search-screen",{

                    opacity:0,

                    duration:2,

                    onComplete:()=>{

                        document.body.innerHTML="";

                        resolve();

                    }

                });

            },11000);

        });

    }

}