import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  subtitle: {
    color: theme.palette.primary.main,
    fontSize: "16px",
    fontWeight: "bold",
    marginRight: "30px",
    "&:not(:first-child)": { marginLeft: "30px" },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0 !important",
    },
  },
}));

function Subtitle({ children, color }) {
  const classes = useStyles();
  return (
    <Typography variant="h5" className={classes.subtitle} style={{color: color ? color : 'inherit'}}>
      {children}
    </Typography>
  );
}

export default Subtitle;
