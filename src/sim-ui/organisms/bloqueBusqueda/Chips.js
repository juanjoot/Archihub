import { useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: 0,
    alignItems: 'center',

    "& > *": {
      margin: theme.spacing(0.5),
      border: `1px solid ${theme.palette.grey[300]}`,
    },

    "& .slug": {
      marginLeft: theme.spacing(2),
      fontWeight: 'bold',
      color: theme.palette.primary.main,
      border: 'none'
    }
  },
  chip: {
    backgroundColor: "white",
    color: theme.palette.primary.main,
    textTransform: "lowercase",
  },
}));

const Chips = (props) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.root} ml={2}>
        {props.total &&
          <div className="slug" style={{marginRight: 15}}>
            Total de resultados: ${props.total}
          </div>
        }
        {(props.tipo || props.temporalRange || props.dpto || props.fondo) &&
          <div className="slug">
            Filtros seleccionados: 
          </div>

        }
        {props.tipoViolencia && (
          <Chip
            className={classes.chip}
            label={props.tipoViolencia}
            variant="outlined"
            size="small"
            onDelete={() => {
              props.setTipoViolencia(null);
            }}
          />
        )}
        {props.tipoActores && (
          <Chip
            className={classes.chip}
            label={props.tipoActores}
            variant="outlined"
            size="small"
            onDelete={() => {
              props.setTipoActores(null);
            }}
          />
        )}
        {props.tipo && (
          <Chip
            className={classes.chip}
            label={props.tipo}
            variant="outlined"
            size="small"
            onDelete={() => {
              props.setTipo(null);
            }}
          />
        )}

        {props.temporalRange !== null && (
          <Chip
            className={classes.chip}
            size="small"
            label={props.temporalRange}
            onDelete={() => {
              props.setTemporalRange(null);
            }}
          />
        )}

        {props.dpto !== null && (
          <Chip
            className={classes.chip}
            size="small"
            label={props.dpto.nombre}
            onDelete={() => {
              props.setDpto(null);
            }}
          />
        )}

        {props.fondo !== null && (
          <Chip
            className={classes.chip}
            size="small"
            label={props.fondo.name}
            onDelete={() => {
              props.setFondo(null);
            }}
          />
        )}
      </Box>
    </>
  );
};

export default Chips;
