import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextsmsTwoToneIcon from '@material-ui/icons/TextsmsTwoTone';



const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
        padding: theme.spacing(2, 2, 2, 2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    popoverTextField: {
        width: "100%",
    },
    margin: {
        margin: theme.spacing(1),
    },
    marginIcon: {
       // marginRight: theme.spacing(1),
    },
    marginTitle: {
        //marginBottom: theme.spacing(2),
    },
    icon: {
        color: theme.palette.primary.main,
    },
    title: {
        color: theme.palette.primary.main,
    }
}));


export default function TooltipInput(props) {
    const [data, setData] = useState(
        props.data || {
            text: undefined,
        }
    );
    const { title, title2, children, openPopup, setOpenPopup, onConfirmPopup } = props;
    const { color, onClick } = props;

    const classes = useStyles();

    

    return (
        <Dialog open={openPopup} maxWidth="md" className={classes.dialogWrapper}>
            <DialogTitle>
                <div>
                <Grid container item xs spacing={1}>
                    <Grid className={classes.marginTitle} container item xs={12}>
                    <Grid className={classes.marginIcon} item>
                    <TextsmsTwoToneIcon className={classes.icon} />
                    </Grid>
                    <Grid item>
                    <Typography variant="h5" gutterBottom component="div">
                       {title}
                    </Typography>
                    <Grid>
                    <Typography variant="subtitle1" gutterBottom component="div">
                       {title2}
                    </Typography>
                    </Grid>
                    </Grid>
                    </Grid>
                 </Grid>
                </div>
            </DialogTitle>
            <DialogContent>
                <div>
                <Grid container item xs spacing={2}>
                    <Grid container item xs={12}>
                        <TextareaAutosize
                            className={classes.popoverTextField}
                            style={{ width: 240 }}
                            minRows={5}
                            defaultValue={props.data && props.data.text}
                            placeholder="¿Que quieres contar?"
                            onChange={(event) =>
                              setData({ ...data, text: event.target.value })
                            }
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
              onClick={()=>{setOpenPopup(false)}}
              variant="outlined"
              color="primary"
            >
              Cancelar
            </Button>

            <Button
              size="small"
              className={classes.margin}
              onClick={(e)=>{setOpenPopup(false); onConfirmPopup(e, data.text)}}
              variant="outlined"
              color="primary"
            >
              Guardar
            </Button>
          </Grid>
            </div>
        </DialogContent>
       </Dialog >
    )


}