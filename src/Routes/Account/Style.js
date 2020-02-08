import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  accountRoot: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(1),
    display: 'grid',
    gridTemplateRows: '1fr 4fr',
    gridTemplateColumns: '1fr',
    gridGap: theme.spacing(1),
    overflowX: 'hidden',
    overflowY: 'scroll'
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
    height: theme.spacing(5.5),
    width: theme.spacing(5.5)
  },

  accountBottom: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  tabPanel: {
    height: '100%',
    width: '100%'
  }
}));

export default useStyles;
