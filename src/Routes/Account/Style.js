import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  // root
  accountRoot: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(1),
    display: 'grid',
    gridTemplateRows: '1fr 5fr',
    gridTemplateColumns: '1fr',
    gridGap: theme.spacing(1),
    overflowX: 'hidden',
    overflowY: 'scroll',
    position: 'relative'
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
    alignItems: 'center',
    overflowY: 'hidden'
  },
  tabPanel: {
    height: '100%',
    width: '100%',
    overflowY: 'auto'
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

  // card display in bookmark and recipe tab
  tabRoot: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    alignItems: 'center',
    '& > :last-child:after': {
      display: 'block',
      height: '1rem',
      marginBottom: '-1rem',
      content: '""'
    }
  },
  tabCard: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '2.5fr 3fr',
    marginBottom: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '2px 2px 2px #ccc'
    }
  },
  cardThumb: {
    height: '100%',
    width: '100%',
    borderRadius: theme.shape.borderRadius
  },
  cardRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: theme.spacing(0.5)
  },
  cardText: {
    display: '-webkit-box',
    lineClamp: 2,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    boxOrient: 'vertical'
  },
  cardMisc: {
    display: 'flex',
    alignItems: 'center',
    opacity: '0.8'
  },

  // bookmarks
  bookmarkOtherData: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bookmarkAvatar: {
    height: theme.spacing(2),
    width: theme.spacing(2)
  },

  // recipes tab
  recipeAction: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(0.5),
    width: '100%'
  },

  // password tab
  passwordTitle: {
    margin: theme.spacing(1, 0)
  },
  passwordInput: {
    margin: theme.spacing(1, 0)
  },

  // common
  inputFields: {
    marginTop: theme.spacing(1)
  },
  fileInput: {
    display: 'none'
  }
}));

export default useStyles;
