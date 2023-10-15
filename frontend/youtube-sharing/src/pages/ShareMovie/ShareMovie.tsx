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

const ShareMovie = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const shareMovie = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = document.getElementById("title") as HTMLInputElement;
    const description = document.getElementById(
      "description"
    ) as HTMLInputElement;
    const url = document.getElementById("url") as HTMLInputElement;
    try {
      await axiosClient.post("/videos/create", {
        video: {
          title: title.value,
          description: description.value,
          url: url.value,
        },
      });
      enqueueSnackbar("Share video success!", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Share video failed!", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      console.log(error);
    }
  };

  return (
    <Container>
      <h1>ShareMovie</h1>
      <FormContainer onSubmit={shareMovie}>
        <FormControlContainer>
          <FormLabel htmlFor="title">Title</FormLabel>
          <InputField type="text" id="title" required />
        </FormControlContainer>
        <FormControlContainer>
          <FormLabel htmlFor="description">Description</FormLabel>
          <InputField type="text" id="description" required />
        </FormControlContainer>
        <FormControlContainer>
          <FormLabel htmlFor="url">Url</FormLabel>
          <InputField type="text" id="url" required />
        </FormControlContainer>
        <Button type="submit">Share</Button>
      </FormContainer>
    </Container>
  );
};

export default ShareMovie;
