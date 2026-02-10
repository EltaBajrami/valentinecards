import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Insert a document into MongoDB
export const insertDocument = async (data: { senderName: string; receiverName: string; note: string; cardNumber: string; receiverEmail: string; }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/documents`, data);
    console.log(response.data);
    return response.data; // Returns success message and inserted document ID
  } catch (error) {
    console.error('Error inserting document:', error);
    throw error;
  }
};

// Fetch documents from MongoDB
export const fetchDocuments = async (queryParams: string | string[][] | Record<string, string> | URLSearchParams | undefined) => {
  try {
    const query = new URLSearchParams(queryParams).toString(); // Convert queryParams to query string
    const response = await axios.get(`${API_BASE_URL}/documents?${query}`);
    return response.data; // Returns the array of matching documents
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};