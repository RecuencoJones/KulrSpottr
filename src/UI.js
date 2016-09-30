'use strict';

import hg from 'mercury/dist/mercury';
const h = hg.h;

class UI {
    static render(state) {
        return h('div.ui', [
            'step ' + state.step
        ]);
    }
}

export default UI;