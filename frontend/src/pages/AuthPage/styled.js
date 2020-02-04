import styled from 'styled-components';
import { Grid, Button } from '@material-ui/core';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 60%;
`;

export const Input = styled(Grid)`
    width: 100%;
    margin: .5em 1em;
`;

export const SubmitButton = styled(Button)`
    margin: 1em;
`;
