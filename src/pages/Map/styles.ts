import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 20px;
    max-width: 1100px; 
    min-width: 65%; 
    
    border-radius: 20px 0 15px 0;
    
    background: #fff;
    display: flex;
    flex-direction: column;

    h1, h2, h3, h4 {
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

export const FormContainer = styled.div`
    background: #fff;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
        margin: 20px 0;
        width: 340px;
        text-align: center;

        h1 {
            margin-bottom: 24px;
        }

        a {
            color: #f4ede8;
            display: block;
            margin-top: 24px;
            text-decoration: none;

            transition: color 0.2s;

            &:hover {
                color: '#f4ede8';
            }
        }
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
    
    padding: 30px;
    border-radius: 10px 0 10px 0;
    background-color: coral;
    
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: center;

    .title {
        height: 20px;
        padding: 20px;
        display: flex;
        width: 100%;
        border: 1 solid;
    }

    .latlng {
        margin: 5px;

        display: flex;
        align-items: center;
        align-content: center;
        justify-content: space-between;
           
    }

    button {
        margin-top: 15px;
        margin-bottom: 5px;  
        border: 0;
        height: 0px;
        
        img {
            flex-direction: row;
            justify-content: right;
            align-items: flex-start;
            border-radius: 5px;

            transition: background 0.3s;

            &:hover{
                background: red;       
            }
        }
    } 
`;