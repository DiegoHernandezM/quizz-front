import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { rgba } from "polished";

import {
  Box,
  Button,
  Container,
  Grid,
  Tooltip,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { Visibility as VisibilityIcon } from "@mui/icons-material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";

const Typography = styled(MuiTypography)(spacing);

const Wrapper = styled.div`
  padding-top: 3.5rem;
  position: relative;
  text-align: center;
  overflow: hidden;

  @keyframes perspectiveAnimation {
    from {
      opacity: 0;
      transform: perspective(1500px) rotateX(0deg);
    }

    to {
      opacity: 1;
      transform: perspective(2000px) rotateX(25deg);
    }
  }

  .animate__perspective {
    animation-name: perspectiveAnimation;
  }
`;

const Content = styled.div`
  padding: ${(props) => props.theme.spacing(6)} 0;
  line-height: 150%;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  min-height: 33vh;
  display: block;
  box-shadow: 0 6px 18px 0 rgba(18, 38, 63, 0.075);
  border-radius: 5px;
  z-index: 0;
  position: relative;
  image-rendering: optimizequality;
  image-rendering: -webkit-optimize-contrast;
  margin-bottom: -100px;
  margin-top: -35px;
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-top: -40px;
  }
`;

const ImageWrapper = styled.div`
  &:before {
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.02));
    bottom: 0;
    left: 0;
    position: absolute;
    content: " ";
    z-index: 1;
    display: block;
    width: 50%;
    height: 75px;
    pointer-events: none;
  }
`;

const Title = styled(Typography)`
  opacity: 0.9;
  line-height: 1.4;
  font-size: 1.75rem;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};

  ${(props) => props.theme.breakpoints.up("sm")} {
    font-size: 2rem;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    font-size: 2.5rem;
  }

  span {
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const Subtitle = styled(Typography)`
  font-size: ${(props) => props.theme.typography.h6.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  font-family: ${(props) => props.theme.typography.fontFamily};
  margin: ${(props) => props.theme.spacing(2)} 0;
`;

const BrandIcon = styled.img`
  vertical-align: middle;
  margin-right: ${(props) => props.theme.spacing(3)};
  height: auto;
`;

const Visibility = styled(VisibilityIcon)`
  margin-right: ${(props) => props.theme.spacing(2)};
`;

const Download = styled(DownloadIcon)`
  margin-right: ${(props) => props.theme.spacing(2)};
`;

const ArrowForward = styled(ArrowForwardIcon)`
  margin-left: ${(props) => props.theme.spacing(2)};
`;

const Version = styled(MuiTypography)`
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  background: ${(props) => rgba(props.theme.palette.primary.main, 0.1)};
  box-shadow: 0 1px 1px
    ${(props) => rgba(props.theme.palette.primary.main, 0.25)};
  padding: 3px 8px;
  border-radius: 4px;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  display: inline-block;
`;

function Introduction() {
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

    async function downloadApp() {
      console.log("👍", "butInstall-clicked");
      const promptEvent = window.deferredPrompt;
      if (!promptEvent) {
        // The deferred prompt isn't available.
        console.log("oops, no prompt event guardado en window");
        return;
      }
      // Show the install prompt.
      promptEvent.prompt();
      // Log the result
      const result = await promptEvent.userChoice;
      console.log("👍", "userChoice", result);
      // Reset the deferred prompt variable, since
      // prompt() can only be called once.
      window.deferredPrompt = null;
      // Hide the install button.
      setIsReadyForInstall(false);
    }

  useEffect(() => {
    setTimeout(() => {
      setTriggerAnimation(true);
    }, 500);
  }, []);

  return (
    <Wrapper>
      <Container>
        <Grid container alignItems="center" justifyContent="center" spacing={4}>
          <Grid item xs={12} sm={9} md={8} lg={8}>
            <Content>
              <Version variant="body2">v1.0.0</Version>
              <Title variant="h1" gutterBottom>
                Aviation InSight{" "}
              </Title>
              <Grid container justifyContent="center" spacing={4}>
                <Grid item xs={12} lg={10}>
                  <Subtitle color="textSecondary">
                    En Aviation In sight podrás prepárate de la mejor manera
                    para el examen de titulación CIAAC. Tendrás la oportunidad
                    de administrar tu estudio, seleccionando cuestionarios por
                    materia o con simulacros tipo CIAAC. Podrás practicar las
                    veces que quieras, desde cualquier dispositivo (pc, tableta
                    o celular) en cualquier horario.
                  </Subtitle>
                </Grid>
              </Grid>
              <Box my={6}>
                <Button
                  href="/auth/sign-up"
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  <Visibility />
                  Inscribete
                  <ArrowForward />
                </Button>
              </Box>

              <Box my={6}>
                {isReadyForInstall && (
                  <Button variant="contained" color="secondary" size="large" onClick={downloadApp}>
                    <Download />
                    Descargar App
                  </Button>
                )}
              </Box>

              <Typography variant="body2" color="textSecondary">
                Compatible con:
              </Typography>
              <div
                className={`animate__animated ${
                  triggerAnimation ? "animate__fadeIn" : ""
                }`}
                style={{ opacity: triggerAnimation ? 1 : 0 }}
              >
                <Box my={3}>
                  <Tooltip title="Chrome">
                    <BrandIcon
                      alt="Chrome"
                      src="/static/img/brands/chrome.png"
                      style={{ width: "40px" }}
                    />
                  </Tooltip>
                  <Tooltip title="Android">
                    <BrandIcon
                      alt="Android"
                      src="/static/img/brands/android.png"
                      style={{ width: "40px", background: "#FFF" }}
                    />
                  </Tooltip>
                  <Tooltip title="Apple">
                    <BrandIcon
                      alt="Apple"
                      src="/static/img/brands/appleinc.png"
                      style={{ width: "22px" }}
                    />
                  </Tooltip>
                </Box>
              </div>
            </Content>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="center" spacing={4}>
          <Grid item xs={12} sm={10} md={6} lg={6}>
            <div
              className={`animate__animated ${
                triggerAnimation ? "animate__perspective" : ""
              }`}
              style={{ opacity: triggerAnimation ? 1 : 0 }}
            >
              <ImageWrapper style={{ alignItems: "center" }}>
                <Image
                  alt="App de aviacion"
                  src={`/static/img/screenshots/temp-app.png`}
                />
              </ImageWrapper>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
}

export default Introduction;
