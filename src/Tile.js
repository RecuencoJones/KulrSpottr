import hg from 'mercury/dist/mercury';
const h = hg.h;

/*istanbul ignore next*/
var preventEvent = hg.BaseEvent(function _touchOrClick(ev, broadcast) {
    ev._rawEvent.preventDefault();
    broadcast(this.data);
});

export default class Tile {
    constructor(color) {
        this.color = color;
    }

    render(state, index, tilesPerRow) {
        var isLastInRow = index % tilesPerRow == 0;
        var tileSize = (Math.min(window.innerHeight, window.innerWidth) - 1) / tilesPerRow;

        var style = {
            backgroundColor: this.color.toRGB(),
            width: tileSize + 'px',
            height: tileSize + 'px'
        };

        if (isLastInRow) {
            style.clear = 'left';
        }

        return h('div.tile', {
            style: style,
            'ev-click': preventEvent(state.channels.selectTile, {index: index}),
            'ev-touchend': preventEvent(state.channels.selectTile, {index: index})
        });

    }
}