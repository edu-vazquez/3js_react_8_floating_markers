import styled from "styled-components";

export const SceneContainer = styled.div`
    width: 100%;
    height: 100dvh;
    overflow: hidden;
`;
export const SceneWrapper = styled.div`
    width: 100%;
    height: 100dvh;
    position: relative;
`;

export const FloatPoint = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    &:hover{
        .float-point-text{
            opacity: 1;
            transition: 0.3s all ease;
        }
    }
`;

export const FloatPointLabel = styled.div`
    width: 40px;
    height: 40px;
    position: absolute;
    left: -20px;
    top: -20px;
    background-color: rgba(0,0,0,0.6);
    border-radius: 50%;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
    transition: 0.3s all ease;
    cursor: pointer;

    &:hover{
        transform: scale(1.3,1.3);
        background-color: rgba(0,0,0,0.9);
        transition: 0.3s all ease;
    }
`;

export const FloatPointText = styled.div`
    width: 120px;
    padding: 1rem;
    position: absolute;
    left: -60px;
    top: 30px;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    background-color: rgba(0,0,0,0.9);
    transition: 0.3s all ease;
    opacity: 0;
    border-radius: 20px;
    pointer-events: none;
`;
