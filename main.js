import {MatchGrid} from "./models/MatchGrid.js";
import {GridItem} from "./models/GridItem.js";
import {Game} from "./models/Game.js";

window.onload = () => {
    const startBtn = document.querySelector("#start_btn");
    const endBtn = document.querySelector("#end_btn");
    const replayBtn = document.querySelector("#replay_btn");

    // const grid = document.querySelector("#playground-grid");

    customElements.define('grid-item', GridItem, {extends: 'div'});

    const grid = new MatchGrid();
    const game = new Game(grid);
    game.start();

}
