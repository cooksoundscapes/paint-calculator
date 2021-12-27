import { css } from "@emotion/react"

export default function FlexContainer(props) {
    return (
        <div css={css`
            display: flex;
            align-items: center;
            flex: 1;
            flex-wrap: wrap;
            border-radius: 4px;
        `}
        >{props.children}</div>
    )
}