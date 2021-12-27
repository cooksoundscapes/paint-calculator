import {css} from "@emotion/react"

export default function RoundButton(props) {
    return( 
    <button
        onClick={props.onClick}
        css={css`
            border: none;
            box-shadow: 2px 2px 4px #20223099;
            border-radius: 50%;
            background-color: royalblue;
            color: white;
            font-weight: bold;
            font-size: 18px;
            width: ${props.size || 36}px;
            height: ${props.size || 36}px;
            &:hover {
                opacity: 0.7
            }
            transition: .2s;
        `}
        style={props.style}
    >
        {props.children}    
    </button>
    )
}