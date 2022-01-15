class Crossword {
    constructor(words) {
        this.words = words;
        const MAXSIZE = 10;
        this.grid = [...Array(MAXSIZE)].map(e => Array(MAXSIZE));
        this.isFilled = [...Array(MAXSIZE)].map(e => Array(MAXSIZE).fill(false));
    }

    generate() {
        return
    }

    static findCorrectGrids(c1, c2) {
        return
    }

    fillCell(letter, x, y) {
        this.grid[x][y] = letter
        this.isFilled[x][y] = true
    }

}