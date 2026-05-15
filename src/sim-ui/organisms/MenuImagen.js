import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  flexCard: {
    display: "flex",
    borderRadius: "15px",
    width: "100%",
    margin: "3rem 0 3rem 0",
  },
  cover: {
    width: "20rem",
  },
  details: {
    alignItems: "center",
    padding: theme.spacing(1),
    width: "80%",
  },
  content: {
    flex: "1 0 auto",
  },
  cardMediaStyle: {
    width: "20%",
  },
  "@media (max-width: 800px)": {
    details: {
      width: "70%",
    },
    cardMediaStyle: {
      width: "30%",
    },
  },
}));

//variant="outlined"

const MenuImagen = (props) => {
  const classes = useStyles();
  const { titulo, descripcion, imagen } = props;
  const [elevation, setElevation] = useState(2);

  const onMouseOverThis = () => {
    setElevation(20);
  };

  const onMouseOutThis = () => {
    setElevation(1);
  };

  return (
    <Card
      elevation={elevation}
      className={classes.flexCard}
      onMouseOver={onMouseOverThis}
      onMouseOut={onMouseOutThis}
    >
      <CardMedia
        className={classes.cardMediaStyle}
        component="img"
        image={imagen}
        alt={titulo}
      />
      {/*<div >
                    <svg style={{height:"6rem", width:"5rem"}}>
                        <use xlinkHref={toAbsoluteUrl("/media/cev/icons/icons.svg#icono-entrevista")} className="flia-green"></use>
                    </svg>
                </div>*/}
      <Box className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h4" variant="h4">
            {titulo}
          </Typography>
          <Typography variant="body2">{descripcion}</Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default MenuImagen;
