import { useState, useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MapaColombia from "../../extraCard/MapaColombia";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { useTheme } from "@material-ui/core/styles";
import Subtitle from "../../../atoms/Subtitle";

const Ubicacion = (props) => {
  const theme = useTheme();
  const [dpto, setDpto] = useState(null);
  const dptos = [
    { nombre: "AMAZONAS", id: "91" },
    { nombre: "ANTIOQUIA", id: "05" },
    { nombre: "ARAUCA", id: "81" },
    {
      nombre: "ARCHIPIÉLAGO DE SAN ANDRÉS, PROVIDENCIA Y SANTA CATALINA",
      id: "88",
    },
    { nombre: "ATLÁNTICO", id: "08" },
    { nombre: "BOGOTÁ, D.C.", id: "11" },
    { nombre: "BOLÍVAR", id: "13" },
    { nombre: "BOYACÁ", id: "15" },
    { nombre: "CALDAS", id: "17" },
    { nombre: "CAQUETÁ", id: "18" },
    { nombre: "CASANARE", id: "85" },
    { nombre: "CAUCA", id: "19" },
    { nombre: "CESAR", id: "20" },
    { nombre: "CHOCÓ", id: "27" },
    { nombre: "CUNDINAMARCA", id: "25" },
    { nombre: "CÓRDOBA", id: "23" },
    { nombre: "GUAINÍA", id: "94" },
    { nombre: "GUAVIARE", id: "95" },
    { nombre: "HUILA", id: "41" },
    { nombre: "LA GUAJIRA", id: "44" },
    { nombre: "MAGDALENA", id: "47" },
    { nombre: "META", id: "50" },
    { nombre: "NARIÑO", id: "52" },
    { nombre: "NORTE DE SANTANDER", id: "54" },
    { nombre: "PUTUMAYO", id: "86" },
    { nombre: "QUINDIO", id: "63" },
    { nombre: "RISARALDA", id: "66" },
    { nombre: "SANTANDER", id: "68" },
    { nombre: "SUCRE", id: "70" },
    { nombre: "TOLIMA", id: "73" },
    { nombre: "VALLE DEL CAUCA", id: "76" },
    { nombre: "VAUPÉS", id: "97" },
    { nombre: "VICHADA", id: "99" },
  ];

  useEffect(() => {
    if (props.dpto) {
      const obj = { id: props.dpto.divipola, nombre: props.dpto.nombre };
      setDpto(obj);
    } else setDpto(null);
  }, [props.dpto]);

  return (
    <Accordion expanded={true}>
      <AccordionSummary>
        <Subtitle>Filtrar por ubicación</Subtitle>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ minWidth: "100%" }}>
          <FormControl fullWidth sx={{ marginBottom: theme.spacing(0.5) }}>
            <InputLabel id="dpto-select-label">Departamento</InputLabel>
            <Select
              labelId="dpto-select-label"
              id="dpto-select"
              value={dpto ? dpto.id : ""}
              label="Departamento"
              onChange={(e, v) => {
                var index = dptos.find((d) => d.id === v.props.value);
                setDpto(index);

                const obj = { divipola: index.id, nombre: index.nombre };
                props.setDpto(obj);
              }}
            >
              {dptos.map((d) => {
                return <MenuItem value={d.id}>{d.nombre}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <MapaColombia
            key={dpto ? dpto.id : ""}
            geo={
              dpto
                ? [
                    {
                      code: "CO-" + dpto.id,
                    },
                    {
                      code: "CO",
                    },
                  ]
                : []
            }
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Ubicacion;
