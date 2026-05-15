import { makeStyles } from "@material-ui/core/styles"
import { Container, Link } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
	termsList: {
		borderLeft: "solid 2px #FFCF4D",
		listStyle: "none",
		padding: 0
	},
	listItem: {
		fontWeight: 500,
		fontStyle: "italic",
		fontFamily: "Montserrat",
		fontSize: 18,
		color: "#2F4467",
		padding: 3,
		paddingLeft: "1%",
		marginLeft: "5%",
		borderRadius: 5,
		"&:hover": {
			backgroundColor: "#FFCF4D",
			cursor: "pointer",
			"& a": {
				color: "#2F4467"
			}
		}
	}
}))

const TermsList = ({ items, like, type }) => {
	const classes = useStyles()

	return (
		<Container>
			<ul className={classes.termsList}>
				{items &&
					items.map((item, i) => (
						<li key={i} className={classes.listItem}>
							<Link
								onClick={() => {
									window.location.href = `/diccionario/${type}/${like}/${item._id}`
								}}
							>
								{item.name}
							</Link>
						</li>
					))}
			</ul>
		</Container>
	)
}

export default TermsList
