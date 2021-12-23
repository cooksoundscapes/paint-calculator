import React from "react"

const WallInput = props => {

    renderInputs = () => {
        props.labels.map( (lab, i) => {
            <React.Fragment key={i}>
            <label>{lab}</label>
            <input type='number' />
            </React.Fragment>
        })
    }

    return (
        <div>
            {renderInputs()}
        </div>
    )

}

export default WallInput;