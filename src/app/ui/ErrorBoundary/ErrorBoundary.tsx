import { useRouteError } from "react-router-dom";

export const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="h-full w-full bg-white p-6 text-2xl">
      {error instanceof Error ? (
        <div className="flex flex-col gap-4">
          <span>Name: {error.name}</span>
          <span>Message: {error.message}</span>
          <span>{error.stack}</span>
        </div>
      ) : (
        "Incorrect Error"
      )}
    </div>
  );
};
