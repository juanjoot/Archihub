import { makeStyles } from "@material-ui/core/styles"
import { Link, Container, Tab, Tabs } from "@material-ui/core/"

const useStyles = makeStyles(theme => ({
	contenedorTab: {
		borderBottom: `1px solid ${theme.palette.secondary.main}`,
		marginBottom: "30px",
		marginTop: "10px"
	},
	tab: {
		fontSize: 16,
		letterSpacing: 1.35,
		color: theme.palette.primary.main,
		textTransform: "none",
		opacity: 1
	}
}))

const TabsDiccionario = ({ like, value, handleChange }) => {
	const classes = useStyles()

	return (
		<Container>
			<Tabs
				centered={true}
				className={classes.contenedorTab}
				value={value}
				onChange={(event, newValue) => handleChange(event, newValue)}
			>
				<Tab className={classes.tab} label="Términos" value={0} />
				<Tab className={classes.tab} label="Campo Semántico" value={1} />
			</Tabs>
		</Container>
	)
}

export default TabsDiccionario
