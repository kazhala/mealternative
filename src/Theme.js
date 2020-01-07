/*
  Global theme for Material Ui
*/
import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    primary: { main: '#1976D2' },
    secondary: { main: '#EF5350' },
    background: { default: '#eceff4' }
  },
  spacing: 16,
  typography: {
    fontSize: 16
  }
});
