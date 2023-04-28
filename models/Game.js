import anime from "../libs/anime.es.js";

export class Game {

    _grid;
    _scoreHtmlElement;
    _gameInProcess = false;
    _selectedFirstItem = null;
    _selectedSecondItem = null;
    _isMatch = false;
    _allPairs = 0;
    _allMatched = 0;

    get grid() {
        return this._grid;
    }

    set grid(value) {
        this._grid = value;
    }

    get scoreElement() {
        return this._scoreElement;
    }

    set scoreElement(value) {
        this._scoreElement = value;
    }

    get gameInProcess() {
        return this._gameInProcess;
    }

    set gameInProcess(value) {
        this._gameInProcess = value;
    }


    get selectedFirstItem() {
        return this._selectedFirstItem;
    }

    set selectedFirstItem(value) {
        this._selectedFirstItem = value;
    }

    get selectedSecondItem() {
        return this._selectedSecondItem;
    }

    set selectedSecondItem(value) {
        this._selectedSecondItem = value;
    }

    get isMatch() {
        return this._isMatch;
    }

    set isMatch(value) {
        this._isMatch = value;
    }

    get allPairs() {
        return this._allPairs;
    }

    set allPairs(value) {
        this._allPairs = value;
    }

    get allMatched() {
        return this._allMatched;
    }

    set allMatched(value) {
        this._allMatched = value;
    }

    constructor(grid, scoreElement) {
        this._grid = grid;
        this._scoreElement = scoreElement;
    }

    start() {
        // if finished — new grid
        if (this.gameInProcess) {
            const needRestartGame = confirm('Game in Process, would You like to restart the game?');
            if (needRestartGame) {
                this.replay();
                return;
            } else {
                return;
            }
        }
        this.grid.createGrid();
        this.grid.gridItems.forEach((gridItem) => {
            gridItem.addEventListener('click', (event) => {
                    this._compareTwoItems(event)
                if (event.target.selected) {
                    // tslint:disable-next-line:no-console
                    console.log('selected');

                    anime({
                        // targets: event.target.querySelector('.grid-item_front'),
                        targets: event.target,
                        rotateY: {value: "-=180", delay: 100},
                        duration: 400,
                        easing: 'easeInOutSine'
                    }).play();
                } else {
                    console.log('unselected');
                    // anime({
                    //     targets: event.target.querySelector('.grid-item_front'),
                    //     rotateY: {value: "+=180"},
                    //     duration: 800,
                    //     easing: 'easeInOutSine'
                    // }).play();
                }

            });
            //
            // gridItem.addEventListener('click', anime({
            //     targets: gridItem,
            //     rotateY: {value: "+=180"},
            //     duration: 800,
            //     easing: 'easeInOutSine'
            // }).play);
        });
        this.allPairs = this.grid.gridItems.length;
        this.gameInProcess = true;
    }

    end() {
        this.grid.cleanGrid();
        this._setScoreToDefault();
        this.gameInProcess = false;
    }

    replay() {
        this.end();
        this.start();
    }

    pause() {

    }

    _compareTwoItems(event) {
        const currentItem = event.target;

        if (!this.selectedFirstItem) {
            this.selectedFirstItem = currentItem;
            currentItem.selectItem();
        } else if (!this.selectedSecondItem) {
            if (this.selectedFirstItem && this.selectedFirstItem.id !== currentItem.id) {
                this.selectedSecondItem = currentItem;
                this._handleMatches();
                currentItem.selectItem();
            }
        } else {
            this._clearItems();
            this.selectedFirstItem = currentItem;
            currentItem.selectItem();
        }
    }

    _handleMatches() {
        if (this._checkMatchItems()) {
            this.selectedFirstItem.markGuessed();
            this.selectedSecondItem.markGuessed();
            this.allMatched = this.allMatched + 1;
            this.scoreElement.innerText = this.allMatched;
        }

        console.log('this.allPairs: ', this.allPairs);
        console.log('this.allMatched: ', this.allMatched);
    }

    _checkMatchItems() {
        return this.selectedFirstItem?.text === this.selectedSecondItem?.text;
    }

    _clearItems() {
        this.grid.gridItems.forEach((gridItem) => {
            gridItem.unselectItem();
        });
        this.selectedFirstItem = null;
        this.selectedSecondItem = null;
    };

    _setScoreToDefault() {
        this.selectedFirstItem = null;
        this.selectedSecondItem = null;
        this.isMatch = false;
        this.allPairs = 0;
        this.allMatched = 0;
        this.scoreElement.innerText = this.allMatched;
    }


};
