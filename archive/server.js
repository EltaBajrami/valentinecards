// Server-side code
const { google } = require("googleapis");
const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

const credentialsFilePath = "./credentials.json";
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/search", async (req, res) => {
  try {
    const inputValue = req.query.code;

    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsFilePath,
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const sheets = google.sheets({ version: "v4", auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!I:I",
      valueRenderOption: "FORMULA",
    });

    const valuesWithRowNumbers = response.data.values.map((row, index) => ({
      rowNumber: index + 1,
      rowData: row,
    }));

    const matchingRow = valuesWithRowNumbers.find(
      (row) => row.rowData[0] === inputValue
    );

    if (matchingRow) {
      const rowResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `Sheet1!A${matchingRow.rowNumber}:Z${matchingRow.rowNumber}`,
      });

      res.send(rowResponse.data.values[0]);
    } else {
      res.send(null);
    }
  } catch (error) {
    console.error("Error searching for value:", error);
    res.status(500).json({
      success: false,
      message: "Error searching for value",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
