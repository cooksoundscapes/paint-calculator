
import React, { useReducer } from "react";
import immer from 'immer';

const reducerActions = {
    add: (state, action) => {
        state.areas.push(action.areaModel);
    },
    delete: (state, action) => {
        state.areas.splice(action.index, 1);
    },
    change: (state, action) => {
        state.areas[action.row][action.param] = Math.max(0, parseFloat(action.value));

        const errState = state.error[action.row];
        const tests = Object.entries(action.rules).filter(r => typeof(r[1]) == 'function');
        //test area against all conditions on descriptor.rules;
        tests.forEach(([fname, func]) => {
            let err, errIndex;
            if (err = func(state.areas[action.row])) {
                //if error isn't in state;
                if ((errIndex = errState.findIndex(e => e.name === fname)) < 0) {
                    errState.push({name: fname, error: err})
                }
            }  else {
                //if error exists, remove it!
                if ((errIndex = errState.findIndex(e => e.name === fname)) >= 0) {
                    errState.splice(errIndex, 1);
                } 
            }
        })
        state.error[action.row] = errState;
    }
}

function init({initAreas, areaConfig}) {
    const initState = {
        areas: [],
        error: []
    }
    if (initAreas) {
        for (let i = 0; i < initAreas; i++) {
            initState.areas.push(areaConfig);
            initState.error.push([])
        }
    }
    return initState;
}

function reducer(state, action) {
    const func = reducerActions[action.type];
    if (func) return immer(state, draftState => func(draftState, action));
    else throw Error("Valid actions are: 'add', 'delete', 'change'.");
}

const AreaForm = props => {
    const [state, dispatch] = useReducer(reducer, props, init);

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

    const changeValue = (value, row, param, rules) => {
        if (!value) return;
        dispatch({
            type: "change",
            row: row,
            param: param,
            value: value,
            rules: rules
        })
    }

    const generateFields = () => state.areas.map( (area, i) => {
        
        const params = Object.entries(area).filter( ([fname, fval]) => (
            typeof(fval) === "number"
        ))
        return (
            <div key={i}>
                <button onClick={() => deleteRow(i)}
                > - </button>
                {
                    params.map( ([pname, pvalue],ind) => { 
                        return(
                        <React.Fragment key={ind}>
                            <label>{pname+': '}</label>
                            <input 
                                type="number"
                                onChange={e => {
                                    changeValue(e.target.value, i, pname, area.rules)
                                }} 
                                value={pvalue}
                            />
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

    const calculateTotal = () => {
        let total = 0;
        state.areas.forEach( area => {
            total += area.totalArea(area);
        })
        return total;
    }

    return (
        <>
        {generateFields()}
        <p>Total solid area: {calculateTotal()}</p>
        </>
    )
}
        
export default AreaForm