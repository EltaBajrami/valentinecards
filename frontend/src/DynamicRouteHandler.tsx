import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchDocuments } from "./APIService";
import Card1 from "./cards/card1/Card1";
import Card2 from "./cards/card2/Card2";
import Card3 from "./cards/card3/Card3";
import Card4 from "./cards/card4/Card4";

interface Entry {
  cardNumber: string;
  senderName: string;
  receiverName: string;
  note: string;
}

const DynamicRouteHandler = () => {
  const location = useLocation(); // Get the current URL path
  const [entry, setEntry] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Extract the path from the URL
    const path = location.pathname.substring(1); // Remove leading "/"

    // Call the backend to check if the entry exists
    const fetchEntry = async () => {
      try {
        // const response = await fetchDocuments({ "link": path }); // Example query
        const response = await fetchDocuments({ _id: path }); // Example query

        console.log(response);
        if (response) {
          if (Array.isArray(response)) setEntry(response[0]);
          else setEntry(response); // Save entry if found
        } else {
          setEntry(null); // No matching entry
        }
      } catch {
        setError("Failed to fetch entry");
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();

    console.log(path, entry);
  }, [location.pathname, entry]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  let display = <p>404: Entry not found</p>;

  if (entry) {
    if (entry.cardNumber === "1") {
      display = (
        <Card1
          senderName={entry.senderName}
          receiverName={entry.receiverName}
          note={entry.note}
        />
      );
    } else if (entry.cardNumber === "2") {
      display = (
        <Card2
          senderName={entry.senderName}
          receiverName={entry.receiverName}
          note={entry.note}
        />
      );
    } else if (entry.cardNumber === "3") {
      display = (
        <Card3
          senderName={entry.senderName}
          receiverName={entry.receiverName}
          note={entry.note}
        />
      );
    } else if (entry.cardNumber === "4") {
      display = (
        <Card4
          senderName={entry.senderName}
          receiverName={entry.receiverName}
          note={entry.note}
        />
      );
    }
  }

  return <div>{display}</div>;
};

export default DynamicRouteHandler;
