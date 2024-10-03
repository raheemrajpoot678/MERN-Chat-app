import { error } from "console";
import React, { useEffect, useState } from "react";
import { useToast } from "./use-toast";

export default function () {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { toast } = useToast();
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://mern-chat-app-api-ten.vercel.app/api/users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },

            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.message);
        setConversations(data);
      } catch (error) {
        toast({
          title: "Fail",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);
  return { loading, conversations };
}
