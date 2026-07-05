export class MusicPlayer {

    constructor() {

        // Intro Music (Boot Scene)
        this.intro = new Audio("/music/intro.mp3");
        this.intro.loop = true;
        this.intro.volume = 0.5;

        // Reveal Music (Photo Scene)
        this.reveal = new Audio("/music/reveal.mp3");
        this.reveal.loop = false;
        this.reveal.volume = 0.8;

    }

    // --------------------------
    // INTRO MUSIC
    // --------------------------

    playIntro() {

        this.intro.currentTime = 0;

        this.intro.play().catch(err => {

            console.log("Intro music blocked:", err);

        });

    }

    stopIntro() {

        this.intro.pause();

        this.intro.currentTime = 0;

    }

    // --------------------------
    // REVEAL MUSIC
    // --------------------------

    playReveal() {

        this.reveal.currentTime = 0;

        this.reveal.play().catch(err => {

            console.log("Reveal music blocked:", err);

        });

    }

    stopReveal() {

        this.reveal.pause();

        this.reveal.currentTime = 0;

    }

    // --------------------------
    // VOLUME
    // --------------------------

    setIntroVolume(volume) {

        this.intro.volume = volume;

    }

    setRevealVolume(volume) {

        this.reveal.volume = volume;

    }

    // --------------------------
    // FADE IN
    // --------------------------

    fadeInReveal(seconds = 3) {

        this.reveal.volume = 0;

        this.playReveal();

        let volume = 0;

        const step = 0.05;

        const timer = setInterval(() => {

            volume += step;

            this.reveal.volume = Math.min(volume, 0.8);

            if (volume >= 0.8) {

                clearInterval(timer);

            }

        }, (seconds * 1000) / (0.8 / step));

    }

    // --------------------------
    // FADE OUT
    // --------------------------

    fadeOutReveal(seconds = 3) {

        let volume = this.reveal.volume;

        const step = 0.05;

        const timer = setInterval(() => {

            volume -= step;

            this.reveal.volume = Math.max(volume, 0);

            if (volume <= 0) {

                clearInterval(timer);

                this.stopReveal();

            }

        }, (seconds * 1000) / (0.8 / step));

    }

    // --------------------------
    // SONG END EVENT
    // --------------------------

    onRevealEnd(callback) {

        this.reveal.onended = callback;

    }

}