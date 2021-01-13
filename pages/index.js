import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import { Container, Grid, makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
  },
}));

const Home = ({ pokemon }) => {
  const classes = styles();

  return (
    <Navbar>
      <Container className={classes.root} maxWidth="lg">
        <Grid container spacing={2}>
          {pokemon.map((pokemon, i) => {
            return <PokemonCard url={pokemon.url} key={i} />;
          })}
        </Grid>
      </Container>
    </Navbar>
  );
};

Home.getInitialProps = async () => {
  const pokemon = await axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=20")
    .then((res) => res.data.results);
  return { pokemon };
};

export default Home;
