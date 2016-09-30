var chai = require('chai');
var expect = chai.expect;

import Color from '../src/Color';

var state =  {
    channels: {

    }
};

describe('Color', () => {
    describe('#constructor', () => {
        it('should initialise a color in the HSL format.', () => {
            let color = new Color(1,2,3);
            let hslArray = color.color.hslArray();
            expect(hslArray[0]).to.equal(1);
            expect(hslArray[1]).to.equal(2);
            expect(hslArray[2]).to.equal(3);
        });
        it('should initialise a color in the HSL format with default parameters.', () => {
            let color = new Color();
            let hslArray = color.color.hslArray();
            expect(hslArray[0]).to.equal(0);
            expect(hslArray[1]).to.equal(0);
            expect(hslArray[2]).to.equal(0);
        });
    });
    describe('#toRGB', () => {
        it('should transform the color to RGB format.', () => {
            let color = new Color(1,2,3);
            expect(color.toRGB()).to.equal('#080807');
        });
    });
    describe('#offset', () => {
        it('should darken luminosity of color.', () => {
            let color = new Color(200,50,50);
            color.offset(10, true);
            let endLuminosity = color.color.luminosity();
            expect( endLuminosity ).to.equal( 0.20898609234647103);
        });
        it('should lighten luminosity of color.', () => {
            let color = new Color(200,50,50);
            color.offset(10, false);
            let endLuminosity = color.color.luminosity();
            expect( endLuminosity ).to.equal( 0.3071249100459835 );
        });
    });
});