/* eslint-disable no-use-before-define */
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import makeStyles from "@material-ui/core/styles/makeStyles";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { getCountries, getDepartamentos, getMunicipios } from "../../services/SitesService";


const useStyles = makeStyles((theme) => ({
  customTextField: {
    "& input::placeholder": {

      color: theme.palette.primary.main,
      fontSize: "16px",
      fontWeight: "bold",
    },
  },

  rootTextInput: {
    '&:before': {
      borderBottom: "1px" // Semi-transparent underline
    }
  },
  contenedorPaises: {
    width: "100%",
    marginTop: "5px",
    marginBottom: "5px",
  },
  contenedorDeptoMuniMobile: {
    width: "100%",
  },
  contenedorDeptoMuni: {
    width: "100%",
    display: "inline-flex"
  },
  contenedorDepartamentoMobile: {
    width: "100%",
    marginTop: "5px",
    marginBottom: "5px",
  },
  contenedorDepartamento: {
    width: "50%",
    marginTop: "5px",
    marginRight: "5px",
    marginBottom: "5px",
  },
  contenedorMunicipioMobile: {
    width: "100%",
    marginTop: "5px",
    marginBottom: "5px",
  },
  contenedorMunicipio: {
    width: "50%",
    marginTop: "5px",
    marginLeft: "5px",
    marginBottom: "5px",
  },
}));

const LugarColeccion = props => {
  const classes = useStyles();
  const { handleLugarCreacion, lugarCreacion } = props;
  let lugarCreacionObj = {}
  if (typeof lugarCreacion !== "undefined")
    lugarCreacionObj = lugarCreacion

  const [country, setCountry] = useState(() => ("country" in lugarCreacionObj) ? lugarCreacionObj["country"] : null);
  const [countries, setCountries] = useState([]);
  const [departament, setDepartament] = useState(() => ("departament" in lugarCreacionObj) ? lugarCreacionObj["departament"] : null);
  const [departaments, setDepartaments] = useState([]);
  const [municipality, setMunicipality] = useState(() => ("municipality" in lugarCreacionObj) ? lugarCreacionObj["municipality"] : null);
  const [municipalities, setMunicipalities] = useState([]);
  const [tieneDepartamentos, setTieneDepartamentos] = useState(false);


  useEffect(() => {
    getCountries().then((data) => {
      setCountries(data)
    }).catch((err) => {
      console.log(err)
    });
    cargaDepartamentos(country)
    cargaMunicipios(departament)
    setMunicipality(municipality);
  }, []);


  useEffect(() => {

    handleLugarCreacion({ "country": country, "departament": departament, "municipality": municipality })
  }, [municipality, departament, country]);


  const cargaDepartamentos = (value) => {
    if (value != null) {
      getDepartamentos(value.code).then((data) => {
        setCountry(value);
        setDepartaments(data);
        if (data.length > 0)
          setTieneDepartamentos(true);
        else
          setTieneDepartamentos(false);
        setMunicipalities([]);

      }).catch((err) => {
        console.log(err)
      });

    } else {
      setCountry(null);
      setDepartament(null);
      setDepartaments([]);
      setMunicipality(null);
      setMunicipalities([]);
      setTieneDepartamentos(false);
    }
  }


  const handlerCountry = (e, value) => {
    cargaDepartamentos(value);
    setDepartament(null);
    setMunicipality(null);
  }

  const cargaMunicipios = (value) => {
    if (value != null) {
      getMunicipios(value.code).then((data) => {
        setMunicipalities(data);
        setDepartament(value);
      }).catch((err) => {
        console.log(err)
      });
    } else {
      setDepartament(null);
      setMunicipality(null);
      setMunicipalities([]);
    }
  }

  const handlerDepartament = (e, value) => {
    cargaMunicipios(value);
    setMunicipality(null);
  }

  const handlerMunicipality = (e, value) => {
    setMunicipality(value)
  }

  return (
    <>
      <div className={classes.contenedorPaises} >
        <Autocomplete
          id="pais-seleccion"
          options={countries}
          getOptionLabel={(option) => option.value !== undefined ? option.value : ""}
          noOptionsText="No hay opciones"
          value={country}
          renderOption={(option, props) => {
            return (
              <>
                {option.value}
              </>
            )
          }}
          //onInputChange={handleInputChange}
          onChange={handlerCountry}
          renderInput={(params) => (
            <TextField
              classes={{ root: classes.customTextField }}
              {...params}
              InputProps={{
                ...params.InputProps,
                classes: { root: classes.rootTextInput }, disableUnderline: true
              }}
              placeholder="Seleccione un país"
            />
          )}
        />
      </div>
      {tieneDepartamentos ?
        <div className={isWidthDown("md", props.width) ? classes.contenedorDeptoMuniMobile : classes.contenedorDeptoMuni}  >
          <div className={isWidthDown("md", props.width) ? classes.contenedorDepartamentoMobile : classes.contenedorDepartamento}  >
            <Autocomplete
              id="departamento-seleccion"
              options={departaments}
              getOptionLabel={(option) => option.value !== undefined ? option.value : ""}
              value={departament}
              onChange={handlerDepartament}
              noOptionsText="No hay opciones"
              //onInputChange={handleInputChange}
              renderInput={(params) => (
                <TextField
                  classes={{ root: classes.customTextField }}
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    classes: { root: classes.rootTextInput }, disableUnderline: true
                  }}
                  placeholder="Seleccione un departamento"
                />
              )}
            />
          </div>
          <div className={isWidthDown("md", props.width) ? classes.contenedorMunicipioMobile : classes.contenedorMunicipio}  >
            <Autocomplete
              id="municipio-seleccion"
              options={municipalities}
              getOptionLabel={(option) => option.value !== undefined ? option.value : ""}
              value={municipality}
              onChange={handlerMunicipality}
              noOptionsText="No hay opciones"
              //onInputChange={handleInputChange}
              renderInput={(params) => (
                <TextField
                  classes={{ root: classes.customTextField }}
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    classes: { root: classes.rootTextInput }, disableUnderline: true
                  }}
                  placeholder="Seleccione un municipio"
                />
              )}
            />
          </div>
        </div>
        : null}
    </>
  );
}

export default withWidth()(LugarColeccion);
