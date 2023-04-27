export class GridItem extends HTMLDivElement{
    constructor(id, width, height, color) {
        super();
        this.setAttribute('id', id);
        this.style.width = parseInt(width) + 'px';
        this.style.height = parseInt(height) + 'px';
        this.style.backgroundColor = color || '#ffffff';
        this.className = 'grid-item';
    }

    static getConsistentIdsSet(numberOfGridItems = 0) {
        const consistentIdsSet = new Set();
        for (let i = 0; i < numberOfGridItems; i++) {
            consistentIdsSet.add(i);
        }
        return consistentIdsSet;
    }

    static generateRandomText(textLength, characters= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
        characters = Array.isArray(characters) ? characters.join('') : characters.toString();
        let result = '';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < textLength) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    static getRandomTextSet(sizeOfSet= 1, idLength = 3) {
        const symbolsSet = new Set();
        for (let i = 0; i < sizeOfSet; i++) {
            symbolsSet.add(GridItem.generateRandomText(idLength))
        }
        return symbolsSet;
    }

    static generateRandomIdPairsMap(idSet = new Set([0]), textLength = 3) {
        const randomIdPairs = new Map();
        // Need half as much as the number of idSet to make pairs.
        const randomTextSet = GridItem.getRandomTextSet(Math.round(idSet.size / 2), textLength);
        const randomTextSetCopy = new Set(randomTextSet);
        // TODO: Shuffle SET copy
        let randomTextSetIterator = randomTextSet.values();
        for (const id of idSet) {
            let currentText = randomTextSetIterator.next();
            if (currentText.done) {
                randomTextSetIterator = randomTextSetCopy.values();
                currentText = randomTextSetIterator.next();
            }
            randomIdPairs.set(id, currentText.value);
        }
        return randomIdPairs;
    }

    setText(text, fontSize) {
        this.innerText = text.toString();
        this.style.fontSize = (Math.abs(parseInt(fontSize)) || 16) + 'px';
    }

}
