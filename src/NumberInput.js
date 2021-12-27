import { css } from '@emotion/react';
import PopOver from './PopOver';

export default function NumberInput(props) {
    return (
        <label css={css`
            display: inline-flex;
            flex-direction: column;
            flex-shrink: 1;
            margin: 8px;
            font-weight: bold;
            font-size: 16px;
            position: relative;
            & input {
                width: 6em;
                font-size: 18px;
                font-weight: regular;
                padding: 4px 8px;
                border: none;
                border-radius: 4px;
                ${props.errorMsg.length > 0 ? "color: red;" : null}
                &:hover {
                    background-color: #eee
                }
                &:focus {
                    background-color: #eee
                }
                transition: .2s;
                outline: none;
            }
            & hr {
                margin: 0;
                color: ${props.errorMsg.length > 0 ? "red" : " black"};
                border-style: solid;
            }
        `}>
            {props.label}
            <input 
                type='number' 
                onChange={props.onChange}
                value={props.onChange ? props.value.toFixed(2) : null}//preventing uncontrollable component
            />
            <hr/>
            {props.errorMsg.length > 0 ? 
                <PopOver type='error' position='bottom'>
                {props.errorMsg.map( (msg, id) => (
                    <p key={id}>{msg}</p>) 
                )}
                </PopOver> 
            : null}
        </label>
    )
}