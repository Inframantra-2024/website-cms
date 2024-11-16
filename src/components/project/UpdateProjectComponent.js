import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProject, fetchProjectData } from '../../features/project/projectSlice';
import axios from 'axios';
import { useMuiSnackbar } from '../UI/useMuiSnackbar';
import './project.css'
import LabelWithRequired from '../../component/UI/label';

const UpdateProjectComponent = ({ closeModal }) => {
  const { status, error } = useSelector((state) => state.project);
  const { showSnackbar } = useMuiSnackbar();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.data || []);
  console.log(projects);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [message, setMessage] = useState('');
  const [projectData, setProjectData] = useState({
    name: '',
    price: '',
    configuration: '',
    area: '',
    squarePrice: '',
    status: '',
    city: '',
    state: '',
    locality: '',
    subLocality: '',
    imageGallery: [],
    amenities: [],
    exclusiveAmenities: [],
    localityGuide: [],
    floorPlan: [],
    brochure: '',
    featured: '',
    priority: '',
    exclusive: '',
    possesion: '',
    coordinates: { lat: '', lng: '' },
    tagLine: '',
    priceInFigure: '',
    propertyType: { title: '', subType: [] },
    keyHighlights: [],
    description: [],
    propertyLogo: [],
    rera: '',
    developer: '',
    metaTitle:'',
    metaDescription:'',
    metaKeywords:'',
    slug: '',
    videoUrl:'',
  });

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [subLocalities, setSubLocalities] = useState([]);

  const [amenities, setAmenities] = useState([]);
  const [amenitiesSearchQuery, setAmenitiesSearchQuery] = useState('');
  const [exclusiveAmenitiesSearchQuery, setExclusiveAmenitiesSearchQuery] = useState('');
  const [filteredAmenities, setFilteredAmenities] = useState([]);
  const [filteredExclusiveAmenities, setFilteredExclusiveAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedExclusiveAmenities, setSelectedExclusiveAmenities] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExclusiveDropdownOpen, setIsExclusiveDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apitest.inframantra.com/api/v1/master');
        const { cities, states, localities, subLocalities, amenities } = response.data.data;
        setCities(cities);
        setStates(states);
        setLocalities(localities);
        setSubLocalities(subLocalities);
        setAmenities(amenities);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    dispatch(fetchProjectData());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProject) {
      setProjectData({
        name: selectedProject.name || '',
        startingPrice: selectedProject.startingPrice || '',
        configuration: selectedProject.configuration || '',
        area: selectedProject.area || '',
        squarePrice: selectedProject.squarePrice || '',
        status: selectedProject.status || '',
        brochure: selectedProject.brochure || '',
        developer: selectedProject.developer._id || '',
        stateName: selectedProject.state.name || '',
        cityName: selectedProject.city.name || '',
        localityName: selectedProject.locality.name || '',
        subLocalityName: selectedProject.subLocality ? selectedProject.subLocality.name : '',
        amenities: selectedProject.amenities || [],
        exclusiveAmenities: selectedProject.exclusiveAmenities || [],
        localityGuide: selectedProject.localityGuide || [],
        featured: !!selectedProject.featured, // Convert to boolean
        exclusive: !!selectedProject.exclusive,
        priority: selectedProject.priority ,
        possesion: selectedProject.possesion,
        description: selectedProject.description,
        metaTitle: selectedProject.metaTitle,
        metaDescription: selectedProject.metaDescription,
        metaKeywords: selectedProject.metaKeywords,
        slug: selectedProject.slug,
        videoUrl: selectedProject.videoUrl
      });

      setSelectedAmenities(selectedProject.amenities || []);
      setSelectedExclusiveAmenities(selectedProject.exclusiveAmenities || []);
    }
  }, [selectedProject]);
  
  console.log(selectedProject);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setSearchQuery('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleUpdateProject = async () => {
    try {
      const { stateName, cityName, localityName, subLocalityName, ...restProjectData } = projectData;
  
      // Dispatch updateProject action
      await dispatch(updateProject({
        id: selectedProject._id,
        projectData: {
          propertyData: {
            ...restProjectData,
          },
          stateName,
          cityName,
          localityName,
          subLocalityName,
        }
      }));
  
      // If successful, fetch updated project data and display success message
      dispatch(fetchProjectData());
      setMessage('Project updated successfully');
      showSnackbar('Project updated successfully', 'success');
      // closeModal();
    } catch (error) {
      // If there's an error, log it and display an error message
      console.error('Error updating project:', error);
      setMessage('Failed to update project');
      showSnackbar('Failed to update project', 'error');
    }
  };

  useEffect(() => {
    if (amenitiesSearchQuery.trim() === '') {
      setFilteredAmenities([]);
      setIsDropdownOpen(false);
    } else {
      const filtered = amenities.filter(amenity =>
        amenity.title.toLowerCase().includes(amenitiesSearchQuery.toLowerCase())
      );
      setFilteredAmenities(filtered);
      setIsDropdownOpen(filtered.length > 0);
    }
  }, [amenitiesSearchQuery, amenities]);

  useEffect(() => {
    if (exclusiveAmenitiesSearchQuery.trim() === '') {
      setFilteredExclusiveAmenities([]);
      setIsExclusiveDropdownOpen(false);
    } else {
      const filtered = amenities.filter(amenity =>
        amenity.title.toLowerCase().includes(exclusiveAmenitiesSearchQuery.toLowerCase())
      );
      setFilteredExclusiveAmenities(filtered);
      setIsExclusiveDropdownOpen(filtered.length > 0);
    }
  }, [exclusiveAmenitiesSearchQuery, amenities]);

  const handleSearchChange = (e, isExclusive = false) => {
    if (isExclusive) {
      setExclusiveAmenitiesSearchQuery(e.target.value);
    } else {
      setAmenitiesSearchQuery(e.target.value);
    }
  };

  const handleAddAmenity = (amenity, isExclusive = false) => {
    // console.log("Amenity", amenity);
    if (isExclusive) {
      if (!selectedExclusiveAmenities.includes(amenity)) {
        setSelectedExclusiveAmenities([...selectedExclusiveAmenities, amenity]);
        setProjectData({ ...projectData, exclusiveAmenities: [...projectData.exclusiveAmenities, { _id: amenity.id, title: amenity.title, iconUrl: amenity.imgUrl }] });
        setExclusiveAmenitiesSearchQuery('');
        setIsExclusiveDropdownOpen(false);
      }
    } else {
      if (!selectedAmenities.includes(amenity)) {
        setSelectedAmenities([...selectedAmenities, amenity]);
        setProjectData({ ...projectData, amenities: [...projectData.amenities,{ _id: amenity.id, title: amenity.title, iconUrl: amenity.imgUrl }] });
        setAmenitiesSearchQuery('');
        setIsDropdownOpen(false);
      }
    }
  };

  const handleRemoveAmenity = (amenity, isExclusive = false) => {
    if (isExclusive) {
        const updatedSelectedExclusiveAmenities = selectedExclusiveAmenities.filter(a => a._id !== amenity._id);
        setSelectedExclusiveAmenities(updatedSelectedExclusiveAmenities);
        setProjectData({ 
            ...projectData, 
            exclusiveAmenities: updatedSelectedExclusiveAmenities 
        });
    } else {
        const updatedSelectedAmenities = selectedAmenities.filter(a => a._id !== amenity._id);
        setSelectedAmenities(updatedSelectedAmenities);
        setProjectData({ 
            ...projectData, 
            amenities: updatedSelectedAmenities 
        });
    }
};

  const handleAddLocalityGuide = () => {
    const newGuide = {
      title: '',
      guideList: [{ name: '', distance: '' }],
    };
    setProjectData({
      ...projectData,
      localityGuide: [...projectData.localityGuide, newGuide],
    });
  };
  
  const handleRemoveLocalityGuide = (index) => {
    const updatedLocalityGuide = projectData.localityGuide.filter((_, i) => i !== index);
    setProjectData({ ...projectData, localityGuide: updatedLocalityGuide });
  };
  
  const handleAddGuideItem = (guideIndex) => {
    const updatedLocalityGuide = [...projectData.localityGuide];
    updatedLocalityGuide[guideIndex] = {
      ...updatedLocalityGuide[guideIndex],
      guideList: [...updatedLocalityGuide[guideIndex].guideList, { name: '', distance: '' }],
    };
    setProjectData({ ...projectData, localityGuide: updatedLocalityGuide });
  };
  
  const handleRemoveGuideItem = (guideIndex, itemIndex) => {
    const updatedLocalityGuide = [...projectData.localityGuide];
    updatedLocalityGuide[guideIndex] = {
      ...updatedLocalityGuide[guideIndex],
      guideList: updatedLocalityGuide[guideIndex].guideList.filter((_, i) => i !== itemIndex),
    };
    setProjectData({ ...projectData, localityGuide: updatedLocalityGuide });
  }
  // console.log(selectedAmenities);

  const filteredProjects = projects.data && projects.data.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Handler function to update the state based on checkbox change
const handleCheckboxChange = (e) => {
  const { name, checked } = e.target;
  setProjectData({
    ...projectData,
    [name]: checked,
    ...(name === 'featured' && checked ? { exclusive: false } : {}),
    ...(name === 'exclusive' && checked ? { featured: false } : {}),
  });
};


  return (
    <div className="container mt-4">
      <h4 className='text-center bg-warning text-white p-3 text-uppercase rounded-pill'>Update Project</h4>
      <div className="mb-3">
        <label htmlFor="searchQuery" className="form-label">Search Project</label>
        <input
          type="text"
          className="form-control"
          id="searchQuery"
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery && filteredProjects.length > 0 && (
          <ul className="list-group mt-2">
            {filteredProjects.map((project) => (
              <li
                key={project._id}
                className="list-group-item"
                onClick={() => handleSelectProject(project)}
                style={{ cursor: 'pointer' }}
              >
                {project.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedProject && (
        <form>
          <div className="mb-3">
            <label htmlFor="projectName" className="form-label">Project Name</label>
            <input
              type="text"
              className="form-control"
              id="projectName"
              name="name"
              value={projectData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
          <LabelWithRequired htmlFor="state" isRequired={true}>
            State
          </LabelWithRequired>
          <select
            className="form-control"
            id="stateName"
            name="stateName"
            value={projectData.stateName}
            onChange={handleChange}
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.id} value={state.name}>{state.name}</option>
            ))}
          </select>
          </div>
          <div className="mb-3">
            <div className="mb-3">
          <LabelWithRequired htmlFor="state" isRequired={true}>
            City
          </LabelWithRequired>
          <select
            className="form-control"
            id="cityName"
            name="cityName"
            value={projectData.cityName}
            onChange={handleChange}
          >
            <option value="">Select City</option>
            {cities.map(state => (
              <option key={state.id} value={state.name}>{state.name}</option>
            ))}
          </select>
          </div>
          </div>
          <div className="mb-3">
            <label htmlFor="localityName" className="form-label">Locality Name</label>
            <input
              type="text"
              className="form-control"
              id="localityName"
              name="localityName"
              value={projectData.localityName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subLocalityName" className="form-label">Sub Locality Name</label>
            <input
              type="text"
              className="form-control"
              id="subLocalityName"
              name="subLocalityName"
              value={projectData.subLocalityName}
              onChange={handleChange}
            />
          </div>
          {/* Meta Tabs */}
          <div className='mb-3'>
          <LabelWithRequired htmlFor="description" isRequired={true} className="form-label">Meta Title</LabelWithRequired>
          <input required
            className="form-control"
            id="metaTitle"
            name="metaTitle"
            placeholder='Meta Title'
            value={projectData.metaTitle}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <LabelWithRequired htmlFor="description" isRequired={true} className="form-label">Meta Description</LabelWithRequired>
          <textarea
            className="form-control"
            id="metaDescription"
            name="metaDescription"
            rows={8}
            placeholder='Meta Description'
            value={projectData.metaDescription}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className='mb-3'>
          <LabelWithRequired htmlFor="description" isRequired={true} className="form-label">Meta Keyword</LabelWithRequired>
          <textarea
            className="form-control"
            id="metaKeywords"
            name="metaKeywords"
            rows={8}
            placeholder='Meta Keyword'
            value={projectData.metaKeywords}
            onChange={handleChange}
          ></textarea>
        </div>
          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Project Description</label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              rows={10}
              value={projectData.description.join('\n')}
              onChange={(e) => setProjectData({ ...projectData, description: e.target.value.split('\n') })}
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="startingPrice" className="form-label">Price</label>
            <input
              type="text"
              className="form-control"
              id="startingPrice"
              name="startingPrice"
              value={projectData.startingPrice}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="configuration" className="form-label">Configuration</label>
            <input
              type="text"
              className="form-control"
              id="configuration"
              name="configuration"
              value={projectData.configuration}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="area" className="form-label">Area</label>
            <input
              type="text"
              className="form-control"
              id="area"
              name="area"
              value={projectData.area}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
          <label htmlFor="priority" className="form-label">Priority</label>
          <input
            type="text"
            className="form-control"
            id="priority"
            name="priority"
            value={projectData.priority}
            onChange={handleChange}
          />
        </div>
          <div className="mb-3">
          <label htmlFor="featured" className="form-label">Featured</label>
          <input
            type="checkbox"
            className="form-check-input"
            id="featured"
            name="featured"
            checked={projectData.featured === true}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exclusive" className="form-label">Exclusive</label>
          <input
            type="checkbox"
            className="form-check-input"
            id="exclusive"
            name="exclusive"
            checked={projectData.exclusive === true}
            onChange={handleCheckboxChange}
          />
        </div>
          <div className="mb-3">
            <label htmlFor="squarePrice" className="form-label">Square Price</label>
            <input
              type="text"
              className="form-control"
              id="squarePrice"
              name="squarePrice"
              value={projectData.squarePrice}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <input
              type="text"
              className="form-control"
              id="status"
              name="status"
              value={projectData.status}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
          <label htmlFor="possession" className="form-label">Possession</label>
          <input
            type="text"
            className="form-control"
            id="possesion"
            name="possesion"
            value={projectData.possesion}
            onChange={handleChange}
          />
        </div>
          <div className="mb-3">
            <label htmlFor="brochure" className="form-label">Brochure</label>
            <input
              type="text"
              className="form-control"
              id="brochure"
              name="brochure"
              value={projectData.brochure}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="developer" className="form-label">Developer</label>
            <input
              type="text"
              className="form-control"
              id="developer"
              name="developer"
              value={projectData.developer}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="brochure" className="form-label">Brochure</label>
            <input
              type="text"
              className="form-control"
              id="brochure"
              name="brochure"
              value={projectData.brochure}
              onChange={handleChange}
            />
          </div>
          {/* Amenities */}
          <div className="mb-3">
            <label htmlFor="amenitiesSearch" className="form-label">Search Amenities</label>
            <input
              type="text"
              className="form-control"
              id="amenitiesSearch"
              value={amenitiesSearchQuery}
              onChange={(e) => handleSearchChange(e)}
            />
            {isDropdownOpen && (
              <ul className="list-group mt-2">
                {filteredAmenities.map((amenity) => (
                  <li
                    key={amenity._id}
                    className="list-group-item"
                    onClick={() => handleAddAmenity(amenity)}
                    style={{ cursor: 'pointer' }}
                  >
                    {amenity.title}
                  </li>
                ))}
              </ul>
            )}
            {selectedAmenities.length > 0 && (
              <div className="mt-2">
                {selectedAmenities.map((amenity, index) => (
                  <span key={index} className="badge bg-primary me-2">
                    {amenity.title}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-2"
                      aria-label="Close"
                      onClick={() => handleRemoveAmenity(amenity)}
                    ></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="exclusiveAmenitiesSearch" className="form-label">Search Exclusive Amenities</label>
            <input
              type="text"
              className="form-control"
              id="exclusiveAmenitiesSearch"
              value={exclusiveAmenitiesSearchQuery}
              onChange={(e) => handleSearchChange(e, true)}
            />
            {isExclusiveDropdownOpen && (
              <ul className="list-group mt-2">
                {filteredExclusiveAmenities.map((amenity) => (
                  <li
                    key={amenity._id}
                    className="list-group-item"
                    onClick={() => handleAddAmenity(amenity, true)}
                    style={{ cursor: 'pointer' }}
                  >
                    {amenity.title}
                  </li>
                ))}
              </ul>
            )}
            {selectedExclusiveAmenities.length > 0 && (
              <div className="mt-2">
                {selectedExclusiveAmenities.map((amenity, index) => (
                  <span key={index} className="badge bg-primary me-2">
                    {amenity.title}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-2"
                      aria-label="Close"
                      onClick={() => handleRemoveAmenity(amenity, true)}
                    ></button>
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* End Amenities */}
          {/* Locality Guide */}
          <div className="mb-3">
            <label htmlFor="localityGuide" className="form-label">Locality Guide</label>
            {projectData.localityGuide.map((guide, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  className="form-control mb-1"
                  placeholder="Guide Title"
                  value={guide.title}
                  onChange={(e) => {
                    const updatedLocalityGuide = projectData.localityGuide.map((g, i) =>
                      i === index ? { ...g, title: e.target.value } : g
                    );
                    setProjectData({ ...projectData, localityGuide: updatedLocalityGuide });
                  }}
                />
                {guide.guideList.map((guideItem, guideIndex) => (
                  <div key={guideIndex} className="input-group mb-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Guide Item Name"
                      value={guideItem.name}
                      onChange={(e) => {
                        const updatedLocalityGuide = [...projectData.localityGuide];
                        updatedLocalityGuide[index].guideList[guideIndex].name = e.target.value;
                        setProjectData({ ...projectData, localityGuide: updatedLocalityGuide });
                      }}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Guide Item Distance"
                      value={guideItem.distance}
                      onChange={(e) => {
                        const updatedLocalityGuide = [...projectData.localityGuide];
                        updatedLocalityGuide[index].guideList[guideIndex].distance = e.target.value;
                        setProjectData({ ...projectData, localityGuide: updatedLocalityGuide });
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveGuideItem(index, guideIndex)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary mb-2"
                  onClick={() => handleAddGuideItem(index)}
                >
                  Add Guide Item
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveLocalityGuide(index)}
                >
                  Remove Locality Guide
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddLocalityGuide}
            >
              Add Locality Guide
            </button>
          </div>
          {/* End Locality Guide */}
          {/* Video Url */}
          <div className="mb-3">
            <LabelWithRequired htmlFor="slug" isRequired={true} className="form-label">You Video Url Id</LabelWithRequired>
            <input required
              type="text"
              name='videoUrl'
              id='videoUrl'
              className='form-control mb-2'
              placeholder="Video Url"
              value={projectData.videoUrl}
              onChange={handleChange}
            />
          </div>
          {/* Slug SEO URL */}
          <div className="mb-3">
            <LabelWithRequired htmlFor="slug" isRequired={true} className="form-label">Slug</LabelWithRequired>
            <input required
              type="text"
              name='slug'
              id='slug'
              className='form-control mb-2'
              placeholder="Slug (SEO) URL"
              value={projectData.slug}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-primary" onClick={handleUpdateProject}>Update</button>
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateProjectComponent;
