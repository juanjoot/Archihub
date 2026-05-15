import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, makeStyles } from '@material-ui/core'
import MapaColombia from "./MapaColombia";
import MetadataCard from '../MetadataCard';
import { METADA_INFO } from '../../../config/const';
import * as SearchService from '../../../services/SearchService'
import _ from "lodash";


const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: 5
    },
    scrollModify: {
        overflowY: "scroll",
        "&::-webkit-scrollbar": { width: "10px" },
        "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 0px grey",
            borderRadius: "10px",
            marginBlock: "0 250px 0 0 ",
            background: "rgba(0, 0, 0, 0)",
        },

        "&::-webkit-scrollbar-thumb": {
            background: theme.palette.primary.main,
            borderRadius: "10px",
            backgroundClip: "content-box",
            border: "0.2em solid rgba(0, 0, 0, 0)",
        },
    },
    mapa: {
        width: 200,
        margin: 5,
        float: 'left'
    },
    infoBox: {
        paddingTop: 30,
        paddingBottom: 30,
        maxHeight: 350,
        position: 'relative',

    },
    topGradient: {
        position: 'relative',
        top: 30,
        left: 0,
        width: '100%',
        height: 30,
        background: 'transparent',
        background: 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
        zIndex: 1
    },
    bottomGradient: {
        position: 'relative',
        top: -30,
        left: 0,
        width: '100%',
        height: 30,
        background: 'transparent',
        background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
        zIndex: 1
    }
}))

const getMetaData = (object) => {
    let aux_resource = JSON.parse(JSON.stringify(object));
    if (aux_resource.records) {
        delete aux_resource.records;
    }
    if (aux_resource._id) {
        delete aux_resource._id;
    }
    if (aux_resource.identifier) {
        delete aux_resource.identifier;
    }
    if (aux_resource.ResourceGroupId) {
        delete aux_resource.ResourceGroupId;
    }
    if (aux_resource.metadata._id) {
        delete aux_resource.metadata._id;
    }
    if (aux_resource.metadata.firstLevel.description) {
        delete aux_resource.metadata.firstLevel.description;
    }

    if (aux_resource.origin) {
        delete aux_resource.origin;
    }

    let i = 0;

    let list = _.map(flattenKeys(aux_resource), (v, k) => {
        let name = k
            .split(".")
            .filter((item) => isNaN(item))
            .join(".");
        return {
            id: ++i,
            name: METADA_INFO[name] ? METADA_INFO[name] : null,
            description: v !== null && isNaN(v) ? v.replace(/[[]{}]/g, "") : v,
            search: name.split(".").pop(),
        };
    });

    list = Object.values(
        list.reduce((item, { id, name, description, search }) => {
            item[name] = item[name] || { id, name, description: "", search: "" };
            item[name].description = item[name].description
                ? item[name].description + "\r\n" + description
                : description;
            item[name].search = search;
            return item;
        }, {}),
    ).filter((item) => item.name !== null);
    return list;
};

const flattenKeys = (obj, path = []) =>
    !_.isObject(obj)
        ? { [path.join(".")]: obj }
        : _.reduce(
            obj,
            (cum, next, key) => _.merge(cum, flattenKeys(next, [...path, key])),
            {},
        );

const CardInfo = props => {
    const classes = useStyles()
    const [vista, setVista] = useState('info')
    const [data, setData] = useState(null)
    const [fields, setFields] = useState(null)

    const setVistaView = (n) => {
        setVista(n)
    }

    const loadByIdent = async () => {
        try {
            const resp = await SearchService.serviceSingleMuseoIdent(props.ident);
            if (resp && resp.hits && resp.hits.length) {
                setData(resp.hits[0]._source.document);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (vista === 'metadata' && data === null) {
            loadByIdent()
        }
    }, [vista])

    useEffect(() => {
        if (data) {
            const list = getMetaData(data)
            if (list.length) setFields(list)
        }

    }, [data])

    return (
        <Box style={{ backgroundColor: 'white', padding: 7, borderRadius: 5 }}>
            <Button onClick={() => setVistaView('info')} className={classes.button} color="secondary" disableElevation variant={vista === 'info' ? 'contained' : 'outlined'} size="small">Información</Button>
            <Button onClick={() => setVistaView('metadata')} className={classes.button} color="secondary" disableElevation variant={vista === 'metadata' ? 'contained' : 'outlined'} size="small">Metadatos</Button>

            {vista === 'info' &&
                <>
                    <div className={classes.topGradient}></div>
                    <Box
                        className={`${classes.scrollModify} ${classes.infoBox}`}
                    >

                        {props.geo &&
                            <>
                                {props.geo.length > 1 &&
                                    <MapaColombia
                                        geo={props.geo}
                                        className={classes.mapa}
                                    />
                                }
                                {props.geo.length === 1 && props.geo[0].code === "CO" &&
                                    <>
                                        <MapaColombia
                                            geo={props.geo}
                                            className={classes.mapa}
                                        />
                                    </>
                                }
                            </>
                        }

                        {props.description}

                    </Box>
                    <div className={classes.bottomGradient}></div>
                </>
            }

            {vista === 'metadata' &&
                <>
                    <div className={classes.topGradient}></div>
                    <Box
                        className={`${classes.scrollModify} ${classes.infoBox}`}
                    >

                        {data &&
                            <>
                                <MetadataCard fields={fields} />
                            </>
                        }

                    </Box>
                    <div className={classes.bottomGradient}></div>
                </>
            }

        </Box>
    )
}

export default CardInfo