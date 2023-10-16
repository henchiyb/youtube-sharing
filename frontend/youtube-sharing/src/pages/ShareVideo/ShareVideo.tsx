import {
  Button,
  FormControl,
  FormLabel,
  Input,
  TextareaAutosize,
} from "@mui/material";
import styled from "styled-components";
import { axiosClient } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { closeSnackbar, useSnackbar } from "notistack";
import { ErrorResponse } from "../../types/error";

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

const TextareaField = styled(TextareaAutosize)`
  margin-top: 0;
  scroll-behavior: smooth;
  overflow-y: scroll;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ShareVideo = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const shareVideo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const description = document.getElementById(
      "description"
    ) as HTMLInputElement;
    const url = document.getElementById("url") as HTMLInputElement;
    try {
      await axiosClient.post("/videos/create", {
        video: {
          description: description.value,
          url: url.value,
        },
      });
      const notiKey: any = enqueueSnackbar("Share video success!", {
        SnackbarProps: {
          onClick: () => closeSnackbar(notiKey),
        },
        variant: "success",
        autoHideDuration: 1000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      navigate("/");
    } catch (error) {
      const notiKey: any = enqueueSnackbar(
        (error as ErrorResponse).response.data.error || "Share video failed!",
        {
          SnackbarProps: {
            onClick: () => closeSnackbar(notiKey),
          },
          variant: "error",
          autoHideDuration: 1000,
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
      <h1>ShareVideo</h1>
      <FormContainer onSubmit={shareVideo}>
        <FormControlContainer>
          <FormLabel htmlFor="description">Description</FormLabel>
          <TextareaField
            id="description"
            maxRows={10}
            required
            placeholder="Type description here..."
          />
        </FormControlContainer>
        <FormControlContainer>
          <FormLabel htmlFor="url">Url</FormLabel>
          <InputField
            type="text"
            id="url"
            required
            placeholder="Type Youtube URL here..."
          />
        </FormControlContainer>
        <Button type="submit">Share</Button>
      </FormContainer>
    </Container>
  );
};

export default ShareVideo;
