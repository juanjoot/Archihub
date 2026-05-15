import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Add from "@material-ui/icons/AddTwoTone"
import Edit from "@material-ui/icons/EditTwoTone"
import Visibility from "@material-ui/icons/VisibilityTwoTone"
import DeleteForever from "@material-ui/icons/DeleteForeverTwoTone"
import CollectionsBookmark from "@material-ui/icons/CollectionsBookmarkTwoTone"
import * as RecordsService from "../../services/RecordsService"
import { cutText } from "../utils/utils"

const useStyles = makeStyles(theme => ({
	root: {
		borderRadius: 0,
		height: "100%",
		boxShadow: "3px 3px 10px -3px rgba(0,0,0,0.5)",
		position: "relative",
		transition: "all 0.3s ease",
		"&:hover": {
			backgroundColor: "#08080899"
		}
	},
	image: {
		backgroundSize: "cover",
		backgroundPosition: "center",
		height: "100%"
	},
	backgroundContainer: {
		paddingTop: "50%",
		height: "100%",
		display: "flex"
	},
	contenedor: {
		backgroundColor: "#08080899",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		padding: "10px !important",
		minHeight: "120px",
		width: "100%"
	},
	flexDiv: {
		display: "flex",
		alignItems: "flex-start",
		position: "relative",
		padding: "0 0 0 5px"
	},
	icon: {
		color: "white"
	},
	group: {
		position: "absolute",
		left: "-10px",
		top: "-10px",
		height: "22px",
		width: "9px",
		backgroundColor: "#e04b4c"
	},
	groupHeader: {
		position: "absolute",
		color: "white",
		left: 0,
		top: 0,
		padding: "0 10px",
		width: "auto",
		backgroundColor: "#e04b4c",
		fontWeight: "bold"
	},
	iconContainer: {
		display: "flex",
		justifyContent: "end",
		gap: "10px"
	},
	title: {
		lineHeight: "1.1",
		fontWeight: "700",
		maxWidth: "80%"
	},
	description: {
		flex: "0 53%",
		lineHeight: "15px"
	},
	cevLogo: {
		position: "absolute",
		right: 0,
		width: "30px",
		maxWidth: "15%"
	},
	editContainer: {
		position: "absolute",
		top: 0,
		width: "100%",
		height: "50%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		"& svg": {
			width: "2.5em",
			height: "2.5em",
			margin: "0 0.5em",
			cursor: "pointer",
			opacity: "50%",
			color: "white"
		}
	},
	add: {
		width: "3em !important",
		height: "3em !important",
		opacity: "100% !important"
	},
	bookmark: {
		position: "absolute",
		color: "white",
		opacity: "30%",
		bottom: 10,
		right: 17,
		height: "40%",
		width: "auto"
	},
	VisibilityIcon: {
		position: "absolute",
		top: "1rem",
		left: "4rem",
		color: "red",
		zIndex: 100,
		margin: theme.spacing(2)
	}
}))

const TarjetaResumenColeccion = ({
	collection,
	conoce,
	handlerTarjetaResumen,
	esNueva
}) => {
	const classes = useStyles()
	const [image, setImage] = useState("/media/cev/pic/logos/LogoCevSpinner.svg")

	if (esNueva) {
		collection = {
			title: "Nueva colección",
			description: "",
			cover_page: ""
		}
	}

	useEffect(() => {
		if (collection && collection.cover_page.path) loadImage()
	}, [])

	const loadImage = async () => {
		try {
			let res = await RecordsService.serviceImage(
				window.btoa(collection.cover_page.path)
			)
			if (res) {
				setImage(URL.createObjectURL(res))
			}
		} catch (error) {
			setImage("/media/cev/pic/logos/LogoCevSpinner.svg")
		}
	}

	const handleClickCambio = tipo => ev => {
		handlerTarjetaResumen(tipo, collection._id)
	}

	return (
		<Card raised={true} elevation={4} className={classes.root}>
			<CardActionArea
				className={classes.image}
				style={
					esNueva
						? { backgroundImage: `none`, backgroundColor: "#2a5080" }
						: { backgroundImage: `url(${image})` }
				}
			>
				<span className={classes.groupHeader}>
					{esNueva ? "Crear colección" : "Colección"}
				</span>
				<CollectionsBookmark className={classes.bookmark} />
				<div className={classes.backgroundContainer}>
					<CardContent className={classes.contenedor}>
						<div className={classes.flexDiv}>
							<span className={classes.group}></span>

							<Typography
								className={classes.title}
								style={{ color: "white" }}
								gutterBottom
								variant="h6"
								component="h6"
							>
								{cutText(collection.title, 30)}
							</Typography>

							{!esNueva && (
								<img
									className={classes.cevLogo}
									src="/media/cev/pic/logos/LogoInforme.svg"
									alt="cev"
								/>
							)}
						</div>
						<Typography
							className={classes.description}
							style={{ color: "white", paddingLeft: "10px" }}
							variant="body2"
							color="textSecondary"
							component="small"
						>
							{cutText(collection.description, 100)}
						</Typography>
					</CardContent>
				</div>
			</CardActionArea>

			{conoce ? (
				<Visibility
					className={classes.VisibilityIcon}
					onClick={handleClickCambio("ver")}
				/>
			) : (
				<div className={classes.editContainer}>
					{esNueva ? (
						<Add className={classes.add} onClick={handleClickCambio("nueva")} />
					) : (
						<>
							<Edit onClick={handleClickCambio("editar")} />
							<DeleteForever onClick={handleClickCambio("borrar")} />
						</>
					)}
				</div>
			)}
		</Card>
	)
}

export default TarjetaResumenColeccion
