import React from "react";
import { HashLoader, PacmanLoader, PuffLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export const CustomLoading = ({ loading, color, size, type }) => {
  const LoadingSet = () => {
    if (type === "hash") {
      return (
        <HashLoader
          loading={loading}
          size={size}
          color={color || "#36d7b7"}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      );
    } else if (type === "pacman") {
      return (
        <PacmanLoader
          loading={loading}
          size={size}
          color={color || "#36d7b7"}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      );
    } else if (type === "puff") {
      return (
        <PuffLoader
          loading={loading}
          size={size}
          color={color || "#36d7b7"}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      );
    }
  };

  return <LoadingSet />;
};

export default CustomLoading;
