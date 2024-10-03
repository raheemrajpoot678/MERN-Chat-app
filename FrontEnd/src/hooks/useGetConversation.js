import React, { useEffect, useState } from "react";

export default function () {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.API_URL}/api/users`);
        const data = await res.json();
        setConversations(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);
  return { loading, conversations };
}
