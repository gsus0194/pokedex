import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const SkeletonCard = () => {
  return (
    <Skeleton variant="circle" animation="wave" width={300} height={300} />
  );
};

export default SkeletonCard;
