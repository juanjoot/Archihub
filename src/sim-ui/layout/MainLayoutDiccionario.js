import Box from '@material-ui/core/Box'
import MenuSuperior from '../organisms/MenuSuperior'
import MenuInferior from '../organisms/MenuInferior'
import { makeStyles } from "@material-ui/core";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const useStyles = makeStyles((theme) => ({
    bg: {
        minHeight: "100%",
        backgroundColor: "white",
        overflow: 'auto',
        paddingBottom: "60px"
    }
}))
const MainLayout = props => {
    const classes = useStyles()

    return (
        <>
            <MenuSuperior />
            <Box component="section" className={classes.bg}>
                {props.children}                
            </Box>                        
        </>
    )
}

export default withWidth()(MainLayout)