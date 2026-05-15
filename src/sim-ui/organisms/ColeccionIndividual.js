import React, { useEffect, useState } from 'react'
import TarjetaColeccionExplora from './TarjetaColeccionExplora'
import * as CollectionService from "../../services/CollectionService";


const ColeccionIndividual = props => {
    const [data, setData] = useState(null)


    const loadBySlug = async () => {
        try {
            const resp = await CollectionService.getCollectionBySlug(props.slug);
            const collectionHits = resp["hits"]["hits"];
            if (collectionHits.length > 0) {
                const collection = collectionHits[0];
                setData(collection["_source"]);

                console.log(collection)
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (props.slug) {
            loadBySlug();
        }
    }, [props.ident])
    return (
        <>
            {data &&
                <TarjetaColeccionExplora
                    place="white"
                    title={data.title}
                    cover_page={data['cover_page']}
                    slug={data.slug}
                    description={data.description}
                />
            }
        </>
    )
}

export default ColeccionIndividual