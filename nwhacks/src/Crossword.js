export class Crossword {
    constructor(words, num) {
        this.words = [...words];
        shuffle(this.words);
        this.verticalWords = [];
        this.horizontalWords = [];
        this.attachableChars = {};
        this.grid = [[]];
        this.dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

        let horizontal = true;
        for (let i = 0; i < num; i++) {
            if (this.words.length === 0) {
                console.log("No additional words can be added");
                break;
            }
            if (!this.addWord(horizontal)) {
                if (!this.addWord(!horizontal)) {
                    console.log("No additional words can be added");
                    break;
                }
                horizontal = !horizontal;
            }
            horizontal = !horizontal;
        }

        this.gridStarts = [[]]
        for (let i = 0; i < this.grid.length; i++) {
            let temp = [];
            for (let j = 0; j < this.grid[0].length; j++) {
                let pair = [false, false];
                if (this.isHoriStart(i, j)) {
                    pair[0] = true;
                }
                if (this.isVertStart(i, j)) {
                    pair[1] = true;
                }
                temp.push(pair);
            }
            this.gridStarts.push(temp);
        }
    }

    addWord(isHorizontal) {
        if (this.horizontalWords.length == 0) {
            let word = this.words[0]
            this.words.shift();

            for (let i = 0; i < word.length; i++) {
                let char = word.charAt(i)
                this.grid[0].push(char);
                this.addChar(char, 0, i, true)
            }
            this.horizontalWords.push(word);
            return true;
        }

        let tempWords = [...this.words];
        for (let i = 0; i < tempWords.length; i++) {
            let word = tempWords[i];
            for (let j = 0; j < word.length; j++) {
                let char = word.charAt(j);
                if (this.attachableChars[char] === undefined || this.attachableChars[char].length === 0) {
                    continue;
                }

                for (let k = 0; k < this.attachableChars[char].length; k++) {
                    let coord = this.attachableChars[char][k];
                    if (coord[2] === isHorizontal) {
                        continue;
                    }
                    if (this.testCoord(word, j, coord, isHorizontal)) {
                        let newCoord = this.extendGrid(word, j, coord, isHorizontal);
                        if (isHorizontal) {
                            this.horizontalWords.push(word);
                        } else {
                            this.verticalWords.push(word);
                        }
                        this.words.splice(i, 1);
                        this.attachableChars[char].splice(k, 1);
                        this.addChars(word, j, newCoord, isHorizontal);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    addChar(char, i, j, isHorizontal) {
        if (this.attachableChars[char] === undefined) {
            this.attachableChars[char] = []
        }
        this.attachableChars[char].push([i, j, isHorizontal])
    }

    testCoord(word, charIndex, coord, isHorizontal) {
        if (isHorizontal) {
            for (let i = 1; i < charIndex + 1; i++) {
                if (coord[1] - i < 0) {
                    break;
                }
                if (!this.checkAround([coord[0], coord[1]-i], 0)) {
                    return false;
                }
            }
            for (let i = 1; i < word.length - charIndex; i++) {
                if (coord[1] + i >= this.grid[0].length) {
                    break;
                }
                if (!this.checkAround([coord[0], coord[1]+i], 1)) {
                    return false;
                }
            }
        } else {
            for (let i = 1; i < charIndex + 1; i++) {
                if (coord[0] - i < 0) {
                    break;
                }
                if (!this.checkAround([coord[0]-i, coord[1]], 2)) {
                    return false;
                }
            }
            for (let i = 1; i < word.length - charIndex; i++) {
                if (coord[0] + i >= this.grid.length) {
                    break;
                }
                if (!this.checkAround([coord[0]+i, coord[1]], 3)) {
                    return false;
                }
            }
        }
        return true;
    }

    checkAround(coord, comingFrom) {
        if (this.grid[coord[0]][coord[1]]) {
            return false;
        }
        for (let i = 0; i < 4; i++) {
            if (i !== comingFrom) {
                let dir = this.dirs[i];
                if (coord[0]+dir[0] < 0 || coord[0]+dir[0] >= this.grid.length || coord[1]+dir[1] < 0 || coord[1]+dir[1] >= this.grid[0].length) {
                    continue;
                }
                if (this.grid[coord[0] + dir[0]][coord[1] + dir[1]]) {
                    return false;
                }
            }
        }
        return true;
    }

    extendGrid(word, charIndex, coord, isHorizontal) {
        let newCoord = [coord[0], coord[1]]
        if (isHorizontal) {
            let left = charIndex - coord[1];
            let right = (word.length - charIndex - 1 + coord[1]) + 1 - this.grid[0].length;
            if (left < 0) {
                left = 0;
            }
            if (right < 0) {
                right = 0;
            }
            for (let i = 0; i < left; i++) {
                for (let j = 0; j < this.grid.length; j++) {
                    this.grid[j].unshift(null);
                }
            }
            for (let i = 0; i < right; i++) {
                for (let j = 0; j < this.grid.length; j++) {
                    this.grid[j].push(null);
                }
            }

            for (const key in this.attachableChars) {
                let coords = this.attachableChars[key];
                for (let i = 0; i < coords.length; i++) {
                    coords[i] = [coords[i][0], coords[i][1] + left, coords[i][2]];
                }
            }
            newCoord = [newCoord[0], newCoord[1] + left];
        } else {
            let up = charIndex - coord[0];
            let down = (word.length - charIndex - 1 + coord[0]) + 1 - this.grid.length;
            if (up < 0) {
                up = 0;
            }
            if (down < 0) {
                 down = 0;
            }
            for (let i = 0; i < up; i++) {
                let nulls = new Array(this.grid[0].length).fill(null);
                this.grid.unshift([...nulls]);
            }
            for (let i = 0; i < down; i++) {
                let nulls = new Array(this.grid[0].length).fill(null);
                this.grid.push([...nulls]);
            }

            for (const key in this.attachableChars) {
                let coords = this.attachableChars[key];
                for (let i = 0; i < coords.length; i++) {
                    coords[i] = [coords[i][0] + up, coords[i][1], coords[i][2]];
                }
            }
            newCoord = [newCoord[0]+up, newCoord[1]];
        }
        return newCoord;
    }

    addChars(word, charIndex, coord, isHorizontal) {
        if (isHorizontal) {
            for (let i = 1; i < charIndex + 1; i++) {
                this.addChar(word.charAt(charIndex-i), coord[0], coord[1]-i, isHorizontal);
                this.grid[coord[0]][coord[1]-i] = word.charAt(charIndex - i);
            }
            for (let i = 1; i < word.length - charIndex; i++) {
                this.addChar(word.charAt(charIndex+i), coord[0], coord[1]+i, isHorizontal);
                this.grid[coord[0]][coord[1]+i] = word.charAt(charIndex + i);
            }
        } else {
            for (let i = 1; i < charIndex + 1; i++) {
                this.addChar(word.charAt(charIndex-i), coord[0]-i, coord[1], isHorizontal);
                this.grid[coord[0]-i][coord[1]] = word.charAt(charIndex - i);
            }
            for (let i = 1; i < word.length - charIndex; i++) {
                this.addChar(word.charAt(charIndex+i), coord[0]+i, coord[1], isHorizontal);
                this.grid[coord[0]+i][coord[1]] = word.charAt(charIndex + i);
            }
        }
    }

    isHoriStart(i, j) {
        if (j + 1 >= this.grid[0].length) {
            return false;
        }
        if ((j - 1 < 0 || this.grid[i][j-1] === null) && this.grid[i][j] !== null) {
            return true;
        }
    }

    isVertStart(i, j) {
        if (i + 1 >= this.grid.length) {
            return false;
        }
        if ((i - 1 < 0 || this.grid[i-1][j] === null) && this.grid[i][j] !== null) {
            return true;
        }
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function testCrossword() {
    let test = new Crossword([
        "autonomy",
        "irk",
        "abstruse",
        "impregnable",
        "mercenary",
        "becoming",
        "futile",
        "furtive",
        "acclaim",
        "aboveboard",
        "contrite",
        "retiring",
        "iconoclastic",
        "redundant",
        "impugn",
        "ineffable",
        "debunk",
        "extolling",
        "voluble",
        "loquacious",
        "gregarious",
        "didactic",
        "obstreperous",
        "mollify",
        "esoteric",
        "languorous",
        "lethargic",
        "officious",
        "tenacity",
        "veracity"
    ], 30);
    for (let i = 0; i < test.grid.length; i++) {
        for (let j = 0; j < test.grid[0].length; j++) {
            if (test.grid[i][j]) {
                process.stdout.write(test.grid[i][j] + " ");
            } else {
                process.stdout.write("  ");
            }
        }
        process.stdout.write("\n");
    }
    console.log("Vertical words: "+test.verticalWords);
    console.log("Horizontal words: "+test.horizontalWords);
}
