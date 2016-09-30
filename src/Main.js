'use strict';
import Application from './App';
let App = Application.App;
import hg from 'mercury/dist/mercury';

let state = App();

hg.app(document.body, state, App.render);

window.onresize = function resize() {
    state.forceRender.set(Date.now());
};
