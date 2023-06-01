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
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import { ReactComponent as Logo } from "../../../vendor/logo.svg";
import backgroundJpe from "../../../vendor/jep2.jpg";

const Typography = styled(MuiTypography)(spacing);

const BigAvatar = styled(Logo)`
  fill: ${(props) => props.theme.palette.primary.main};
  width: 200px;
  height: 200px;
  text-align: center;
  margin: 0 auto ${(props) => props.theme.spacing(5)};
`;

const Wrapper = styled.div`
  padding-top: 3.5rem;
  position: relative;
  text-align: center;
  overflow: hidden;

  @keyframes perspectiveAnimation {
    from {
      opacity: 0.1;
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
const ImageBack = styled.img`
  max-width: 100%;
  height: auto;
  min-height: 33vh;
  display: block;
  box-shadow: 0 6px 18px 0 rgba(18, 38, 63, 0.075);
  border-radius: 5px;
  z-index: 0;
  opacity: 0.1;
  image-rendering: optimizequality;
  image-rendering: -webkit-optimize-contrast;
  margin-bottom: -100px;
  margin-top: -35px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
`;

const ImageWrapper = styled.div`
  background-attachment: fixed;
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

const ContainerFrame = styled.div`
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
`;

function Introduction() {
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTriggerAnimation(true);
    }, 500);
  }, []);

  return (
    <Wrapper>
      <Container>
        <ImageWrapper style={{ alignItems:'center' }}>
          <ImageBack
            alt="App de aviacion"
            src={backgroundJpe}
          />
          <Grid container alignItems="center" justifyContent="center" spacing={4}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <ContainerFrame>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/EkruPJwD8XQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen />
              </ContainerFrame>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Content>
                <Box align="center">
                  <BigAvatar alt="logo" src="/static/img/avatars/logoAviation.png" align="center"/>  
                </Box>
                <Title variant="h1" gutterBottom>
                  Aviation InSight{" "}
                </Title>
                <Grid container justifyContent="center" spacing={4}>
                  <Grid item xs={12} lg={10}>
                    <Subtitle color="textSecondary">
                      En Aviation In sight podrás prepárate de la mejor manera para el examen de titulación CIAAC.
                      Tendrás la oportunidad de administrar tu estudio, seleccionando cuestionarios por materia o con
                      simulacros tipo CIAAC. Podrás practicar las veces que quieras, desde cualquier dispositivo (pc,
                      tableta o celular) en cualquier horario.
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
                    Inscribete
                    <ArrowForward />
                  </Button>
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
        </ImageWrapper>
      </Container>
    </Wrapper>
  );
}

export default Introduction;
