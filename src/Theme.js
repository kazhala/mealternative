import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    primary: { main: '#5e81ac' },
    secondary: { main: '#ebcb8b' },
    error: { main: '#bf616a' },
    background: { default: '#eceff4' }
  },
  spacing: 16,
  typography: {
    fontSize: 16
  }
});
