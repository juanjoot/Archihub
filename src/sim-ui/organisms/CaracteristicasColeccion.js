import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChipInput from 'material-ui-chip-input';
import MapaMarcadores from './MapaMarcadores';
import RangoTiempo from './RangoTiempo';
import TituloSeccion from "./TituloSeccion";
import ContenedorElemento from "./ContenedorElemento";
import ChipsEliminables from "./ChipsEliminables";


import AddToPhotosTwoToneIcon from '@material-ui/icons/AddToPhotosTwoTone';
import RoomTwoToneIcon from '@material-ui/icons/RoomTwoTone';
import TimelineTwoToneIcon from '@material-ui/icons/TimelineTwoTone';


const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  chiInput: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  contenedorTitulo: {
    marginLeft: "8px",
    marginTop: "40px",
    marginBottom: "20px",
  },
  contenedorSubTitulo: {
    marginLeft: "5px",
    marginTop: "20px",
    marginBottom: "8px",
  }
}))

const CaracteristicasColeccion = props => {
  const classes = useStyles()
  const { handleAddKeywords, handleDeleteKeywordsResources, handleModifyLocation, claves, nuevasClaves, tiempo, temporalCoverage, handleChangeTemporalCoverage, localizaciones } = props

  
  let value_ = [1890, 2021]

  return (<>
    <div className={classes.contenedorTitulo}  >
      <TituloSeccion texto="Caracterización" iconoTema={AddToPhotosTwoToneIcon} />
    </div>

    <ContenedorElemento titulo="Agregar términos clave" styleTitle={{
      fontSize: "15px",
      fontWeight: 100
    }} style={{ marginTop: "10px", width: "100%" }}>
      {(typeof claves !== 'undefined') ?
        <>{
          claves.length > 0 ?
            <>
              <Typography variant="body2" color="primary">
                Términos en recursos
              </Typography>
              <ChipsEliminables
                value={claves}
                onDelete={(chips) => handleDeleteKeywordsResources(chips)} />
            </>
            : null}
        </> : null}
      <ChipInput
        defaultValue={nuevasClaves}
        onChange={(chips) => handleAddKeywords(chips)}
        label="Escriba un nuevo término"
        className={classes.chiInput}
        allowDuplicates={false}
        fullWidth={true}
        newChipKeyCodes={[13, 9]}

      />
    </ContenedorElemento>


    <div className={classes.contenedorSubTitulo}  >
      <TituloSeccion texto="Localización" iconoTema={RoomTwoToneIcon} style={{
        fontSize: "15px",
        fontWeight: 100, marginLeft: "10px"
      }} />
    </div>
    <MapaMarcadores cambioNuevasLocalizaciones={handleModifyLocation} localizaciones={localizaciones} lectura={false} />

  
          <><div className={classes.contenedorSubTitulo}  >
            <TituloSeccion texto="Línea de tiempo" iconoTema={TimelineTwoToneIcon} style={{
              fontSize: "15px",
              fontWeight: 100, marginLeft: "10px"
            }} />
          </div>
            <RangoTiempo value={temporalCoverage.length == 0 ? value_ : temporalCoverage} handleChange={handleChangeTemporalCoverage} activeSlider={false} /> </>
    
   

  </>
  )

}
// { "start" in  tiempo && "end" in  tiempo ?
export default CaracteristicasColeccion;
