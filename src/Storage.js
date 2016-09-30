export function getScore() {
    var score = localStorage.getItem('score');
    if (score) {
        try {
            return JSON.parse(score);
        } catch (e) {
            if (console && console.warn) {
                console.warn('[Main.js] Error parsing scores');
            }
            return [];
        }
    } else {
        return [];
    }
}

export function setScore(score) {
    try {
        localStorage.setItem('score', JSON.stringify(score));
    } catch (e) {
        if (console && console.warn) {
            console.warn('[Main.js] Error storing scores');
        }
    }
}
