import styled from 'styled-components';
import { Grid, Paper } from '@material-ui/core';

export const Main = styled(Grid)`
  margin: 1em;
`;

export const Content = styled(Paper)`
  padding: 1em;
  display: flex;
  justify-content: center;
`;

export const MainContainer = styled(Grid)`
    display: flex;
    justify-content: center;
    width: 100vw;
`;