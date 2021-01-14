import React from "react";
import numeral from "numeral";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  title: {
    fontWeight: 800,
  },
}));

const Biography = (props) => {
  const {
    description,
    species,
    height,
    weight,
    abilities,
    gender,
    eggGroup,
    baseExp,
    baseHappiness,
    captureRate,
    growthRate,
  } = props;

  const classes = styles();
  const abilitiesArray = abilities.map((item) => item.ability.name);
  const gender_female = (gender / 8) * 100;
  const gender_male = 100 - gender_female;
  const eggArray = eggGroup.map((item) => item.name);
  const capture = (captureRate * 100) / 255;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      mt={3}
    >
      <div>
        <Typography variant="h5" className={classes.title}>
          Description
        </Typography>
        <Typography variant="subtitle1">{description}</Typography>
      </div>
      <Grid container style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.title}>
            Details
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" flexDirection="column">
            <Typography variant="subtitle1">Species</Typography>
            <Typography variant="subtitle1">Height</Typography>
            <Typography variant="subtitle1">Weight</Typography>
            <Typography variant="subtitle1">Abilities</Typography>
            <Typography variant="subtitle1">Gender</Typography>
            <Typography variant="subtitle1">Egg Group</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" flexDirection="column">
            <Typography variant="subtitle1">{species}</Typography>
            <Typography variant="subtitle1">{height}m</Typography>
            <Typography variant="subtitle1">{weight}kg</Typography>
            <Typography
              variant="subtitle1"
              style={{ textTransform: "capitalize" }}
            >
              {abilitiesArray.join(", ")}
            </Typography>
            <Typography variant="subtitle1">
              {gender_female <= -1 ? (
                <p>Genderless</p>
              ) : (
                <p>
                  M: {gender_male}% F: {gender_female}%
                </p>
              )}
            </Typography>
            <Typography
              variant="subtitle1"
              style={{ textTransform: "capitalize" }}
            >
              {eggArray.join(", ")}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.title}>
            Training
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Base Exp</Typography>
          <Typography variant="subtitle1">Base Happiness</Typography>
          <Typography variant="subtitle1">Catch Rate</Typography>
          <Typography variant="subtitle1">Growth Rate</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">{baseExp}</Typography>
          <Typography variant="subtitle1">{baseHappiness}</Typography>
          <Typography variant="subtitle1">
            {numeral(capture).format("0.00")}%
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ textTransform: "capitalize" }}
          >
            {growthRate}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Biography;
