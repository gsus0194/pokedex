import {
  Box,
  Button,
  Grid,
  makeStyles,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { getOffset } from "../utils/reducer";

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const styles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.up("sm")]: {
      width: 400,
    },
  },
}));

const genArray = [
  { gen: "ALL", offset: 0, total: 898, pages: 75 },
  { gen: "I", offset: 0, total: 151, pages: 13 },
  { gen: "II", offset: 151, total: 100, pages: 9 },
  { gen: "III", offset: 251, total: 135, pages: 12 },
  { gen: "IV", offset: 386, total: 107, pages: 9 },
  { gen: "V", offset: 493, total: 156, pages: 13 },
  { gen: "VI", offset: 649, total: 72, pages: 6 },
  { gen: "VII", offset: 721, total: 88, pages: 8 },
  { gen: "VIII", offset: 809, total: 89, pages: 8 },
];

const GenFilter = () => {
  const classes = styles();
  const [{ generation }, dispatch] = useStateValue();
  const [openModal, setOpenModal] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleGenChange = async (gen) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${getOffset(
      1,
      gen.offset
    )}&limit=12`;

    try {
      const res = await axios.get(url);
      dispatch({
        type: "LIST_SUCCESS",
        payload: {
          results: res.data.results,
          page: 1,
          generation: gen,
        },
      });
      localStorage.setItem(
        "pokedex-page",
        JSON.stringify({
          results: res.data.results,
          page: 1,
          generations: gen,
        })
      );
      setOpenModal(false);
    } catch (error) {
      dispatch({
        type: "LIST_ERROR",
        payload: error,
      });
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Typography variant="h6" style={{ marginRight: 20 }}>
        Filter by:
      </Typography>
      <Button variant="outlined" color="secondary" onClick={handleOpenModal}>
        Generation - {generation.gen}
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Typography id="modal-title" variant="h4">
            Pokémon Generations
          </Typography>
          <hr style={{ marginTop: 10, marginBottom: 15 }} />
          <Grid id="modal-description" container spacing={2}>
            {genArray?.map((gen) => (
              <Grid item key={gen.gen} xs={gen.gen === "ALL" ? 12 : 6}>
                <Button
                  onClick={(e) => handleGenChange(gen)}
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  {matches ? `Generation ${gen.gen}` : `Gen ${gen.gen}`}
                </Button>
              </Grid>
            ))}
          </Grid>
        </div>
      </Modal>
    </Box>
  );
};

export default GenFilter;
