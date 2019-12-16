import { createMuiTheme } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' } // This is just green.A700 as hex.
  }
});

