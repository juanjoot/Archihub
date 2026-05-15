import TarjetaDocumento from "./TarjetaDocumento"
import ElementoDocumento from "./ElementoDocumento"



const PiezaRecurso = props => {
    const { card, piece, position, handleChangePieceResource, lectura, place, copyLink, idSection } = props;

    const modificacionPieza = (obj, deleteArrObj) => {
        let copyPiece = { ...piece }
        if (obj)
            for (let p in obj) {
                copyPiece[p] = obj[p];
            }

        if (deleteArrObj)
            for (let i in deleteArrObj) {
                if (deleteArrObj[i] in copyPiece)
                    delete copyPiece[deleteArrObj[i]]
            }

        if (handleChangePieceResource)
            handleChangePieceResource(position, copyPiece);

    }

    return (
        <>
            {/* {("value" in piece) && lectura == true ?
                (<ElementoDocumento
                    pieza={piece} type={piece.value}
                />)
                : */}

            {piece.resource?.document &&
                <TarjetaDocumento
                    place={place}
                    index={`${position}-${piece.resource.document.ident}`}
                    key={`${position}-${piece.resource.document.ident}`}
                    name={piece.resource.document.metadata.firstLevel.title}
                    description={piece.resource.document.metadata.firstLevel.description}
                    fondo={piece.resource.document.type}
                    records={piece.resource.document.records}
                    ident={piece.resource.document.ident}
                    simpleident={piece.resource.document.metadata.simpleident}
                    url={piece.resource.document.metadata.firstLevel.url}
                    slug={piece.resource.document.metadata.slug}
                    geo={piece.resource.document.metadata.firstLevel.geographicCoverage}
                    time={piece.resource.document.metadata.firstLevel.temporalCoverage}
                    modificacionPieza={modificacionPieza}
                    pieza={piece}
                    lectura={lectura}
                    resource={piece.resource}
                    copyLink={copyLink}
                    idSection={idSection}
                />
            }


        </>

    );
}
export default PiezaRecurso;

