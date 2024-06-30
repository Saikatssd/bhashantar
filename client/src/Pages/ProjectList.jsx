import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from "../main"

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projectName, setProjectName] = useState('Criminal');
  const [companyId, setCompanyId] = useState('');

  const newProject = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.post(`${server}/project/createProject`, {
        project_name: projectName,
        // companyId, 
      });
      console.log('Project created:', response.data);
      // Handle successful project creation (e.g., redirect, update UI)
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${server}/project/getProject`);
        setProjects(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="flex justify-center items-center p-20">
      {isLoading && <p>Loading projects...</p>}
      {error && <p>Error fetching projects: {error.message}</p>}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 p-4">
          {projects.map((project) => (

            <div className='p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300' key={project._id}>{project.name}</div>
          ))}
          <div className='p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer' onClick={newProject}>New Project</div>

        </div>
      )}
    </div>
  );
};

export default ProjectList;
