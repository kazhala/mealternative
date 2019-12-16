import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    height: '100vh',
    width: '100%'
  },
  layout: {
    display: 'grid',
    gridTemplateRows: '3rem auto',
    height: '100%'
  },
  contentRoot: {
    height: '100%'
  },
  offset: theme.mixins.toolbar
}));

export default useStyles;
