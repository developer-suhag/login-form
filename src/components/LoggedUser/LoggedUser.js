import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const LoggedUser = (props) => {
  const { name, email, img } = props.user;
  return (
    <Container>
      <Box
        sx={{
          width: "50%",
          margin: "auto",
          p: 2,
          textAlign: "center",
        }}
      >
        <img style={{ borderRadius: "50%" }} src={img} alt="" />
        <h3>Welcome {name}</h3>
        <p>{email && `Your email address ${email}`}</p>
      </Box>
    </Container>
  );
};

export default LoggedUser;
