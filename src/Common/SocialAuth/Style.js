import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  authSocial: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '80%'
  },
  authGoogle: {
    width: theme.spacing(17),
    height: theme.spacing(3),
    paddingLeft: '1rem !important',
    fontSize: '1rem !important',
    marginBottom: theme.spacing(1)
  }
}));

export default useStyles;
