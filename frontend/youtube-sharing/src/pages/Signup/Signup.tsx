import { Button, FormControl, FormLabel, Input } from "@mui/material";
import styled from "styled-components";
import { axiosClient } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { useSnackbar } from "notistack";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: 20px;
`;

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 3px 8px rgba(50, 50, 50, 0.17);
  border: 1px solid #e0e0e0;
  flex-direction: column;
  margin: 10px;
  padding: 20px;
`;

const FormControlContainer = styled(FormControl)`
  margin-top: 20px !important;
`;

const InputField = styled(Input)`
  margin-top: 0;
`;

type ErrorResponse = {
  response: {
    data: { error: string };
  };
};

const Signup = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const signup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    console.log(email.value, password.value);

    try {
      await axiosClient.post("/auth/signup", {
        user: {
          email: email.value,
          password: password.value,
        },
      });
      enqueueSnackbar("Signup success!", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        (error as ErrorResponse).response.data.error || "Signup failed!",
        {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }
      );
    }
  };

  return (
    <Container>
      <h1>Signup</h1>
      <FormContainer onSubmit={signup}>
        <FormControlContainer>
          <FormLabel htmlFor="email">Email</FormLabel>
          <InputField type="text" id="email" required />
        </FormControlContainer>
        <FormControlContainer>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputField type="password" id="password" required />
        </FormControlContainer>
        <Button type="submit">Signup</Button>
      </FormContainer>
    </Container>
  );
};

export default Signup;
