import {
  Box,
  Chip,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { TYPE_COLORS, TITLE_COLORS, BG_COLORS } from "../utils/colors";

const styles = makeStyles((theme) => ({
  ball: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    width: 300,
    height: 300,
  },
  title: {
    fontWeight: 800,
    letterSpacing: 7,
  },
  bgImg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    marginTop: 10,
    marginBottom: 10,
    width: 120,
    height: 120,
  },
  img: {
    height: 130,
    width: 130,
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    textTransform: "capitalize",
    fontWeight: 800,
    letterSpacing: 2,
  },
  types: {
    display: "flex",
    justifyContent: "center",
    marginTop: 5,
  },
  twoType: {
    marginLeft: 10,
  },
}));

const PokemonCard = ({ url }) => {
  const classes = styles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [id, setId] = useState("");
  const [image, setImg] = useState("");
  const [name, setName] = useState("");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const getPokemonData = async () => {
      const res = await fetch(url);
      const data = await res.json();

      const typesArray = data.types.map((type) => type.type.name);
      const idString = "" + data.id;
      const filler = "000";
      const idFull =
        filler.substring(0, filler.length - idString.length) + idString;

      setId(idFull);
      setImg(data.sprites.other["official-artwork"].front_default);
      setName(data.name);
      setTypes(typesArray);
    };
    getPokemonData();
  }, []);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <div
          className={classes.ball}
          style={{ background: `${BG_COLORS[types[0]]}` }}
        >
          <Typography
            className={classes.title}
            variant="h3"
            style={{ color: TITLE_COLORS[types[0]] }}
          >
            #{id}
          </Typography>
          <div
            className={classes.bgImg}
            style={{
              backgroundColor: `${TYPE_COLORS[types[0]]}`,
            }}
          >
            <img src={image} className={classes.img} alt="Official Artwork" />
          </div>
          <div className={classes.footer}>
            <Typography
              className={classes.name}
              variant="h5"
              style={{ color: TITLE_COLORS[types[0]] }}
            >
              {name}
            </Typography>
            <div className={classes.types}>
              {types.map((type, i) => (
                <Chip
                  key={i}
                  label={type}
                  className={i > 0 ? classes.twoType : ""}
                  size={matches ? "medium" : "small"}
                  style={{
                    color: TITLE_COLORS[types[i]],
                    backgroundColor: TYPE_COLORS[types[i]],
                    textTransform: "capitalize",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Box>
    </Grid>
  );
};

export default PokemonCard;
