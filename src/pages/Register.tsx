import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,Alert,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {sendPostData} from "../service/service";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errormessage, setErrormessage] = useState("");
    const [infomessage, setInfomessage] = useState("");
    const navigate = useNavigate();
    const validateEmail = (email:string) => {
        return (email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const notvalidate=():boolean => {
        let is_error = false;
        let message: string = "";
        setErrormessage("")
        if (password === "") {
            message = "Password must be not empty!";
            is_error = true;
        }
        if (password !== password2) {
           message=message.concat("Password and Confirm password not equals! ");
            is_error = true;
        }
        if (name === "") {
            message=message.concat("Name must be not empty!  ");
            is_error = true;
        }
        if (email === "") {
            message=message.concat("Email must be not empty!  ");
            is_error = true;
        }
        if (email !== "") {
            if(!validateEmail(email)) {
                message = message.concat("Email not validate!  ");
                is_error = true;
            }
        }

        if (is_error) {
                setErrormessage(message);
                setTimeout(() => setErrormessage(""), 4000);

        }
        return is_error;
    }
    const handleRegister = async () => {
     if (notvalidate()) return;

        try {
            const res = await sendPostData("/users/register", {username: name, password: password,email:email});
            console.log(res);
            const jsontoken=JSON.parse(res);
            setInfomessage("Congratulations! you are registered...will redirected on login page");
            setTimeout(() => navigate("/login"), 4000);
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
                    <Typography variant="h5">Register</Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password2"
                                    label="Confirm Password"
                                    type="password"
                                    id="password2"
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        {infomessage==="" ?
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleRegister}
                        >
                            Register
                        </Button>:<Alert severity="info">{infomessage}</Alert>
                        }
                        {errormessage && <Alert severity="warning">{errormessage}</Alert>}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login">Already have an account? Login</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Register;
