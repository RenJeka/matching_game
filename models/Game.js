
export class Game {

    _grid;
    _scoreHtmlElement;
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
        this.grid.createGrid();
        this.grid.gridItems.forEach((gridItem) => {
            gridItem.addEventListener('click', this._compareTwoItems.bind(this));
        });
        this.allPairs = this.grid.gridItems.length;
    }

    end() {
        this.grid.cleanGrid();
        this._setScoreToDefault();
    }

    replay() {
        this.end();
        this.start();
    }

    pause() {

    }

    _compareTwoItems(event) {
        // select 2 items
        // show match in console
        const gridItem = event.target;
        console.log('id:', event.target.getAttribute('id'));

        if (!this.selectedFirstItem) {
            this.selectedFirstItem = event.target;
        } else if (!this.selectedSecondItem) {
            this.selectedSecondItem = event.target;
            this._handleMatches();
        } else {
            this._clearItems();
            this.selectedFirstItem = event.target;
        }
        gridItem.selectItem();
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
