import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import InputBase from "@material-ui/core/InputBase"
import DataUsageIcon from "@material-ui/icons/DataUsage"
import * as ArchihubService from "../../../services/ArchihubService";
import Chips from "./Chips"
import { Chip, Collapse, makeStyles } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import Search from "@material-ui/icons/Search"
import { col_explora } from "../HomeDesktop"
import { Tabs, Tab } from "@material-ui/core/"
import { useSearchParams } from "react-router-dom";
import deco from '../../assets/explora_img.png'
import CloseIcon from '@mui/icons-material/Close'
import TabsContainer from "../TabsContainer";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import MovieCreationTwoToneIcon from '@mui/icons-material/MovieCreationTwoTone';
import CollectionsTwoToneIcon from '@mui/icons-material/CollectionsTwoTone';
import AudiotrackTwoToneIcon from '@mui/icons-material/AudiotrackTwoTone';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import IconButton from '@mui/material/IconButton';

import PageviewTwoToneIcon from '@mui/icons-material/PageviewTwoTone';
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';
import TimelineTwoToneIcon from '@mui/icons-material/TimelineTwoTone';
import BubbleChartTwoToneIcon from '@mui/icons-material/BubbleChartTwoTone';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { getMetadataRG, getMetadataRGBulk } from "../../../services/ResourceGroupService";
import TableRowsIcon from '@mui/icons-material/TableRows';
import AdvancedBox from "./AdvancedBox";
import { ConsoleView } from "react-device-detect";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "react-scroll";


const useStyles = makeStyles(theme => ({
	inputBox: {
		backgroundColor: '#6E3092',
		padding: 0,
		color: "white",
		backgroundImage: `url(${deco})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		backgroundPosition: 'left center',
		position: 'relative',
		display: 'flex',
		position: 'relative',
		zIndex: 10,
		alignItems: 'center',
		[theme.breakpoints.down("md")]: {
			backgroundImage: `none`,
		},

		'& .filtro': {
			position: 'absolute',
			width: '100%',
			top: 0,
			left: 0,
			height: '100%',
			backgroundColor: 'rgba(25,68,124,0)',
			// backdropFilter: 'blur(10px)',
		}
	},
	inputBoxCol: {
		backgroundColor: '#fc00ad',
		padding: 0,
		color: "white",
		position: 'relative',
		display: 'flex',
		position: 'relative',
		zIndex: 10,
		alignItems: 'center',
		[theme.breakpoints.down("md")]: {
			backgroundImage: `none`,
		},

		'& .filtro': {
			position: 'absolute',
			width: '100%',
			top: 0,
			left: 0,
			height: '100%',
			backgroundColor: 'rgba(25,68,124,0)',
			// backdropFilter: 'blur(10px)',
		}
	},
	inputToolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: 'space-between',
		padding: 0,
		[theme.breakpoints.down("md")]: {
			paddingTop: 0,
			paddingBottom: 0,
		}
	},
	searchContainer: {
		// backgroundColor: 'rgba(25,68,124,0.6)',
		border: '1px solid rgba(255,255,255,0.8)',
		borderRadius: 50,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		display: "flex",
		position: 'relative',
		alignItems: "center",
		backdropFilter: 'blur(25px)',
		width: '100%',
		maxWidth: '450px',
		// borderRadius: 50,
		[theme.breakpoints.down("md")]: {
			minWidth: "auto",
			marginTop: theme.spacing(1.5)
		}
	},
	searchExtraBox: {
		position: 'absolute',
		background: 'rgba(26,72,132,0.99)',
		width: '100%',
		left: 0,
		color: '#fff',
		padding: theme.spacing(2),
		bottom: '0px',
		transform: 'translate(0px, 100%)',
		zIndex: 10000,
	},
	grid: {
		display: "flex",
		height: '200px',
		alignItems: "center",
		justifyContent: "center",
		width: '100%',
		// backgroundColor: 'rgba(255,255,255,.2)',
	},
	gridCol: {
		display: "flex",
		height: '350px',
		alignItems: "center",
		justifyContent: "center",
		width: '100%',

		'& h2': {
			position: 'relative',
		},

		'& h2:before': {
			content: '""',
			position: 'absolute',
			top: 0,
			left: -25,
			right: 0,
			bottom: 0,
			backgroundColor: '#6E3092',
			width: '8px',
			height: '70%',
		}
	},
	inputFilter: {
		display: 'none',
		alignItems: 'center',

		[theme.breakpoints.down("md")]: {
			flexWrap: "wrap",
			justifyContent: 'center',
		}
	},
	searchInput: {
		width: "100%",
		color: "white",
		fontWeight: 'bold',
		padding: theme.spacing(1),
		[theme.breakpoints.down("md")]: {
			padding: 0
		}
	},
	SearchIcon: {
		marginRight: "2%",
		color: "#fff"
	},
	backIcon: {
		fontSize: "30px"
	},
	grow: {
		flexGrow: 1
	},
	mobileHide: {
		[theme.breakpoints.down("md")]: {
			display: "none"
		},
		lineHeight: "0px",
		fontSize: "1em"
	},
	typography: {
		lineHeight: "0px",
		fontWeight: "600",
		letterSpacing: "1px",
		fontSize: "1em"
	},
	filtrosTipo: {
		backgroundColor: theme.palette.primary.dark,
		borderTop: '1px solid white',
		"& [role='tablist']": {
			[theme.breakpoints.up("sm")]: {
				justifyContent: "center",
				height: '100%'
			}
		}
	},
	btnFiltros: {
		color: '#fff',
		minHeight: 35,
		opacity: 1,
		margin: 5,
		borderRadius: 5,
		"& span": { flexDirection: "row" },
		"& svg": { marginRight: 5 }
	},
	btnFiltrosSel: {
		backgroundColor: 'white',
		minHeight: 35,
		color: theme.palette.primary.main,
		margin: 5,
		borderRadius: 5,
		opacity: 1,
		"& span": { flexDirection: "row" },
		"& svg": { marginRight: 5 }
	},
	fondosNoticeBg: {
		backgroundColor: theme.palette.primary.main,
		borderTop: '1px solid white',

	},
	fondosNotice: {
		color: 'white',
		paddingBottom: theme.spacing(1),
		paddingTop: theme.spacing(1),
		fontStyle: 'italic',
		fontSize: '0.8em',
		display: 'flex',
		alignItems: 'center',
		background: 'rgba(255,255,255,0.2)',
		'&.dialog': {
			paddingTop: 15,
			borderTop: '1px solid white',
			background: 'rgba(255,255,255,0.1)',
			alignItems: 'start',
		}
	},
	chipsContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
		// paddingTop: theme.spacing(1),
		// paddingBottom: theme.spacing(1),
		backgroundColor: theme.palette.grey[200],
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
		// borderRadius: 50,
		// marginTop: theme.spacing(.5),
		boxShadow: `inset 0 0 5px 1px ${theme.palette.grey[300]}`
	},
	chipsContainerRoot: {
		display: 'flex',
		justifyContent: 'flex-end'
	},
	iconView: {
		'& path, & polygon': {
			fill: 'white'
		}
	},
	iconViewContainer: {
		marginRight: theme.spacing(8),
		[theme.breakpoints.down("md")]: {
			marginRight: 0,
			display: 'none'
		}
	},
	chipFondo: {
		marginBottom: 5,
		marginRight: 5,
		fontSize: 12,
		color: 'white',
		borderColor: 'white',
		'&.selected, &:hover': {
			backgroundColor: 'white !important',
			color: theme.palette.primary.main
		}
	},
	chipFondoIcon: {
		color: 'white',
		'&.selected, &:hover': {
			color: theme.palette.primary.main + ' !important'
		}
	},
	tableContainer: {
		marginLeft: 10,
		borderTop: '1px solid white',
		background: 'rgba(255,255,255,.9)',
		'& tr:nth-child(even)': {
			backgroundColor: 'white'
		},
		'& tr td:nth-child(1)': {
			backgroundColor: theme.palette.primary.main,
			color: 'white',
			borderLeft: '1px solid white',
		}
	}
}))

const FondoCard = props => {
	const classes = useStyles()
	// 
	return (
		<>
			{props.rg && props.selected &&
				<Chip
					onClick={() => props.callback(props.rg)}
					className={`${classes.chipFondo} ${props.rg.ident === props.selected.ident ? 'selected' : ''}`} size="small" variant="outlined"
					label={props.rg.metadata.firstLevel.title}
					icon={<TableRowsIcon style={{ width: 10, marginLeft: 10 }} className={`${classes.chipFondoIcon} ${props.rg.ident === props.selected.ident ? 'selected' : ''}`} />}
				/>
			}
		</>

	)
}

const FondoDetail = props => {
	const classes = useStyles()
	return (
		<>
			{props.rg &&
				<TableContainer component={Box} className={classes.tableContainer}>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell style={{ padding: 5 }}>
									Título
								</TableCell>
								<TableCell style={{ padding: 5 }}>
									{props.rg.metadata.firstLevel.title}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{ padding: 5 }}>
									Autores
								</TableCell>
								<TableCell style={{ padding: 5 }}>
									{props.rg.metadata.firstLevel.authors}
								</TableCell>
							</TableRow>
							{props.rg.metadata.firstLevel.description &&
								<TableRow>
									<TableCell style={{ padding: 5 }}>
										Descripción
									</TableCell>
									<TableCell style={{ padding: 5 }}>
										{props.rg.metadata.firstLevel.description}
									</TableCell>
								</TableRow>
							}
							{props.rg.metadata.firstLevel.documentType &&
								<TableRow>
									<TableCell style={{ padding: 5 }}>
										Tipo documental
									</TableCell>
									<TableCell style={{ padding: 5 }}>
										{props.rg.metadata.firstLevel.documentType}
									</TableCell>
								</TableRow>
							}
							{props.rg.metadata.firstLevel.mandate &&
								<TableRow>
									<TableCell style={{ padding: 5 }}>
										Mandatos
									</TableCell>
									<TableCell style={{ padding: 5 }}>
										{props.rg.metadata.firstLevel.mandate}
									</TableCell>
								</TableRow>
							}
							{props.rg.metadata.firstLevel.topics &&
								<TableRow>
									<TableCell style={{ padding: 5 }}>
										Temas
									</TableCell>
									<TableCell style={{ padding: 5 }}>
										{props.rg.metadata.firstLevel.topics}
									</TableCell>
								</TableRow>
							}
							{props.rg.metadata.firstLevel.rights &&
								<TableRow>
									<TableCell style={{ padding: 5 }}>
										Derechos
									</TableCell>
									<TableCell style={{ padding: 5 }}>
										{props.rg.metadata.firstLevel.rights}
									</TableCell>
								</TableRow>
							}
							{props.rg.metadata.firstLevel.objetivo &&
								<TableRow>
									<TableCell style={{ padding: 5 }}>
										Objetivo
									</TableCell>
									<TableCell style={{ padding: 5 }}>
										{props.rg.metadata.firstLevel.objetivo}
									</TableCell>
								</TableRow>
							}
							{props.rg.metadata.firstLevel.occupation &&
								<TableRow>
									<TableCell style={{ padding: 5 }}>
										Ocupación
									</TableCell>
									<TableCell style={{ padding: 5 }}>
										{props.rg.metadata.firstLevel.occupation}
									</TableCell>
								</TableRow>
							}
						</TableBody>
					</Table>
				</TableContainer>
			}
		</>

	)
}

const TopFilter = props => {
	const history = useNavigate()
	const classes = useStyles()
	const [t, i18n] = useTranslation("common")
	const [keyword, setKeyword] = useState('')
	const [active, setActive] = useState(false)
	const [expanded, setExpanded] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const [fondosMetadata, setFondosMetadata] = useState(null)
	const [fondosView, setFondosView] = useState(false)
	const [selectedFondo, setSelectedFondo] = useState(null)
	const [title, setTitle] = useState('')

	useEffect(() => {
		if (props.colIds) {
			ArchihubService.getById(props.colIds).then(response => {
				const title_ = response.metadata.firstLevel.title
				setTitle(title_)
			})

		}
	}, [])

	useEffect(() => {
		let k = searchParams.get("keyword") ? searchParams.get("keyword") : "";
		setKeyword(k)
	}, [searchParams]);

	const onSearchSubmit = e => {
		e.preventDefault()
		// go to search page with keyword as param
		if (props.place === 'explora') {
			if (keyword.trim() === '') {
				history('/explora/buscador')
			} else {
				history(`/explora/buscador?keyword=${keyword}`)
			}
		} else if (props.place === 'colecciones') {
			if (keyword.trim() === '') {
				history(`/explora/colecciones/${props.colIds}`)
			} else {
				history(`/explora/colecciones/${props.colIds}?keyword=${keyword}`)
			}
		}
	}

	const onChangeSearch = e => {
		setKeyword(e.target.value)
	}

	const onSearchBlur = (state = false) => {
		setActive(state)
	}

	const changeFondosView = () => {
		setFondosView(!fondosView)
		if (selectedFondo === null) {
			setSelectedFondo(fondosMetadata[0])
		}
	}

	return (
		<>
			<Box
				className={props.place === 'explora' ? classes.inputBox : classes.inputBoxCol}
			>
				<Container className={classes.inputToolbar}>

					<Box
						className={props.place === 'explora' ? classes.grid : classes.gridCol}
					>
						{title !== '' &&
							<h2 style={{ fontWeight: 'normal', fontSize: 70, color: 'white', textAlign: 'left', marginRight: 20 }}>{title}</h2>
						}
						<div>
							{props.place === 'colecciones' &&
								<h4 style={{ fontSize: 25, fontStyle: 'italic', fontWeight: 'normal', textAlign: 'right' }}><b>Explora</b> el fondo documental con todos los recursos</h4>
							}
							<form className={classes.searchContainer} onSubmit={onSearchSubmit}>
								<Search className={classes.SearchIcon} />
								<InputBase
									className={classes.searchInput}
									placeholder={t("explora.busquedaInput")}
									onChange={(e) => onChangeSearch(e)}
									onBlur={(e) => onSearchBlur()}
									onFocus={(e) => onSearchBlur(true)}
									inputProps={{ maxLength: 140 }}
									defaultValue={props.keyword}
									value={keyword}
								/>

								{keyword !== '' &&
									<CloseIcon
										onClick={() => {
											if (props.place === 'explora') {
												history('/explora/buscador')
											} else if (props.place === 'colecciones') {
												history(`/explora/colecciones/${props.colIds}`)
											}
										}}
									/>
								}

								{/* {active &&
									<AdvancedBox
										className={classes.searchExtraBox}
										keyword={keyword}
									/>
								} */}


							</form>
						</div>

					</Box>

					<Box className={classes.inputFilter}>


						{matches &&
							<>
								<IconButton
									onClick={() => {
										props.setFiltros(!props.viewFiltros)
									}}
								>
									<FilterAltTwoToneIcon className={classes.iconView} />
								</IconButton>
							</>
						}

					</Box>
				</Container>
			</Box>

			{props.fondos && props.fondos.length > 0 && fondosMetadata &&
				<Box className={classes.fondosNoticeBg}>
					<Container className={classes.fondosNotice} style={{ cursor: 'pointer' }} onClick={changeFondosView}>
						<ExpandCircleDownIcon
							style={{
								marginRight: 15
							}}
						/>
						Estas explorando {props.fondos.length === 1 ? 'el fondo: ' : 'los fondos: '} {fondosMetadata.slice(0, 3).map(f => <Chip style={{ marginLeft: 5, marginRight: 5, fontSize: 12, color: 'white', borderColor: 'white' }} variant="outlined" size="small" label={f.metadata.firstLevel.title} />)} {props.fondos.length > 3 && '...'} {props.fondos.length === 1 && !fondosView ? 'Haz click para conocer más detalles del fondo.' : !fondosView && 'Haz click para conocer más detalles de cada fondo.'}
					</Container>
					<Collapse in={fondosView} key={JSON.stringify(selectedFondo)}>
						<Container className={`${classes.fondosNotice} dialog`}>

							<Box
								style={{
									width: 300,
									borderRight: '1px solid rgba(255,255,255,.3)',
								}}
							>
								{fondosMetadata.map(f => <FondoCard callback={setSelectedFondo} selected={selectedFondo} rg={f} />)}
							</Box>
							<Box
								style={{
									width: 'calc(100% - 300px)'
								}}
							>
								<FondoDetail rg={selectedFondo} />
							</Box>
						</Container>
					</Collapse>
				</Box>
			}
			{props.filtros !== false && (
				<Tabs
					variant="scrollable"
					className={classes.filtrosTipo}
					centered
				>
					{[
						{ name: "Documento", icon: <ArticleTwoToneIcon /> },
						{ name: "Video", icon: <MovieCreationTwoToneIcon /> },
						{ name: "Visualización", icon: <DataUsageIcon /> },
						{ name: "Galería fotográfica", icon: <CollectionsTwoToneIcon /> },
						{ name: "Audio", icon: <AudiotrackTwoToneIcon /> }
					].map((i, index) => (
						<Tab
							key={i.name + index}
							className={props.tipo === i.name ? classes.btnFiltrosSel : classes.btnFiltros}
							icon={i.icon}
							label={i.name}
							onClick={() => {
								props.tipo === i.name
									? props.setTipo(null)
									: props.setTipo(i.name)
							}}
						/>
					))}
				</Tabs>
			)}

			{/* <Container>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<Tesauro
						setFondo={props.setFondo}
						fondo={props.fondos}
						setLoading={props.setLoading}
					/>
				</Collapse>
			</Container> */}

			{
				(props.chips == 'hide' && props.origin === 'recursos') ? '' :
					(
						<Container className={classes.chipsContainerRoot}>
							<Box className={classes.chipsContainer}>
								<Chips
									keyword={props.keyword}
									setKeyword={props.setKeyword}
									temporalRange={props.temporalRange}
									setTemporalRange={props.setTemporalRange}
									dpto={props.dpto}
									fondo={props.fondo}
									setFondo={props.setFondo}
									setDpto={props.setDpto}
									tipo={props.tipo}
									setTipo={props.setTipo}
									tipoViolencia={props.tipoViolencia}
									tipoActores={props.tipoActores}
									setTipoViolencia={props.setTipoViolencia}
									setTipoActores={props.setTipoActores}
								/>
							</Box>

						</Container>

					)
			}
		</>
	)
}

export default TopFilter
