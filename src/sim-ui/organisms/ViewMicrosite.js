import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as micrositeServie from "../../services/MicrositesService";
import ViewSectionMicrosite from "./ViewSectionMicrosite";
import MainLayout from "../layout/MainLayout";
import { useParams } from "react-router-dom";
import TopFilters from "../organisms/bloqueBusqueda/TopFilters"
import IntroSection from "../organisms/IntroSection"
import IntroConoce from '../assets/intro_crea.png';
import ExtensionTwoTone from "@material-ui/icons/ExtensionTwoTone";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: "white",
		marginTop: "0px",
		marginBottom: "calc(72px + 5vh)"
	},
	icon: {
		color: "#FFF",
		fontSize: 80,
		height: 60,
		padding: "0 10px",
		opacity: "50%",
		transform: "translate(0, -15%) rotate(-45deg)",
		[theme.breakpoints.up("md")]: {
			fontSize: 130,
			height: 100
		}
	}
}))

const ViewMicrosite = props => {
	const { id } = useParams()
	const classes = useStyles()
	const [t, i18n] = useTranslation("common")
	const [microsite, setMicrosite] = useState([])
	const [section, setSection] = useState(props.section || null)

	useEffect(() => {
		if (section) getDataBySection()
		else getData()
	}, [])
	useEffect(() => {
		if (section) getDataBySection()
		else getData()
	}, [id])

	const formatTitle = title => {
		return title.replaceAll("_", " ")
	}

	const getDataBySection = async () => {
		if (section) {
			const response = await micrositeServie.findBySection(section)
			if (response && response[0]) setMicrosite(response[0])
		}
	}

	const getData = async () => {
		if (id) {
			const response = await micrositeServie.findByName(formatTitle(id))
			if (response && response[0]) setMicrosite(response[0])
		}
	}

	const renderSections = () =>
		microsite.elements.map((section, index) => (
			<ViewSectionMicrosite key={index} section={section} />
		))

	return (
		<MainLayout>
			<TopFilters
				place={props.section}
				keyword={null}
				temporalRange=""
				setTemporalRange=""
				dpto=""
				setDpto=""
				setKeyword=""
				total=""
				filtros={props.section === "Conoce" ? false : true}
			/>

			{props.section === "Conoce" && (
				<IntroSection
					title={t("conoce.introTitle")}
					description={t("conoce.introDescription")}
					img={IntroConoce}
					icon={<ExtensionTwoTone className={classes.icon} />}
				/>
			)}

			<div className={classes.root}>
				{microsite.elements && microsite.elements.length
					? renderSections()
					: ""}
			</div>
		</MainLayout>
	)
}

export default ViewMicrosite
