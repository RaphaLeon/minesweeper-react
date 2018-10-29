import React  from 'react';

import gameConfig from '../config';

import Level from './level';
import Board from './board';

class Game extends React.Component {
    state = {
        level: gameConfig.levels[0],
        isStarted: false,
        boxes: [],
    }
    selectedLevel = gameConfig.levels[0];

    //Event handlers
    handleLevelChange(e) {
        let {value} = e.target;       
        let level = gameConfig.levels.find(level => level.name === value)
        this.selectedLevel = level; 
    }
    
    handleBtnStartClick(e) {
        let boxes = this.buildBoard();
        this.setState({
            level: this.selectedLevel,
            isStarted: true,
            boxes: boxes,
        }, 
        () => {     
            //this.fillBoard()
            //setState is Asynchronous!
        });
    }

    handleBoxClick(box) {
        let updatedBoxes = this.state.boxes.slice();
        box.isEnabled = false;
        updatedBoxes[box.row][box.col] = box;
        this.setState({
            boxes: updatedBoxes 
        })
    }
    //

    Box = function(row, col) {
        this.row = row;
        this.col = col;
        this.value = 0;
        this.isEnabled = true;
        this.isFlagged = false;

        this.isAMine = function() {
            return this.value === gameConfig.MINE;
        }

        this.isEmpty = function() {
            return this.value === 0;
        }

        this.setFlag = function(value) {
            this.isFlagged = value;
        }
    }

    buildBoard() {
        let {cols, rows} = this.selectedLevel; //.state.level;
        let boxes = [];
        for (let i = 0; i <= rows; i++) {
            boxes.push([]);
            for (let j = 0; j <= cols; j++) {
                boxes[i][j] = new this.Box(i, j);
            }
        }
        this.fillBoard(boxes);
        return boxes;
    }

    fillBoard(board) {
        let minesRemaining = this.state.level.mines;
        let targetBox;
        let boxPerimeter;
        let { rows, cols } =  this.state.level;

        let getRandomBox = () => {
            let row = Math.floor((Math.random() * rows));
            let col = Math.floor((Math.random() * cols));
            return board[row][col];
        }

        while (minesRemaining > 0) {
            targetBox = getRandomBox();

            if (!targetBox.isAMine()) {
                targetBox.value = gameConfig.MINE;
                boxPerimeter = this.getBoxPerimeter(targetBox, board);
                boxPerimeter.forEach((box) => {
                    if (!box.isAMine())
                        box.value += 1;
                });
                minesRemaining -= 1;
            }
        }
    }

    getBoxPerimeter(box, board) {
        let rows = board.length;
        let cols = board[0].length;
        let rowFrom, rowTo, colFrom, colTo;
        let perimeter = [];

        if (box.row === 0) {
            rowFrom = box.row;
            rowTo = box.row + 1;
        } else if (box.row === rows) {
            rowFrom = box.row - 1;
            rowTo = box.row;
        } else {
            rowFrom = box.row - 1;
            rowTo = box.row + 1;
        }

        if (box.col === 0) {
            colFrom = box.col;
            colTo = box.col + 1;
        } else if (box.col === cols) {
            colFrom = box.col - 1;
            colTo = box.col;
        } else {
            colFrom = box.col - 1;
            colTo = box.col + 1;
        }

        for (let i = rowFrom; i <= rowTo; i++) {
            for (let j = colFrom; j <= colTo; j++) {
                let itrBox = board[i][j];
                if (itrBox !== box)
                    perimeter.push(itrBox);
            }
        }
        return perimeter;
    }

    
    getBox (row, col) {
        return this.state.boxes[row][col];
    }

    getRandomBox() {
        let row = Math.floor((Math.random() * this.state.level.rows));
        let col = Math.floor((Math.random() * this.state.level.cols));
        return this.getBox(row, col);
    }

    render() {
        return(
            <div className="container-fluid">
                <h3>MinesWeeper!</h3>
                <div className="row">
                    <div className="col-md-12">
                        <Level levels={gameConfig.levels} 
                               handleChange={(e) => this.handleLevelChange(e)}
                               handleButtonClick={(e) =>this.handleBtnStartClick(e)} 
                        />
                        <Board level={this.state.level} 
                               boxes={this.state.boxes}
                               handleBoxClick={(box) => this.handleBoxClick(box)}
                        />
                    </div>
                </div>
            </div>
        )
    }   

}

export default Game;