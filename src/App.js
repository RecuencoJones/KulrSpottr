'use strict';

import hg from 'mercury/dist/mercury';
import UI from './UI';
import Game from './Game';
import Hall from './Hall';
import * as Storage from './Storage';

const h = hg.h;
const MINIMUM_TILE_SIZE = 20;

function App() {
    return hg.state({
        step: hg.value(0),
        hall: hg.varhash({
            show: hg.value(false),
            maxScore: hg.value(false),
            playerName: hg.value(''),
            submitted: hg.value(false),
            scores: hg.value(Storage.getScore())
        }),
        forceRender: hg.value(0),
        channels: {
            selectTile: selectTile,
            updateName: updateName,
            submitScore: submitScore,
            closeHall: closeHall
        }
    });
}

let game = new Game(0, Math.floor(Math.random() * 4));

function showHall(state, maxScore) {
    state.hall.show.set(true);
    if (maxScore) {
        state.hall.maxScore.set(true);
    }
    state.hall.scores.set(
        state.hall.scores()
            .concat({
                isMyScore: true,
                name: '',
                points: state.step()
            })
    );
}

function selectTile(state, selectedTile) {
    let isMaxScore = false;
    if (state.hall.show()) {
        return;
    }
    if (game.selectTile(selectedTile)) {
        state.step.set(state.step() + 1);
        let tileCount = Math.pow(state.step() + 1, 2);
        let tilesPerRow = state.step() + 2;
        let spaceAvailable = Math.min(window.innerHeight, window.innerWidth);
        let tileSize = parseInt(spaceAvailable / tilesPerRow);
        if (tileSize >= MINIMUM_TILE_SIZE) {
            return game = new Game(state.step(), Math.floor(Math.random() * tileCount));
        }
        isMaxScore = true;
    }
    showHall(state, isMaxScore)
}

function resetHall(state, submitted) {
    state.hall.playerName.set('');
    state.hall.submitted.set(!!submitted);
    state.hall.maxScore.set(false);
}

function updateName(state, data) {
    state.hall.playerName.set(data.name);

    state.hall.scores.set(state.hall.scores().map(score => {
        if (score.isMyScore) {
            score.name = state.hall.playerName();
        }
        return score;
    }));
}

function submitScore(state) {
    var scores = Storage.getScore();
    scores.push({name: state.hall.playerName(), points: state.step()});
    Storage.setScore(scores);
    resetHall(state, true)
}

function closeHall(state) {
    resetHall(state);
    state.hall.show.set(false);
    state.step.set(0);
    state.hall.scores.set(Storage.getScore());
    let tileCount = Math.pow(state.step() + 1, 2);
    game = new Game(state.step(), Math.floor(Math.random() * tileCount));
}

App.render = function render(state) {
    return h('div.app', [
        game.render(state),
        UI.render(state),
        Hall.render(state)
    ]);
};

export default {
    App: App,
    setGame: function (newGame) {
        game = newGame;
    },
    channels: {
        selectTile: selectTile,
        updateName: updateName,
        submitScore: submitScore,
        closeHall: closeHall
    }
};
