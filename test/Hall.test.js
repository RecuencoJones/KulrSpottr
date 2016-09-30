var chai = require('chai');
var expect = chai.expect;

import Hall from '../src/Hall';


describe('Hall of fame', () => {
    describe('#render', () => {
        it('should render the hall of fame.', () => {
            let state = {
                step: 5,
                hall: {
                    show: true,
                    maxScore: false,
                    scores: [
                        {name:'Name1', points:1},
                        {name:'Name2', points:60},
                        {name:'Name3', points:2, isMyScore: true},
                        {name:'Name4', points:2},
                        {name:'Name5', points:15},
                    ]
                },
                channels: {

                }
            };
            let output = Hall.render(state);
            expect(output.properties.className).to.equal('hall hall--visible');
            expect(output.children[1].children[0].text).to.equal('Reached step 5.');
            expect(output.children[5].children[0].children.length).to.equal(5);

        });

        it('should render the hall of fame when is the max score for the device.', () => {
            let state = {
                step: 5,
                hall: {
                    show: true,
                    maxScore: true,
                    scores: [
                        {name:'Name1', points:1},
                        {name:'Name2', points:60},
                        {name:'Name3', points:2, isMyScore: true},
                        {name:'Name4', points:2},
                        {name:'Name5', points:15},
                    ]
                },
                channels: {

                }
            };
            let output = Hall.render(state);
            expect(output.properties.className).to.equal('hall hall--visible');
            expect(output.children[1].children[0].text).to.equal('Reached step 5. Max score in this device');
            expect(output.children[5].children[0].children.length).to.equal(5);

        });

        it('should not render if show is not set.', () => {
            let state = {
                step: 5,
                hall: {
                    show: false,
                    maxScore: false,
                    scores: [
                        {name:'Name1', points:1},
                        {name:'Name2', points:60},
                        {name:'Name3', points:2, isMyScore: true},
                        {name:'Name4', points:2},
                        {name:'Name5', points:15},
                    ]
                },
                channels: {

                }
            };
            let output = Hall.render(state);
            expect(output.properties.className).to.equal('hall');
            expect(output.children[1].children[0].text).to.equal('Reached step 5.');
            expect(output.children[5].children[0].children.length).to.equal(5);

        });
    });

    describe('#sort', () => {
        it('should sort a score list.', () => {
            let unsortedScores = [
                {name:'Name1', points:1},
                {name:'Name2', points:60},
                {name:'Name3', points:2},
                {name:'Name4', points:2},
                {name:'Name5', points:15},
            ];

            let sortedScores = unsortedScores.sort(Hall.sort);

            expect(sortedScores[0].name).to.equal('Name2');
            expect(sortedScores[1].name).to.equal('Name5');
            expect(sortedScores[2].name).to.equal('Name3');
            expect(sortedScores[3].name).to.equal('Name4');
            expect(sortedScores[4].name).to.equal('Name1');
        });
    });

    describe('#renderRankHelper', () => {
        it('should render player\'s rank.', () => {
            let state =  {
                hall: {
                    scores: [
                        {name:'Name1', points:1},
                        {name:'Name2', points:60},
                        {name:'Name3', points:2, isMyScore: true},
                        {name:'Name4', points:2},
                        {name:'Name5', points:15},
                    ]
                },
                channels: {

                }
            };

            let output = Hall.renderRankHelper(state);
            expect(output.children[0].text).to.equal('Rank #3');
        })
    })
});
