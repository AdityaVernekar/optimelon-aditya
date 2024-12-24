
const fs = require("fs");
const Bull = require("bull");
const path = require("path");

// Dummy in-memory database for projects
let projects = [];
let projectIdCounter = 1;


// Task Queue for Script Creation/Update
const scriptQueue = new Bull("scriptQueue", {
    redis: { host: "localhost", port: 6379 },
  })
// Log success when the connection is ready
scriptQueue.isReady().finally(() => {
    console.log("Successfully connected to the Redis server for scriptQueue.");
  })
  
  // Log errors if there are connection issues
  scriptQueue.on("error", (err) => {
    console.error("Error connecting to the Redis server for scriptQueue:", err);
  });
  
// Directory to store scripts on disk
const scriptDirectory = path.join(__dirname, "../scripts");

// Add a task to the queue
scriptQueue.process(async (job, done) => {
    const { projectId, name, url } = job.data;
    // Simulate script generation logic
    const generatedScript = `
      (function() {
        const variations = ['a', 'b', 'c', 'd'];
        const variation = variations[new Date().getHours() % 4];
        const intendedUrl = "${url.replace(/\/$/, "")}";
  
        if (
          window.location.origin + window.location.pathname === intendedUrl ||
          window.location.href.startsWith(intendedUrl + "?")
        ) {
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.get('variation') !== variation) {
            urlParams.set('variation', variation);
            const newUrl = window.location.pathname + '?' + urlParams.toString();
            window.history.replaceState(null, '', newUrl);
          }
        }
      })();`;
  
    // Save the generated script to a file
    const scriptFilePath = path.join(scriptDirectory, `${projectId}.js`);
    fs.writeFileSync(scriptFilePath, generatedScript);
  
    // Update the project with the file path (instead of storing script in memory)
    const projectIndex = projects.findIndex((p) => p.id === projectId);
    if (projectIndex !== -1) {
      projects[projectIndex].scriptFilePath = scriptFilePath;
    }
    done();
  });

class ScriptController {
    //get Script by Id 
    static  getProjectById = async (req, res) => {
        const { id } = req.params;
        const project = projects.find((p) => p.id === parseInt(id));
        if (project) {
          // Read the script file from disk and send it as a string in the response
          if (project.scriptFilePath && fs.existsSync(project.scriptFilePath)) {
            const scriptContent = fs.readFileSync(project.scriptFilePath, "utf-8");
            project.script = scriptContent; // Include the script as a string in the response
          }
          res.json(project);
        } else {
          res.status(404).json({ message: "Project not found" });
        }
      }


      // create a new project script
      static createProject = async  (req, res) => {
        try {
          const { name, url } = req.body;
          if (!name || !url) {
            return res.status(400).json({ message: "Name and URL are required" });
          }
      
          // Create a new project object
          const newProject = {
            id: projectIdCounter++,
            name,
            url,
          };
      
    
          // Add the project to the "database"
          projects.push(newProject);
      
          // Add a job to the task queue for script generation
          const job = await scriptQueue.add({
            projectId: newProject.id,
            name: newProject.name,
            url: newProject.url,
          });
      
          // Wait for the job to be completed
          await job.finished().then(async () => {
            const scriptFilePath = path.join(scriptDirectory, `${newProject.id}.js`);
            
            if (fs.existsSync(scriptFilePath)) {
              const scriptContent = fs.readFileSync(scriptFilePath, "utf-8");
              
              // Attach the generated script to the project object
              newProject.script = scriptContent;
      
              // Send the response with the project data and script content
              return res.status(201).json(newProject);
            } else {
              return res.status(500).json({ message: "Script generation failed." });
            }
          });
      
        } catch (error) {
          console.log(error, "error");
          return res.status(500).json({ message: "Something went wrong" });
        }
      }

      // get all projects 
      static getAllProjects = (req, res) => {
        const projectList = projects.map((p) => ({
          id: p.id,
          name: p.name,
        }));
        res.json(projectList);
      }

}


module.exports = ScriptController