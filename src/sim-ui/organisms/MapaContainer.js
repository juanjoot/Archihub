import React from "react"
import MapaMarcadores from "./MapaMarcadores"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { Card, CardHeader, CardContent } from "@material-ui/core"
import {
	RoomTwoTone,
	MoreVertTwoTone,
	BookmarkTwoTone,
	KeyboardArrowDownTwoTone,
	LocationOn,
	ThreeSixty,
	MoreHoriz,
	Apps
} from "@material-ui/icons"

const useStyles = makeStyles(theme => ({
	headerMapa: {
		fontSize: 28,
		color: theme.palette.primary.main,
		borderBottom: `solid 3px ${theme.palette.primary.main}`,
		padding: 10
	},
	mapaIcon: {
		fontSize: 28,
		color: theme.palette.primary.main,
		cursor: "pointer"
	},
	mapaIconBig: {
		fontSize: 32,
		color: theme.palette.primary.main,
		cursor: "pointer",
		padding: "0 3px"
	},
	iconsContainer: {
		padding: "10px 0",
		textAlign: "end"
	},
	mapaContent: {
		margin: "auto",
		maxWidth: 900
	},
	cardHeader: {
		display: "flex",
		alignItems: "baseline",
		justifyContent: "space-between",
		paddingRight: 16
	}
}))

const MapaContainer = ({ coleccion }) => {
	const classes = useStyles()
	return (
		<Card>
			<div className={classes.cardHeader}>
				<CardHeader
					className={classes.headerMapa}
					avatar={<RoomTwoTone className={classes.mapaIcon} />}
					title={
						<Typography variant="h6" color="primary">
							Localización
						</Typography>
					}
					disableTypography
				/>
				<div>
					<MoreVertTwoTone className={classes.mapaIcon} />
					<BookmarkTwoTone className={classes.mapaIcon} />
					<KeyboardArrowDownTwoTone className={classes.mapaIcon} />
				</div>
			</div>
			<CardContent className={classes.mapaContent}>
				<MapaMarcadores
					localizaciones={coleccion["geographicCoverage"]}
					lectura={true}
				/>
				<div className={classes.iconsContainer}>
					<Apps className={classes.mapaIconBig} />
					<LocationOn className={classes.mapaIconBig} />
					<ThreeSixty className={classes.mapaIconBig} />
					<MoreHoriz className={classes.mapaIconBig} />
				</div>
			</CardContent>
		</Card>
	)
}

export default MapaContainer
