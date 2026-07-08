export class MusicPlayer {

    constructor() {

        // =====================================================
        // INTRO MUSIC
        // =====================================================

        this.intro = new Audio("/music/intro.mp3");
        this.intro.loop = true;
        this.intro.volume = 0.5;

        // =====================================================
        // SEARCH MUSIC
        // =====================================================

        this.search = new Audio("/music/search.mp3");
        this.search.loop = false;
        this.search.volume = 0.7;

        // =====================================================
        // PHOTO REVEAL MUSIC
        // =====================================================

        this.reveal = new Audio("/music/reveal.mp3");
        this.reveal.loop = false;
        this.reveal.volume = 0.8;

        // =====================================================
        // BIRTHDAY MUSIC
        // =====================================================

        this.birthday = new Audio("/music/birthday.mp3");
        this.birthday.loop = false;
        this.birthday.volume = 0.85;

    }

    // =====================================================
    // INTRO
    // =====================================================

    playIntro() {

        this.intro.currentTime = 0;

        this.intro.play().catch(err => {

            console.log("Intro Music:", err);

        });

    }

    stopIntro() {

        this.intro.pause();

        this.intro.currentTime = 0;

    }

    // =====================================================
    // SEARCH
    // =====================================================

    playSearch() {

        this.search.currentTime = 0;

        this.search.play().catch(err => {

            console.log("Search Music:", err);

        });

    }

    stopSearch() {

        this.search.pause();

        this.search.currentTime = 0;

    }

    fadeOutSearch(seconds = 2) {

        let volume = this.search.volume;

        const step = 0.05;

        const timer = setInterval(() => {

            volume -= step;

            this.search.volume = Math.max(volume, 0);

            if (volume <= 0) {

                clearInterval(timer);

                this.stopSearch();

                this.search.volume = 0.7;

            }

        }, (seconds * 1000) / (0.7 / step));

    }

    // =====================================================
    // PHOTO REVEAL
    // =====================================================

    playReveal() {

        this.reveal.currentTime = 0;

        this.reveal.play().catch(err => {

            console.log("Reveal Music:", err);

        });

    }

    stopReveal() {

        this.reveal.pause();

        this.reveal.currentTime = 0;

    }

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

    fadeOutReveal(seconds = 3) {

        let volume = this.reveal.volume;

        const step = 0.05;

        const timer = setInterval(() => {

            volume -= step;

            this.reveal.volume = Math.max(volume, 0);

            if (volume <= 0) {

                clearInterval(timer);

                this.stopReveal();

                this.reveal.volume = 0.8;

            }

        }, (seconds * 1000) / (0.8 / step));

    }

    // =====================================================
    // BIRTHDAY
    // =====================================================

    playBirthday() {

        this.birthday.currentTime = 0;

        this.birthday.play().catch(err => {

            console.log("Birthday Music:", err);

        });

    }

    stopBirthday() {

        this.birthday.pause();

        this.birthday.currentTime = 0;

    }

    fadeInBirthday(seconds = 3) {

        this.birthday.volume = 0;

        this.playBirthday();

        let volume = 0;

        const step = 0.05;

        const timer = setInterval(() => {

            volume += step;

            this.birthday.volume = Math.min(volume, 0.85);

            if (volume >= 0.85) {

                clearInterval(timer);

            }

        }, (seconds * 1000) / (0.85 / step));

    }

    fadeOutBirthday(seconds = 3) {

        let volume = this.birthday.volume;

        const step = 0.05;

        const timer = setInterval(() => {

            volume -= step;

            this.birthday.volume = Math.max(volume, 0);

            if (volume <= 0) {

                clearInterval(timer);

                this.stopBirthday();

                this.birthday.volume = 0.85;

            }

        }, (seconds * 1000) / (0.85 / step));

    }

    // =====================================================
    // VOLUME CONTROLS
    // =====================================================

    setIntroVolume(volume) {

        this.intro.volume = volume;

    }

    setSearchVolume(volume) {

        this.search.volume = volume;

    }

    setRevealVolume(volume) {

        this.reveal.volume = volume;

    }

    setBirthdayVolume(volume) {

        this.birthday.volume = volume;

    }

    // =====================================================
    // SONG END EVENTS
    // =====================================================

    onRevealEnd(callback) {

        this.reveal.onended = callback;

    }

    onBirthdayEnd(callback) {

        this.birthday.onended = callback;

    }

}