function getRandomValue(min, max) {
    return Math.floor(Math.random() * (+max - +min)) + +min;
}

export function getRandomRadius() {
    return Math.floor(getRandomValue(10, 100) / 2);
}

export function getRandomPosition(min, max) {
    return getRandomValue(min, max);
}

export function generateRandomId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function isIntersect(point, circle) {
    return Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) <= circle.radius;
}

export function debounce(func, delay) {
    let debounceTimer
    return function () {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
}

