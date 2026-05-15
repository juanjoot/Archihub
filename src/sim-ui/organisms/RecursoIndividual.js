import React, { useEffect, useState } from 'react'
import TarjetaDocumento from './TarjetaDocumento'
import * as SearchService from "../../services/SearchService";


const RecursoIndividual = props => {
    const [data, setData] = useState(null)


    const loadByIdent = async () => {
        try {
            const resp = await SearchService.serviceSingleMuseoIdent(props.ident);
            if (resp && resp.hits && resp.hits.length) {
                setData(resp.hits[0]._source.document);

                console.log(resp.hits[0])
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (props.ident) {
            loadByIdent();
        }
    }, [props.ident])
    return (
        <>
            {data &&
                <TarjetaDocumento
                    place="white"
                    index={`${props.ident}`}
                    key={`${props.ident}`}
                    name={data.metadata.firstLevel.title}
                    description={data.metadata.firstLevel.description}
                    url={data.metadata.firstLevel.url}
                    fondo={data.type}
                    records={data.records}
                    ident={data.ident}
                    simpleident={data.metadata.simpleident}
                    slug={data.metadata.slug}
                    geo={data.metadata.firstLevel.geographicCoverage}
                    autor={data.metadata.firstLevel.creator}
                    time={data.metadata.firstLevel.temporalCoverage}
                />
            }
        </>
    )
}

export default RecursoIndividual