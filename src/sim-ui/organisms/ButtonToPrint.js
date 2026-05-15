import { makeStyles } from "@material-ui/core/styles";
import PrintIcon from "@material-ui/icons/Print";

const useStyles = makeStyles((theme) => ({
  containerToPrint: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "30px",
  },

  buttonPrint: {
    backgroundColor: "white",
    padding: "5px 10px",
    color: "#2a5080",
    border: "1px solid #d9d9d9",
    borderRadius: "5px",
    letterSpacing: "1px",
    "&:hover": {
      backgroundColor: "#ecedef",
    },
  },

  buttonPrintIcon: {
    marginRight: "3px",
  }
}));

const ButtonToPrint = () => {
  const classes = useStyles();

  const print = () => {
    let content = document.getElementById("divcontents");
    let pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.onload = () => {
      pri.focus();
      pri.print();
    };
  };

  return (
    <div className={classes.containerToPrint}>
      <button onClick={() => print()} className={classes.buttonPrint}>
        <PrintIcon className={classes.buttonPrintIcon} /> IMPRIMIR
      </button>
      <iframe id="ifmcontentstoprint" style={{ display: "none" }}></iframe>
    </div>
  );
};

export default ButtonToPrint;
