import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useApi from '../customHooks/useApi'

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="">
          Leaf Music
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    )
}
  
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}))

const Login = () => {
    let history = useHistory()
    const [isLogin, setIsLogin] = useState(false)
    const [creadentials, setCredentials] = useState({ user: '', pass: '' })
    const token = useContext(UserContext)
    const classes = useStyles()
    const data = useApi({
        link: 'auth', 
        method: 'POST',
        body: {
            username: creadentials.user,
            password: creadentials.pass
        },
        call: isLogin
    })
    useEffect(() => {
        if (data.fetchedData.token) {
            token.setToken(data.fetchedData.token)
            history.push('/')
        }
    }, [data.fetchedData])

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user"
              label="Username"
              name="user"
              autoFocus
              onChange={ e => setCredentials({...creadentials, user: e.target.value}) }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={ e => setCredentials({...creadentials, pass: e.target.value}) }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={ () => setIsLogin(isLogin ? false : true) }
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
}
export default Login