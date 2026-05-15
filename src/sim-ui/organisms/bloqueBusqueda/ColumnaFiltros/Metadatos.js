import React, { useState, useEffect } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Subtitle from "../../../atoms/Subtitle";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 20
    }
}))

const Metadatos = props => {
    const theme = useTheme();
    const classes = useStyles();

    return (
        <>
            <Accordion expanded={true}>
                <AccordionSummary>
                    <Subtitle>Filtrar por metadatos</Subtitle>
                </AccordionSummary>

                <AccordionDetails>
                    <Box sx={{ minWidth: "100%" }}>
                        <FormControl fullWidth sx={{ marginBottom: theme.spacing(0.5) }}>
                            <InputLabel id="tipo-select-label">
                                Tipo de violencia
                            </InputLabel>
                            <Select
                                labelId="tipo-select-label"
                                id="tipo-select"
                                label="Tipo de violencia"
                                value={props.tipoViolencia ? props.tipoViolencia : ''}
                                onChange={(e) => props.setTipoViolencia(e.target.value)}
                            >
                                {[
                                    'Amenaza al derecho a la vida',
                                    'Ataque a bien protegido',
                                    'Ataque indiscriminado',
                                    'Atentado al derecho a la vida',
                                    'Confinamiento',
                                    'Desaparición forzada',
                                    'Desplazamiento forzado',
                                    'Despojo / Abandono de tierras',
                                    'Detención arbitraria',
                                    'Esclavitud / Trabajo forzoso sin fines sexuales',
                                    'Exilio',
                                    'Extorsión',
                                    'Homicidio',
                                    'Homicidio/Muerte',
                                    'Pillaje',
                                    'Reclutamiento de niños, niñas y adolescentes',
                                    'Reclutamiento, uso y utilización de niños, niñas y adolescentes',
                                    'Secuestro / Toma de rehenes',
                                    'Tortura y otros tratos crueles',
                                    'Tortura y otros tratos crueles, inhumanos o degradantes',
                                    'Violencia sexual'
                                ].map(d => {
                                    return (
                                        <MenuItem value={d}>{d}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ marginBottom: theme.spacing(0.5) }}>
                            <InputLabel id="actores-select-label">
                                Actores del conflicto
                            </InputLabel>
                            <Select
                                labelId="actores-select-label"
                                id="actores-select"
                                label="Actores del conflicto"
                                value={props.tipoActores ? props.tipoActores : ''}
                                onChange={(e) => props.setTipoActores(e.target.value)}
                            >
                                {[
                                    'Estructuras armadas legales',
                                    'Fuerza pública',
                                    'Grupo guerrillero',
                                    'Grupo paramilitar',
                                    'Grupos paramilitares',
                                    'Guerrilla',
                                    'Internacional',
                                    'No sabe / no responde',
                                    'Otro Actor',
                                    'Otro agente del Estado',
                                    'Otro grupo armado',
                                    'Tercero civil',
                                    'Terceros civiles'
                                ].map(d => {
                                    return (
                                        <MenuItem value={d}>{d}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default Metadatos