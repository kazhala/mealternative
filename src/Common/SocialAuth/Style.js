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
    width: theme.spacing(19),
    height: theme.spacing(3),
    // paddingLeft: '1rem !important',
    // fontSize: '1rem !important',
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    opacity: '0.5',
    pointerEvents: 'none'
  },
  authFacebook: {
    width: theme.spacing(19),
    height: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4267B2',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.common.white,
    padding: theme.spacing(1),
    opacity: '0.5',
    pointerEvents: 'none'
  },
  socialIcon: {
    width: theme.spacing(2),
    height: theme.spacing(2)
  }
}));

export default useStyles;
