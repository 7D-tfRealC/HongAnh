const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Xác định tâm của vòng tròn
const spinner = document.querySelector(".spiner");
const spinnerRect = spinner.getBoundingClientRect();
const centerX = spinnerRect.left + spinnerRect.width / 2;
const centerY = spinnerRect.top + spinnerRect.height / 2;

class Particle {
    constructor(x, y, color, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.alpha = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createFirework(x, y) {
    let colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];
    for (let i = 0; i < 30; i++) {
        let angle = Math.random() * Math.PI * 2;
        let speed = Math.random() * 4 + 1;
        particles.push(
            new Particle(
                x,
                y,
                colors[Math.floor(Math.random() * colors.length)],
                Math.random() * 3 + 1,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed
            )
        );
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(index, 1);
    });
    requestAnimationFrame(animate);
}

// Bắn pháo hoa ngay tâm vòng tròn khi tải trang
window.onload = () => {
    createFirework(centerX, centerY);
};

animate();
