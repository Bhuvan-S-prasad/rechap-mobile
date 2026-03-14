import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";

export const useChannels = () => {
  const { getToken } = useAuth();
  const [channels, setChannels] = useState([]);

  const fetchChannels = async () => {
    const token = await getToken();

    const res = await fetch("https://rechap01.netlify.app/api/channels", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setChannels(data);
  };

  const createChannel = async (values: { name: string; imageUrl: string }) => {
    const token = await getToken();

    await fetch("https://rechap01.netlify.app/api/channels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    await fetchChannels();
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  return { channels, fetchChannels, createChannel };
};
