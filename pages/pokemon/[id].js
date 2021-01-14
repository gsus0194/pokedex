import {
  Box,
  Container,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import PokemonBigCard from "../../components/PokemonBigCard";
import Biography from "../../components/Biography";
import Stats from "../../components/Stats";
import Evolutions from "../../components/Evolutions";

const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 40,
    [theme.breakpoints.up("lg")]: {
      height: "82.5vh",
      marginBottom: 0,
    },
  },
  container: {
    background: "#e3e3e3",
    borderRadius: "345px 345px 20px 20px",
    [theme.breakpoints.up("lg")]: {
      borderRadius: "345px 20px 20px 345px",
    },
  },
  info: {
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 15,
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
};

const Pokemon = ({ pokemon, pokemonSpecies }) => {
  const classes = styles();
  const theme = useTheme();
  const matchesLg = useMediaQuery(theme.breakpoints.up("lg"));
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Navbar>
      <Container maxWidth={matchesLg ? "lg" : "sm"} className={classes.root}>
        <Grid container className={classes.container}>
          <Grid item xs={12} lg={6}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <PokemonBigCard
                id={pokemon.id}
                image={pokemon.sprites.other["official-artwork"].front_default}
                name={pokemon.name}
                types={pokemon.types}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6} className={classes.info}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              style={{ marginTop: 15 }}
            >
              <Tab label="Biography" value={0} />
              <Tab label="Stats" value={1} />
              <Tab label="Evolutions" value={2} />
            </Tabs>
            <Box display="flex" alignItems="center" justifyContent="center">
              <TabPanel value={value} index={0}>
                <Biography
                  description={
                    pokemonSpecies.flavor_text_entries?.find((item) => {
                      return item.language.name === "en";
                    }).flavor_text
                  }
                  species={
                    pokemonSpecies.genera?.find((genus) => {
                      return genus.language.name === "en";
                    }).genus
                  }
                  height={pokemon.height / 10}
                  weight={pokemon.weight / 10}
                  abilities={pokemon.abilities}
                  gender={pokemonSpecies.gender_rate}
                  eggGroup={pokemonSpecies.egg_groups}
                  baseExp={pokemon.base_experience}
                  baseHappiness={pokemonSpecies.base_happiness}
                  captureRate={pokemonSpecies.capture_rate}
                  growthRate={pokemonSpecies.growth_rate.name}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Stats />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Evolutions />
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Navbar>
  );
};

Pokemon.getInitialProps = async ({ query }) => {
  const id = query.id;
  const pokemon = await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.data);
  const pokemonSpecies = await axios
    .get(`http://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((res) => res.data);
  return { pokemon, pokemonSpecies };
};

export default Pokemon;
