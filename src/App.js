import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MuseoHome from "./pages/Home";
import Cargador from "./Cargador";
import './App.css'
import ReactGA from "react-ga4";

export default function App({ store, basename }) {
  
  // if(process.env.REACT_ENV === 'PROD') {
  //   ReactGA.initialize("G-06H3P1YKK4")
  //   ReactGA.send({ hitType: "pageview", page: window.location.pathname })
  // }

  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
      <Suspense fallback={<Cargador />}>
        {/* Override `basename` (e.g: `homepage` in `package.json`) */}
        <BrowserRouter basename={basename}>
          {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
          {/* Render routes with provided `Layout`. */}
          <MuseoHome />
        </BrowserRouter>
      </Suspense>
    </Provider>
  );
}
