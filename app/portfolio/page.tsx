"use client";
import React, { useEffect, useState } from "react";

interface Project {
  id: number;
  projectName: string;
  projectDesc: string;
  projectUrl: string;
  github: string;
}

const PortfolioPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (baseURL) {
      fetch(baseURL)
        .then((res) => res.json())
        .then((data) => setProjects(data));
    } else {
      console.error("API URL is not defined");
    }
  }, [baseURL]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="border p-4 rounded mb-2">
            <h2 className="text-xl font-semibold">{project.projectName}</h2>
            <p>{project.projectDesc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioPage;
