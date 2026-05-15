import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Toolbar from '@material-ui/core/Toolbar'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom"




const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        position: 'relative',
        overflow: 'visible',
        marginBottom: theme.spacing(2),
        borderWidth: 0.1, borderColor: 'lightgray', borderStyle: 'solid',
        '& a': {
            color: theme.palette.grey[600]
        },
        '& a:hover': {
            color: theme.palette.common.black
        }
    },
    selected: {
        maxWidth: "100%",
        position: 'relative',
        overflow: 'visible',
        marginBottom: theme.spacing(2),
        borderWidth: 0.1, borderColor: theme.palette.secondary.main, borderStyle: 'solid',
        '& a': {
            color: theme.palette.secondary.main
        },
        '& a:hover': {
            color: theme.palette.secondary.dark
        }
    },
    ident: {
        position: 'absolute',
        top: '-14px',
        background: 'white',
        padding: '5px',
        fontSize: '11px',
        left: '10px',
        color: theme.palette.secondary.main
    },
    flexCard: {
        border: "none",
        boxShadow: "none",
        display: 'flex'
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    check: {
        marginLeft: 'auto'
    },
    content: {
        padding: "10px 10px 0px 10px"
    },
    collapse: {
        padding: "0px 5px 0px 5px",
        height: "40px"
    }
}));

const TarjetaBiblioteca = props => {
    const classes = useStyles();
    const [elevation, setElevation] = useState(0);
    const { resource, index, handleSelectCard, handleUnSelectCard, selected } = props
    const rutaDetail = "/detail/" + resource.document.ident
    let description = resource.document.metadata.firstLevel.description
    if (typeof description === 'undefined')
        description = ""
   
    const [expanded, setExpanded] = useState(false); 
    const [cardClass, setCardClass] = useState(classes.root);
   
    const handleChange = (event) => {
       
        if (event.target.checked) {
            // setElevation(10);
            setCardClass(classes.selected);
            handleSelectCard(resource)
        }
        else {
            setElevation(0);
            setCardClass(classes.root)
            handleUnSelectCard(resource)
        }

    };

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }


    return (

        <Card elevation={elevation} className={cardClass} key={index + "_card"}  >
            <Typography
                className={classes.ident}
            >
                {resource.document.ident}
            </Typography>

            <Link to={rutaDetail} target="_blank" rel="noopener noreferrer"  >
                <CardHeader
                    title={resource.document.metadata.firstLevel.title}
                    subheader={resource.document.type}
                />
            </Link>

            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="Expandir"
                >
                    <ExpandMoreIcon />
                </IconButton>

                <Toolbar>

                </Toolbar>
                {(typeof handleSelectCard !== 'undefined' &&  typeof  handleUnSelectCard  !== 'undefined')&&
                <Checkbox
                    checked={selected}
                    className={classes.check}
                    onChange={handleChange}
                    color="secondary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
            </CardActions>
       
            {(description !== "") &&
                <>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>
                                {description}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </>
            }
        </Card>

    )
}



export default TarjetaBiblioteca
