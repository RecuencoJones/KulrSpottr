var chai = require('chai');
var expect = chai.expect;

import Game from '../src/Game';

var state =  {
    channels: {

    }
};

describe('Game', () => {
    describe('#constructor', () => {
        it('should initialise a new game.', () => {
            let game = new Game(1);
            expect(game.step).to.equal(1);
            expect(game.tiles).to.be.instanceof(Array);
        });
        it('should initialise a new game with default values.', () => {
            let game = new Game();
            expect(game.step).to.equal(0);
            expect(game.tiles).to.be.instanceof(Array);
        });
        it('should initialise a new game with minimum offset of color.', () => {
            let game = new Game(26);
            expect(game.step).to.equal(26);
            expect(game.tiles).to.be.instanceof(Array);
        });
    });
    describe('#render', () => {
        it('should render a game.', () => {
            let game = new Game(5);
            var output = game.render(state);
            expect(output.length).to.equal(49);
        });
    });
    describe('#selectTile', () => {
        it('should check if the selected tile is the changed one.', () => {
            let game = new Game(1);
            game.indexTileChanged = 2;
            expect(game.selectTile({index: 2})).to.equal(true);
            expect(game.selectTile({index: 1})).to.equal(false);
        });
    });
    describe('#generateTiles', () => {
        it('should generate a board with a changed tile.', () => {
            let game = new Game(1);
            var tiles = game.generateTiles(1);
            expect(tiles.length).to.equal(9);
        });
    });
});