import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
	container: {
		padding: "0 32px",
		display: "flex",
	},
	creaIntro: {
		background: "#2A5080",
		background: "linear-gradient(90deg, #2A5080 70%, #FFF 70%, #FFF 100%)",
		padding: "60px 0 40px 0",
		minHeight: "250px",
		color: "white",
		position: "relative",
		[theme.breakpoints.up("md")]: {
			padding: "140px 0 120px 0",
			background: "linear-gradient(90deg, #2A5080 55%, #FFF 55%, #FFF 100%)"
		}
	},
	textContainer: {
		maxWidth: "50%",
		[theme.breakpoints.up("md")]: {
			maxWidth: "30%"
		}
	},
  longText: {
		maxWidth: "50%",
	},
	header: {
		fontWeight: "600",
		[theme.breakpoints.up("md")]: {
			fontSize: "5vw"
		}
	},
	img: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: "35%",
		height: "auto",
		maxHeight: "90%",
		objectFit: "contain",
		objectPosition: "bottom right",
		[theme.breakpoints.up("md")]: {
			right: "40%",
			objectPosition: "bottom center",
			transform: "translate(50%,0)"
		}
	},
	bigImg: {
		[theme.breakpoints.up("md")]: {
			maxHeight: "none",
			right: "45%",
			width: "auto",
			height: "100%"
		}
	},
  longTextImg: {
		[theme.breakpoints.up("md")]: {
			maxHeight: "none",
			right: "30%",
			width: "auto",
			height: "80%"
		}
	},
	sideImg: {
		height: "40%",
		position: "absolute",
    visibility: 'hidden',
    [theme.breakpoints.up("md")]: {
			visibility: 'visible',
		}
	}
}))

const IntroSection = ({ title, description, img, icon, bigImg, sideImgs, longText}) => {
	const classes = useStyles()

	const renderSideImgs = imgs =>
		imgs.map((img, i) => (
			<img
				className={classes.sideImg}
				style={img.style}
				src={img.img}
				alt=""
				key={i}
			/>
		))

	return (
		<article className={classes.creaIntro}>
			{sideImgs && sideImgs.length > 0 && renderSideImgs(sideImgs)}
			<Container className={classes.container} >
				{icon && icon}
				<div className={longText ? classes.longText : classes.textContainer}>
					<Typography variant="h3" className={classes.header}>
						{title}
					</Typography>
					<Typography variant="body1">{description}</Typography>
				</div>
			</Container>
			<img
				className={`${classes.img} ${bigImg ? classes.bigImg : ""} ${longText ? classes.longTextImg : ''}`}
				src={img}
				alt={title}
			/>
		</article>
	)
}

export default IntroSection
