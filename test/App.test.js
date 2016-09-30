var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

import Application from '../src/App';
import Game from '../src/Game';
import * as Storage from '../src/Storage';
import hg from 'mercury/dist/mercury';

let App = Application.App;
let channels = Application.channels;
let consoleWarn = console.warn;

describe('App', () => {
    beforeEach(() =>{
        sinon.stub(console,'warn');
    });

    afterEach(() => {
        console.warn = consoleWarn;
    });

    describe('#App', () => {
        it('should return a state.', () => {
            var state = App();
            expect(state.step()).to.equal(0);
        });
    });
    describe('#render', () => {
        it('should render the application.', () => {
            let state = hg.state({

                step: hg.value(0),
                hall: hg.varhash({
                    show: hg.value(false),
                    maxScore: hg.value(false),
                    playerName: hg.value(''),
                    submitted: hg.value(false),
                    scores: [
                        {name: 'Name1', points: 1},
                        {name: 'Name2', points: 60},
                        {name: 'Name3', points: 2, isMyScore: true},
                        {name: 'Name4', points: 2},
                        {name: 'Name5', points: 15},
                    ]
                }),
                forceRender: hg.value(0),
                channels: Application.channels
            });
            var output = App.render(state);
            expect(output.children.length).to.equal(6);
        });
    });
    describe('#channels.selectTile', () => {
        it('should step up if correct tile is selected.', () => {
            let state = hg.state({

                step: hg.value(0),
                hall: hg.varhash({
                    show: hg.value(false),
                    maxScore: hg.value(false),
                    playerName: hg.value(''),
                    submitted: hg.value(false),
                    scores: hg.value([
                        {name: 'Name1', points: 1},
                        {name: 'Name2', points: 60},
                        {name: 'Name3', points: 2, isMyScore: true},
                        {name: 'Name4', points: 2},
                        {name: 'Name5', points: 15},
                    ])
                }),
                forceRender: hg.value(0),
                channels: Application.channels
            });
            Application.setGame(new Game(0, 1));
            Application.channels.selectTile(state, {index: 1});
            expect(state.step()).to.equal(1);
            expect(state.hall.show()).to.equal(false);
        });
        it('should display hall of fame if tile is wrong.', () => {
            let state = hg.state({

                step: hg.value(0),
                hall: hg.varhash({
                    show: hg.value(false),
                    maxScore: hg.value(false),
                    playerName: hg.value(''),
                    submitted: hg.value(false),
                    scores: hg.value([
                        {name: 'Name1', points: 1},
                        {name: 'Name2', points: 60},
                        {name: 'Name3', points: 2, isMyScore: true},
                        {name: 'Name4', points: 2},
                        {name: 'Name5', points: 15},
                    ])
                }),
                forceRender: hg.value(0),
                channels: Application.channels
            });
            Application.setGame(new Game(0, 1));
            Application.channels.selectTile(state, {index: 0});
            expect(state.step()).to.equal(0);
            expect(state.hall.show()).to.equal(true);
        });
        it('should prevent the action if hall of fame is displayed.', () => {
            let state = hg.state({

                step: hg.value(0),
                hall: hg.varhash({
                    show: hg.value(true),
                    maxScore: hg.value(false),
                    playerName: hg.value(''),
                    submitted: hg.value(false),
                    scores: hg.value([
                        {name: 'Name1', points: 1},
                        {name: 'Name2', points: 60},
                        {name: 'Name3', points: 2, isMyScore: true},
                        {name: 'Name4', points: 2},
                        {name: 'Name5', points: 15},
                    ])
                }),
                forceRender: hg.value(0),
                channels: Application.channels
            });
            Application.setGame(new Game(0, 1));
            Application.channels.selectTile(state, {index: 1});
            expect(state.step()).to.equal(0);
            expect(state.hall.show()).to.equal(true);
        });
        it('should display the hall of fame with the max score text.', () => {
            let state = hg.state({

                step: hg.value(50),
                hall: hg.varhash({
                    show: hg.value(false),
                    maxScore: hg.value(false),
                    playerName: hg.value(''),
                    submitted: hg.value(false),
                    scores: hg.value([
                        {name: 'Name1', points: 1},
                        {name: 'Name2', points: 60},
                        {name: 'Name3', points: 2, isMyScore: true},
                        {name: 'Name4', points: 2},
                        {name: 'Name5', points: 15},
                    ])
                }),
                forceRender: hg.value(0),
                channels: Application.channels
            });
            Application.setGame(new Game(0, 1));
            Application.channels.selectTile(state, {index: 1});
            expect(state.step()).to.equal(51);
            expect(state.hall.show()).to.equal(true);
            expect(state.hall.maxScore()).to.equal(true);
        });
    });
    describe('#channels.updateName', () => {
            it('should update the name.', () => {
                let state = hg.state({

                    step: hg.value(0),
                    hall: hg.varhash({
                        show: hg.value(false),
                        maxScore: hg.value(false),
                        playerName: hg.value(''),
                        submitted: hg.value(false),
                        scores: hg.value([
                            {name: 'Name1', points: 1},
                            {name: 'Name2', points: 60},
                            {name: 'Name3', points: 2, isMyScore: true},
                            {name: 'Name4', points: 2},
                            {name: 'Name5', points: 15},
                        ])
                    }),
                    forceRender: hg.value(0),
                    channels: Application.channels
                });
                Application.setGame(new Game(0, 1));
                Application.channels.updateName(state, {name: 'NewName'});
                expect(state.hall.playerName()).to.equal('NewName');
                expect(state.hall.scores()[2].name).to.equal('NewName');
            });
        });

        describe('#channels.submitScores', () => {
            it('should submit the score.', () => {
                let state = hg.state({

                    step: hg.value(3),
                    hall: hg.varhash({
                        show: hg.value(false),
                        maxScore: hg.value(false),
                        playerName: hg.value('Myname'),
                        submitted: hg.value(false),
                        scores: hg.value([
                            {name: 'Name1', points: 1},
                            {name: 'Name2', points: 60},
                            {name: 'Name3', points: 2, isMyScore: true},
                            {name: 'Name4', points: 2},
                            {name: 'Name5', points: 15},
                        ])
                    }),
                    forceRender: hg.value(0),
                    channels: Application.channels
                });
                Application.setGame(new Game(0, 1));
                Application.channels.submitScore(state);
                expect(localStorage.lastStoredScore).to.equal('[{"name":"Myname","points":3}]');
            });
        });
        describe('#channels.closeHall', () => {
            it('should close the hall of fame and return to game.', () => {
                let state = hg.state({

                    step: hg.value(3),
                    hall: hg.varhash({
                        show: hg.value(false),
                        maxScore: hg.value(false),
                        playerName: hg.value('Myname'),
                        submitted: hg.value(false),
                        scores: hg.value([
                            {name: 'Name1', points: 1},
                            {name: 'Name2', points: 60},
                            {name: 'Name3', points: 2, isMyScore: true},
                            {name: 'Name4', points: 2},
                            {name: 'Name5', points: 15},
                        ])
                    }),
                    forceRender: hg.value(0),
                    channels: Application.channels
                });
                Application.setGame(new Game(0, 1));
                Application.channels.closeHall(state);
                expect(state.hall.show()).to.equal(false);
                expect(state.hall.submitted()).to.equal(false);
                expect(state.hall.playerName()).to.equal('');
            });
        });
});