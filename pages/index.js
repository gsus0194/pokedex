import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useStateValue } from "../context/StateProvider";
import SkeletonCard from "../components/SkeletonCard";

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
  pages: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Home = () => {
  const classes = styles();
  const [{ page, results }, dispatch] = useStateValue();
  // const [page, setPage] = useState(1);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    const getdata = async () => {
      if (localStorage.getItem("pokedex-page")) {
        dispatch({
          type: "LIST_SUCCESS",
          payload: JSON.parse(localStorage.getItem("pokedex-page")),
        });
        return;
      }

      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?offset=0&limit=12"
        );
        dispatch({
          type: "LIST_SUCCESS",
          payload: res.data,
        });
        localStorage.setItem("pokedex-page", JSON.stringify(res.data));
      } catch (error) {
        dispatch({
          type: "LIST_ERROR",
          payload: error,
        });
      }
    };

    getdata();
  }, []);

  const handleChange = async (event, value) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${
      value * 12 - 12
    }&limit=12`;

    try {
      const res = await axios.get(url);
      dispatch({
        type: "LIST_SUCCESS",
        payload: { results: res.data.results, page: value },
      });
      localStorage.setItem(
        "pokedex-page",
        JSON.stringify({ results: res.data.results, page: value })
      );
    } catch (error) {
      dispatch({
        type: "LIST_ERROR",
        payload: error,
      });
    }
  };

  return (
    <Navbar>
      <Container className={classes.root} maxWidth="lg">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb={3}
          className={classes.pages}
        >
          <Pagination
            count={75}
            page={page}
            onChange={handleChange}
            color="secondary"
            size={matches ? "large" : "medium"}
          />
        </Box>
        <Grid container spacing={2}>
          {results?.map((pokemon, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={i} className={classes.item}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <PokemonCard url={pokemon.url} />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Navbar>
  );
};

export default Home;
