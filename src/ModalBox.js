import { css } from '@emotion/react';

export default function ModalBox(props) {
    return (
        <div css={css`
            box-shadow: 2px 2px 6px 1px #12001255;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 85vw;
            margin: 4vh auto;
            padding: 16px;
            border-radius: 8px;
            background-color: white
        `}>
            {props.children}
        </div>
    )
}