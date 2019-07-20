import Ball from './js/ball';
import * as Util from './js/util';
const MAX_POINTS = 100;

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let scoreTextHTMLEl = document.getElementById('score-text');
let speedInputHTMLEl = document.getElementById('speed-input');

let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;
let score = 0;
let ballsOnScreen = [];
scoreTextHTMLEl.innerHTML = score;


function createBall() {
    const radius = Util.getRandomRadius();
    const xPos = Util.getRandomPosition(2 * radius, W - 2 * radius);
    const yPos = radius;
    const velocityY = parseFloat(speedInputHTMLEl.value, 10);
    const velocityX = 0;


    const newBall = new Ball(
        radius,
        xPos,
        yPos,
        velocityX,
        velocityY
    );
    ballsOnScreen.push(newBall);

}

function applyListsners() {
    speedInputHTMLEl.addEventListener("change", function (e) {
        ballsOnScreen.forEach((ball) => {
            ball.setVelocityY(parseFloat(e.target.value, 10));
        })
    });
    canvas.addEventListener('click', (e) => {
        const pos = {
            x: e.clientX - canvas.offsetLeft,
            y: e.clientY - canvas.offsetTop
        };

        ballsOnScreen = ballsOnScreen.filter((ball) => {
            if (Util.isIntersect(pos, ball)) {
                score += Math.round(MAX_POINTS / (2 * ball.radius));
                scoreTextHTMLEl.innerHTML = score;
                ball.clear(ctx);
                setTimeout(createBall(), 1000);
                return false;
            } else {
                return true;
            }
        });
    });


}

function filterBallsOnScreen(ballToRemove) {
    ballsOnScreen = ballsOnScreen.filter((ball) => {
        return ball.id !== ballToRemove;
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, W, H);
}

applyListsners();
createBall();
setInterval(createBall, 1000);


(function update() {
    clearCanvas();

    for (let i = 0, ball; ball = ballsOnScreen[i]; i++) {
        ball.draw(ctx);
        ball.update(ctx);
        if (
            ball.x + ball.radius > canvas.width ||
            ball.x - ball.radius < 0 ||
            ball.y + ball.radius > canvas.height // ||
            //ball.y - ball.radius  < 0
        ) {
            filterBallsOnScreen(ball);
        }
    }
    requestAnimationFrame(update);
})();