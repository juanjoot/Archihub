import React, { useState, useEffect } from 'react'
import * as RecordsService from "../../../services/RecordsService";
import Papa from 'papaparse';
import { HotTable } from '@handsontable/react';
import { Box } from '@material-ui/core';
import { URL_API } from '../../../config/const';

const MicrodatoDocumento = props => {
    const [archivo, setArchivo] = useState(null)
    const [csvFile, setCsvFile] = useState(null)

    useEffect(() => {
        setArchivo(RecordsService.serviceMicrodataFile(props.record, 'min'))
    }, [props.record])

    useEffect(() => {
        if (archivo) {
            const parsedContent = Papa.parse(archivo, {
                download: true,
                header: false,
                complete: r => { setCsvFile(r.data) }
            })
        }
    }, [archivo])

    return (
        <>
            {csvFile &&
                <Box
                    style={{
                        display: 'flex'
                    }}
                >
                    <HotTable
                        data={csvFile}
                        width="calc(100% - 220px)" height="300"
                        licenseKey="non-commercial-and-evaluation"
                        colHeaders={true}
                        rowHeaders={true}
                        customBorders={true}
                        dropdownMenu={true}
                        multiColumnSorting={true}
                        filters={true}
                        manualRowMove={true}
                        colWidths={100}
                        manualColumnResize={true}
                    />
                    <Box
                        style={{
                            width: 200,
                            background: 'rgb(191 202 217)',
                            padding: 10
                        }}
                    >

                        <p style={{ fontWeight: 'bold', color: 'rgb(42 80 128)' }}>* La previsualización no muestra el contenido completo. Tiene una de estas opciones para acceder a todos datos:</p>

                        {/* <a
                            style={{display: 'block', color: 'rgb(42 80 128)'}}
                            href={`${URL_API}/api/records/originalfile/${props.record}`}
                        >Descargar el archivo original</a> */}

                        <a
                            style={{ display: 'block', color: 'rgb(42 80 128)' }}
                            href={`${URL_API}/api/records/microdatafile/${props.record}/full`}
                        >Descargar el archivo CSV</a>

                    </Box>
                </Box>
            }
        </>
    )
}

export default MicrodatoDocumento