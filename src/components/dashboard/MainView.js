// MainView.js

import React from 'react';
import { Box } from '@mui/material';
import ProjectComponent from '../../features/project/Project';
import Feature2Component from '../../features/features2/Feature2';

const MainView = ({ view }) => {
    let content;

    switch (view) {
        case 'home':
            content = <h1>Home</h1>;
            break;
        case 'project':
            content = <ProjectComponent />;
            break;
        case 'city':
            content = <Feature2Component />;
            break;
        case 'locality':
            content = <h1>Welcome to Locality Dashboard</h1>;
            break;
        case 'career':
            content = <h1>Welcome to Career Dashboard</h1>;
            break;
        case 'viewStates':
            content = <h1>View States</h1>; // Replace with your actual component
            break;
        case 'createState':
            content = <h1>Create State</h1>; // Replace with your actual component
            break;
        default:
            content = <h1>Welcome to the Dashboard</h1>;
    }

    return <Box p={3}>{content}</Box>;
};

export default MainView;
