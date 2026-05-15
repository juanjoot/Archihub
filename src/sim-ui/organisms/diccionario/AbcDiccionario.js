import { makeStyles } from "@material-ui/core/styles"
import { Link, Tabs, Tab } from "@material-ui/core/"
import { connect } from "react-redux"
import * as app from "../../../store/ducks/app.duck"

const useStyles = makeStyles(theme => ({
  tabs: {
    [theme.breakpoints.up("md")]: {
      '& div[role=tablist]': {
        justifyContent: 'center'
      }
		}
  },
	btn: {
		fontSize: "5vw",
		fontStyle: "italic",
		fontWeight: "bold",
		padding: 0,
		minWidth: "5vw",
		opacity: 1,
		color: "#FFFFFF",
		"&:hover": {
			color: "#F8CB4E"
		},
		[theme.breakpoints.up("md")]: {
			fontSize: "2vw",
			minWidth: "2.5vw"
		}
	},
	btnSel: {
		fontSize: "5vw",
		fontStyle: "italic",
		fontWeight: "bold",
		margin: "0 4px 0 4px",
		padding: 0,
		minWidth: "5vw",
		opacity: 1,
		color: "#F8CB4E",
		"&:hover": {
			color: "#F8CB4E"
		},
		[theme.breakpoints.up("md")]: {
			fontSize: "2vw",
			minWidth: "2.5vw"
		}
	}
}))

const AbcDiccionario = props => {
	const classes = useStyles()
	const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

	return (
		<Tabs
			className={classes.tabs}
			centered
			variant="scrollable"
			scrollButtons
			allowScrollButtonsMobile
		>
			{[...abc].map(letter => (
				<Link
					onClick={() => {
						window.location.href = `${props.enviarurl}/${letter}`
					}}
					button
					component="button"
					key={letter}
				>
					<Tab
						className={
							props.like.toUpperCase() === letter ? classes.btnSel : classes.btn
						}
						label={letter}
					/>
				</Link>
			))}
		</Tabs>
	)
}

const mapStateToProps = store => ({
	openLienzoCrea: store.app.openLienzoCrea
})

export default connect(mapStateToProps, app.actions)(AbcDiccionario)
