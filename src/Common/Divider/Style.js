import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  orDivider: {
    margin: theme.spacing(1, 0),
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      height: '1px',
      width: 'calc(100vw / 3)',
      background: 'rgba(0,0,0,0.5)',
      top: '50%',
      right: theme.spacing(2),
      opacity: '0.7'
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      height: '1px',
      width: 'calc(100vw / 3)',
      background: 'rgba(0,0,0,0.5)',
      top: '50%',
      left: theme.spacing(2)
    }
  }
}));

export default useStyles;
