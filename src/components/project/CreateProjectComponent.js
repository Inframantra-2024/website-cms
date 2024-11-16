import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createProject, fetchProjectData } from '../../features/project/projectSlice';
import './project.css';
import CKEditorComponent from './CkEditor';
import LabelWithRequired from '../../component/UI/label';


const CreateProjectComponent = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [projectData, setProjectData] = useState({
    name: '',
    startingPrice: '',
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
    metaTitle: '',
    metaDescription: '',
    metaKeyword: '',
    slug: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'keyHighlights') {
      // Handle keyHighlights as an array
      const keyHighlightsArray = value.split('\n').filter(item => item.trim() !== '');
      setProjectData({ ...projectData, [name]: keyHighlightsArray });
    } else {
      setProjectData({ ...projectData, [name]: value });
    }
  };

  const [currentKeyHighlight, setCurrentKeyHighlight] = useState('');
  const handleKeyHighlightInputChange = (e) => {
    setCurrentKeyHighlight(e.target.value);
  };

  const handleAddKeyHighlight = () => {
    if (currentKeyHighlight.trim() !== '') {
      setProjectData({
        ...projectData,
        keyHighlights: [...projectData.keyHighlights, currentKeyHighlight.trim()],
      });
      setCurrentKeyHighlight('');
    }
  };

  const handleRemoveKeyHighlight = (index) => {
    const newKeyHighlights = projectData.keyHighlights.filter((_, i) => i !== index);
    setProjectData({ ...projectData, keyHighlights: newKeyHighlights });
  };
  const handleArrayChange = (index, field, value, arrayName, parentIndex = null) => {
    const newArray = [...projectData[arrayName]];

    if (parentIndex !== null) {
      newArray[parentIndex].guideList[index][field] = value;
    } else {
      newArray[index][field] = value;
    }

    setProjectData({ ...projectData, [arrayName]: newArray });
  };

  const handleAddField = (arrayName, newField, parentIndex = null) => {
    const newArray = [...projectData[arrayName]];

    if (parentIndex !== null) {
      newArray[parentIndex].guideList = [...newArray[parentIndex].guideList, newField];
    } else {
      newArray.push(newField);
    }


    setProjectData({ ...projectData, [arrayName]: newArray });
  };

  const handleRemoveField = (index, arrayName, parentIndex = null) => {
    const newArray = [...projectData[arrayName]];

    if (parentIndex !== null) {
      newArray[parentIndex].guideList = newArray[parentIndex].guideList.filter((_, i) => i !== index);
    } else {
      newArray.splice(index, 1);
    }

    setProjectData({ ...projectData, [arrayName]: newArray });
  };

  const handleSubArrayChange = (index, field, value, arrayName) => {
    const newArray = [...projectData.propertyType.subType];
    newArray[index] = value;
    setProjectData({ ...projectData, propertyType: { ...projectData.propertyType, subType: newArray } });
  };

  const handleSubAddField = () => {
    const newArray = [...projectData.propertyType.subType, ''];
    setProjectData({ ...projectData, propertyType: { ...projectData.propertyType, subType: newArray } });
  };

  const handleSubRemoveField = (index) => {
    const newArray = projectData.propertyType.subType.filter((_, i) => i !== index);
    setProjectData({ ...projectData, propertyType: { ...projectData.propertyType, subType: newArray } });
  };

  const handleCreateProject = async () => {
    try {

      const { state, city, locality, subLocality, ...propertyData } = projectData;
      propertyData.keyHighlights = projectData.keyHighlights;
      // Ensure no null or empty values in amenities and exclusiveAmenities
      propertyData.amenities = projectData.amenities.filter(a => a && a._id && a.title && a.iconUrl);
      propertyData.exclusiveAmenities = projectData.exclusiveAmenities.filter(a => a && a._id && a.title && a.iconUrl);

      await dispatch(createProject({
        stateName: state,
        cityName: city,
        localityName: locality,
        subLocalityName: subLocality,
        propertyData,
      }));

      dispatch(fetchProjectData());
      // closeModal();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

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


  console.log(selectedAmenities, selectedExclusiveAmenities);
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
        setProjectData({ ...projectData, amenities: [...projectData.amenities, { _id: amenity.id, title: amenity.title, iconUrl: amenity.imgUrl }] });
        setAmenitiesSearchQuery('');
        setIsDropdownOpen(false);
      }
    }
  };

  const handleRemoveAmenity = (amenity, isExclusive = false) => {
    if (isExclusive) {
      const updatedSelectedAmenities = selectedExclusiveAmenities.filter(a => a !== amenity);
      setSelectedExclusiveAmenities(updatedSelectedAmenities);
      setProjectData({ ...projectData, exclusiveAmenities: updatedSelectedAmenities.map(a => a.name) });
    } else {
      const updatedSelectedAmenities = selectedAmenities.filter(a => a !== amenity);
      setSelectedAmenities(updatedSelectedAmenities);
      setProjectData({ ...projectData, amenities: updatedSelectedAmenities.map(a => a.name) });
    }
  };

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
  const handleDescriptionChange = (data) => {
    setProjectData({ ...projectData, description: data });
  };

  const propertyTypes = [
    { value: 'Residential', label: 'Residential' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Industrial', label: 'Industrial' },
    // Add more options as needed
  ];

  return (
    <div className="container mt-4">
      <h4 className='text-center bg-warning text-white p-3 text-uppercase rounded-pill'>Create Project</h4>
      <form>
        <div className="mb-3 text-center">
          <LabelWithRequired htmlFor="projectName" isRequired={true}>
            Project Name
          </LabelWithRequired>
          <input required
            type="text"
            className="form-control"
            id="projectName"
            name="name"
            value={projectData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="city" isRequired={true}>
            City
          </LabelWithRequired>
          <select
            className="form-control"
            id="city"
            name="city"
            value={projectData.city}
            onChange={handleChange}
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.id} value={city.name}>{city.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="state" isRequired={true}>
            State
          </LabelWithRequired>
          <select
            className="form-control"
            id="state"
            name="state"
            value={projectData.state}
            onChange={handleChange}
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.id} value={state.name}>{state.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="locality" isRequired={true}>
            Locality
          </LabelWithRequired>
          <select
            className="form-control"
            id="locality"
            name="locality"
            value={projectData.locality}
            onChange={handleChange}
          >
            <option value="">Select Locality</option>
            {localities.map(locality => (
              <option key={locality.id} value={locality.name}>{locality.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="subLocality" isRequired={true}>
            Sub Locality
          </LabelWithRequired>
          <select
            className="form-control"
            id="subLocality"
            name="subLocality"
            value={projectData.subLocality}
            onChange={handleChange}
          >
            <option value="">Select Sub Locality</option>
            {subLocalities.map(subLocality => (
              <option key={subLocality.id} value={subLocality.name}>{subLocality.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor='startingPrice' isRequired={true}>Price</LabelWithRequired>
          <input required
            type="text"
            className="form-control"
            id="startingPrice"
            name="startingPrice"
            value={projectData.startingPrice}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="configuration" isRequired={true} className="form-label">Configuration</LabelWithRequired>
          <input required
            type="text"
            className="form-control"
            id="configuration"
            name="configuration"
            value={projectData.configuration}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="area" isRequired={true} className="form-label">Area</LabelWithRequired>
          <input required
            type="text"
            className="form-control"
            id="area"
            name="area"
            value={projectData.area}
            onChange={handleChange}
          />
        </div>
        {/* Feature and Exclusive3 */}
        <div className="mb-3 featured-input">
          <LabelWithRequired htmlFor="featured" isRequired={true} className="form-label">Featured</LabelWithRequired>
          <input required
            type="checkbox"
            className="form-check-input"
            id="featured"
            name="featured"
            checked={projectData.featured}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="mb-3 featured-input">
          <LabelWithRequired htmlFor="exclusive" isRequired={true} className="form-label">Exclusive</LabelWithRequired>
          <input required
            type="checkbox"
            className="form-check-input"
            id="exclusive"
            name="exclusive"
            checked={projectData.exclusive}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="priority" isRequired={true} className="form-label">Priority</LabelWithRequired>
          <input required
            type="text"
            className="form-control"
            id="priority"
            name="priority"
            value={projectData.priority}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <LabelWithRequired htmlFor="squarePrice" isRequired={true} className="form-label">Per (Sq.Ft.) Square Price</LabelWithRequired>
          <input required
            type="text"
            className="form-control"
            id="squarePrice"
            name="squarePrice"
            value={projectData.squarePrice}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="status" isRequired={true} className="form-label">Status</LabelWithRequired>
          <input required
            type="text"
            className="form-control"
            id="status"
            name="status"
            value={projectData.status}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="possesion" isRequired={true} className="form-label">Possession</LabelWithRequired>
          <input required
            type="text"
            className="form-control"
            id="possesion"
            name="possesion"
            value={projectData.possesion}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="lat" isRequired={true} className="form-label">Latitude</LabelWithRequired>
          <input required
            type="text"
            className="form-control"
            id="lat"
            name="lat"
            value={projectData.coordinates.lat}
            onChange={(e) => setProjectData({ ...projectData, coordinates: { ...projectData.coordinates, lat: e.target.value } })}
          />
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="lng" isRequired={true} className="form-label">Longitude</LabelWithRequired>
          <input required
            type="text"
            className="form-control"
            id="lng"
            name="lng"
            value={projectData.coordinates.lng}
            onChange={(e) => setProjectData({ ...projectData, coordinates: { ...projectData.coordinates, lng: e.target.value } })}
          />
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="rera" isRequired={true} className="form-label">RERA</LabelWithRequired>
          <input required
            type="text"
            className="form-control"
            id="rera"
            name="rera"
            value={projectData.rera}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="tagLine" isRequired={true} className="form-label">Tag Line</LabelWithRequired>
          <input required
            type="text"
            className="form-control"
            id="tagLine"
            name="tagLine"
            value={projectData.tagLine}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="priceInFigure" isRequired={true} className="form-label">Price In Figure</LabelWithRequired>
          <input required
            type="text"
            className="form-control"
            id="priceInFigure"
            name="priceInFigure"
            value={projectData.priceInFigure}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="propertyTypeTitle" isRequired={true} className="form-label">Property Type</LabelWithRequired>
          <select
            required
            className="form-control"
            id="propertyTypeTitle"
            name="propertyTypeTitle"
            value={projectData.propertyType.title}
            onChange={(e) => setProjectData({ ...projectData, propertyType: { ...projectData.propertyType, title: e.target.value } })}
          >
            <option value="" disabled>Select property type</option>
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        {projectData.propertyType.subType.map((subType, index) => (
          <div className="mb-3" key={index}>
            <LabelWithRequired htmlFor={`subType${index}`} isRequired={true} className="form-label">Sub-Type {index + 1}</LabelWithRequired>
            <input required
              type="text"
              className="form-control"
              id={`subType${index}`}
              value={subType}
              onChange={(e) => handleSubArrayChange(index, 'subType', e.target.value, 'propertyType.subType')}
            />
            <button type="button" className="btn btn-danger" onClick={() => handleSubRemoveField(index)}>Remove Sub-Type</button>
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={handleSubAddField}>Add Sub-Type</button>
        {/* Meta Data */}
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
            id="metaKeyword"
            name="metaKeyword"
            rows={8}
            placeholder='Meta Keyword'
            value={projectData.metaKeyword}
            onChange={handleChange}
          ></textarea>
        </div>
        {/* Desription */}
        <div className="mb-3">
          <LabelWithRequired htmlFor="description" isRequired={true} className="form-label">Description</LabelWithRequired>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows={10}
            value={projectData.description.join('\n')}
            onChange={(e) => setProjectData({ ...projectData, description: e.target.value.split('\n') })}
          ></textarea>
        </div>

        {/* Key HighLight */}
        <div className="form-group">
          <LabelWithRequired htmlFor="keyHighlights">Key Highlights</LabelWithRequired>
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              id="keyHighlights"
              value={currentKeyHighlight}
              onChange={handleKeyHighlightInputChange}
            />
            <button
              type="button"
              className="btn btn-primary ml-2"
              onClick={handleAddKeyHighlight}
            >
              Add
            </button>
          </div>
          <ul className="mt-2">
            {projectData.keyHighlights.map((highlight, index) => (
              <li key={index} className="d-flex justify-content-between align-items-center p-1">
                {highlight}
                <button
                  type="button"
                  className="btn btn-danger btn-sm ml-2"
                  onClick={() => handleRemoveKeyHighlight(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Developer */}
        <div className="mb-3">
          <LabelWithRequired htmlFor="rera" isRequired={true} className="form-label">Developer</LabelWithRequired>
          <input required
            type="text"
            className="form-control"
            id="developer"
            name="developer"
            value={projectData.developer}
            onChange={handleChange}
          />
        </div>
        {/* Property Logo */}
        <div className="mb-3">
          <label htmlFor="propertyLogo" className="form-label">Property Logo</label>
          <input required
            type="file"
            className="form-control"
            id="propertyLogo"
            name="propertyLogo"
            multiple
            onChange={(e) => setProjectData({ ...projectData, propertyLogo: Array.from(e.target.files) })}
          />
        </div>

        {/* Amenities */}
        <div className="mb-3">
          <LabelWithRequired htmlFor="amenities" isRequired={true} className="form-label">Amenities</LabelWithRequired>
          <div className="search-bar-container">
            <div className="selected-amenities">
              {selectedAmenities.map(amenity => (
                <div key={amenity.id} className="selected-amenity">
                  {amenity.title}
                  <span
                    className="remove-amenity"
                    onClick={() => handleRemoveAmenity(amenity)}
                  >
                    &times;
                  </span>
                </div>
              ))}
              <input required
                type="text"
                className="form-control"
                id="amenitiesSearch"
                placeholder="Search amenities..."
                value={amenitiesSearchQuery}
                onChange={(e) => handleSearchChange(e, false)}
                onFocus={() => setIsDropdownOpen(filteredAmenities.length > 0)}
              />
            </div>
            {isDropdownOpen && (
              <ul className="dropdown-menu1">
                {filteredAmenities.map(amenity => (
                  <li key={amenity.id} onClick={() => handleAddAmenity(amenity, false)}>
                    {amenity.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* Exclusive Amenities Section */}
        <div className="mb-3">
          <LabelWithRequired htmlFor="exclusiveAmenities" isRequired={true} className="form-label">Exclusive Amenities</LabelWithRequired>
          <div className="search-bar-container">
            <div className="selected-amenities">
              {selectedExclusiveAmenities.map(amenity => (
                <div key={amenity.id} className="selected-amenity">
                  {amenity.title}
                  <span
                    className="remove-amenity"
                    onClick={() => handleRemoveAmenity(amenity, true)}
                  >
                    &times;
                  </span>
                </div>
              ))}
              <input required
                type="text"
                className="form-control"
                id="exclusiveAmenitiesSearch"
                placeholder="Search exclusive amenities..."
                value={exclusiveAmenitiesSearchQuery}
                onChange={(e) => handleSearchChange(e, true)}
                onFocus={() => setIsExclusiveDropdownOpen(filteredExclusiveAmenities.length > 0)}
              />
            </div>
            {isExclusiveDropdownOpen && (
              <ul className="dropdown-menu1">
                {filteredExclusiveAmenities.map(amenity => (
                  <li key={amenity.id} onClick={() => handleAddAmenity(amenity, true)}>
                    {amenity.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="imageGallery" className="form-label">Image Gallery</label>
          {projectData.imageGallery.map((image, index) => (
            <div key={index} className="mb-3">
              <input required
                type="text"
                className="form-control mb-2"
                name="imageGallery"
                value={image}
                onChange={(e) => handleArrayChange(index, 'url', e.target.value, 'imageGallery')}
              />
              <button type="button" className="btn btn-danger" onClick={() => handleRemoveField(index, 'imageGallery')}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleAddField('imageGallery', '')}
          >
            Add Image
          </button>
        </div>
        {/* Locality Guide */}
        <div className="mb-3">
          <LabelWithRequired htmlFor="localityGuide" isRequired={true} className="form-label">Locality Guide</LabelWithRequired>
          {projectData.localityGuide.map((guide, index) => (
            <div key={index} className="mb-3">
              <input required
                type="text"
                className="form-control mb-2"
                name="localityGuideTitle"
                value={guide.title}
                onChange={(e) => handleArrayChange(index, 'title', e.target.value, 'localityGuide')}
                placeholder="Guide Title"
              />
              {guide.guideList.map((guideItem, guideIndex) => (
                <div key={guideIndex} className="mb-2 d-flex align-items-center">
                  <input required
                    type="text"
                    className="form-control me-2"
                    name="localityGuideItem"
                    value={guideItem.name}
                    onChange={(e) => handleArrayChange(guideIndex, 'name', e.target.value, 'localityGuide', index)}
                    placeholder="Guide Item"
                  />
                  <input required
                    type="text"
                    className="form-control me-2"
                    name="localityGuideItem"
                    value={guideItem.distance}
                    onChange={(e) => handleArrayChange(guideIndex, 'distance', e.target.value, 'localityGuide', index)}
                    placeholder="Distance"
                  />
                  <button type="button" className="btn btn-danger" onClick={() => handleRemoveField(guideIndex, 'localityGuide', index)}>
                    Remove
                  </button>

                </div>
              ))}
              <button type="button" className="btn btn-secondary" onClick={() => handleAddField('localityGuide', { name: '', distance: '' }, index)}>
                Add Guide Item
              </button>
              <button type="button" className='btn btn-danger' onClick={() => handleRemoveField(index, 'localityGuide')}>Remove Guide</button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleAddField('localityGuide', { key: '', title: '', guideList: [{ name: '', distance: '' }] })}
          >
            Add Guide
          </button>
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="floorPlan" isRequired={true} className="form-label">Floor Plan</LabelWithRequired>
          {projectData.floorPlan.map((plan, index) => (
            <div key={index} className="mb-3">
              <input required
                type="text"
                className="form-control mb-2"
                name="floorPlan"
                value={plan.price}
                onChange={(e) => handleArrayChange(index, 'price', e.target.value, 'floorPlan')}
                placeholder="Price"
              />
              <input required
                type="text"
                className="form-control mb-2"
                name="floorPlan"
                value={plan.superArea}
                onChange={(e) => handleArrayChange(index, 'superArea', e.target.value, 'floorPlan')}
                placeholder="Total Area"
              />
              <input required
                type="text"
                className="form-control mb-2"
                name="floorPlan"
                value={plan.carpetArea}
                onChange={(e) => handleArrayChange(index, 'carpetArea', e.target.value, 'floorPlan')}
                placeholder="Carpet Area"
              />
              <input required
                type="text"
                className="form-control mb-2"
                name="floorPlan"
                value={plan.configuration}
                onChange={(e) => handleArrayChange(index, 'configuration', e.target.value, 'floorPlan')}
                placeholder="Configuration"
              />
              <input required
                type="text"
                className="form-control mb-2"
                name="floorPlan"
                value={plan.floorImg}
                onChange={(e) => handleArrayChange(index, 'floorImg', e.target.value, 'floorPlan')}
                placeholder="Floor Image URL"
              />
              <button type="button" className="btn btn-danger" onClick={() => handleRemoveField(index, 'floorPlan')}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleAddField('floorPlan', { price: '', superArea: '', carpetArea: '', configuration: '', floorImg: '' })}
          >
            Add Floor Plan
          </button>
        </div>
        <div className="mb-3">
          <LabelWithRequired htmlFor="slug" isRequired={true} className="form-label">Slug</LabelWithRequired>
          <input required
            type="text"
            className='form-control mb-2'
            placeholder="Slug (SEO) URL"
            value={projectData.slug}
            onChange={handleChange}
          />
        </div>
        {/* Submit Project */}
        <button type="button" className="btn btn-primary" onClick={handleCreateProject}>
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProjectComponent;
