import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonLayout() {
  const [change, setChange] = React.useState();
  const responsive = {
    width: 600,
  };
  if (window.innerWidth >= 1024) {
    responsive.width = 600;
  } else if (window.innerWidth >= 768) {
    responsive.width = 500;
  } else if (window.innerWidth >= 480) {
    responsive.width = 300;
  } else {
    responsive.width = 900;
  }
  return (
    <Box sx={responsive}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}
