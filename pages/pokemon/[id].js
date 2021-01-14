import { Box, Container, Grid } from "@material-ui/core";
import axios from "axios";
import Link from "next/link";
import React from "react";
import Navbar from "../../components/Navbar";
import PokemonBigCard from "../../components/PokemonBigCard";

const Pokemon = ({ pokemon }) => {
  return (
    <Navbar>
      <Container maxWidth="lg" style={{ marginTop: 40 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <PokemonBigCard
                id={pokemon.id}
                image={pokemon.sprites.other["official-artwork"].front_default}
                name={pokemon.name}
                types={pokemon.types}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" justifyContent="center">
              Testing
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
  return { pokemon };
};

export default Pokemon;
