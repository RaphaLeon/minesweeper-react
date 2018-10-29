import React from 'react';
import Box from './box';

class Board extends React.Component {
    
    renderBox(box){
        return (
            <Box box={box} 
                 key={box.col}
                 handleClick={() => this.props.handleBoxClick(box)}
            />
        );
    }

    build(){
        let boxes = this.props.boxes;
        let board = [];
        for (let i = 0; i < boxes.length; i++){
          let rows = [];
          for (let j = 0; j < boxes[i].length; j++){
            rows.push(this.renderBox(boxes[i][j]));
          }
          board.push(<div className="board-row" key={i}>{rows}</div>)
        }
        return board;
    }
    
    render(){
        //console.log(this.props);
        return (
            <div className="col-md-10">
                <div id="board" readOnly={true}>
                {
                    this.build()
                }
                </div>
            </div>
        );
    }
}

export default Board;