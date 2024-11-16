// # Main React component


import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import store from './store';
import AuthForm from '../pages/Authentication/AuthForm.jsx'

import Feature1 from '../features/features1/Feature1';
import Feature2 from '../features/features2/Feature2.js';
import ProjectComponent from '../features/project/Project.js';
import StatesComponent from '../features/state/StatesComponent.js';
import { SnackbarProvider } from '../components/UI/useMuiSnackbar.jsx';
import Project from "../pages/Project/project.jsx";
import Amenities from "../pages/Amenities/amenities.jsx";
import LocalityMap from '../pages/LocalityMap/localityMap.jsx';
import Image from '../pages/Images/images.jsx'
import Blog from '../features/blog/Blog.jsx';
import City from '../features/city/city.jsx'
import Locality from '../features/locality/locality.jsx';
import SubLocality from '../features/subLocality/subLocality.jsx';
import FaqCategory from '../features/faqCategory/faqCategory.jsx';
import Testimonials from '../features/testimoials/testimonials.jsx';
import Faq from '../features/faq/faq.jsx';
import BlogCategory from '../features/blogCategory/blogCategory.jsx';
import ImageTestComponent from '../pages/Image/imageTest.jsx';
import DeveloperComponent from '../features/developer/developer.js';
import DeveloperImageComponent from '../components/developer/developerImage.jsx';

import Dashboard from '../pages/dashboard/Dashboard.js';
import SideNav from '../components/dashboard/sideNav.jsx';

import '../App.css'



// Utility function to check roles
const checkRoles = (requiredRoles) => {
    const userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]');
    return requiredRoles.some(role => userRoles.includes(role));
  };
  
  // PrivateRoute component
  const PrivateRoute = ({ element: Component, roles, ...rest }) => {
    const hasAccess = checkRoles(roles);
    return (
        <Route
            {...rest}
            element={hasAccess ? <Component /> : <Navigate to="/" />}
        />
    );
};

const AppContent = () => {
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // if (!isAuthenticated) {
    //   return <AuthForm />;
    // }

    return (
        <div className="app-container">
            <div className='header' id='header'></div>
            <div className='sidenav-container'>
                <SideNav />
            </div>
            <div className="main-content container-fluid">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/feature1" element={<Feature1 />} />
                    <Route path="/feature2" element={<Feature2 />} />
                    <Route path="/project" element={<ProjectComponent />} />
                    <Route path='/state' element={<StatesComponent />} />
                    <Route path="/project" element={<Project />} />
                    <Route path='/amenities' element={<Amenities />} />
                    <Route path='/localityMap' element={<LocalityMap />} />
                    <Route path='/images' element={<ImageTestComponent />} />
                    <Route path='/blogs' element={<Blog />} />
                    <Route path='/city' element={<City />} />
                    <Route path='/locality' element={<Locality />} />
                    <Route path="/sub-locality" element={<SubLocality />} />
                    <Route path="/faq-category" element={<FaqCategory />} />
                    <Route path="/admin/testimonials" element={<Testimonials />} />
                    <Route path='/admin/faqs' element={<Faq />} />
                    <Route path='/blog-type' element={<BlogCategory />} />
                    <Route path="/developer" element={<DeveloperComponent />} />
                    <Route path="/developerImg" element={<DeveloperImageComponent />} />
                </Routes>
            </div>
        </div>
    );
};


function App() {


    return (
        <Provider store={store}>
            <SnackbarProvider>
                        <Routes>
                            <Route path="/" element={<AuthForm />} />
                            <Route path="/dashboard/*" element={<AppContent /> }/>
                        </Routes>
            </SnackbarProvider>
        </Provider>
        // <Provider store={store}>
        //   <SnackbarProvider>
        //     <Routes>
        //       <Route path="/login" element={<MultiPage />} />
        //       <Route path='/' element={<Dashboard/>}/>
        //       <Route path="/feature1" element={<Feature1 />} />
        //       <Route path="/feature2" element={<Feature2 />} />
        //       <Route path="/project1" element={<ProjectComponent />} />
        //       <Route path='/state' element={<StatesComponent/>}/>
        //       <Route path="/login" element={<AuthForm />} />
        //       <Route path="/project" element={<Project/>}/>
        //       <Route path='/amenities' element={<Amenities/>}/>
        //       <Route path='/localityMap' element={<LocalityMap/>}/>
        //       <Route path='/images'  element={<Image/>}/>
        //     </Routes>
        //   </SnackbarProvider>
        // </Provider>
    );
}

export default App;
