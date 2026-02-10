import { useState, useEffect } from "react";
import { insertDocument, fetchDocuments } from "./APIService";

interface Document {
  _id: string;
  senderName: string;
  receiverName: string;
  note: string;
  cardNumber: string;
  receiverEmail: string;
}

const DatabaseComponent = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [newDoc, setNewDoc] = useState({
    senderName: "",
    receiverName: "",
    note: "",
    cardNumber: "",
    receiverEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch documents on component mount
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const docs = await fetchDocuments({});
      setDocuments(docs);
    } catch (error) {
      console.error("Failed to load documents:", error);
      setError("Error fetching documents");
    } finally {
      setLoading(false);
    }
  };

  // Insert a new document
  const handleInsert = async () => {
    try {
      // Check if any field is empty
      if (Object.values(newDoc).some((value) => value === "")) {
        alert("All fields must be filled before submitting.");
        return;
      }

      await insertDocument(newDoc);
      setNewDoc({
        senderName: "",
        receiverName: "",
        note: "",
        cardNumber: "",
        receiverEmail: "",
      });
      console.log(newDoc);
      // Reload documents after insertion
      loadDocuments();
    } catch {
      alert("Failed to insert document");
    }
  };

  return (
    <div>
      <h1>MongoDB React App</h1>

      <h2>Insert Document</h2>
      <input
        type="text"
        placeholder="Sender name"
        value={newDoc.senderName}
        onChange={(e) => setNewDoc({ ...newDoc, senderName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Receiver name"
        value={newDoc.receiverName}
        onChange={(e) => setNewDoc({ ...newDoc, receiverName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Receiver email"
        value={newDoc.receiverEmail}
        onChange={(e) =>
          setNewDoc({ ...newDoc, receiverEmail: e.target.value })
        }
      />

      {/* Dropdown for selecting cardNumber */}
      <select
        value={newDoc.cardNumber}
        onChange={(e) =>
          setNewDoc({ ...newDoc, cardNumber: e.target.value.toString() })
        }
      >
        <option value="">Select a Card Number</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>
      <input
        type="text"
        placeholder="Note"
        value={newDoc.note}
        onChange={(e) => setNewDoc({ ...newDoc, note: e.target.value })}
      />

      <button onClick={handleInsert}>Insert</button>

      <h2>Fetched Documents</h2>
      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <ul>
      {documents.map((doc) => (
        <li key={doc._id}>
          {Object.entries(doc).map(([key, value]) => (
            <span key={key}>
              <strong>{key}:</strong>{" "}
              {key === "_id" ? (
                <a href={`/${value}`} target="_blank" rel="noopener noreferrer">
                  {value}
                </a>
              ) : Array.isArray(value) ? (
                value.join(", ")
              ) : (
                value.toString()
              )}
              {" // "}
            </span>
          ))}
        </li>
      ))}
      </ul>
    </div>
  );
};

export default DatabaseComponent;
