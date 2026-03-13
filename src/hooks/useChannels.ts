import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";

export const useChannels = () => {
  const { getToken } = useAuth();
  const [channels, setChannels] = useState([]);

  const fetchChannels = async () => {
    const token = await getToken();

    const res = await fetch("http://localhost:3000/api/channels", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log(data);
    setChannels(data);
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  return { channels };
};
