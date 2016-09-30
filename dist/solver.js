function solve(callback, highlightTime, delay) {
    var tiles = document.querySelectorAll('.tile');
    var matches = {}, i, key, keyToI = {};
    var styles = [];
    for (i = 0; i < tiles.length; i++) {
        key = getComputedStyle(tiles[i]).getPropertyValue("background-color");
        styles.push(key);
        keyToI[key] = i;
        matches[key] = matches[key] ? matches[key] + 1 : 1;
    }

    Object.keys(matches).map(function (style) {
        if (matches[style] == 1) {
            var i = keyToI[style];
            var origClass = tiles[i].className;
            tiles[i].className += ' tile--highlight'; //This style is defined in the App.

            setTimeout(function () {
                tiles[i].className = origClass;
                tiles[i].click();
                if (callback) {
                    setTimeout(function () {
                        callback();
                    }, delay || 1);
                }
            }, highlightTime !== undefined ? highlightTime : 400);
        }
    });
}

function solveSteps(steps, highlightTime, delay) {
    if (steps) {
        solve(function () {
            solveSteps(steps - 1, highlightTime, delay);
        }, highlightTime, delay);
    }
}

var solveButton = document.createElement('Button');
solveButton.innerText = 'Solve';
solveButton.style['font-size'] = '2rem';
solveButton.style.position = 'fixed';
solveButton.style.bottom = '20px';
solveButton.style.right = '20px';

document.body.appendChild(solveButton);

solveButton.onclick = function () {
    solve()
};
