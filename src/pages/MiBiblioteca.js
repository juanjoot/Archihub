import { Component, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import * as app from "../store/ducks/app.duck";
import MainLayout from "../sim-ui/layout/MainLayout";
import Container from "@material-ui/core/Container";
//import Biblioteca from '../sim-ui/organisms/Biblioteca';
import Biblioteca from "../sim-ui/organisms/bloqueBusqueda/Biblioteca";
const MiBiblioteca = (props) => {
  return (
    <MainLayout>
      <Biblioteca />
    </MainLayout>
  );
};
const mapStateToProps = (store) => ({});

export default connect(mapStateToProps, app.actions)(MiBiblioteca);
