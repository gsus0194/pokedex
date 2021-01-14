import React, { useEffect } from "react";
import { TYPE_COLORS, TITLE_COLORS, BG_COLORS } from "../utils/colors";

const PokemonBigCard = (props) => {
  const { id, image, name, types } = props;

  const idString = "" + id;
  const filler = "000";

  const typesArray = types.map((type) => type.type.name); // new types
  const pokemonId =
    filler.substring(0, filler.length - idString.length) + idString; // new id

  return (
    <div>
      <p>#{pokemonId}</p>
      <p>{name}</p>
      <br />
      <img src={image} style={{ height: 200 }} />
      {typesArray.map((type, i) => (
        <p key={i}>{type}</p>
      ))}
    </div>
  );
};

export default PokemonBigCard;
