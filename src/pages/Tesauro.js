import Box from "@material-ui/core/Box";
import React from "react";
import MainLayout from "../sim-ui/layout/MainLayout";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core";
import Letters from "../sim-ui/organisms/tesauro/components/Letters";
import { TesauroProvider } from "../sim-ui/organisms/tesauro/context/tesauroContext";
import BreadCrumb from "../sim-ui/organisms/tesauro/components/BreadCrumb";
import Term from "../sim-ui/organisms/tesauro/components/Term";
import Info from "../sim-ui/organisms/tesauro/components/Info";
import ListConcepts from "../sim-ui/organisms/tesauro/components/ListConcepts";
import Main from "../sim-ui/organisms/tesauro/components/Main";

const useStyles = makeStyles((theme) => ({}));

const Tesauro = () => {
  const classes = useStyles();

  return (
    <TesauroProvider>
      <MainLayout>
        <Main />
      </MainLayout>
    </TesauroProvider>
  );
};

export default Tesauro;
