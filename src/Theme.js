import { createMuiTheme } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] },
    secondary: { main: '#11cb5f' }
  },
  spacing: 16
});
