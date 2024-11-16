// DashBoard Code

import React from "react";
import MainView from "../../components/dashboard/MainView";
import { Box } from '@mui/material';
import School from "@mui/icons-material/School";
import InventoryIcon from '@mui/icons-material/Inventory';
import EmailIcon from '@mui/icons-material/Email';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkIcon from '@mui/icons-material/Work';

import './dashbaord.css'


const Dashboard = () => {
   return (
      <div className="main-view">
         {/* <div className="page-header">
            <div className="container-fluid">
               <ul className="breadcrumb">
                  <li><a href="/">Home</a></li>
                  <li><a href='/dashboard'>Dashboard</a></li>
               </ul>
            </div>
         </div> */}
         <Box p={3}>Welcome to the DashBoard</Box>
         <div className="card-container">
            <div className="card">
               <div className="tile tile-primary">
                  <div className="tile-heading">Career Openings  <span className="pull-right"> </span></div>
                  <div className="tile-body">
                     <School />
                     <h2 className="pull-right">5</h2>
                  </div>
                  <div className="tile-footer"><a href="/">View more...</a></div>
               </div>
            </div>
            <div className="card">
               <div className="tile tile-primary">
                  <div className="tile-heading">Total Projects  <span className="pull-right"> </span></div>
                  <div className="tile-body">
                     <i className="fa fa-graduation-cap"><InventoryIcon /></i>
                     <h2 className="pull-right">167+</h2>
                  </div>
                  <div className="tile-footer"><a href="/project">View more...</a></div>
               </div>
            </div>
            <div className="card">
               <div className="tile tile-primary">
                  <div className="tile-heading">Total Enquiry  <span className="pull-right"> </span></div>
                  <div className="tile-body">
                     <i className="fa fa-graduation-cap"><EmailIcon /></i>
                     <h2 className="pull-right">10 +</h2>
                  </div>
                  <div className="tile-footer"><a href="/">View more...</a></div>
               </div>
            </div>
            <div className="card">
               <div className="tile tile-primary">
                  <div className="tile-heading">People Online  <span className="pull-right"> </span></div>
                  <div className="tile-body">
                     <i className="fa fa-graduation-cap"><PeopleAltIcon /></i>
                     <h2 className="pull-right">5</h2>
                  </div>
                  <div className="tile-footer"><a href="/">View more...</a></div>
               </div>
            </div>
            <div className="card">
               <div className="tile tile-primary">
                  <div className="tile-heading">Total Jobs  <span className="pull-right"> </span></div>
                  <div className="tile-body">
                     <i className="fa fa-graduation-cap"><WorkIcon /></i>
                     <h2 className="pull-right">5</h2>
                  </div>
                  <div className="tile-footer"><a href="/">View more...</a></div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Dashboard;