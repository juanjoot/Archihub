import { makeStyles } from '@material-ui/core/styles'
import { Grid } from "@material-ui/core";
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Cancel from '@material-ui/icons/Cancel'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'

const useStyles = makeStyles((theme) => ({
    flexCard: {
        display: 'flex'
    },
    containerGrid: {
        padding: "10px 5px 5px 5px"
    },
    message: {
        padding: "10px"
    }
}));

const RecursosSeleccionados = props => {
    const classes = useStyles();
    const { handleCancel, handleAggregate, selected } = props;

    return (
        <>
            {selected > 0 ?
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    className={classes.containerGrid}
                >

                    <Grid item xs={12}>
                        <Card className={classes.flexCard} variant="outlined">
                            {selected > 1 ?
                            <Typography variant="subtitle1" gutterBottom color="primary" className={classes.message} >
                                  Se han seleccionado {selected} elementos                          
                            </Typography>
                              :null}
                            {selected == 1 ?
                            <Typography variant="subtitle1" gutterBottom color="primary" className={classes.message} >
                                  Se ha seleccionado un elemento                         
                            </Typography>
                              :null}
                            <Button autoFocus color="primary" onClick={handleAggregate} >
                                <AddCircleOutline />
                                Agregar
                            </Button>
                            <Button autoFocus color="default" onClick={handleCancel} >
                                <Cancel />
                                Cancelar
                            </Button>
                        </Card>

                    </Grid>

                </Grid>
            :null}
        </>

    )
}

export default RecursosSeleccionados

