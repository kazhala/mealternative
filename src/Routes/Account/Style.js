import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  // root
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

  // tab part
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
  },

  // individual tabs
  tabRoot: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    alignItems: 'center'
  },

  // profile update
  avatarDisplay: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    marginBottom: theme.spacing(1)
  },
  detailsAvatar: {
    display: 'flex',
    alignItems: 'center'
  },
  toggleButtonGroup: {
    marginRight: theme.spacing(0.5)
  },
  detailSubmitGroup: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },

  // bookmarks

  // common
  inputFields: {
    marginTop: theme.spacing(1)
  },
  fileInput: {
    display: 'none'
  }
}));

export default useStyles;
