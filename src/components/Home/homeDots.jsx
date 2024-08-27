const homeDots = function () {
    const canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        colorDot = [
            'rgb(81, 162, 233)',
            'rgb(81, 162, 233)',
            'rgb(81, 162, 233)',
            'rgb(81, 162, 233)',
            'rgb(255, 77, 90)',
        ];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas(); // Set initial size

    canvas.style.display = 'block';
    ctx.lineWidth = 0.3;
    ctx.strokeStyle = colorDot[0];

    let mousePosition = {
        x: (30 * canvas.width) / 100,
        y: (30 * canvas.height) / 100,
    };

    const windowSize = window.innerWidth;
    let dots;

    if (windowSize > 1600) {
        dots = {
            nb: 600,
            distance: 70,
            d_radius: 300,
            array: [],
        };
    } else if (windowSize > 1300) {
        dots = {
            nb: 575,
            distance: 60,
            d_radius: 280,
            array: [],
        };
    } else if (windowSize > 1100) {
        dots = {
            nb: 500,
            distance: 55,
            d_radius: 250,
            array: [],
        };
    } else if (windowSize > 800) {
        dots = {
            nb: 300,
            distance: 0,
            d_radius: 0,
            array: [],
        };
    } else if (windowSize > 600) {
        dots = {
            nb: 200,
            distance: 0,
            d_radius: 0,
            array: [],
        };
    } else {
        dots = {
            nb: 0,
            distance: 0,
            d_radius: 0,
            array: [],
        };
    }

    function Dot() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = -0.5 + Math.random();
        this.vy = -0.5 + Math.random();
        this.radius = Math.random() * 1.5;
        this.colour = colorDot[Math.floor(Math.random() * colorDot.length)];
    }

    Dot.prototype.create = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        const dotDistance = Math.sqrt(
            (this.x - mousePosition.x) ** 2 + (this.y - mousePosition.y) ** 2
        );
        const distanceRatio = dotDistance / (windowSize / 1.7);

        ctx.fillStyle = this.colour.slice(0, -1) + `,${1 - distanceRatio})`;
        ctx.fill();
    };

    Dot.prototype.animate = function () {
        for (let i = 1; i < dots.nb; i++) {
            const dot = dots.array[i];
            if (dot.y < 0 || dot.y > canvas.height) {
                dot.vy = -dot.vy;
            }
            if (dot.x < 0 || dot.x > canvas.width) {
                dot.vx = -dot.vx;
            }
            dot.x += dot.vx;
            dot.y += dot.vy;
        }
    };

    Dot.prototype.line = function () {
        for (let i = 0; i < dots.nb; i++) {
            for (let j = 0; j < dots.nb; j++) {
                const i_dot = dots.array[i];
                const j_dot = dots.array[j];

                if (
                    i_dot.x - j_dot.x < dots.distance &&
                    i_dot.y - j_dot.y < dots.distance &&
                    i_dot.x - j_dot.x > -dots.distance &&
                    i_dot.y - j_dot.y > -dots.distance
                ) {
                    if (
                        i_dot.x - mousePosition.x < dots.d_radius &&
                        i_dot.y - mousePosition.y < dots.d_radius &&
                        i_dot.x - mousePosition.x > -dots.d_radius &&
                        i_dot.y - mousePosition.y > -dots.d_radius
                    ) {
                        ctx.beginPath();
                        ctx.moveTo(i_dot.x, i_dot.y);
                        ctx.lineTo(j_dot.x, j_dot.y);

                        const dotDistance = Math.sqrt(
                            (i_dot.x - mousePosition.x) ** 2 +
                            (i_dot.y - mousePosition.y) ** 2
                        );
                        let distanceRatio = dotDistance / dots.d_radius;

                        distanceRatio -= 0.3;
                        if (distanceRatio < 0) {
                            distanceRatio = 0;
                        }

                        ctx.strokeStyle = `rgb(81, 162, 233, ${1 - distanceRatio})`;

                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }
    };

    function createDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < dots.nb; i++) {
            dots.array.push(new Dot());
            var dot = dots.array[i];

            dot.create();
        }

        dots.array[0].radius = 1.5;
        dots.array[0].colour = '#51a2e9';

        dot.line();
        dot.animate();
    }

    window.onmousemove = function (parameter) {
        const canvasRect = canvas.getBoundingClientRect();
        mousePosition.x = parameter.clientX - canvasRect.left;
        mousePosition.y = parameter.clientY - canvasRect.top;

        if (dots.array[0]) {
            dots.array[0].x = mousePosition.x;
            dots.array[0].y = mousePosition.y;
        }
    };

    mousePosition.x = window.innerWidth / 2;
    mousePosition.y = window.innerHeight / 2;

    const draw = setInterval(createDots, 1000 / 30);

    window.onresize = function () {
        resizeCanvas();
        dots.array = [];
        createDots();
    };

    // Properly clear the interval and event listener on component unmount
    return () => {
        clearInterval(draw);
        window.onmousemove = null;
        window.onresize = null;
    };
};

export default homeDots;
