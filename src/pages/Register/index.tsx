import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { AppRegistration } from "@mui/icons-material";

interface IRegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
}

export function Register() {
  const { token, isLoading, register } = useAuth();
  const { handleSubmit, control, watch, formState } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<IRegisterForm> = (data, event) => {
    event?.preventDefault();
    register(data);
  };

  // If the user is already logged in, redirect them to the home page.
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AppRegistration />
        </Avatar>

        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Controller
            name="username"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                required
                fullWidth
                margin="normal"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                required
                fullWidth
                margin="normal"
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: true,
              validate: (value) => {
                return watch("password") === value;
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
                type="password"
                required
                fullWidth
                margin="normal"
                error={Boolean(formState?.errors?.confirmPassword)}
                helperText={
                  formState?.errors?.confirmPassword
                    ? "Passwords do not match"
                    : ""
                }
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
