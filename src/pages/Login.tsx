import { LockOutlined } from "@mui/icons-material";
import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid, Alert,
} from "@mui/material";
import React, { useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {sendPostData} from "../service/service";
import {ProviderContextAuth} from "../providers/ContextAuthProvider";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errormessage, setErrormessage] = useState("");
    const auth = React.useContext(ProviderContextAuth);
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogin = async() => {
        setErrormessage("")
        let from = location.state?.from?.pathname || "/";
       // let from="/";
        try {
            const res = await sendPostData("/auth/login", {username: email, password: password});
            console.log(res);
          const jsontoken=JSON.parse(res);
            auth.savetoken(jsontoken.access_token);
            navigate(from,{replace:true})
        }catch (e:any) {
            console.log(e);
            setErrormessage(e.toString())
        }
    };


    return (
        <>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        mt: 20,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography variant="h5">Login</Typography>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                        {errormessage && <Alert severity="warning">{errormessage}</Alert>}
                        <Grid container justifyContent={"flex-end"}>
                            <Grid item>
                                <Link to="/register">Don't have an account? Register</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Login;
