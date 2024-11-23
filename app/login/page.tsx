"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { AppDispatch, RootState } from "@/store/store";
import { loginUser, logoutUser } from "@/store/actions";

export default function Home() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { auth, loading, error } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    try {
      await dispatch(loginUser({ email, password }));
      router.push("/");
    } catch (error: any) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    dispatch(logoutUser());
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
      >
        <Link href="/">
          <Typography variant="body1" color="primary">
            Home
          </Typography>
        </Link>
        <Box>
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={90}
            height={18}
            priority
          />
        </Box>
      </Box>

      <Box mt={6}>
        {auth ? (
          <Box mt={3}>
            <Typography variant="h5" color="textPrimary">
              Welcome, {auth.email}
            </Typography>
            <Box mt={2}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={handleLogout}
                disabled={loading}
              >
                Logout
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <Box mt={2}>
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
            </Box>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <Box mt={2}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}
