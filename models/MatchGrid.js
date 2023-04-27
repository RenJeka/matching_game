import {GridItem} from "./GridItem.js";

export class MatchGrid {

    _grid = document.querySelector("#playground-grid");

    _width;
    _height;
    _columnsNumber;
    _rowsNumber;
    _timeLimit;
    _themeColor;
    _themeFont;
    _maxWidth = 1000;
    _maxHeight = 1000;
    _maxColumns = 4;
    _maxRows = 4;
    _maxTime = 1000;
    _defaultThemeColor = '#002233';
    _defaultFontColor = '#000000';
    _gridGap = 5;
    _gridItems = [];

    get gridItems() {
        return this._gridItems;
    }

    set gridItems(value) {
        this._gridItems = value;
    }

    constructor(width, height, columnsNumber, rowsNumber, timeLimit, themeColor, themeFont) {

        this._columnsNumber = this._normalizeInteger(columnsNumber, this._maxColumns);
        this._rowsNumber = this._normalizeInteger(rowsNumber, this._maxRows);
        this._timeLimit = this._normalizeInteger(timeLimit, this._maxTime);
        this._width = this._normalizeWidth(width, this._maxWidth);
        this._height = this._normalizeHeight(height, this._maxHeight);
        this._themeColor = this._normalizeColor(themeColor, this._defaultThemeColor) ;
        this._themeFont = this._normalizeColor(themeFont, this._defaultFontColor) ;
    }


    createGrid() {
        this._setUpGrid();
        this._putItems();
    }

    _normalizeWidth(width, limit) {
        const gridWidth = this._normalizeInteger(width, limit);
        return gridWidth + (this. _columnsNumber * this._gridGap);
    }

    _normalizeHeight(height, limit) {
        const gridHeight = this._normalizeInteger(height, limit);
        return gridHeight + (this. _rowsNumber * this._gridGap);
    }

    _normalizeInteger(number, limit) {
        const currentNumber = parseInt(number);
        if (isNaN(currentNumber) || Math.abs(currentNumber) > limit) {
            return limit;
        }
        return Math.abs(parseInt(number));
    }

    _normalizeColor(strColor, defaultColor) {
        const colorHexRegex = /^#[0-9a-f]{6}/i;
        return colorHexRegex.test(strColor) ? strColor : defaultColor;
    }

    _countGridItems() {
        const userProposedItemsNumber = this._columnsNumber * this._rowsNumber;
        const maxItems = this._maxColumns * this._maxRows
        if (userProposedItemsNumber > 0 && userProposedItemsNumber < maxItems) {
            return userProposedItemsNumber;
        } else {
            return maxItems;
        }
    }

    get gridItemSize() {
        let  itemWidth = Math.round(this._width / this._columnsNumber) - this._gridGap;
        let  itemHeight = Math.round(this._height / this._rowsNumber) - this._gridGap;
        const MINIMAL_ITEM_WIDTH = 20;
        const MINIMAL_ITEM_HEIGHT = 20;

        if (itemWidth < MINIMAL_ITEM_WIDTH ) {
            itemWidth = MINIMAL_ITEM_WIDTH
        }

        if (itemHeight < MINIMAL_ITEM_HEIGHT ) {
            itemHeight = MINIMAL_ITEM_HEIGHT
        }

        return {
            width: itemWidth,
            height: itemHeight
        };
    }

    _setUpGrid() {
        const itemSize = this.gridItemSize;
        this._grid.style.width = this._width + 'px';
        this._grid.style.height = this._height + 'px';
        this._grid.style.gridTemplateColumns = `repeat(${this._columnsNumber }, ${itemSize.width}px)`;
        this._grid.style.gridTemplateRows = `repeat(${this._rowsNumber}, ${itemSize.height}px)`;
        this._grid.style.gap = `${this._gridGap}px`;
        this._grid.style.backgroundColor = this._themeColor;
        this._grid.style.color = this._themeFont;
    }

    _putItems() {
        const gridItemIdsSet =  GridItem.getConsistentIdsSet(this._countGridItems());
        const idTextPairsMap = GridItem.generateRandomIdPairsMap(gridItemIdsSet)
        console.log('idTextPairs:', idTextPairsMap);


        for (const gridItemId of gridItemIdsSet) {
            const gridItem = new GridItem(gridItemId, this.gridItemSize.width, this.gridItemSize.height);
            this._gridItems.push(gridItem);
            gridItem.setTextToItem(idTextPairsMap.get(gridItemId), 36);
            this._grid.appendChild(gridItem);
        }
    }



    // _getItem() {
    //     const gridItem = new GridItem(this.gridItemSize.width, this.gridItemSize.height);
    //     gridItem.style.width = this.gridItemSize.width + 'px';
    //     gridItem.style.height = this.gridItemSize.height + 'px';
    //
    // }




}
