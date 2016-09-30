'use strict';

import hg from 'mercury/dist/mercury';
const h = hg.h;

/*istanbul ignore next*/
var preventEvent = hg.BaseEvent(function _touchOrClick(ev, broadcast) {
    ev._rawEvent.preventDefault();
    broadcast(this.data);
});

class Hall {
    static render(state) {

        let className = "hall";

        if (state.hall.show) {
            className += " hall--visible";
        }

        return h('div',
            {
                className: className
            }
            ,
            [h('div.hall__close-btn', {
                'ev-click': preventEvent(state.channels.closeHall),
                'ev-touchend': preventEvent(state.channels.closeHall)
            }, '×'),
            h('p', ['Reached step ' + state.step + '.' + (state.hall.maxScore ? ' Max score in this device' : '' )]),
            Hall.renderRankHelper(state),
            h('input.text', {
                type: 'text',
                placeholder: 'Name',
                name: 'name',
                value: state.hall.playerName,
                disabled: !!state.hall.submitted,
                'ev-event': hg.changeEvent(state.channels.updateName),
                'ev-blur': hg.sendValue(state.channels.updateName),
            }),
            h('input.button', {
                type: 'button',
                value: 'OK',
                disabled: !!state.hall.submitted,
                'ev-click': hg.send(state.channels.submitScore),
                'ev-touchend': hg.send(state.channels.submitScore)
            }),
            h('div.hall__list',
                h('div.hall__list-container', state.hall.scores
                    .sort(Hall.sort)
                    .filter((score, index) => index < 10)
                    .map((score, index) => {
                        var className = 'hall__player';
                        if (score.isMyScore) {
                            className += ' hall__player--currentPlayer';
                        }
                        return h('div', {className: className}, [
                            h('div.hall__player__rank', '#' + (index + 1)), h('div.hall__player__score', '' + score.points), h('div.hall__player__name', '' + score.name)
                        ])
                    })
                )
            ),
            ]);
    }


    static sort(a, b) {
        if (a.points < b.points) {
            return 1;
        }
        if (a.points > b.points) {
            return -1;
        }

        return 0;
    }

    static renderRankHelper(state) {
        return h('div', 'Rank #' + state.hall.scores
                .sort(Hall.sort)
                .reduce((acum, current, index) => {
                    if (current.isMyScore) {
                        return index + 1;
                    }
                    return acum;
                }, 0));
    }
}

export default Hall;