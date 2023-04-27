import {MatchGrid} from "./classes/MatchGrid.js";
import {GridItem} from "./classes/GridItem.js";

window.onload = () => {
    const startBtn = document.querySelector("#start_btn");
    const endBtn = document.querySelector("#end_btn");
    const replayBtn = document.querySelector("#replay_btn");
    // const grid = document.querySelector("#playground-grid");


    /**
     * grid: MatchGrid — grid
     */





    customElements.define('grid-item', GridItem, {extends: 'div'});

    const grid = new MatchGrid();
    grid.createGrid();
}
