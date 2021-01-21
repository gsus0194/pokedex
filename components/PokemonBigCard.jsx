import {
  Box,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { TYPE_COLORS, TITLE_COLORS, BG_COLORS } from "../utils/colors";

const styles = makeStyles((theme) => ({
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
    width: 140,
    height: 140,
    [theme.breakpoints.up("sm")]: {
      marginTop: 20,
      marginBottom: 20,
      width: 240,
      height: 240,
    },
  },
  img: {
    width: 150,
    height: 150,
    [theme.breakpoints.up("sm")]: {
      width: 250,
      height: 250,
    },
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
}));

const PokemonBigCard = (props) => {
  const { id, image, name, types } = props;
  const classes = styles();
  const theme = useTheme();
  const matchMd = useMediaQuery(theme.breakpoints.only("md"));
  const matchSm = useMediaQuery(theme.breakpoints.only("sm"));
  const matchXs = useMediaQuery(theme.breakpoints.only("xs"));

  const idString = "" + id;
  const filler = "000";

  const typesArray = types.map((type) => type.type.name); // new types
  const pokemonId =
    filler.substring(0, filler.length - idString.length) + idString; // new id

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      borderRadius="50%"
      width={matchMd ? 560 : matchSm ? 550 : matchXs ? 350 : 620}
      height={matchMd ? 560 : matchSm ? 550 : matchXs ? 350 : 620}
      style={{ background: `${BG_COLORS[typesArray[0]]}` }}
    >
      <Typography
        className={classes.title}
        variant={matchXs ? "h2" : "h1"}
        style={{ color: TITLE_COLORS[typesArray[0]] }}
      >
        #{pokemonId}
      </Typography>
      <div
        className={classes.bgImg}
        style={{ backgroundColor: `${TYPE_COLORS[typesArray[0]]}` }}
      >
        <img
          src={image}
          className={classes.img}
          alt={`${name} official artwork`}
        />
      </div>
      <div className={classes.footer}>
        <Typography
          className={classes.name}
          variant={matchXs ? "h4" : "h3"}
          style={{ color: TITLE_COLORS[typesArray[0]] }}
        >
          {name}
        </Typography>
        <Grid container spacing={4}>
          {typesArray.map((type, i) => (
            <Grid
              item
              xs={typesArray.length > 1 ? 6 : 12}
              key={i}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {console.log(typesArray.length)}
              <Typography
                variant={matchXs ? "h5" : "h4"}
                className={i > 0 ? classes.twoType : ""}
                style={{
                  color: TITLE_COLORS[typesArray[i]],
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                {type}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default PokemonBigCard;
