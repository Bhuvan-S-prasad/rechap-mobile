import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";

export const useChannels = () => {
  const { getToken } = useAuth();
  const [channels, setChannels] = useState<any[]>([]);
  const [channel, setChannel] = useState<any>(null);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingItem, setLoadingItem] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChannels = async () => {
    setLoadingList(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const res = await fetch("https://rechap01.netlify.app/api/channels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch channels: ${res.status} ${res.statusText}`,
        );
      }

      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid response format: expected an array of channels",
        );
      }
      setChannels(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      throw err;
    } finally {
      setLoadingList(false);
    }
  };

  const fetchChannel = async (channelId: string) => {
    setLoadingItem(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const res = await fetch(
        `https://rechap01.netlify.app/api/channels/${channelId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error(
          `Failed to fetch channel: ${res.status} ${res.statusText}`,
        );
      }

      const data = await res.json();
      setChannel(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      throw err;
    } finally {
      setLoadingItem(false);
    }
  };

  const createChannel = async (values: { name: string; imageUrl: string }) => {
    setError(null);
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const res = await fetch("https://rechap01.netlify.app/api/channels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error(
          `Failed to create channel: ${res.status} ${res.statusText}`,
        );
      }

      await fetchChannels();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      throw err;
    }
  };

  useEffect(() => {
    fetchChannels().catch(() => {});
  }, []);

  return {
    channels,
    channel,
    loading: loadingList || loadingItem,
    loadingList,
    loadingItem,
    error,
    fetchChannels,
    fetchChannel,
    createChannel,
  };
};
