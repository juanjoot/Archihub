import { makeStyles } from '@material-ui/core/';
import { Card, Typography, CardHeader, CardContent} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    position: 'relative',
    overflow: 'visible',
    marginBottom: theme.spacing(2),
    borderWidth: 0.1, borderColor: theme.palette.primary.main, borderStyle: 'solid',
    borderRadius: '16px',
    '& a': {
      color: theme.palette.secondary.main
    },
    '& a:hover': {
      color: theme.palette.secondary.dark
    }
  },
  selected: {
    maxWidth: "100%",
    position: 'relative',
    overflow: 'visible',
    marginBottom: theme.spacing(2),
    borderWidth: 0.1, borderColor: theme.palette.primary.main, borderStyle: 'solid',
    '& a': {
      color: theme.palette.secondary.main
    },
    '& a:hover': {
      color: theme.palette.secondary.dark
    }
  },
  ident: {
    position: 'absolute',
    top: '-14px',
    background: 'white',
    padding: '5px',
    fontSize: '11px',
    left: '10px',
    color: theme.palette.primary.main
  },

  header: {   
    paddingBottom: '5px'
  },
  content: {
    padding: '10px'
  }
}));

const ContenedorElemento = props => {
  const classes = useStyles();

  const {children , titulo} = props




  return (
 
    <Card variant="outlined"  className={classes.root}  style={props.style}>
      {titulo!=="" &&
        <Typography  className={classes.ident}  style={props.styleTitle}>
          {titulo}
        </Typography>
      }

      <CardHeader
      className={classes.header} style={props.styleHeader}
      />
      <CardContent  className={classes.content} style={props.styleContent} >
      {children }
      </CardContent>
    </Card>
  );
}


export default ContenedorElemento;

