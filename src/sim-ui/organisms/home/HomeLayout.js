import React, { useEffect } from 'react'
import { makeStyles } from "@material-ui/core"
import { connect } from "react-redux"
import * as museo from "../../../store/ducks/museo.duck"
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import Box from "@material-ui/core/Box"
import MainLayout from '../../layout/MainLayout';
import TopBarra from '../TopBarra'
import GridContent from './GridContent';
import Logos from './Logos';
import CabezoteIntro from './CabezoteIntro';

const useStyles = makeStyles((theme) => ({
    bottomContent: {
        borderBottom: '1px solid white',
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(8),
        background: theme.palette.primary.main,
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            paddingTop: theme.spacing(8),
        }
    },
}))

const HomeLayout = props => {
    const classes = useStyles();
    const { setOpenLienzoCrea} = props
    setOpenLienzoCrea(false);
    useEffect(() => {
    setOpenLienzoCrea(false);

    
     }, []);
    return (
        <MainLayout>
            <Box className={classes.bottomContent}>
                {props.colecciones !== true &&
                    <CabezoteIntro />
                }

                <GridContent />
            </Box>
        </MainLayout>
    )
}

const mapStateToProps = store => ({
    openLienzoCrea: store.museo.openLienzoCrea
  });
  
  export default connect(mapStateToProps,museo.actions)(withWidth()(HomeLayout));
