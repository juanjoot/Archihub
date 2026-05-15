/* eslint-disable no-use-before-define */
import { useState, useEffect } from "react";

import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import makeStyles from "@material-ui/core/styles/makeStyles";
import * as CollectionService from "../../services/CollectionService";


const filter = createFilterOptions();

const useStyles = makeStyles((theme) => ({
customTextField: {
    "& input::placeholder": {
    
    color: theme.palette.primary.main,
    fontSize:"16px",
    fontWeight: "bold",
    },
},

rootTextInput:{
    '&:before': {
        borderBottom: "1px" // Semi-transparent underline
    }       
    }
}));

const CreadorColeccion = props => {
const classes = useStyles();
const [creators, setCreators] = useState([]);
const {handleCreador, creador} = props;  

let initValue =null
if(creador!=="")
 initValue = {_id:creador}

const [value, setValue] = React.useState(initValue);


useEffect(() => {
    get_Creators("author")
}, []);

const get_Creators = async (property) => {
const res = await CollectionService.getAggregation(property);   
    if (res.length) setCreators(res);
};



const handlerSeleccion = (event, newValue) => {

    if (typeof newValue === 'string') {
      setValue({
        _id: newValue,
      });
     handleCreador(newValue);
    } else if (newValue && newValue.inputValue) {
      setValue({
        _id: newValue.inputValue,
      });
      handleCreador(newValue.inputValue);
    } else {         
      if(newValue!=null){
        setValue(newValue);
        handleCreador(newValue._id);
      }else{
        handleCreador("");
      }
    }
  
}

return (    
<Autocomplete
  value={value}
  onChange={handlerSeleccion}
  filterOptions={(options, params) => {
    const filtered = filter(options, params);
    if (params.inputValue !== '') {
      filtered.push({
        inputValue: params.inputValue,
        _id: `Agregar "${params.inputValue}"`,
      });
    }

    return filtered;
  }}
  selectOnFocus
  clearOnBlur
  handleHomeEndKeys
  id="free-solo-text-creator"
  options={creators}
  getOptionLabel={(option) => {
    if (typeof option === 'string') {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option._id;
  }}
  renderOption={(option) => option._id}
  freeSolo
  renderInput={(params) => (
    <TextField
      classes={{ root: classes.customTextField }}
      {...params}           
      InputProps={{...params.InputProps, 
          classes: {root: classes.rootTextInput} , disableUnderline: true
        }}
        onInput = {(e) =>{
          e.target.value = e.target.value.toString().slice(0,100)
      }}
      placeholder="Añade un creador"
    />
  )}
/>


);
}

export default (CreadorColeccion);
