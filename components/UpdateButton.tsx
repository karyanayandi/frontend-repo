import * as React from "react";
import { Button, CircularProgress } from "@mui/material";

interface UpdateButtonProps {
  loading: boolean;
  handleUpdate: () => void;
}

const UpdateButton: React.FC<UpdateButtonProps> = (props) => {
  const { loading, handleUpdate } = props;

  return (
    <div>
      <Button
        fullWidth
        size="large"
        variant="contained"
        onClick={handleUpdate}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "update user"}
      </Button>
    </div>
  );
};

export default UpdateButton;
