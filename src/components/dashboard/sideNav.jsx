import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Feature1Icon from '@mui/icons-material/Home'; // Replace with actual icon
import Feature2Icon from '@mui/icons-material/Home'; // Replace with actual icon
import ProjectIcon from '@mui/icons-material/Work'; // Example icon, replace with appropriate one
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SchoolIcon from '@mui/icons-material/School';
import './Sidenav.css'; // Import your custom CSS file for styling

const SideNav = () => {
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isLocationOpen, setLocationOpen] = useState(false);
  const [isFaqOpen, setFaqOpen] = useState(false);
  const [isCareerOpen, setCareerOpen] = useState(false);
  const [isBlogOpen, setBlogOpen] = useState(false);
  const [isEnquiryOpen, setEnquiryOpen] = useState(false);
  const [isSettingOpen, setSettingOpen] = useState(false);
  
  const toggleHome = () => setIsHomeOpen(!isHomeOpen);
  const toggleLocation = () => setLocationOpen(!isLocationOpen);
  const toggleFaq = () => setFaqOpen(!isFaqOpen);
  const toggleCareer = () => setCareerOpen(!isCareerOpen);
  const toggleBlog = () => setBlogOpen(!isBlogOpen);
  const toggleEnquiry = () => setEnquiryOpen(!isEnquiryOpen);
  const toggleSetting = () => setSettingOpen(!isSettingOpen);

  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li className="nav-item">
        <div className="nav-link" onClick={toggleHome}>
            <HomeIcon className="nav-icon" />
            Home
            {isHomeOpen ? <ExpandLessIcon className="nav-icon-expand" /> : <ExpandMoreIcon className="nav-icon-expand" />}
          </div>
          {isHomeOpen && (
            <ul className="sub-nav-list">
              <li className="sub-nav-item">
                <Link to="/dashboard/admin/home" className="sub-nav-link">
                  Headings
                </Link>
              </li>
              <li className="sub-nav-item">
                <Link to="/dashboard/admin/testimonials" className="sub-nav-link">
                  Testimonials
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <Link to="/dashboard/feature1" className="nav-link">
            <FormatListBulletedSharpIcon className="nav-icon" />
            Feature 1
          </Link>
        </li>
        {/* Project */}
        <li className="nav-item">
          <Link to="/dashboard/project" className="nav-link">
            <ProjectIcon className="nav-icon" />
            Project
          </Link>
        </li>
         {/* Developer */}
        <li className="nav-item">
          <Link to="/dashboard/developer" className="nav-link">
            <FormatListBulletedSharpIcon className="nav-icon" />
            Developer
          </Link>
        </li>
        {/* Location */}
        <li className="nav-item">
          <div className="nav-link" onClick={toggleLocation}>
            <LocationCityIcon className="nav-icon" />
            Location
            {isLocationOpen ? <ExpandLessIcon className="nav-icon-expand" /> : <ExpandMoreIcon className="nav-icon-expand" />}
          </div>
          {isLocationOpen && (
            <ul className="sub-nav-list">
              <li className="sub-nav-item">
                <Link to="/dashboard/city" className="sub-nav-link">
                  City
                </Link>
              </li>
              <li className="sub-nav-item">
                <Link to="/dashboard/state" className="sub-nav-link">
                  State
                </Link>
              </li>
              <li className="sub-nav-item">
                <Link to="/dashboard/locality" className="sub-nav-link">
                  Locality
                </Link>
              </li>
              <li className="sub-nav-item">
                <Link to="/dashboard/sub-locality" className="sub-nav-link">
                  Sub Locality
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        <li className="nav-item">
          <div className="nav-link" onClick={toggleFaq}>
            <FormatListBulletedSharpIcon className="nav-icon" />
            FAQ
            {isFaqOpen ? <ExpandLessIcon className="nav-icon-expand" /> : <ExpandMoreIcon className="nav-icon-expand" />}
          </div>
          {isFaqOpen && (
            <ul className="sub-nav-list">
              <li className="sub-nav-item">
                <Link to="/dashboard/faq-category" className="sub-nav-link">
                  FAQ Category
                </Link>
              </li>
              <li className="sub-nav-item">
                <Link to="/dashboard/admin/faqs" className="sub-nav-link">
                  FAQs
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        <li className="nav-item">
          <div className="nav-link" onClick={toggleCareer}>
            <SchoolIcon className="nav-icon" />
            Career
            {isCareerOpen ? <ExpandLessIcon className="nav-icon-expand" /> : <ExpandMoreIcon className="nav-icon-expand" />}
          </div>
          {isCareerOpen && (
            <ul className="sub-nav-list">
              <li className="sub-nav-item">
                <Link to="/dashboard/current-openings" className="sub-nav-link">
                  Current Openings
                </Link>
              </li>
              <li className="sub-nav-item">
                <Link to="/dashboard/career-enquiry" className="sub-nav-link">
                  Career Enquiry
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        <li className="nav-item">
          <div className="nav-link" onClick={toggleBlog}>
            <FormatListBulletedSharpIcon className="nav-icon" />
            Blog
            {isBlogOpen ? <ExpandLessIcon className="nav-icon-expand" /> : <ExpandMoreIcon className="nav-icon-expand" />}
          </div>
          {isBlogOpen && (
            <ul className="sub-nav-list">
              <li className="sub-nav-item">
                <Link to="/dashboard/blog-type" className="sub-nav-link">
                  Type
                </Link>
              </li>
              <li className="sub-nav-item">
                <Link to="/dashboard/blog-category" className="sub-nav-link">
                  Category
                </Link>
              </li>
              <li className="sub-nav-item">
                <Link to="/dashboard/blogs" className="sub-nav-link">
                  Blogs
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        <li className="nav-item">
          <div className="nav-link" onClick={toggleEnquiry}>
            <FormatListBulletedSharpIcon className="nav-icon" />
            Enquiry
            {isEnquiryOpen ? <ExpandLessIcon className="nav-icon-expand" /> : <ExpandMoreIcon className="nav-icon-expand" />}
          </div>
          {isEnquiryOpen && (
            <ul className="sub-nav-list">
              <li className="sub-nav-item">
                <Link to="/dashboard/enquiry-home" className="sub-nav-link">
                  Home
                </Link>
              </li>
              <li className="sub-nav-item">
                <Link to="/dashboard/enquiry-project" className="sub-nav-link">
                  Project
                </Link>
              </li>
              <li className="sub-nav-item">
                <Link to="/dashboard/enquiry-home-loan" className="sub-nav-link">
                  Home Loan
                </Link>
              </li>
              <li className="sub-nav-item">
                <Link to="/dashboard/enquiry-home-interior" className="sub-nav-link">
                  Home Interior
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        <li className="nav-item">
          <div className="nav-link" onClick={toggleSetting}>
            <FormatListBulletedSharpIcon className="nav-icon" />
            Setting
            {isSettingOpen ? <ExpandLessIcon className="nav-icon-expand" /> : <ExpandMoreIcon className="nav-icon-expand" />}
          </div>
          {isSettingOpen && (
            <ul className="sub-nav-list">
              <li className="sub-nav-item">
                <Link to="/dashboard/settings" className="sub-nav-link">
                  Settings
                </Link>
              </li>
              <li className="sub-nav-item">
                <Link to="/dashboard/meta-manage" className="sub-nav-link">
                  Meta Manage
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
