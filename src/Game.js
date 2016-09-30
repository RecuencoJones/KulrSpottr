import Tile from './Tile';
import Color from './Color';

const MAX_INTENSITY = 25;

export default class Game {
    constructor(step = 0, indexTileChanged = 0) {
        this.step = step;
        this.tiles = this.generateTiles(this.step);

        var offsetIntensity = MAX_INTENSITY - this.step;

        if (this.step >= MAX_INTENSITY - 1) {
            offsetIntensity = 1.5
        }
        this.indexTileChanged = indexTileChanged;
        this.tiles[this.indexTileChanged].color.offset(offsetIntensity, Math.random() > 0.5);
    }

    render(state) {
        let tilesPerRow = ~~(Math.sqrt(this.tiles.length));
        return this.tiles.map((tile, index) => tile.render(state, index, tilesPerRow));
    }

    selectTile(data) {
        return this.indexTileChanged == data.index;
    }

    generateTiles(step) {

        var h = ~~(Math.random() * 360);// H 0-360
        var s = 100 - (step <= 25 ? step : 25);// S 0-100
        var l = ~~(Math.random() * 20) + 40;// L 0-100

        var tiles = [];

        for (var i = step + 2; i > 0; i--) {
            for (var j = step + 2; j > 0; j--) {
                tiles.push(new Tile(new Color(h, s, l)));
            }
        }

        return tiles;
    }

}
