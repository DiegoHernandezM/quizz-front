import React from "react";
import styled from "@emotion/styled";
import { rgba } from "polished";
import { NavLink } from "react-router-dom";

import { Button, Box, Container, Grid, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";

import {
  Mail as MailIcon,
  Code as CodeIcon,
  Users as UsersIcon,
  Figma as FigmaIcon,
  BookOpen as BookOpenIcon,
  PlusCircle as PlusCircleIcon,
  Book,
  Search,
  List,
} from "react-feather";

const Wrapper = styled.div`
  ${spacing};
  background: ${(props) => props.theme.palette.background.paper};
  text-align: center;
`;

const TypographyOverline = styled(Typography)`
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const FeatureWrapper = styled.div`
  display: flex;
  text-align: left;
  padding: 18px 20px;
`;

const FeatureIcon = styled.div`
  svg {
    flex-shrink: 0;
    width: auto;
    height: 48px;
    width: 48px;
    background: ${(props) => rgba(props.theme.palette.primary.main, 0.15)};
    color: ${(props) => props.theme.palette.primary.main};
    padding: 10px;
    border-radius: 50%;
  }
`;

const ArrowForward = styled(ArrowForwardIcon)`
  margin-left: ${(props) => props.theme.spacing(2)};
`;

const Feature = ({ Icon, title, description }) => {
  return (
    <Grid item xs={12} sm={6} md={3} lg={3}>
      <FeatureWrapper>
        <FeatureIcon>
          <Icon />
        </FeatureIcon>
        <Box ml={6}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {description}
          </Typography>
        </Box>
      </FeatureWrapper>
    </Grid>
  );
};

function Features() {
  return (
    <Wrapper py={20}>
      <Container>
        <Typography variant="h2" component="h3" gutterBottom>
          En Aviation In Sight podrás realizar lo siguiente:
        </Typography>
        <Box mb={12} />
        <Grid container spacing={4}>
          <Feature
            Icon={Book}
            title="Estudiar con cuestionarios por materia o tipo examen."
            description=""
          />
          <Feature
            Icon={PlusCircleIcon}
            title="Identificar respuestas correctas."
            description=""
          />
          <Feature
            Icon={Search}
            title="Revisar explicación de ciertos escenarios."
            description=""
          />
          <Feature
            Icon={List}
            title="Visualizar resultado final y el progreso de tu estudio."
            description=""
          />
        </Grid>
      
      </Container>
    </Wrapper>
  );
}

export default Features;
