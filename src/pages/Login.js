import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import * as ArchihubService from "../services/ArchihubService";
import * as authDuck from "../store/ducks/auth.duck";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6E3092",
    maxWidth: "100vw",
  },
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 400,
    width: "100%",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#6E3092",
    color: "white",
    "&:hover": {
      backgroundColor: "#5a2577",
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    color: "#6E3092",
  },
}));

const Login = ({ setAuth, isAuthenticated }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // If already authenticated, redirect to home
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await ArchihubService.login(username, password);
      
      if (response.access_token) {
        setAuth(response.access_token, response.user || { username });
        navigate("/");
      } else {
        setError("Respuesta inválida del servidor");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h4" className={classes.title}>
          Iniciar Sesión
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Ingrese sus credenciales para acceder
        </Typography>
        
        <form className={classes.form} onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" style={{ marginBottom: 16 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Ingresar"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth?.isAuthenticated || false,
});

const mapDispatchToProps = (dispatch) => ({
  setAuth: (token, user) => dispatch(authDuck.actions.setAuth(token, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
