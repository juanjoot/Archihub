import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import makeStyles from "@material-ui/core/styles/makeStyles"

const useStyles = makeStyles(theme => ({
	customTextField: {
		"& input::placeholder": {
			color: theme.palette.primary.main,
			fontSize: 16,
			fontWeight: "bold"
		}
	},

	rootTextInput: {
		"&:before": {
			borderBottom: 0
		}
	}
}))

const SelectorColeccion = props => {
	const classes = useStyles()
	const { cambioOpciones, opciones, seleccionado, placeHolder, id } = props

	const [valor, setValor] = useState(null)

	useEffect(() => {
		setValor(seleccionado)
	}, [seleccionado])

	const handleInputChange = (event, value) => {
		setValor(value)
		if (cambioOpciones) cambioOpciones(value)
	}

	return (
		<Autocomplete
			id={id}
			options={opciones}
			getOptionLabel={option => option}
			InputProps
			value={valor}
			onChange={handleInputChange}
			renderInput={params => (
				<TextField
					classes={{ root: classes.customTextField }}
					{...params}
					placeholder={placeHolder}
					InputProps={{...params.InputProps, 
						classes: {root: classes.rootTextInput} , disableUnderline: true
					  }}
				/>
			)}
		/>
	)
}

export default SelectorColeccion
