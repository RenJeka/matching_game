export class GridItem extends HTMLDivElement{
    constructor(id, width, height, color) {
        super();
        this.setAttribute('id', id);
        this.style.width = parseInt(width) + 'px';
        this.style.height = parseInt(height) + 'px';
        this.style.backgroundColor = color || '#ffffff';
    }
}
