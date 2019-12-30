import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    width: '100%'
  },
  menuBarLayout: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 1rem'
  },
  layout: {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr'
  },
  contentRoot: {
    height: '100%',
    width: '100%',
    overflow: 'scroll'
  },
  offset: theme.mixins.toolbar
}));

export default useStyles;
