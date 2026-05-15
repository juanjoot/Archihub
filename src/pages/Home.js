import { lazy, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core";
import * as Scroll from 'react-scroll';

const scroll = Scroll.animateScroll;

const AutoSectionSelect = lazy(() => import("./AutoSectionSelect"));
const Explora = lazy(() =>
  import("../sim-ui/organisms/bloqueBusqueda/Explora"),
);
const ExploraColecciones = lazy(() =>
  import("../sim-ui/organisms/bloqueBusqueda/ExploraColecciones"),
);
const Intro = lazy(() => import("./Intro"));
const Colecciones = lazy(() => import("./Colecciones"));
const Coleccion = lazy(() => import("./Coleccion"));
const Detalle = lazy(() => import("./Detalle"));
const Login = lazy(() => import("./Login"));

function getSection(location) {
  const stringSplited = location.split("/");
  const section = stringSplited[1];
  return section;
}

const MuseoHome = (props) => {
  const location = useLocation();
  const section = getSection(location.pathname);
  const col_explora = {
    main: "#f45353",
    dark: "#e02020",
  };

  const col_conoce = {
    main: "#13c0c8",
    dark: "#019592",
  };

  const col_crea = {
    main: "#ffc258",
    dark: "#e07714",
  };

  let section_col = {
    main: "#2a5080",
    dark: "#19447c",
  };

  switch (section) {
    case "crea":
      section_col = col_crea;
      break;

    case "conoce":
      section_col = col_conoce;
      break;

    case "explora":
      section_col = col_explora;
      break;
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: "#6E3092",
        dark: "#19447c",
        gray: "#fafafa",
        light: "#65A3F2",
      },
      // secondary: section_col,
      secondary: {
        main: "#6E3092",
        dark: "#19447c",
        gray: "#fafafa",
        light: "#ffffff",
      },
      neutral: {
        main: "#ffffff",
        dark: "#19447c",
        gray: "#fafafa",
        light: "#ffffff",
      },
      all: {
        main: "#6E3092",
        conoce: "#13c0c8",
        explora: "#f45353",
        crea: "#ffc258",
      },
    },
    typography: {
      fontFamily: "'Obliqua ITC Std', sans-serif",
      fontSize: 16,
    },
    clasePrueba: {
      backgroundColor: "black",
    },
  });

  useEffect(() => {

    // if(process.env.REACT_APP_ENV === 'PROD') {
    //   ReactGA.initialize("G-06H3P1YKK4")
    //   ReactGA.send({ hitType: "pageview", page: location.pathname })
    // }

  }, []);

  return (
    <>
      <AutoSectionSelect location={location.pathname} />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/explora/buscador" element={<Explora />} />
          <Route path="/explora/colecciones/:id" element={<ExploraColecciones />} />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/" element={<Intro />} />
          <Route path="/colecciones" element={<Colecciones />} />
          <Route path="/login" element={<Login />} />
          
          {/* <Route path="/conoce" element={<Conoce />}></Route> */}
          <Route path="/:id" element={<Coleccion />}></Route>
          

        </Routes>
        {/* <IconButton color="primary" variant="outlined" class="toTop" onClick={scrollToTop} aria-label="up" size="large">
          <ArrowUpwardIcon />
        </IconButton> */}
      </ThemeProvider>
    </>
  );
};

export default MuseoHome;
