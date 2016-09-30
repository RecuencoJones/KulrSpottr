var chai = require('chai');
var expect = chai.expect;

import Color from '../src/Color';

var state =  {
    channels: {

    }
};

//import Tile from './Tile';
import Tile from '../src/Tile';


describe('Tile', () => {
    describe('a dummy test', () => {
        it('should be true.', () => {
            var tile = new Tile( new Color('red') );
            tile.render(state);
            expect(true).to.equal(true);
        });
    });
});