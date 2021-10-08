import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const LoggedUser = (props) => {
  const { name, email, img } = props.user;
  return (
    <Container>
      {/* <Button onClick={props.handleSignOut} variant="contained">
        Log Out
      </Button> */}
      <Box>
        <img src={img} alt="" />
        <h3>Welcome {name}</h3>
        <p>{email && `Your email address ${email}`}</p>
      </Box>
    </Container>
  );
};

export default LoggedUser;
