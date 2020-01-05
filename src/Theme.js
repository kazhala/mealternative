/*
  Global theme for Material Ui
*/
import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    primary: { main: '#1565c0' },
    secondary: { main: '#c62828' },
    background: { default: '#eceff4' }
  },
  spacing: 16,
  typography: {
    fontSize: 16
  }
});
