import React, { useEffect, useState } from 'react'
import { Card } from '@material-ui/core'
import { CardHeader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { CardContent } from '@material-ui/core'
import PhotoLibraryTwoToneIcon from '@material-ui/icons/PhotoLibraryTwoTone';
import PiezaImageCSSFixed from './PiezaImageCSSFixed'
import PiezaImageCSS from './PiezaImageCSS'
import { Box } from '@material-ui/core'
import { CardActions } from '@material-ui/core'
import { Button } from '@material-ui/core'
import LinkTwoToneIcon from '@material-ui/icons/LinkTwoTone';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: 'transparent',
        position: 'relative',
        '-webkit-border-radius': '5px',
        '-webkit-border-bottom-right-radius': '20px',
        '-moz-border-radius': '5px',
        '-moz-border-radius-bottomright': '20px',
        borderRadius: '5px',
        borderBottomRightRadius: '20px',

        '&.mobile': {
            maxWidth: 800,
            margin: '0 auto',
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
        }
    },
    cardContent: {
        padding: "5px !important",
    },
    headCard: {
        backgroundColor: 'rgba(255,255,255,.1)',
        padding: 0,
        alignItems: "flex-start",
        flexGrow: 1,

        '&.dark': {
            background: 'rgba(255,255,255,.15)'
        },

        '&.dark .MuiCardHeader-subheader': {
            color: 'rgba(255,255,255,.5)'
        }
    },
    avatar: {
        backgroundColor: 'rgba(255,255,255,.1)',
    },
    headerActions: {
        padding: 0,
    },
    titleCard: {
        color: theme.palette.secondary.main,
        fontSize: "1em",
        textDecoration: "none",
        color: 'white',
        position: 'relative',

        "&:hover": {
            textDecoration: "underline",
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "0.8em",
            lineHeight: "1",
        },
        ".mobile &": {
            fontSize: "0.8em",
            lineHeight: "1",
        },
    },
    btn: {
        background: 'rgba(255,255,255,.2)',
        color: 'white',
        borderRadius: 100,
        textTransform: 'lowercase',

        '&:hover': {
            color: theme.palette.primary.main
        }
    }
}))

const TarjetaColeccionExplora = props => {
    const classes = useStyles()

    return (
        <Card
            elevation={2}
            className={`${classes.root} ${props.place === 'white' ? 'mobile' : ''}`}
        >
            <PiezaImageCSSFixed key={"coverage_image"} position="absolute" piece={props["cover_page"]} path={props["cover_page"]["path"]} portada={true} />
            <CardHeader
                avatar={
                    <Link to={`/${props.slug}`}>
                        <Avatar className={props.place === "conoce" ? `${classes.avatar} dark` : classes.avatar} variant="square">
                            <PhotoLibraryTwoToneIcon />
                        </Avatar>
                    </Link>
                }
                title={
                    <Link
                        className={props.place === "conoce" ? `${classes.titleCard} dark` : classes.titleCard}
                        name={props.ident}
                        to={`/${props.slug}`}
                    >
                        {props.title}
                    </Link>
                }
                className={classes.headCard}
                titleTypographyProps={{
                    variant: "h6",
                    color: "primary",
                }}
            />

            <CardContent className={classes.cardContent}>
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <PiezaImageCSS center={false} position="relative" wh={{ w: 200, h: 150 }} size='small' key={"coverage_image"} piece={props["cover_page"]} path={props["cover_page"]["path"]} portada={true} />

                    <p style={{ margin: 0, marginLeft: 20, fontSize: '0.92em', color: 'white', width: 'calc(100% - 240px)', position: 'relative' }}>{props.description}</p>
                </Box>
            </CardContent>

            <CardActions
                style={{ justifyContent: 'flex-end' }}
            >
                <Link
                    name={props.ident}
                    to={`/${props.slug}`}
                    style={{
                        textDecoration: 'none'
                    }}
                >
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<LinkTwoToneIcon />}
                        className={classes.btn}
                        disableElevation
                    >
                        Visitar la colección
                    </Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export default TarjetaColeccionExplora