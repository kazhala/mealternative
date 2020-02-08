import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  accountRoot: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(1),
    display: 'grid',
    gridTemplateRows: '1fr 3.5fr',
    gridTemplateColumns: '1fr',
    gridGap: theme.spacing(1)
  },
  accountTop: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  accountAvatar: {
    height: theme.spacing(7),
    width: theme.spacing(7)
  },

  accountBottom: {
    width: '100%',
    height: '100%'
  }
}));

export default useStyles;
