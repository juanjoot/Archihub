import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from "@material-ui/core"

import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import StorageIcon from '@material-ui/icons/Storage';
import RemoveRedEyeTwoToneIcon from '@material-ui/icons/RemoveRedEyeTwoTone';

import { Card, IconButton } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Link } from "react-router-dom";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import RadialViz from './RadialViz';
import Flickity from 'react-flickity-component'
import withWidth from "@material-ui/core/withWidth";

import hand from '../../assets/basedatos.png'

import listadoFondos from '../../../assets/listado_fondos';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
    fondos_root: {
        backgroundColor: theme.palette.primary.main,
        maxWidth: 1600,
        width: 'calc(100% - 20px)',
        margin: '0 auto',
        borderRadius: 5,
        marginTop: 30,
        position: 'relative',

        '& a': {
            boxShadow: 'none',

            '&:hover': {
                boxShadow: 'none',
            }
        },

        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url('${hand}')`,
            backgroundSize: 'contain',
            backgroundPosition: '15% center',
            backgroundRepeat: 'no-repeat',
            opacity: .3
        }
    },
    fondos_topNav: {
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'rgba(255,255,255,.3)',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingTop: 15,
        paddingBottom: 15,
        position: 'relative',
    },
    fondos_topBtn: {
        textAlign: 'center',
        padding: 5,
        marginLeft: 10,
        marginRight: 10,
        color: 'white',
        alignItems: 'center',
        fontSize: 13,
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
    },
    fondos_content: {
        display: 'flex',
        position: 'relative',
    },
    fondos_column: {
        width: '50%',
        padding: 5,
        paddingBottom: 40,
        // paddingTop: 40,
        position: 'relative',

        '& .flickity-slider > div': {
            marginLeft: 50,
            marginRight: 50,
        },

        [theme.breakpoints.down("sm")]: {
            width: '100%'
        },
    },
    fondos_cardFondo: {
        background: 'white',
        width: '100%',
        marginBottom: 5
    },
    vizNav: {
        border: '1px solid #7a8da4',
        color: '#7a8da4',
        padding: 5,
        marginLeft: 10,

        '&.active': {
            color: 'white',
            backgroundColor: '#7a8da4'
        }
    },
    breadcrumb: {
        color: 'white',
        margin: 5,
        paddingTop: 30,

        '& ol': {
            '& li:first-child': {
                backgroundColor: 'rgba(255,255,255,.2)',
                padding: 5,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 50
            }
        }
    }
}))

const ArbolFondos = props => {
    const classes = useStyles()
    const [breadcrumb, setBreadcrumb] = useState(null)

    const objListado = []
    for (let i = 0; i < listadoFondos.length; i += 7) {
        let array = []
        for (let t = 0; t < 7; t++) {
            if (i + t < listadoFondos.length)
                array.push(listadoFondos[i + t])
        }
        objListado.push(array)
    }

    return (
        <Box
            className={classes.fondos_root}
        >
            <Box
                className={classes.fondos_topNav}
            >
                <Box style={{ width: props.width !== 'xs' && props.width !== 'sm' ? '50%' : '100%', display: 'flex', justifyContent: 'center' }}>
                    {[
                        { icon: <RemoveRedEyeTwoToneIcon />, text: "Visualizar el fondo" },
                        { icon: <StorageIcon />, text: "Descargar inventario" },
                        { icon: <CloudDownloadOutlinedIcon />, text: "Descargar archivos" },
                        { icon: <LocalLibraryOutlinedIcon />, text: "Ir al enlace del buscador" },
                    ].map(i => {
                        return (
                            <Box
                                className={classes.fondos_topBtn}
                            >
                                <Box
                                    style={{ marginRight: 5 }}
                                >
                                    {i.icon}
                                </Box>
                                <Box>
                                    {i.text}
                                </Box>
                            </Box>
                        )
                    })}
                </Box>

            </Box>

            {breadcrumb && props.width !== 'xs' && props.width !== 'sm' &&
                <Breadcrumbs className={classes.breadcrumb} separator={<NavigateNextIcon fontSize="small" />}>
                    {props.slug &&
                        <>
                            {props.slug.text}
                        </>
                    }
                    {breadcrumb.sequence.map(d => {
                        return (
                            <>
                                {d.data.name}
                            </>
                        )
                    })}
                </Breadcrumbs>
            }


            <Box className={classes.fondos_content}>
                {props.width !== 'xs' && props.width !== 'sm' &&
                    <Box className={classes.fondos_column} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {props.slug &&
                            <RadialViz
                                slug={props.slug.slug}
                                setBreadcrumb={setBreadcrumb}
                            />
                        }
                    </Box>
                }

                <Box className={`${classes.fondos_column} padding`}>
                    <Flickity
                        className={'carousel'} // default ''
                        elementType={'div'} // default 'div'
                        // options={flickityOptions} // takes flickity options {}
                        disableImagesLoaded={false} // default false
                        // reloadOnUpdate // default false
                        static // default false
                    >
                        {objListado.map(o => {
                            return (
                                <Box>
                                    {o.map(r => {
                                        return (
                                            <>
                                                <Card
                                                    className={classes.fondos_cardFondo}
                                                >
                                                    <CardHeader
                                                        title={<>
                                                            <Toolbar
                                                                style={{
                                                                    padding: 0,
                                                                    justifyContent: 'space-between'
                                                                }}
                                                            >
                                                                <Typography
                                                                    style={{
                                                                        fontSize: 16,
                                                                        marginLeft: 20,
                                                                        // fontWeight: 'bold',
                                                                        color: '#333'
                                                                    }}
                                                                    variant="h6"
                                                                >{r.text}</Typography>
                                                                <Box
                                                                    style={{
                                                                        width: 150,
                                                                        display: 'flex',
                                                                        justifyContent: 'flex-end',
                                                                        paddingRight: 20
                                                                    }}
                                                                >
                                                                    {props.width !== 'xs' && props.width !== 'sm' &&
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() => props.setSlug(r)}
                                                                            className={`${classes.vizNav} ${props.slug.slug === r.slug ? 'active' : ''}`}
                                                                        >
                                                                            <RemoveRedEyeTwoToneIcon />
                                                                        </IconButton>
                                                                    }


                                                                    {r.slug &&
                                                                        <a href={"https://nd-lucy-cdt-archive.s3.amazonaws.com/web_files/inventarios/" + r.slug + "_resources.csv"}>
                                                                            <IconButton
                                                                                size="small"
                                                                                className={classes.vizNav}
                                                                            >
                                                                                <StorageIcon />
                                                                            </IconButton>
                                                                        </a>
                                                                    }
                                                                    {r.backup &&
                                                                        <a href={"https://nd-lucy-cdt-archive.s3.amazonaws.com/web_files/backup/" + r.backup + ".zip"}>
                                                                            <IconButton
                                                                                size="small"
                                                                                className={classes.vizNav}
                                                                            >
                                                                                <CloudDownloadOutlinedIcon />
                                                                            </IconButton>
                                                                        </a>
                                                                    }
                                                                    {r.enlace &&
                                                                        <Link to={"/explora/buscador?fondos=" + r.enlace}>
                                                                            <IconButton
                                                                                size="small"
                                                                                className={classes.vizNav}
                                                                            >
                                                                                <LocalLibraryOutlinedIcon />
                                                                            </IconButton>
                                                                        </Link>
                                                                    }
                                                                    {r.children &&
                                                                        <Link to={"/explora/buscador?fondos=" + r.id + "&children=true"}>
                                                                            <IconButton
                                                                                size="small"
                                                                                className={classes.vizNav}
                                                                            >
                                                                                <LocalLibraryOutlinedIcon />
                                                                            </IconButton>
                                                                        </Link>
                                                                    }


                                                                </Box>

                                                            </Toolbar>

                                                        </>}
                                                        style={{
                                                            padding: 0,
                                                        }}
                                                    >

                                                    </CardHeader>
                                                </Card>
                                            </>
                                        )
                                    })}
                                </Box>
                            )
                        })}
                        {/* {listadoFondos.map((r, index) => {
                        let temp = index % 7
                        return (
                            <>
                                <Card
                                    className={classes.fondos_cardFondo}
                                >
                                    <CardHeader
                                        title={<>
                                            <Toolbar
                                                style={{
                                                    padding: 0,
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <Typography
                                                    style={{
                                                        fontSize: 16,
                                                        marginLeft: 20,
                                                        // fontWeight: 'bold',
                                                        color: 'white'
                                                    }}
                                                    variant="h6"
                                                >{r.text}</Typography>
                                                <Box
                                                    style={{
                                                        width: 150,
                                                        display: 'flex',
                                                        justifyContent: 'flex-end',
                                                        paddingRight: 20
                                                    }}
                                                >
                                                    <a href="#">
                                                        <IconButton
                                                            size="small"
                                                            style={{
                                                                border: '1px solid #7a8da4',
                                                                background: '#7a8da4',
                                                                color: 'white',
                                                                padding: 5,
                                                                marginLeft: 10
                                                            }}
                                                        >
                                                            <RemoveRedEyeTwoToneIcon />
                                                        </IconButton>
                                                    </a>

                                                    {r.dataset &&
                                                        <a href={"https://api.archivo.comisiondelaverdad.co/api/records/inventarios/" + r.dataset}>
                                                            <IconButton
                                                                size="small"
                                                                style={{
                                                                    border: '1px solid #7a8da4',
                                                                    background: '#7a8da4',
                                                                    color: 'white',
                                                                    padding: 5,
                                                                    marginLeft: 10
                                                                }}
                                                            >
                                                                <StorageIcon />
                                                            </IconButton>
                                                        </a>
                                                    }
                                                    {r.backup &&
                                                        <a href={"https://api.archivo.comisiondelaverdad.co/api/records/backup/" + r.backup}>
                                                            <IconButton
                                                                size="small"
                                                                style={{
                                                                    border: '1px solid #7a8da4',
                                                                    background: '#7a8da4',
                                                                    color: 'white',
                                                                    padding: 5,
                                                                    marginLeft: 15
                                                                }}
                                                            >
                                                                <CloudDownloadOutlinedIcon />
                                                            </IconButton>
                                                        </a>
                                                    }
                                                    {r.enlace &&
                                                        <Link to={"/explora/buscador?fondos=" + r.enlace}>
                                                            <IconButton
                                                                size="small"
                                                                style={{
                                                                    border: '1px solid #7a8da4',
                                                                    background: '#7a8da4',
                                                                    color: 'white',
                                                                    padding: 5,
                                                                    marginLeft: 10
                                                                }}
                                                            >
                                                                <LocalLibraryOutlinedIcon />
                                                            </IconButton>
                                                        </Link>
                                                    }



                                                </Box>

                                            </Toolbar>

                                        </>}
                                        style={{
                                            padding: 0,
                                        }}
                                    >

                                    </CardHeader>
                                </Card>
                            </>
                        )
                    })} */}
                    </Flickity>
                </Box>
            </Box>
        </Box>
    )
}

export default withWidth()(ArbolFondos)