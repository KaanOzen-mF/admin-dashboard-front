"use client";

import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

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
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProjects = useCallback(() => {
    if (baseURL) {
      fetch(baseURL)
        .then((res) => res.json())
        .then((data) => setProjects(data))
        .catch((err) => console.error("Error fetching projects:", err));
    } else {
      console.error("API URL is not defined");
    }
  }, [baseURL]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async () => {
    if (!deleteProject) return;
    setDeleting(true);
    try {
      const res = await fetch(`${baseURL}/delete/${deleteProject.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchProjects();
        setDeleteProject(null);
      } else {
        console.error("Delete error:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
      <Link
        href="/portfolio/new-project"
        className="bg-green-500 text-white px-4 py-2 inline-block"
      >
        Add New Project
      </Link>
      <ul className="mt-4 space-y-2">
        {projects.map((proj) => (
          <li key={proj.id} className="border p-4">
            <h2 className="text-xl font-semibold">{proj.projectName}</h2>
            <p>{proj.projectDesc}</p>
            <div className="mt-2 space-x-4">
              <Link
                href={`/portfolio/${proj.id}`}
                className="text-blue-500 underline"
              >
                Update
              </Link>
              <button
                onClick={() => setDeleteProject(proj)}
                className="text-red-500 underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {deleteProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteProject.projectName}</span>
              ?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteProject(null)}
                className="bg-gray-300 text-black py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
