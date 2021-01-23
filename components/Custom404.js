import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";

const Custom404 = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <img src="/404.svg" alt="Pokémon 404" loading="lazy" />
      <Typography align="center" variant={matches ? "h3" : "h4"}>
        Pokémon Not Found
      </Typography>
    </Box>
  );
};

export default Custom404;
