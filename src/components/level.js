import React from 'react';

function Level (props) {
    return(
        <div className="col-md-2">
            <div className="form-group">
            <label htmlFor="level">Level:</label>
            <select id="level" onChange={(e) => props.handleChange(e)} className="form-control">
                {
                    props.levels.map(level => {
                        return(
                            <option key={level.name} 
                                       value={level.name}>
                                {level.name}
                            </option>
                        )
                    })
                }
            </select>
            </div>
            <div className="form-group">
                <label htmlFor="mines">Options: <span id="spnTotalFlags"></span></label>
            </div>
            <input onClick={(e) => props.handleButtonClick(e)}
                    type="button" 
                    id="btnStart" 
                    className="btn btn-primary" 
                    value="Start!" />
        </div>
    )
}

export default Level;