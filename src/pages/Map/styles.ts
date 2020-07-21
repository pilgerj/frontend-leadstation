import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 20px;
    max-width: 1100px; 
    min-width: 65%; 
    
    border-radius: 20px 0 15px 0;
    
    background: #fff;
    display: flex;
    flex-direction: column;

    h1 {
        display: flex;
    flex-direction: column;
  
    align-content: center;
    align-items: center;
    margin-bottom: 5px;
    margin-top: 10px;

    font-family: Roboto, Arial, Helvetica, sans-serif;
    
    }

    
`;

export const LeafletMapContainer = styled.div`
    padding: 10px;
    background: #fff;
    border-radius: 20px 20px 0 0;

    width: 100%;
    min-width: 500px;
    height: 100%;
    
    display: flex; 
    align-content: center;
    align-items: center;
    justify-content: center;
    min-inline-size: auto;
`;

export const FormContainer = styled.form`
    background: #fff;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    
    legend {
        width: 100%;
        margin-bottom: 20px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    input {
        padding: 20px;
        width: 35%;
        min-width: 300px;

        font-size: 20px;
        margin-bottom: 5px;

        border-radius: 10px;

        align-items: center;
        justify-content: space-between;
        display: flex;
    }

    button {
        width: 50%;
        padding: 20px;
        margin-top: 10px;
        margin-bottom: 30px;
        width: 35%;
        min-width: 300px;

        border-radius: 10px;
        border: 0;
    } 
`;

export const MarkedPointsContainer = styled.div`
    background: #fff;
    width: 100%;
    padding: 20px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
`;

export const MarkedPoint = styled.div`
    width: 35%;
    min-width: 320px;
    min-height: 10%;
    height: 20%;
    padding: 30px;
    border-radius: 10px 0 10px 0;
    background-color: coral;

    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: center;

    #title {
        padding: 3px;
        display: flex;
        width: 100%;
        border: 1 solid;
        font-family: Roboto, Arial, Helvetica, sans-serif;
    }

    #latlng {
        margin: 5px;

        display: flex;
        align-items: center;
        align-content: center;
        justify-content: space-between;
        font-family: Roboto, Arial, Helvetica, sans-serif;    
    }

    button {
        margin-top: 10px;
        margin-bottom: 5px;  
        border: 0;
        height: 0px;
        
        img {
            flex-direction: row;
            justify-content: right;
            align-items: flex-start;
        }
    } 
`;