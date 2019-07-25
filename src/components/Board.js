import React from 'react';
import Square from './Square';
import { getEmptyAdjacentCell, checkOrder, scramble } from '../utils/helper';
import './Board.css';

class Board extends React.Component {

    state = {
        boardState: []
    };

    renderSquare(style, i, j, n, className) {
        return (
            <Square
                key={`${i}-${j}`}
                value={`${i}-${j}-${n}`}
                buttonText={n}

                className={className}
                style={style}
                handleClick={this.handleClick}
            />
        );
    }

    solvedBoard = () => {
        this.squares = [];
        let n = 1;
        let boardState = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let style = {
                    left: `${j * 80 + 1}px`,
                    top: `${i * 80 + 1}px`
                }
                if (n <= 15) {
                    this.squares.push(this.renderSquare(style, i, j, n, "number"));
                    boardState.push(`${i}-${j}-${n}`);
                    n++;
                } else {
                    this.squares.push(<button className="empty" value={`${i}-${j}-${n}`} style={style}></button>);
                    boardState.push(`${i}-${j}-${n}`);
                }
            }
        }
        return boardState;
    }

    componentWillMount() {
        const boardState = this.solvedBoard();
        this.setState({ boardState });
    }

    componentDidMount() {
        scramble(this.moveCell);
    }

    handleClick = (e) => {
        e.preventDefault();
        this.moveCell(e.target);
    }

    handleBoardSolving = (e) => {
        e.preventDefault();
        const boardState = this.solvedBoard();
        this.setState({ boardState });
    }

    moveCell = (cell) => {
        // Checks if selected cell has number
        if (cell.className !== 'empty') {

            // Tries to get empty adjacent cell
            let emptyCell = getEmptyAdjacentCell(cell);

            if (emptyCell) {

                let boardState = this.state.boardState.slice();
                const [cellRow, cellCol, cellValue] = cell.value.split('-');
                const [emptyCellRow, emptyCellCol, emptyCellValue] = emptyCell.value.split('-');
                const emptyCellPos = boardState.findIndex(val => val === emptyCell.value);
                const clickedCellPos = boardState.findIndex(val => val === cell.value);
                boardState[clickedCellPos] = `${cellRow}-${cellCol}-${emptyCellValue}`;
                boardState[emptyCellPos] = `${emptyCellRow}-${emptyCellCol}-${cellValue}`

                this.setState({ boardState });

            }
        }
    }

    componentWillUpdate(nextProps, nextState) {
        this.squares = [];
        const nextBoardState = nextState.boardState.slice();
        let counter = -1;

        nextBoardState.forEach((element, index) => {
            let [row, col, val] = element.split('-');

            if (index % 4 === 0) {
                ++counter;
            }

            let style = {
                left: `${(index % 4) * 80 + 1}px`,
                top: `${(counter * 80) + 1}px`
            }

            if (val === '16') {
                this.squares.push(<button className="empty" value={`${row}-${col}-16`} style={style}></button>);
            } else {
                this.squares.push(this.renderSquare(style, row, col, val, "number"));
            }
        });
    }

    render() {
        const isGameWon = checkOrder(this.state.boardState);
        return (
            <div>
                <div className="board">{this.squares}</div>
                <button className="scramble" onClick={() => scramble(this.moveCell)}>Scramble</button>
                <button className="solve" onClick={this.handleBoardSolving}>Solve</button>
                {isGameWon && <h3>{isGameWon}</h3>}
            </div>
        );
    }
}

export default Board;