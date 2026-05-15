import { makeStyles } from "@material-ui/core/styles"
import { Box, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
	infoItems: {
		borderStyle: "dashed",
		borderColor: "#707070",
		borderWidth: 1,
		margin: 15,
		padding: 20
	},
	titleContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	title: {
		fontSize: "10rem",
		fontWeight: "bold",
		textAlign: "center",
		color: theme.palette.secondary.main,
		fontStyle: "italic",
		marginRight: 20
	},
	subTitle: {
		fontSize: "3rem",
		color: "#49546D",
		opacity: "32%",
		fontWeight: "bold"
	},
	parrafoTitulo: {
		fontStyle: "italic",
		fontWeight: 500,
		fontFamily: "Montserrat",
		color: "#444E67",
		fontSize: 16,
		lineHeight: 1.2,
		position: "relative"
	},
	quote: {
		opacity: 0.5,
		position: "absolute",
		left: -10,
		top: -25,
		transform: "rotateX(180deg)"
	},
	quoteDown: {
		opacity: 0.5,
		position: "absolute",
		bottom: -25,
		right: -10,
		transform: "rotate(180deg)"
	}
}))

const TerminoTitle = ({ termino, like, img }) => {
	const classes = useStyles()

	return (
		<Box className={classes.infoItems}>
			<div className={classes.titleContainer}>
				<Typography variant="h1" className={classes.title}>
					{like}
				</Typography>
				<Typography variant="h5" className={classes.subTitle}>
					{termino && termino.name}
				</Typography>
			</div>

			{termino && termino.definition && (
				<Typography
					component="p"
					className={classes.parrafoTitulo}
					paragraph={true}
				>
					<img src={img} className={classes.quote} />
					<img src={img} className={classes.quoteDown} />
					<div
						dangerouslySetInnerHTML={{
							__html: termino && termino.definition
						}}
					/>
				</Typography>
			)}
		</Box>
	)
}

export default TerminoTitle
