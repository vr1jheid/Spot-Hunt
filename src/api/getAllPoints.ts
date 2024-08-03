const getAllPoints = async () => {
  const res = await fetch(
    "https://b1e8-31-153-0-161.ngrok-free.app/api/park-point/",
    {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    }
  );
};
