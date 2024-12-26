// const API = 'http://localhost:8000'
const API = `http://16.16.215.95:8000`



export const fetchProjects = () => {
    return new Promise((resolve, reject) => {
      fetch(`${API}/projects`)  // Replace with your backend URL
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch projects");
          }
          return response.json();
        })
        .then((data) => {
          resolve(data);  // Resolve with project data
        })
        .catch((error) => {
          reject(error.message || "An error occurred while fetching projects");  // Reject with error message
        });
    });
  };
  

 export const fetchProjectById = (id) => {
    return new Promise((resolve, reject) => {
      fetch(`${API}/project/${id}`)  // Replace with your backend URL
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Project with ID ${id} not found`);
          }
          return response.json();
        })
        .then((data) => {
          resolve(data);  // Resolve with project data
        })
        .catch((error) => {
          reject(error.message || `An error occurred while fetching project with ID: ${id}`);
        });
    });
  };
  

 export  const createProject = (name, url) => {
    return new Promise((resolve, reject) => {
      fetch(`${API}/projects`, {  // Replace with your backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          url,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to create project");
          }
          return response.json();
        })
        .then((data) => {
          resolve(data);  // Resolve with the created project data
        })
        .catch((error) => {
          reject(error.message || "An error occurred while creating the project");
        });
    });
  };
  

