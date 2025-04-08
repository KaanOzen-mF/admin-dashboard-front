"use client";
import React from "react";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Project {
  id: number;
  projectName: string;
  projectDesc: string;
  projectUrl: string;
  github: string;
}

const ProjectUpdate = () => {
  const router = useRouter();
  const { id } = useParams();
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`${baseURL}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, baseURL]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!project) return;
    try {
      const res = await fetch(`${baseURL}/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      if (res.ok) {
        router.push("/portfolio");
      } else {
        console.error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found..</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Detail and Update</h1>
      <form
        onSubmit={handleUpdate}
        className="flex flex-col space-y-4 max-w-md"
      >
        <input
          type="text"
          value={project.projectName}
          onChange={(e) =>
            setProject({ ...project, projectName: e.target.value })
          }
          className="border p-2"
          placeholder="Project Name"
          required
        />
        <textarea
          value={project.projectDesc}
          onChange={(e) =>
            setProject({ ...project, projectDesc: e.target.value })
          }
          className="border p-2"
          placeholder="Project Description"
          required
        />
        <input
          type="url"
          value={project.projectUrl}
          onChange={(e) =>
            setProject({ ...project, projectUrl: e.target.value })
          }
          className="border p-2"
          placeholder="Project Url"
          required
        />
        <input
          type="url"
          value={project.github}
          onChange={(e) => setProject({ ...project, github: e.target.value })}
          className="border p-2"
          placeholder="Github"
          required
        />
        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectUpdate;
