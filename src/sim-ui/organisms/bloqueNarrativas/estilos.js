import { makeStyles, withStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
    sideNav: {
        position: 'fixed',
        right: 0,
        width: 60,
        top: 100,
        transition: 'all 0.25s ease',

        '&.showIndex': {
            right: 250
        },

        [theme.breakpoints.down('sm')]: {
            width: 45
        }
    },
    rootText: {
        position: 'relative',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        width: 'calc(100% - 70px)',
        paddingTop: 90,
        paddingBottom: 100,

        [theme.breakpoints.down('sm')]: {
            width: 'calc(100%)',
            minHeight: 'auto',
            paddingBottom: 90,
        },

        '&.ligera': {
            width: '100%',
            paddingTop: 20,
            paddingBottom: 50,
        }
    },
    contenedorTarjeta: {
        maxWidth: 650,
        width: '100%',

        '&.frame': {
            width: '80vw',
            maxWidth: 'none'
        }
    },
    cajaIndice: {
        width: 250,
        height: 'calc(100% - 70px)',
        paddingTop: 70,
        position: 'fixed',
        top: 0,
        right: -250,
        backgroundColor: '#222',
        transition: 'all 0.25s ease',
        overflow: 'auto',

        '&.showIndex': {
            right: 0
        },

        '& h2': {
            color: '#999',
            fontSize: 16,
            margin: 2,
            marginTop: 10,
            marginLeft: 20,
            borderBottom: '1px dashed #333',
            paddingBottom: 5,
            textTransform: 'lowercase',
            textIndent: 13,
            position: 'relative',
            cursor: 'pointer',

            '&:hover': {
                '&::before': {
                    background: '#777'
                }
            },

            '&.active': {
                color: 'white',
                fontWeight: 'bold',

                '&::first-letter': {
                    fontWeight: 'bold',
                    textTransform: "uppercase",
                    color: 'white'
                },
            },

            '&::first-letter': {
                textTransform: "uppercase",
                color: '#999'
            },

            '&::before': {
                content: '""',
                width: 10,
                height: 10,
                borderRadius: 10,
                background: '#444',
                position: 'absolute',
                top: 5,
                left: -3
            }
        },

        '& h3': {
            color: 'white',
            fontSize: 14,
            margin: 2,
            marginTop: 3,
            marginLeft: 8
        }
    },
    iconSideNav: {
        width: 50,
        height: 50,
        // border: '1px solid rgba(255,255,255,.5)',
        backgroundColor: 'rgba(255,255,255,.1)',
        borderRadius: 50,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '&:hover': {
            backgroundColor: 'rgba(0,0,0,.6)',
        },

        '&.hidden': {
            visibility: 'hidden'
        },

        '&.active': {
            border: '1px solid rgba(255,255,255,.6)',
            backgroundColor: 'rgba(255,255,255,.8)',
            '& path': {
                fill: '#333'
            },
        },
        '& path': {
            fill: 'white'
        },

        [theme.breakpoints.down('sm')]: {
            width: 35,
            height: 35,
        }
    },
    numCardDisplay: {
        // border: '1px solid rgba(0,0,0,.3)',
        backgroundColor: 'rgba(0,0,0,.3)',
        width: 50,
        borderRadius: 12,
        marginBottom: 10,
        fontSize: 12,
        textAlign: 'center',
        '& div': {
            padding: 5,
            color: 'white',
        },
        '& div:first-child': {
            backgroundColor: 'rgba(255,255,255,.1)',
            '-webkit-border-top-left-radius': 12,
            '-webkit-border-top-right-radius': 12,
            '-moz-border-radius-topleft': 12,
            '-moz-border-radius-topright': 12,
            'border-top-left-radius': 12,
            'border-top-right-radius': 12,
            fontWeight: 'bold'
            // color: '#333'
        }
    },
    mapa: {
        width: 250,
        border: '1px solid rgba(255,255,255,.2)',
        backgroundColor: 'rgba(0,0,0,.3)',

        '& svg': {
            marginBottom: -5
        }
    },
    root: {
        transition: 'all 0.25s ease',
        left: 0,

        '&.showIndex': {
            left: -250
        }
    },
    mapaBox: {
        width: 'calc(100% - 130px)',
        paddingLeft: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '& .texto': {
            color: 'white',
            paddingLeft: 20,
            fontSize: 20,
            maxWidth: 500,
            width: 'calc(100% - 250px)'
        },

        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',

            '& .texto': {
                width: '100%',
                marginTop: 20
            }
        }
    },
    colTitle: {
        position: 'absolute',
        color: 'white',
        borderBottom: '1px solid white',
        fontSize: '40px',
        top: '70px',
        padding: '20px',
        width: 'calc(100% - 160px)',
        textAlign: 'center',
        backdropFilter: 'Blur(50px)',
        fontWeight: 'bold',
        paddingTop: 35,
        paddingBottom: 35,
        left: 50,

        [theme.breakpoints.down('sm')]: {
            fontSize: 30
        }
    }
}))