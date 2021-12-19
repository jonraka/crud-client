import styled from "styled-components"

const ModalStyle = styled.div`
    background-color: #00000057;
    color: white;
    width: 100%;
    left: 0;
    top: 0;
    position: fixed;
    min-height: 100vh;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;

    & > div {
        background-color: #113451;
        padding: 10px 50px;
    }
`;

export default function Modal() {
    return (
        <ModalStyle>
            <div>
                ggasdgs
            </div>
        </ModalStyle>
    )
};
