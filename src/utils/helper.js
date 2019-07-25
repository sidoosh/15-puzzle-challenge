
/**
 * Gets specific cell by row and column
 *
 */
function getCell(cell) {

    return document.querySelector(`button[value^="${cell}"]`);

}


/**
* Gets all adjacent cells
*
*/
export function getAdjacentCells(cell) {

    const val = cell.value.split('-');
    // Gets cell position indexes
    const row = parseInt(val[0]);
    const col = parseInt(val[1]);

    let adjacent = [];

    // Gets all possible adjacent cells
    if (row < 3) { adjacent.push(getCell(`${row + 1}-${col}`)); }
    if (row > 0) { adjacent.push(getCell(`${row - 1}-${col}`)); }
    if (col < 3) { adjacent.push(getCell(`${row}-${col + 1}`)); }
    if (col > 0) { adjacent.push(getCell(`${row}-${col - 1}`)); }

    return adjacent;

}

export function getEmptyAdjacentCell(cell) {

    // Gets all adjacent cells
    let adjacent = getAdjacentCells(cell);

    // Searches for empty cell
    for (let i = 0; i < adjacent.length; i++) {
        if (adjacent[i].className === "empty") {
            return adjacent[i];
        }
    }

    // Empty adjacent cell was not found
    return false;

}

export function checkOrder(boardState) {

    // Checks if the empty cell is in correct position
    if (!(boardState.indexOf('3-3-16') === 15)) {
        return;
    }

    // Goes through all cells and checks numbers
    let counter = -1;
    boardState.forEach((element, index) => {
        let [row, col, val] = element.split('-');

        if (index % 4 === 0) {
            ++counter;
        }
        if ((parseInt(row) !== counter) || parseInt(col) !== index % 4 || parseInt(val) !== index + 1) {
            return;
        }
    })

    return 'Congrats, You did it!';
}

export function rand(from, to) {

    return Math.floor(Math.random() * (to - from + 1)) + from;

}

export function getEmptyCell() {

    return document.querySelector('.empty');

}

//Scrambles puzzle

export const scramble = (fn) => {
    let previousCell;
    let i = 1;
    let interval = setInterval(function () {
        if (i <= 100) {

            let emptyCell = getEmptyCell();
            let adjacent = getAdjacentCells(emptyCell);

            if (previousCell) {
                for (let j = adjacent.length - 1; j >= 0; j--) {
                    if (adjacent[j].value === previousCell.value) {
                        adjacent.splice(j, 1);
                    }
                }
            }
            // Gets random adjacent cell and memorizes it for the next iteration
            previousCell = adjacent[rand(0, adjacent.length - 1)];
            fn(previousCell);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 5);

}