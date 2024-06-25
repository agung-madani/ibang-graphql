import {
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
const LoginPage = () => {
  const onSubmit = () => {
    localStorage.setItem("token", "admin");
    window.location.href = "/";
  };
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
    <Card style={{ padding: "20px", width: "350px" }}>
    <Stack
      spacing={2}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Login</Typography>
      <TextField label="Email" type="email" style={{ width: "320px" }} />
      <TextField
        label="Password"
        type="password"
        style={{ width: "320px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onSubmit}
        style={{ marginTop: "20px" }}
      >
        Login
      </Button>
    </Stack>
  </Card>
</Container>
);
};
export default LoginPage;