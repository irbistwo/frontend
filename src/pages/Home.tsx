import { VerifiedUser} from "@mui/icons-material";
import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    Button,
    Grid,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ProviderContextAuth} from "../providers/ContextAuthProvider";
import {sendGetData} from "../service/service";

const Home = () => {
    const auth = React.useContext(ProviderContextAuth);
    let navigate = useNavigate();
    const [user, setUser] = useState<string|null>(null);
    const [email, setEmail] = useState<string>("");
    const [datareg, setDatareg] = useState<string>("");
    useEffect(()=>{
        if(user) return;
        (async () => {
            try {
                const res =  await sendGetData("/users/userinfo",  auth.get_token());
                const json=JSON.parse(res);
                setUser(json.username);
                setEmail(json.email);
                setDatareg(json.datacreate);
            } catch(e){
                setUser(null);

            }
        })();
    },[user])
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
                        <VerifiedUser />
                    </Avatar>
                    <Typography variant="h5">Autorized</Typography>
                    <Box sx={{ mt: 1 }}>

                        <p>
                            Welcome {user}!{" you are logged in"}<br/>
                            Email {email}<br/>
                            Data registration {datareg}<br/>
                            <button
                                onClick={() => {
                                    auth.signout();
                                }}
                            >
                                Sign out
                            </button>
                        </p>


                        <Grid container justifyContent={"flex-end"}>
                            <Grid item>
                                <Link to="/login">ReLogin</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Home;
