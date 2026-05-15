import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import { makeStyles } from "@material-ui/core"
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

const useStyles = makeStyles(theme => ({
    slider: {
        '& .MuiSlider-valueLabel': {
            fontSize: 10
        }
    },
    formControl: {
        width: '100%',
        marginBottom: theme.spacing(2)
    }
}))

const LineaTiempo = props => {
    const classes = useStyles()
    const { temporalRange } = props

    let min = 2023
    let max = 2025

    let start = 2023
    let end = 2025

    if (temporalRange) {
        start = temporalRange.split('-')[0]
        end = temporalRange.split('-')[1]
    }

    const handleChange = (e, v) => {
        props.setTemporalRange(v.join('-'))
    }

    const handleYearSelect = (event) => {
        const year = event.target.value
        props.setTemporalRange(`${year}-${year}`)
    }

    // Generate array of years between min and max
    const years = Array.from({ length: max - min + 1 }, (_, i) => min + i)

    // Determine the selected year (only if start and end are the same)
    const selectedYear = (start === end) ? start : ""

    return (
        <>
            <FormControl className={classes.formControl}>
                <InputLabel sx={{
                }} id="year-select-label">Selecciona un año</InputLabel>
                <Select
                    labelId="year-select-label"
                    id="year-select"
                    value={selectedYear}
                    onChange={handleYearSelect}
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        Selecciona un año
                    </MenuItem>
                    {years.map(year => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box mt={6} mb={3}>
                <Slider
                    className={classes.slider}
                    value={[parseInt(start), parseInt(end)]}
                    min={min}
                    color="secondary"
                    marks
                    max={max}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    aria-labelledby="range-slider"
                />
            </Box>
        </>
    )
}

export default LineaTiempo
