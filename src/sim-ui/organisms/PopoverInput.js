import { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SmsIcon from "@material-ui/icons/Sms";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  popover: {
    padding: theme.spacing(2, 2, 2, 2),
    maxWidth: 250,
  },
  popoverTextField: {
    width: "100%",
  },
  margin: {
    margin: theme.spacing(1),
  },
  marginIcon: {
    marginRight: theme.spacing(1),
  },
  marginTitle: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    color: theme.palette.primary.main,
  },
  title: {
    color: theme.palette.primary.main,
  },
}));

const PopoverInput = (props) => {
  const [data, setData] = useState(
    props.data || {
      text: undefined,
    }
  );
  const classes = useStyles();
  
  return (
    <Popover
      open={props.anchor !== undefined}
      anchorEl={props.anchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <div className={classes.popover}>
        <Grid container spacing={1}>
          <Grid container item xs spacing={1}>
            <Grid className={classes.marginTitle} container item xs={12}>
              <Grid className={classes.marginIcon} item>
                <SmsIcon className={classes.icon} />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="subtitle1">
                  Agregar Texto
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.popoverTextField}
                onChange={(event) =>
                  setData({ ...data, text: event.target.value })
                }
                defaultValue={props.data && props.data.text}
                placeholder="Ingrese el texto"
                autoFocus={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} direction="row" justify="flex-end">
            <Button
              size="small"
              className={classes.margin}
              onClick={(e) => {
                props.onConfirm(e, "");
              }}
              variant="outlined"
              color="primary"
            >
              Cancelar
            </Button>

            <Button
              size="small"
              className={classes.margin}
              onClick={(e) => {
                props.onConfirm(e, data.text);
              }}
              variant="outlined"
              color="primary"
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </div>
    </Popover>
  );
};

export default PopoverInput;
