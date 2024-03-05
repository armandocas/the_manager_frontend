import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { login } from "../actions/auth";
import logo from "../assets/favicon-96x96.png";

// MUI Imports
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Função de validação (ajuste conforme necessário)
const required = value => !value && 'Este campo é obrigatório!';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, message } = useSelector(state => ({
    isLoggedIn: state.auth.isLoggedIn,
    message: state.message.message
  }));

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    // Supondo que a validação esteja correta aqui, chame a ação de login
    if (username && password) {
      dispatch(login(username, password))
        .then(() => {
          navigate("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    navigate("/profile");
  }

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Box
          sx={{
            m: 1, 
            display: 'flex',
            justifyContent: 'center',
          }}
        >
        <img
            src={logo}
            alt="Logo da empresa"
            style={{
            height: '100px',
            width: 'auto'
          }}
        />
        </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Endereço de Email"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar-me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Entrar'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
