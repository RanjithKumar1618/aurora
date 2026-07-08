import { gsap } from "gsap";
import { MusicPlayer } from "../components/MusicPlayer";

export class BirthdayScene {

    async play() {

        return new Promise((resolve) => {

            const music = new MusicPlayer();
            const activeIntervals = [];
            const activeTimeouts = [];
            const activeTweens = [];
            const activeRafIds = [];

            let settled = false;
            let scene = null;
            let glow = null;
            let content = null;
            let line1 = null;
            let line2 = null;
            let line3 = null;
            let line4 = null;
            let line5 = null;
            let happy = null;
            let blessing = null;
            let signature = null;

            const registerTimeout = (callback, delay) => {

                const id = window.setTimeout(() => {

                    activeTimeouts.splice(activeTimeouts.indexOf(id), 1);
                    callback();

                }, delay);

                activeTimeouts.push(id);
                return id;

            };

            const registerInterval = (callback, delay) => {

                const id = window.setInterval(callback, delay);
                activeIntervals.push(id);
                return id;

            };

            const registerRaf = (callback) => {

                const id = window.requestAnimationFrame(callback);
                activeRafIds.push(id);
                return id;

            };

            const cleanup = () => {

                activeIntervals.forEach((id) => window.clearInterval(id));
                activeTimeouts.forEach((id) => window.clearTimeout(id));
                activeRafIds.forEach((id) => window.cancelAnimationFrame(id));
                activeTweens.forEach((tween) => tween.kill && tween.kill());

                if (scene && glow && content && line1 && line2 && line3 && line4 && line5 && happy && blessing && signature) {

                    gsap.killTweensOf([line1, line2, line3, line4, line5, happy, blessing, signature, glow, content, scene]);

                }

            };

            const finish = () => {

                if (settled) return;

                settled = true;
                cleanup();
                resolve();

            };

            music.playBirthday();
            music.birthday.volume = 0.2;

            document.body.innerHTML = `

            <div id="birthday-scene">

                <div id="aurora"></div>
                <div id="stars"></div>
                <div id="confetti-layer"></div>
                <div id="glow"></div>
                <div id="overlay"></div>

                <div id="content">

                    <div id="line1" class="message-line"></div>
                    <div id="line2" class="message-line"></div>
                    <div id="line3" class="message-line"></div>
                    <div id="line4" class="message-line"></div>
                    <div id="line5" class="message-line"></div>

                    <div id="happy"></div>
                    <div id="blessing"></div>
                    <div id="signature"></div>

                </div>

            </div>

            `;

            const style = document.createElement("style");

            style.textContent = `

html, body, #birthday-scene {
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #03050d;
    color: white;
    font-family: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif;
}

body {
    background: linear-gradient(135deg, #040814 0%, #100b22 25%, #0b1d31 60%, #180915 100%);
    background-size: 220% 220%;
    animation: backgroundShift 14s ease-in-out infinite alternate;
}

@keyframes backgroundShift {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
}

#birthday-scene {
    position: fixed;
    inset: 0;
    isolation: isolate;
    background: transparent;
}

#aurora {
    position: absolute;
    inset: -25%;
    background:
        radial-gradient(circle at 20% 25%, rgba(0, 212, 255, 0.32), transparent 32%),
        radial-gradient(circle at 80% 30%, rgba(139, 92, 246, 0.25), transparent 36%),
        radial-gradient(circle at 50% 85%, rgba(0, 255, 170, 0.22), transparent 38%);
    filter: blur(140px);
    animation: auroraMove 20s linear infinite;
}

@keyframes auroraMove {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.18); }
    100% { transform: rotate(360deg) scale(1); }
}

#stars,
#confetti-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.star,
.particle,
.shooting-star {
    position: absolute;
}

.star {
    color: white;
    font-size: 14px;
    text-shadow: 0 0 12px rgba(255,255,255,0.55);
}

.particle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    box-shadow: 0 0 10px rgba(255,255,255,0.75);
    animation: floatParticle 7s ease-in-out infinite;
}

@keyframes floatParticle {
    0%, 100% { transform: translateY(0) scale(1); opacity: 0.25; }
    50% { transform: translateY(-18px) scale(1.2); opacity: 0.9; }
}

.shooting-star {
    width: 140px;
    height: 2px;
    background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.95));
    filter: blur(0.5px);
    transform: rotate(-18deg);
    animation: shoot 2.4s linear forwards;
}

@keyframes shoot {
    0% { opacity: 0; transform: translate(-20px, -20px) rotate(-18deg); }
    15% { opacity: 1; }
    100% { opacity: 0; transform: translate(140vw, 75vh) rotate(-18deg); }
}

#glow {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 480px;
    height: 480px;
    transform: translate(-50%, -50%) scale(1);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.18), rgba(255,255,255,0.04) 45%, transparent 70%);
    filter: blur(36px);
    animation: glowPulse 2.6s ease-in-out infinite;
}

@keyframes glowPulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-50%, -50%) scale(1.16); }
}

#overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(2, 6, 23, 0.22), rgba(15, 23, 42, 0.42));
    pointer-events: none;
}

#content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: min(92%, 900px);
    padding: 2.4rem 2.8rem;
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 34px;
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(18px);
    box-shadow: 0 24px 90px rgba(0,0,0,0.35);
}

.message-line {
    opacity: 0;
    margin: 16px auto;
    font-size: clamp(1rem, 2vw, 1.6rem);
    letter-spacing: 1.6px;
    line-height: 1.7;
    max-width: 760px;
    white-space: pre-wrap;
}

#line2 {
    font-size: clamp(1.35rem, 3vw, 2.9rem);
    font-weight: 700;
    padding: 0.2em 0;
    background: linear-gradient(90deg, #ffd166, #ff7ab6, #7dd3fc, #c084fc, #34d399, #ffd166);
    background-size: 220% auto;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 20px rgba(255,255,255,0.2);
}

#happy {
    display: flex;
    justify-content: center;
    margin-top: 34px;
    opacity: 0;
    font-size: clamp(2.4rem, 7vw, 4.5rem);
    letter-spacing: 0.25em;
    font-weight: 800;
    color: white;
    text-shadow: 0 0 20px white, 0 0 42px gold, 0 0 86px orange;
    position: relative;
}

#happy::before {
    content: "";
    position: absolute;
    inset: 10% 5%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.22), transparent 63%);
    filter: blur(22px);
    z-index: -1;
}

.happy-line {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.06em;
}

.happy-letter {
    display: inline-block;
    transform-origin: center;
}

#blessing {
    opacity: 0;
    margin-top: 24px;
    font-size: clamp(1rem, 1.85vw, 1.3rem);
    line-height: 1.85;
    letter-spacing: 1.3px;
    color: #fef3c7;
    max-width: 760px;
    margin-left: auto;
    margin-right: auto;
    white-space: pre-wrap;
}

#signature {
    opacity: 0;
    margin-top: 28px;
    font-size: clamp(1rem, 1.8vw, 1.2rem);
    letter-spacing: 1.4px;
    color: #fff7ed;
    white-space: pre-wrap;
    text-align: center;
    line-height: 1.7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.signature-char {
    display: inline-block;
    opacity: 0;
    transform: translateY(8px) scale(0.96);
    font-family: "Brush Script MT", "Segoe Script", cursive;
    font-size: clamp(1.2rem, 2.3vw, 1.7rem);
    color: #fff7ed;
}

.confetti-piece {
    position: absolute;
    width: 8px;
    height: 16px;
    left: 50%;
    top: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
}

.confetti-piece.burst {
    animation: confettiBurst 1.7s cubic-bezier(.17,.67,.25,1) forwards;
}

@keyframes confettiBurst {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(.35); }
    10% { opacity: 1; }
    100% { opacity: 0; transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) rotate(var(--rotate)); }
}

@media (max-width: 700px) {
    #content {
        padding: 1.6rem 1.1rem;
        border-radius: 24px;
    }
    .message-line {
        letter-spacing: 1.3px;
    }
    #happy {
        letter-spacing: 0.14em;
    }
}
`;

            document.head.appendChild(style);

            scene = document.getElementById("birthday-scene");
            glow = document.getElementById("glow");
            content = document.getElementById("content");
            line1 = document.getElementById("line1");
            line2 = document.getElementById("line2");
            line3 = document.getElementById("line3");
            line4 = document.getElementById("line4");
            line5 = document.getElementById("line5");
            happy = document.getElementById("happy");
            blessing = document.getElementById("blessing");
            signature = document.getElementById("signature");

            const stars = document.getElementById("stars");
            const confettiLayer = document.getElementById("confetti-layer");

            for (let i = 0; i < 320; i++) {

                const s = document.createElement("div");
                s.className = "star";
                s.innerHTML = Math.random() > 0.5 ? "✦" : "•";
                s.style.left = Math.random() * 100 + "vw";
                s.style.top = Math.random() * 100 + "vh";
                s.style.opacity = Math.random();
                stars.appendChild(s);

                const tween = gsap.to(s, {
                    opacity: 0.2,
                    duration: 1 + Math.random() * 3,
                    repeat: -1,
                    yoyo: true
                });

                activeTweens.push(tween);

            }

            for (let i = 0; i < 32; i++) {

                const p = document.createElement("div");
                p.className = "particle";
                p.style.left = Math.random() * 100 + "vw";
                p.style.top = Math.random() * 100 + "vh";
                p.style.width = 4 + Math.random() * 5 + "px";
                p.style.height = p.style.width;
                p.style.animationDelay = Math.random() * 5 + "s";
                stars.appendChild(p);

            }

            const makeShootingStar = () => {

                const star = document.createElement("div");
                star.className = "shooting-star";
                star.style.left = Math.random() * 20 + "vw";
                star.style.top = Math.random() * 25 + "vh";
                stars.appendChild(star);

                registerTimeout(() => star.remove(), 2400);

            };

            registerInterval(makeShootingStar, 4000);

            const burstConfetti = () => {

                const colors = ["#ffd166", "#ff6b6b", "#4cc9f0", "#a78bfa", "#f472b6", "#ffffff"];

                for (let i = 0; i < 90; i++) {

                    const piece = document.createElement("div");
                    piece.className = "confetti-piece";
                    piece.style.backgroundColor = colors[i % colors.length];
                    piece.style.setProperty("--x", (Math.random() - 0.5) * 440 + "px");
                    piece.style.setProperty("--y", (Math.random() - 0.5) * 440 + "px");
                    piece.style.setProperty("--rotate", Math.random() * 360 + "deg");
                    confettiLayer.appendChild(piece);

                    registerRaf(() => piece.classList.add("burst"));
                    registerTimeout(() => piece.remove(), 1800);

                }

            };

            const delay = (ms) => new Promise((resolveDelay) => registerTimeout(resolveDelay, ms));

            const typeText = (element, text, options = {}) => new Promise((resolveType) => {

                const { speed = 34, startDelay = 0 } = options;

                element.innerHTML = "";
                element.style.opacity = "1";
                element.style.whiteSpace = "pre-wrap";

                let index = 0;

                const typeNext = () => {

                    if (index < text.length) {

                        const char = text[index];
                        const nextChar = text[index + 1];
                        element.innerHTML += char === "\n" ? "<br>" : char;
                        index += 1;

                        let pause = 24;

                        if (char === "\n") pause = 220;
                        else if (/[.!?]/.test(char)) pause = 180;
                        else if (/[,:;]/.test(char)) pause = 90;
                        else if (char === " " && nextChar === " ") pause = 20;

                        registerTimeout(typeNext, pause + speed);

                    } else {

                        resolveType();

                    }

                };

                registerTimeout(typeNext, startDelay);

            });

            const animateHappyBirthday = () => new Promise((resolveTitle) => {

                happy.innerHTML = "";
                happy.style.opacity = "1";

                const lines = [
                    ["H", "A", "P", "P", "Y"],
                    ["B", "I", "R", "T", "H", "D", "A", "Y"]
                ];

                const container = document.createElement("div");
                container.className = "happy-line";
                container.style.flexDirection = "column";
                container.style.alignItems = "center";
                container.style.gap = "0.12em";

                lines.forEach((letters, lineIndex) => {

                    const line = document.createElement("div");
                    line.className = "happy-line";

                    letters.forEach((letter, index) => {

                        const span = document.createElement("span");
                        span.className = "happy-letter";
                        span.textContent = letter;
                        span.style.opacity = "0";
                        span.style.transform = "translateY(22px) scale(0.7)";
                        line.appendChild(span);

                        registerTimeout(() => {

                            const tween = gsap.to(span, {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                duration: 0.45,
                                ease: "back.out(1.7)"
                            });

                            activeTweens.push(tween);

                        }, lineIndex * 500 + index * 95);

                    });

                    container.appendChild(line);

                });

                happy.appendChild(container);

                const titleTween = gsap.fromTo(happy, {
                    opacity: 0,
                    scale: 0.7,
                    filter: "blur(8px)"
                }, {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1.05,
                    ease: "back.out(1.6)"
                });

                activeTweens.push(titleTween);

                const glowTween = gsap.timeline();
                glowTween.to(glow, {
                    scale: 1.2,
                    duration: 0.6,
                    ease: "power2.out"
                }).to(glow, {
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.inOut"
                });

                activeTweens.push(glowTween);

                registerTimeout(resolveTitle, 1500);

            });

            const animateSignature = (text) => new Promise((resolveSignature) => {

                signature.innerHTML = "";
                signature.style.opacity = "1";

                const lines = text.split("\n");
                const wrapper = document.createElement("div");
                wrapper.style.display = "flex";
                wrapper.style.flexDirection = "column";
                wrapper.style.alignItems = "center";
                wrapper.style.justifyContent = "center";
                wrapper.style.gap = "0.25rem";

                lines.forEach((lineText, lineIndex) => {

                    const line = document.createElement("div");
                    line.style.display = "flex";
                    line.style.justifyContent = "center";
                    line.style.flexWrap = "wrap";
                    line.style.gap = "0.1rem";

                    [...lineText].forEach((char, charIndex) => {

                        const span = document.createElement("span");
                        span.className = "signature-char";
                        span.textContent = char;
                        line.appendChild(span);

                        registerTimeout(() => {

                            const tween = gsap.to(span, {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                duration: 0.3,
                                ease: "power2.out"
                            });

                            activeTweens.push(tween);

                        }, lineIndex * 450 + charIndex * 55);

                    });

                    wrapper.appendChild(line);

                });

                signature.appendChild(wrapper);

                registerTimeout(resolveSignature, 2500);

            });

            const master = gsap.timeline({ defaults: { ease: "power3.out" } });
            activeTweens.push(master);

            master.fromTo(scene, { opacity: 0 }, { opacity: 1, duration: 1.1 });
            master.fromTo(content, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.15 }, "-=0.85");
            master.fromTo(glow, { opacity: 0.55 }, { opacity: 1, duration: 1.1 }, "-=0.85");

            const heartbeatName = () => {

                const heartbeat = gsap.timeline({ repeat: -1, yoyo: true });
                heartbeat.to(line2, { scale: 1.03, duration: 0.6, ease: "sine.inOut" });
                heartbeat.to(line2, { scale: 1, duration: 0.6, ease: "sine.inOut" });
                activeTweens.push(heartbeat);

            };

            (async () => {

                await delay(200);
                await typeText(line1, "For Someone Truly Special", { speed: 34 });
                await delay(600);

                line2.style.opacity = "1";
                line2.innerHTML = "❤️ Gayathri Praharshitha ❤️";
                const nameReveal = gsap.timeline();
                nameReveal.fromTo(line2, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.1, ease: "back.out(1.6)" });
                activeTweens.push(nameReveal);
                heartbeatName();
                await delay(1300);

                const wishes = [
                    "On this beautiful day...",
                    "I wish your life is always filled with happiness.",
                    "May every dream you believe in\nfind its way to reality.",
                    "May every sunrise\nbring new hope.",
                    "May every smile\nbring endless joy.",
                    "Keep shining...\nKeep smiling...",
                    "Because this world becomes\na little brighter with your smile."
                ];

                for (const sentence of wishes) {

                    await typeText(line3, sentence, { speed: 26 });
                    await delay(1200);

                    const fadeLine3 = gsap.to(line3, {
                        opacity: 0,
                        duration: 0.9,
                        ease: "power2.inOut"
                    });
                    activeTweens.push(fadeLine3);

                    await delay(500);
                    line3.innerHTML = "";
                    line3.style.opacity = "0";

                }

                await typeText(line3, "HAPPY BIRTHDAY", { speed: 26 });

                const fadeOldIntro = gsap.to([line1, line2], {
                    opacity: 0,
                    duration: 0.9,
                    ease: "power2.inOut"
                });
                activeTweens.push(fadeOldIntro);

                await delay(250);
                line1.innerHTML = "";
                line2.innerHTML = "";

                gsap.to(music.birthday, { volume: 0.92, duration: 1.4, ease: "power2.out" });
                burstConfetti();
                await animateHappyBirthday();
                await delay(900);

                const fadeLine4 = gsap.to(line4, {
                    opacity: 0,
                    y: "+=18",
                    duration: 1.0,
                    ease: "power2.inOut"
                });
                const fadeBlessing = gsap.to(blessing, {
                    opacity: 0,
                    y: "+=18",
                    duration: 1.0,
                    ease: "power2.inOut"
                });
                activeTweens.push(fadeLine4, fadeBlessing);

                await delay(1050);
                line4.innerHTML = "";
                blessing.innerHTML = "";
                line4.style.display = "none";
                blessing.style.display = "none";

                gsap.to([line1, line2, line3, happy], {
                    opacity: 0,
                    duration: 1.4,
                    ease: "power2.inOut"
                });
                gsap.to(content, {
                    backgroundColor: "rgba(0,0,0,0)",
                    borderColor: "rgba(255,255,255,0)",
                    duration: 1.4,
                    ease: "power2.inOut"
                });
                gsap.to(glow, {
                    opacity: 0,
                    scale: 0.92,
                    duration: 1.4,
                    ease: "power2.inOut"
                });
                gsap.to(scene, {
                    backgroundColor: "#000000",
                    duration: 1.4,
                    ease: "power2.inOut"
                });

                await delay(1400);

                await animateSignature("────────────────────\n\nWith Best Wishes ❤️\n\nRanjith Kumar\n\nMay your journey always be\nas beautiful as your smile.\n\n✨");
                signature.style.opacity = "1";
                await delay(3800);

                finish();

            })();

        });

    }

}
