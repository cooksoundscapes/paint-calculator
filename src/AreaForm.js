
import React, { useReducer } from "react";
import immer from 'immer';

const reducerActions = {
    add: (state, action) => {
        state.areas.push(action.wallModel);
    },
    delete: (state, action) => {
        state.areas.splice(action.index, 1);
    },
    change: (state, action) => {
        state.areas[action.row][action.param] = parseFloat(action.value);
    }
}

const initState = {
    areas: []
}

function init({initAreas, areaConfig}) {
    if (initAreas) {
        for (let i = 0; i < initAreas; i++) {
            initState.areas.push(areaConfig);
        }
    }
}

function reducer(state, action) {
    const func = reducerActions[action.type];
    if (func) return immer(state, draftState => func(draftState, action));
    else throw Error("Valid actions are: 'add', 'delete', 'change'.");
}

const AreaForm = props => {
    const [state, dispatch] = useReducer(reducer, initState, init(props));

    const addRow = () => {
        dispatch({
            type: "add",
            areaModel: props.areaConfig
        });
    }

    const deleteRow = (i) => {
        dispatch({
            type: "delete",
            index: i
        })
    }

    const changeValue = (value, row, param) => {
        dispatch({
            type: "change",
            row: row,
            param: param,
            value: value
        })
    }

    return state.areas.map( (wall, i) => {
        //only accepts primitive values from keys;
        const params = Object.entries(wall).filter( p => typeof(p[1]) != "object");
        return (
            <div key={i}>
                <button onClick={() => deleteRow(i)}
                > - </button>
                {
                    params.map( (p,ind) => { 
                        return(
                        <React.Fragment key={ind}>
                            <label>{p[0]+': '}</label>
                            <input type="number"
                                onChange={e => changeValue(e.target.value, i, p[0])} 
                                value={p[1]}/>
                        </React.Fragment>
                        )
                    })
                }
                {i == state.areas.length -1 ? 
                    <button onClick={addRow}
                    > + </button> 
                    : null
                }
            </div>
        )
    })
}
        
export default AreaForm