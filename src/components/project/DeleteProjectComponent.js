import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject, fetchProjectData } from '../../features/project/projectSlice';

const DeleteProjectComponent = ({ closeModal }) => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.project.data); // Assuming the project data is stored in the Redux state

  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDeleteProject = async () => {
    try {
      await dispatch(deleteProject(selectedProject.id));
      dispatch(fetchProjectData()); // Refetch project data after deletion
      closeModal();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const filteredProjects = projects?.data.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h4 className='text-center bg-warning text-white p-3 text-uppercase rounded-pill'>Delete Project</h4>
      <p>Are you sure you want to delete this project?</p>
      <div className="mb-3">
        <label htmlFor="searchProject" className="form-label">Search Project</label>
        <input
          type="text"
          className="form-control"
          id="searchProject"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && filteredProjects?.length > 0 ? (
          <ul className="list-group mt-2">
            {filteredProjects.map(project => (
              <li
                key={project.id}
                className="list-group-item"
                onClick={() => handleProjectSelect(project)}
                style={{ cursor: 'pointer' }}
              >
                {project.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No matching projects found.</p>
        )}
      </div>
      {selectedProject && (
        <div>
          <div className="mb-3">
            <label htmlFor="selectedProjectName" className="form-label">Selected Project Name</label>
            <input
              type="text"
              className="form-control"
              id="selectedProjectName"
              value={selectedProject.name}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="selectedProjectId" className="form-label">Selected Project ID</label>
            <input
              type="text"
              className="form-control"
              id="selectedProjectId"
              value={selectedProject._id}
              readOnly
            />
          </div>
        </div>
      )}
      <div className="d-flex justify-content-between mt-4">
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteProject}
          disabled={!selectedProject}
        >
          Yes
        </button>
        <button type="button" className="btn btn-secondary" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteProjectComponent;
