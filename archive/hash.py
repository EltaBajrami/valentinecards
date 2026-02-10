import gspread
from oauth2client.service_account import ServiceAccountCredentials
import hashlib
from dotenv import load_dotenv
import os

load_dotenv()

# Set up Google Sheets API credentials
scope = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/drive",
]
creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
client = gspread.authorize(creds)

spreadsheet_id = os.getenv("SPREADSHEET_ID")
spreadsheet = client.open_by_key(spreadsheet_id)

worksheet = spreadsheet.get_worksheet(
    0
)  # Assuming the data is in the first worksheet (index 0)
# Get the values from the specified column (column C starting from row 2)
column_values = worksheet.col_values(3)


# Calculate the hashed values
hashed_values = [
    hashlib.sha256(value.replace(" ", "").encode()).hexdigest()[:8]
    for value in column_values
]

# Update the 'codes' column starting from row 2 with the hashed values
for i, hashed_value in enumerate(hashed_values, start=2):
    worksheet.update_cell(
        i, 9, hashed_value
    )  # Assuming the 'codes' column is in the third column (column C)

print("Hashing complete. Hashed values have been written to the 'codes' column.")
