import {MatchGrid} from "./models/MatchGrid.js";
import {GridItem} from "./models/GridItem.js";
import {Game} from "./models/Game.js";
import anime from "./libs/anime.es.js";

window.onload = () => {
    const startBtn = document.querySelector("#start_btn");
    const endBtn = document.querySelector("#end_btn");
    const replayBtn = document.querySelector("#replay_btn");
    const scoreElement = document.querySelector("#score-matches-number");



    const gridProperty = {
        width: 1000,
        height: 1000,
        columnsNumber: 4,
        rowsNumber: 4,
        timeLimit: 300,
        themeColor: '#002233',
        themeFont: '#000000',
    }
    const grid = new MatchGrid(gridProperty);
    const game = new Game(grid, scoreElement);

    // const grid = document.querySelector("#playground-grid");

    customElements.define('grid-item', GridItem, {extends: 'div'});


    startBtn.addEventListener('click', () => {
        game.start()
    });

    endBtn.addEventListener('click', () => {
        game.end()
    });

    replayBtn.addEventListener('click', () => {
        game.replay()
    });

    game.start();

    anime({
        targets: '.grid-item',
        translateX: 0,
        rotate: '1turn',
        backgroundColor: '#FFF',
        duration: 800
    });

}
