import { createProject } from "@/api";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useProject } from "../hooks/useProjects";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Header from "./Header";

const ScriptGenerator = ({ id = null }) => {
  const [projectName, setProjectName] = useState("");
  const [url, setUrl] = useState("");
  const [script, setScript] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session } = useSession();


  const validateUrl = (input) => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const queryClient = useQueryClient();
  const scriptMutation = useMutation({
    mutationKey: "create",
    mutationFn: async () => await createProject(projectName, url),
    onSuccess: (data) => {
      setScript(data?.script);
      queryClient.invalidateQueries("projects");
    },
    onError: () => {
      setError("Something went wrong");
    },
  });

  const handleGenerateScript = () => {
    setError("");

    if (!projectName || !url) {
      setError("Please enter both project name and URL.");
      return;
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL.");
      return;
    }
    scriptMutation.mutateAsync();
  };

  if (id) {
    const { data } = useProject(id);
    console.log(data, "get");

    useEffect(() => {
      if (data) {
        setProjectName(data?.name);
        setUrl(data?.url);
        setScript(data?.script);
      }
    }, [data]);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
     <Header session={session} signOut={signOut}/>
      <div className="max-w-lg ">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="projectName"
          >
            Project Name:
          </label>
          <input
            id="projectName"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="intendedUrl"
          >
            Intended URL:
          </label>
          <input
            id="intendedUrl"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter intended URL"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleGenerateScript}
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Generate Script
        </button>
      </div>

      {script && (
        <div style={{ marginTop: "20px" }}>
          <h3>Generated Script:</h3>
          <pre
            style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {script}
          </pre>
        </div>
      )}
      {script && (
        <div style={{ marginTop: "20px" }}>
          <h3>Script Explanation:</h3>
          <p>
            This script will dynamically append a <code>?variation=</code>{" "}
            parameter to the URL based on the time of day, cycling through{" "}
            <b>a, b, c, d</b> every 4 hours. It will only work if the current
            page matches the intended URL or its query string.
          </p>
        </div>
      )}
    </div>
  );
};

export default ScriptGenerator;
