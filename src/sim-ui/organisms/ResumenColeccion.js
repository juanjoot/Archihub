import TarjetaResumenColeccion from "../organisms/TarjetaResumenColeccion"
import { makeStyles } from "@material-ui/core/styles"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

const useStyles = makeStyles({
	carousel: {
		"& .carousel-item-p": {
			padding: "12px 10px"
		}
	}
})
const ResumenColeccion = props => {
	const classes = useStyles()
	const { handlerTarjetaResumen, colecciones, nueva } = props

	let colleciones = []
	if (nueva)
		colleciones.push(
			<TarjetaResumenColeccion
				key={0}
				handlerTarjetaResumen={handlerTarjetaResumen}
				esNueva={true}
			/>
		)

	if (colecciones) {
		for (var i = 0; i < colecciones.length; i++) {
			const coleccion = colecciones[i]

			colleciones.push(
				<TarjetaResumenColeccion
					key={i}
					handlerTarjetaResumen={handlerTarjetaResumen}
					collection={coleccion}
				/>
			)
		}
	}

	return (
		<Carousel
			className={classes.carousel}
			additionalTransfrom={0}
			arrows
			centerMode={false}
			containerClass="MuiContainer-maxWidthLg"
			dotListClass=""
			draggable
			focusOnSelect={false}
			infinite={true}
			itemClass="carousel-item-p"
			keyBoardControl
			minimumTouchDrag={80}
			renderButtonGroupOutside={false}
			renderDotsOutside={false}
			responsive={{
				desktop: {
					breakpoint: {
						max: 3000,
						min: 1200
					},
					items: 5
				},
				mobile: {
					breakpoint: {
						max: 550,
						min: 0
					},
					items: 2
				},
				tablet: {
					breakpoint: {
						max: 1024,
						min: 550
					},
					items: 4
				}
			}}
			showDots={false}
			sliderClass=""
			slidesToSlide={1}
			swipeable
		>
			{colleciones}
		</Carousel>
	)
}

export default ResumenColeccion
