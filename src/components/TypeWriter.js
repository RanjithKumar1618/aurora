export class TypeWriter {

    constructor(element, speed = 40) {

        this.element = element;
        this.speed = speed;

    }

    async write(text) {

        this.element.innerHTML = "";

        return new Promise((resolve) => {

            let index = 0;

            const timer = setInterval(() => {

                if (index >= text.length) {

                    clearInterval(timer);

                    resolve();

                    return;

                }

                const ch = text.charAt(index);

                if (ch === "\n") {

                    this.element.innerHTML += "<br>";

                } else {

                    this.element.innerHTML += ch;

                }

                index++;

            }, this.speed);

        });

    }

}