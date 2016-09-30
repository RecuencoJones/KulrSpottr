var chai = require('chai');
var expect = chai.expect;

var sinon = require('sinon');


import * as Storage from '../src/Storage';

var state =  {
    channels: {

    }
};

describe('Storage', () => {
    describe('#getScore', () => {
        it('should get the stored score list.', () => {
            localStorage.returnValue = '[{"a":"b"}]';
            let score = Storage.getScore();
            expect(score.length).to.equal(1);
        });
        it('should get a default value when there score is not stored.', () => {
            localStorage.returnValue = false;
            let score = Storage.getScore();
            expect(score.length).to.equal(0);
        });
        it('should handle JSON parsing errors.', () =>{
            let consoleWarn = console.warn;
            sinon.stub(console,'warn');
            localStorage.returnValue = '[{"a": invalidFormat';
            let score = Storage.getScore();
            expect(score.length).to.equal(0);
            expect( console.warn.calledWith('[Main.js] Error parsing scores') ).to.be.true;
            console.warn = consoleWarn;
        })
        it('should not handle JSON parsing errors on environments with no console object.', () =>{
            let consoleWarn = console.warn;
            console.warn = undefined;
            localStorage.returnValue = '[{"a": invalidFormat';
            let score = Storage.getScore();
            expect(score.length).to.equal(0);
            console.warn = consoleWarn;
        })
    });
    describe('#setScore', () => {
        it('should store the score list.', () => {
            let score = {a:'b'};
            Storage.setScore(score);
            expect(localStorage.lastStoredScore).to.equal(JSON.stringify(score));
        });

        it('should handle errors on browsers with console object.', () => {
            let consoleWarn = console.warn;
            sinon.stub(console,'warn');
            let score = {obj: "cyclicRef"};
            score.obj = score;
            Storage.setScore(score);
            expect( console.warn.calledWith('[Main.js] Error storing scores') ).to.be.true;
            console.warn = consoleWarn;
        });

        it('should not handle errors on browsers with no console object.', () => {
            let consoleWarn = console.warn;
            console.warn = undefined;
            let score = {obj: "cyclicRef"};
            score.obj = score;
            Storage.setScore(score);

            console.warn = consoleWarn;
        });
    });
});