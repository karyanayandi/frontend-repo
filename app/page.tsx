"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Typography, Button, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import UpdateButton from "@/components/UpdateButton";
import { AppDispatch, RootState } from "@/store/store";
import { fetchUser, logoutUser, updateUser } from "@/store/actions";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { auth, loading: loadingAuth } = useSelector(
    (state: RootState) => state.auth,
  );

  const {
    user,
    loading: loadingUser,
    error: errorUser,
  } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    if (auth) dispatch(fetchUser({ userId: "1" }));
  }, [auth, dispatch]);

  const handleUpdate = () => {
    dispatch(
      updateUser({
        userId: "1",
        data: { name: "changed user name" },
      }),
    );
    alert("User data updated!");
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
        <Link href="/login">
          <Typography variant="body1" color="primary">
            Login
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
        {auth && (
          <>
            <Typography variant="h4" color="textPrimary">
              Welcome, {auth.email}
            </Typography>
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={handleLogout}
              disabled={loadingAuth}
            >
              Logout
            </Button>
          </>
        )}

        {user && (
          <Box mt={3}>
            <Typography variant="h6" color="textPrimary">
              User Data
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Name: {user.name}
            </Typography>
          </Box>
        )}

        <Box mt={3}>
          <UpdateButton loading={loadingUser} handleUpdate={handleUpdate} />
        </Box>

        <Box mt={2}>
          {errorUser && (
            <Typography variant="body2" color="error">
              {errorUser}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
