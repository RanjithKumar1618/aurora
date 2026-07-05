import { gsap } from "gsap";

export class PhotoFrame {

    constructor(container) {

        this.container = container;
        this.photo = null;
        this.shineLayer = null;

    }

    create() {

        this.container.innerHTML = `

        <div id="photo-frame">

            <div id="frame-glow"></div>

            <div id="frame-border">

                <img id="frame-photo" src="" />

                <div id="frame-shine"></div>

            </div>

        </div>

        `;

        this.photo = document.getElementById("frame-photo");

        this.shineLayer = document.getElementById("frame-shine");

        gsap.to("#frame-glow",{

            scale:1.08,

            opacity:.9,

            repeat:-1,

            yoyo:true,

            duration:2,

            ease:"sine.inOut"

        });

    }

    setImage(src){

        this.photo.src = src;

    }

    shine(){

        gsap.set(this.shineLayer,{

            x:-500,

            opacity:0

        });

        gsap.to(this.shineLayer,{

            opacity:.9,

            duration:.2

        });

        gsap.to(this.shineLayer,{

            x:700,

            duration:1.8,

            ease:"power2.out",

            onComplete:()=>{

                gsap.set(this.shineLayer,{

                    opacity:0,

                    x:-500

                });

            }

        });

    }

}