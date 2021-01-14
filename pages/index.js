import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import Link from "next/link";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: "50%",
    textDecoration: "none",
    overflow: "hidden",
    transform: "scale(1)",
    transition: "0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.08)",
    },
  },
}));

const Home = ({ pokemon }) => {
  const classes = styles();

  return (
    <Navbar>
      <Container className={classes.root} maxWidth="lg">
        <Grid container spacing={2}>
          {pokemon.map((pokemon, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={i} className={classes.item}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Link href={`/pokemon/${i + 1}`} passHref>
                    <a className={classes.button}>
                      <PokemonCard url={pokemon.url} />
                    </a>
                  </Link>
                </Box>
              </Grid>
            );
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
