import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& thead th": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    "& tbody tr:nth-child(even)": {
      backgroundColor: theme.palette.grey[100],
    },
  },
}));

const createData = (name, data) => {
  // si es una fecha
  if (data) {
    if (data.start && data.end)
      return {
        name: name,
        data: data.start.split("-")[0] + " - " + data.end.split("-")[0],
      };
    else if (Array.isArray(data)) {
      return { name: name, data: undefined };
    } else if (data) return { name: name, data: data };
  } else return { name: name, data: undefined };
};

const Metadata = (props) => {
  const classes = useStyles();
  const rows = [
    createData("Identificador", props.ident),
    createData("Fecha", props.time),
    createData("Autor", props.autor),
    createData("Url", props.simpleident),
  ];

  return (
    <>
      <TableContainer>
        <Table size="small" className={classes.root}>
          <TableHead>
            <TableRow>
              <TableCell>Metadata</TableCell>
              <TableCell>Descripción</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => {
              if (row.name == "Url")
                return (
                  <>
                    {row.data && (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>
                            <a href={`/explora/detalle/${row.data}`}>{window.location.host + '/explora/detalle/' + row.data}</a>
                            </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              return (
                <>
                  {row.data && (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.data}</TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Metadata;
