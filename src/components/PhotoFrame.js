import { gsap } from "gsap";

export class PhotoFrame {
    constructor(container) {
        this.container = container;
        this.photo = null;
        this.shineLayer = null;
    }

    // Pass a style type when creating
    create(styleType = "default-frame") {
        this.container.innerHTML = `
        <div id="photo-frame" class="${styleType}">
            <img id="frame-photo" src="" />
            <div id="frame-shine"></div>
        </div>
        `;

        this.photo = document.getElementById("frame-photo");
        this.shineLayer = document.getElementById("frame-shine");
    }

    setImage(src) {
        this.photo.src = src;
    }

    shine() {
        gsap.set(this.shineLayer, { x: -500, opacity: 0 });
        gsap.to(this.shineLayer, { opacity: .9, duration: .2 });
        gsap.to(this.shineLayer, {
            x: 700,
            duration: 1.8,
            ease: "power2.out",
            onComplete: () => {
                gsap.set(this.shineLayer, { opacity: 0, x: -500 });
            }
        });
    }
}
