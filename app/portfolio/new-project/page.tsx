"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [github, setGithub] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newProject = {
      projectName,
      projectDesc,
      projectUrl,
      github,
    };

    try {
      const res = await fetch(`${baseURL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      if (res.ok) {
        if (mounted) {
          router.push("/portfolio");
        }
      } else {
        console.error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Project</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 max-w-md"
      >
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="border p-2"
          required
        />
        <textarea
          placeholder="Project Description"
          value={projectDesc}
          onChange={(e) => setProjectDesc(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="url"
          placeholder="Project Url"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="url"
          placeholder="Github"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className="border p-2"
          required
        />
        <button type="submit" className="bg-green-500 text-white py-2 px-4">
          Save
        </button>
      </form>
    </div>
  );
}
