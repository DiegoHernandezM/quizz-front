import React from "react";
import { Detector } from "react-detect-offline";
import { Button } from "@mui/material";
import WifiOffIcon from "@mui/icons-material/WifiOff";

const CheckConnection = (props) => (
    <>
        <Detector
        render={({online}) =>
            online ? 
            (props.children) : (
                <div style={{ paddingTop: '10px', textAlign: 'center'}}>
                    <WifiOffIcon sx={{ fontSize: 100}} />
                        <h1 style={{ marginBottom: '10px'}}>No cuentas con conexión a internet</h1>
                        <h4 style={{ margin: '10px'}}> Accede a las pruebas offline</h4>
                        <Button 
                        fullWidth
                        color="primary"
                        variant="contained"
                        >
                            Comenzar
                        </Button>
                </div>
            )
        }
        />
    </>
);

export default CheckConnection;