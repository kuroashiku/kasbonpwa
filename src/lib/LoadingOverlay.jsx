import { Spinner } from "@material-tailwind/react";

export default function LoadingOverlay({ white }) {
  return (
    <div className="fixed top-0 h-screen-adapt w-full z-40 left-1/2 -translate-x-1/2 mx-auto">
      <div
        className={`absolute bg-opacity-60 w-full h-full flex flex-col justify-center ${
          white ? "bg-white" : "bg-black"
        }`}
      >
        <Spinner className="h-12 w-12 mx-auto" color="teal" />
      </div>
    </div>
  );
}
