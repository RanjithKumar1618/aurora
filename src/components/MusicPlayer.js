
export class MusicPlayer {

    constructor() {

        const BASE = import.meta.env.BASE_URL;


        // =====================================================
        // AUDIO FILES
        // =====================================================

        this.intro = new Audio(`${BASE}music/intro.mp3`);
        this.search = new Audio(`${BASE}music/search.mp3`);
        this.reveal = new Audio(`${BASE}music/reveal.mp3`);
        this.birthday = new Audio(`${BASE}music/birthday.mp3`);


        // =====================================================
        // DEFAULT SETTINGS
        // =====================================================

        this.intro.loop = true;
        this.intro.volume = 0.5;


        this.search.loop = false;
        this.search.volume = 0.7;


        this.reveal.loop = false;
        this.reveal.volume = 0.8;


        this.birthday.loop = false;
        this.birthday.volume = 0.85;


        // Store fade timers
        this.fadeTimers = {};

    }



    // =====================================================
    // GENERIC PLAY
    // =====================================================

    play(audio) {

        if (!audio) return;

        // ensure volume is in valid range before playing
        if (typeof audio.volume === 'number') {
            audio.volume = Math.min(1, Math.max(0, audio.volume));
        }

        try {
            audio.currentTime = 0;
        } catch (e) {
            // ignore if currentTime can't be set yet
        }

        audio.play().catch(error => {
            console.log("Audio play blocked:", error);
        });

    }



    stop(audio) {

        if (!audio) return;

        try {
            audio.pause();
        } catch (e) {}

        try {
            audio.currentTime = 0;
        } catch (e) {}

    }



    // =====================================================
    // INTRO MUSIC
    // =====================================================

    playIntro() {

        this.play(this.intro);

    }


    stopIntro() {

        this.stop(this.intro);

    }



    // =====================================================
    // SEARCH MUSIC
    // =====================================================

    playSearch() {

        this.play(this.search);

    }


    stopSearch() {

        this.stop(this.search);

    }



    // =====================================================
    // PHOTO REVEAL MUSIC
    // =====================================================

    playReveal() {

        this.play(this.reveal);

    }


    stopReveal() {

        this.stop(this.reveal);

    }



    // =====================================================
    // BIRTHDAY MUSIC
    // =====================================================

    playBirthday() {

        this.play(this.birthday);

    }


    stopBirthday() {

        this.stop(this.birthday);

    }



    // =====================================================
    // FADE ENGINE
    // =====================================================

    fade(audio, target, duration = 3, name = "default") {

        if (!audio) return;

        // clear previous fade
        if (this.fadeTimers[name]) {
            clearInterval(this.fadeTimers[name]);
            delete this.fadeTimers[name];
        }

        // clamp target to valid range
        target = Math.min(1, Math.max(0, target));

        const start = Math.min(1, Math.max(0, typeof audio.volume === 'number' ? audio.volume : 0));

        const difference = target - start;

        const steps = 30;
        const stepTime = (duration * 1000) / steps;

        let count = 0;

        this.fadeTimers[name] = setInterval(() => {
            count++;

            const newVol = start + (difference * count / steps);

            // clamp volume each step
            audio.volume = Math.min(1, Math.max(0, newVol));

            if (count >= steps) {
                audio.volume = target;

                clearInterval(this.fadeTimers[name]);
                delete this.fadeTimers[name];

                if (target === 0) {
                    try { audio.pause(); } catch (e) {}
                    try { audio.currentTime = 0; } catch (e) {}
                }
            }
        }, stepTime);

    }



    // =====================================================
    // FADE CONTROLS
    // =====================================================


    fadeOutSearch(seconds = 2){

        this.fade(
            this.search,
            0,
            seconds,
            "search"
        );


    }



    fadeInReveal(seconds = 3){


        this.reveal.volume = 0;


        this.playReveal();


        this.fade(
            this.reveal,
            0.8,
            seconds,
            "reveal"
        );


    }



    fadeOutReveal(seconds = 3){

        this.fade(
            this.reveal,
            0,
            seconds,
            "reveal"
        );

    }



    fadeInBirthday(seconds = 3){


        this.birthday.volume = 0;


        this.playBirthday();


        this.fade(
            this.birthday,
            0.85,
            seconds,
            "birthday"
        );


    }



    fadeOutBirthday(seconds = 3){


        this.fade(
            this.birthday,
            0,
            seconds,
            "birthday"
        );


    }



    // =====================================================
    // CINEMATIC TRANSITIONS
    // =====================================================


    transitionSearchToReveal(){


        this.fadeOutSearch(2);


        setTimeout(()=>{


            this.fadeInReveal(3);


        },1800);


    }



    transitionRevealToBirthday(){


        this.fadeOutReveal(2);


        setTimeout(()=>{


            this.fadeInBirthday(3);


        },1800);


    }



    // =====================================================
    // VOLUME CONTROL
    // =====================================================

    setIntroVolume(value){

        this.intro.volume = value;

    }


    setSearchVolume(value){

        this.search.volume = value;

    }


    setRevealVolume(value){

        this.reveal.volume = value;

    }


    setBirthdayVolume(value){

        this.birthday.volume = value;

    }



    // =====================================================
    // EVENTS
    // =====================================================

    onRevealEnd(callback){

        this.reveal.onended = callback;

    }



    onBirthdayEnd(callback){

        this.birthday.onended = callback;

    }


}

