import styled from 'styled-components';

export const MainDiv = styled.div`
    width: 100%;
    max-width: 1100px;
    min-width: 500px;
    margin: 0 auto;

    header {
        padding: 10px;
        width: 25%;
        min-width: 25%;
        border-radius: 20px 0 15px 0;

        background-color: coral;
        display: flex;
        justify-content: center;
        align-items: center;

        h1 {
            padding: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Roboto, Arial, Helvetica, sans-serif;
        }
    }

    .leaflet-container {
        width: 100%;
        height: 350px;
        border-radius: 20px 0 15px 0;
        
        align-content: center;
        align-items: center;
    }
`;