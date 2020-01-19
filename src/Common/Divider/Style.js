import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  orDivider: {
    margin: theme.spacing(2, 0),
    position: 'relative',
    textAlign: 'center',
    '&:before': {
      content: '""',
      position: 'absolute',
      height: '1px',
      width: 'calc(100vw / 3)',
      background: 'rgba(0,0,0,0.5)',
      top: '50%',
      right: theme.spacing(2),
      opacity: '0.7',
      [theme.breakpoints.up('sm')]: {
        width: 'calc(100vw / 3.5)'
      },
      [theme.breakpoints.up('md')]: {
        width: 'calc(100vw / 5)'
      },
      [theme.breakpoints.up('lg')]: {
        width: 'calc(100vw / 7)'
      }
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      height: '1px',
      width: 'calc(100vw / 3)',
      background: 'rgba(0,0,0,0.5)',
      top: '50%',
      opacity: '0.7',
      left: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        width: 'calc(100vw / 3.5)'
      },
      [theme.breakpoints.up('md')]: {
        width: 'calc(100vw / 5)'
      },
      [theme.breakpoints.up('lg')]: {
        width: 'calc(100vw / 7)'
      }
    }
  }
}));

export default useStyles;
