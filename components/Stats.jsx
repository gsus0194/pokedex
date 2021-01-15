import React from "react";
import { Box, Grid, makeStyles, Slider, Typography } from "@material-ui/core";
import { TITLE_COLORS } from "../utils/colors";
import { Fragment } from "react";

const styles = makeStyles((theme) => ({
  title: {
    fontWeight: 800,
  },
}));

const Stats = ({ stats, types }) => {
  const classes = styles();
  const typesArray = types.map((type) => type.type.name);

  const statNames = () => {
    return stats.map((stat, i) => (
      <Typography
        key={i}
        variant="subtitle1"
        style={{ textTransform: "capitalize" }}
      >
        {stat.stat.name === "special-attack"
          ? "Sp-Atk"
          : stat.stat.name === "special-defense"
          ? "sp-Def"
          : stat.stat.name}
      </Typography>
    ));
  };

  const statBase = () => {
    return stats.map((stat, i) => (
      <Typography key={i} variant="subtitle1" align="right">
        {stat.base_stat}
      </Typography>
    ));
  };

  const statMax = () => {
    return stats.map((stat, i) => (
      <Typography key={i} variant="subtitle1" align="right">
        {stat.stat.name === "hp"
          ? getMaxHP(stat.base_stat)
          : getMaxStat(stat.base_stat)}
      </Typography>
    ));
  };

  const statSlider = () => {
    return stats.map((stat, i) => (
      <Slider
        key={i}
        value={stat.base_stat}
        min={0}
        step={1}
        max={
          stat.stat.name === "hp"
            ? getMaxHP(stat.base_stat)
            : getMaxStat(stat.base_stat)
        }
        style={{ color: TITLE_COLORS[typesArray[0]] }}
      />
    ));
  };

  const getMaxHP = (base) => {
    return (
      Math.floor(0.01 * (2 * base + 31 + Math.floor(0.25 * 252)) * 100) +
      100 +
      10
    );
  };

  const getMaxStat = (base) => {
    let maxTemp =
      Math.floor(0.01 * (2 * base + 31 + Math.floor(0.25 * 252)) * 100) + 5;
    maxTemp = maxTemp + maxTemp * 0.1;
    return Math.floor(maxTemp);
  };

  const StatsRow = () => {
    return stats.map((item, index) => (
      <Fragment key={index}>
        <Grid item xs={3} sm={2}>
          <Typography
            variant="subtitle1"
            style={{ textTransform: "capitalize" }}
          >
            {item.stat.name === "special-attack"
              ? "Sp-Atk"
              : item.stat.name === "special-defense"
              ? "sp-Def"
              : item.stat.name}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={1}>
          <Typography variant="subtitle1" align="right">
            {item.base_stat}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={8}>
          <Slider
            value={item.base_stat}
            min={0}
            step={1}
            max={
              item.stat.name === "hp"
                ? getMaxHP(item.base_stat)
                : getMaxStat(item.base_stat)
            }
            disabled
            style={{ color: TITLE_COLORS[typesArray[0]] }}
          />
        </Grid>
        <Grid item xs={1}>
          <Typography variant="subtitle1" align="right">
            {item.stat.name === "hp"
              ? getMaxHP(item.base_stat)
              : getMaxStat(item.base_stat)}
          </Typography>
        </Grid>
      </Fragment>
    ));
  };

  const StatsGrid = () => {
    return (
      <Grid container item xs={12} spacing={2}>
        <StatsRow />
      </Grid>
    );
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      mt={3}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.title}>
            Base Stats
          </Typography>
        </Grid>
        <StatsGrid />
        <Grid container style={{ marginTop: 20 }}>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.title}>
              Notes
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Minimum stats are calculated with 0 EVs, IVs of 0.
            </Typography>
            <Typography variant="subtitle1">
              Maximum stats are calculated with 252 EVs, IVs of 31.
            </Typography>
            <Typography variant="subtitle1">
              Maximum values are calculated for level 100 Pokémon.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stats;
