var chai = require('chai');
var expect = chai.expect;

import Color from '../src/Color';

var state =  {
    step: 1,
    channels: {

    }
};


import UI from '../src/UI';


describe('UI', () => {
    describe('#render', () => {
        it('should render the user interface.', () => {
            let output = UI.render(state);
            expect(output.children[0].text).to.equal('step 1');
        });
    });
});