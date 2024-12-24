//express server
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const ScriptController = require("./controllers");

const app = express();
const port = 8000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());


// Directory to store scripts on disk
const scriptDirectory = path.join(__dirname, "scripts");

// Ensure the directory exists
if (!fs.existsSync(scriptDirectory)) {
  fs.mkdirSync(scriptDirectory);
}


// API Endpoints
// Get a project by ID
app.get("/project/:id",ScriptController.getProjectById);

// Get a list of project IDs and names
app.get("/projects", ScriptController.getAllProjects);

// Create a new project
app.post("/projects",ScriptController.createProject );
  
  

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
