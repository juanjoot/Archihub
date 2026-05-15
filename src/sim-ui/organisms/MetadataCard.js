import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 17,
  },
  root: {
    border: "none",
    padding: "5px",
    color: theme.palette.primary.main,
    width: "10%",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({}));

const formatValue = (field) => {
  if (field.type === 'simple-date' && field.value) {
    return new Date(field.value).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  return field.value;
};

function MetadataCard(props) {
  const classes = useStyles();
  const [fields, setFields] = React.useState(props.fields | null);
  useEffect(() => {
    setFields(props.fields);
  }, [props.fields]);

  return (
    <TableContainer>
      <Table aria-label="customized table">
        <TableBody>
          {
            (fields && fields.length)? (
              <>
                {
                  fields.map((row) => {
                    if (row.description)
                      return (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.description}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                  }

                )}
              </>
            ) : ''

          }
          {/* {fields && fields.length && )} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MetadataCard;
