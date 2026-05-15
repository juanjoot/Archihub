import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import { Box } from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ExpandInfo = props => {
    const [expanded, setExpanded] = useState(false)

    const handleChange = panel => (e, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <>
            {props.info.map((i, index) => {
                return (
                    <Accordion
                        expanded={expanded === `panel_${index}`}
                        onChange={handleChange(`panel_${index}`)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography variant="h3">
                                {i.title}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {i.texto}
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </>
    )
}

export default ExpandInfo