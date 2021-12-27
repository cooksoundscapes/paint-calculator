import { css, keyframes } from '@emotion/react';

const fadein = keyframes`
from {
    opacity: 0;
}
to {
    opacity: 1;
}
`

export default function PopOver(props) {
    return (
        <div css={css`
            color: white;
            background-color: ${props.type == 'error' ? 'red' : 'darkgrey'};
            border-radius: 4px;
            font-size: 14px;
            font-weight: 400;
            position: absolute;
            ${props.position == 'bottom' ? 'top: 3.75em;' : 'top: -3em;' }
            flex-shrink: 0;
            z-index: 10;
            padding: 4px;
            animation: ${fadein} .5s;
            & > p {
                margin: 0;
            }
        `}
        >
            {props.children}
        </div>
    )
}