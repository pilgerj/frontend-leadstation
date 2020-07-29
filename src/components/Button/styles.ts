import styled from 'styled-components';

export const Container = styled.button`
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    border: 1px solid;
    margin-top: 15px;

    transition: background-color 0.4s;
    
    &:hover {
        background: lightgreen;       
    }
`;