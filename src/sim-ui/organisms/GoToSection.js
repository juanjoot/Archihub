import { Typography, Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  section: {
    padding: '80px 0 60px 0',
    minHeight: '250px',
    position: 'relative',
    color: '#2A5080',
  },
  sectionRight:{
    textAlign: 'right'
  },
  container: {
    padding: '0 32px',
    display: 'flex',
  },
  containerRight: {
    justifyContent: 'end'
  },
  textContainer : {
    maxWidth: '60%'
  },
  header : {
    fontWeight: '600',
    lineHeight: '0.9',
    [theme.breakpoints.down("450")]: {
      fontSize: "2.8rem",
    }
  },
  img : {
    position: 'absolute',
    bottom: '-20px',
    right: 0,
    width: '42%',
    height: 'auto',
    maxHeight: '90%',
    objectFit: 'contain',
    objectPosition: 'bottom right',
  },
  imgRight: {
    left: 0,
    objectPosition: 'bottom left'
  },
  btn : {
    backgroundColor: '#2A5080',
    color: 'white',
    marginTop: '10px',
    letterSpacing: '0.5px'
  }
}));

const GoToSection = ({title, description, img, direction, path }) => {
  const classes = useStyles();
  return (
    <article className={`${classes.section} ${direction === 'right' ? classes.sectionRight:''}`}>
      <Container className={`${classes.container} ${direction === 'right' ? classes.containerRight:''}`}>
        <div className={classes.textContainer}>
          <Typography variant="h3" className={classes.header}>{title}</Typography>
          <Typography variant="body1">{description}</Typography>
          <Link to={path}>
            <Button variant="contained" size="small" className={classes.btn}>Conocer</Button>
          </Link>
        </div>
      </Container>
      <img className={`${classes.img} ${direction === 'right' ? classes.imgRight:''}`} src={img} alt={title}/>
    </article>
  )
}

export default GoToSection