// Vercel serverless function wrapper
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
}));
app.use(express.json());

const url = process.env.MONGO_URL;

if (!url) {
  console.error(
    "Missing MONGO_URL. Create a .env file in backend with MONGO_URL=mongodb://... or set the environment variable."
  );
  process.exit(1);
}

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Load email templates - paths relative to the api directory
let receiverTemplate, senderTemplate;
try {
  receiverTemplate = fs.readFileSync(path.join(__dirname, "templates/receiverTemplate.ejs"), "utf-8");
  senderTemplate = fs.readFileSync(path.join(__dirname, "templates/senderTemplate.ejs"), "utf-8");
} catch (error) {
  console.error("Error loading email templates:", error);
  // Templates are optional for basic functionality
  receiverTemplate = "";
  senderTemplate = "";
}

const WEBSITE_URL = process.env.WEBSITE_URL || "http://localhost:5173";

async function sendEmail(document, template, receiver) {
  // Skip if templates aren't loaded
  if (!template) {
    console.log("Skipping email - template not loaded");
    return;
  }
  
  const receiverEmail = document['receiverEmail'];
  const userName = document['receiverName'];
  const redirectLink = document['_id'];
  const packageBoolean = document['giftPackage'] === "Yes";
  const senderName = document['senderName'];
  const senderEmail = document['Email Address'];

  // Render template
  const htmlContent = receiver 
    ? ejs.render(template, { recieverName: userName, redirectLink: redirectLink, packageBoolean: packageBoolean, websiteUrl: WEBSITE_URL })
    : ejs.render(template, { senderName: senderName, redirectLink: redirectLink, packageBoolean: packageBoolean, websiteUrl: WEBSITE_URL });

  // Send Email
  const mailOptions = {
    from: `VC++ <${process.env.EMAIL_USER}>`,
    to: receiver ? receiverEmail : senderEmail,
    subject: receiver 
      ? "[Valentine's++] A Heartfelt Surprise Awaits You! 🌟💌" 
      : "[Valentine's++] Your Valentine's++ Surprise is On Its Way! 🌹💌",
    html: htmlContent,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent: " + info.response, "_id:", redirectLink, "receiver:", receiver);
}

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db("sampleDatabase").collection("sampleCollection");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

app.get("/api/documents", async (req, res) => {
  try {
    const collection = await connectToDatabase();
    let query = { ...req.query };

    if (query._id) {
      try {
        query._id = new ObjectId(query._id);
      } catch (error) {
        return res.status(400).json({ error: "Invalid _id format" });
      }
    }

    const documents = await collection.find(query).toArray();
    res.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/documents", async (req, res) => {
  try {
    const collection = await connectToDatabase();
    const document = req.body;

    const insertResult = await collection.insertOne(document);
    document._id = insertResult.insertedId;

    // Send emails asynchronously
    Promise.all([
      sendEmail(document, receiverTemplate, true),
      sendEmail(document, senderTemplate, false)
    ]).catch(error => {
      console.error("Error sending emails:", error);
    });

    res.status(201).json({
      message: "Document inserted successfully!",
      insertedId: insertResult.insertedId,
    });
  } catch (error) {
    console.error("Error inserting document:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Export for Vercel
module.exports = app;
