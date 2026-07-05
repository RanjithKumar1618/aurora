export class Confetti {

    constructor(container) {

        this.container = container;
        this.items = [];

    }

    start() {

        for (let i = 0; i < 180; i++) {

            const confetti = document.createElement("div");

            confetti.className = "confetti";

            confetti.style.left = Math.random() * 100 + "%";

            confetti.style.backgroundColor = this.randomColor();

            confetti.style.animationDuration =
                (3 + Math.random() * 5) + "s";

            confetti.style.animationDelay =
                Math.random() * 3 + "s";

            this.container.appendChild(confetti);

            this.items.push(confetti);

        }

    }

    randomColor() {

        const colors = [

            "#FFD700",
            "#00FFFF",
            "#FF69B4",
            "#7CFC00",
            "#FF4500",
            "#FFFFFF"

        ];

        return colors[
            Math.floor(Math.random() * colors.length)
        ];

    }

}