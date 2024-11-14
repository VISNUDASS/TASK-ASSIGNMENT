import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RoleSelection from './components/EntryPage/RoleSelection';

import WorkerLogin from './components/EntryPage/WorkerLogin';
import ManagerLogin from './components/EntryPage/ManagerLogin';

import TechIndustry from './components/TechIndustry/techIndustry';
import Safety from './components/TechIndustry/safety';
import Manager from './components/TechIndustry/manager';
import DashboardCharts from './components/TechIndustry/dashboard';

import TechIndustry1 from './components/TechIndustry1/techIndustry';

import Construction from './components/Construction/construction';
import ConstManager from './components/Construction/constManager';
import ConstCharts from './components/Construction/constDashboard';
import ConstSafety from './components/Construction/constSafety';

import Healthcare from './components/Healthcare/healthcare';
import HealthManager from './components/Healthcare/healthManager';
import HealthSafety from './components/Healthcare/healthSafety';
import HealthCharts from './components/Healthcare/healthDashboard';

import FireService from './components/FireService/fireService';
import FireSafety from './components/FireService/fireServiceSafety';
import FireServiceManager from './components/FireService/fireServiceManager';
import FireServiceCharts from './components/FireService/fireServiceDashboard';
const App = () => {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<RoleSelection />} />
        <Route path="/worker-login" element={<WorkerLogin />} />
        <Route path="/manager-login" element={<ManagerLogin />} />

        <Route path='/tech-industry' element={<TechIndustry/>} />
        <Route path='/new-user/:dbName' element={<TechIndustry1/>} />
        <Route path='safety-measures' element={<Safety/>} />
        <Route path='/manager-dashboard' element={<Manager/>} />
        <Route path='/dashboard' element={<DashboardCharts/>} />

        <Route path='/construction' element={<Construction/>} />
        <Route path='/construction-manager' element={<ConstManager/>} />
        <Route path='/const-worker-dashboard' element={<ConstCharts/>} />
        <Route path='/const-safety' element={<ConstSafety/>} />

        <Route path='/healthcare-worker' element={<Healthcare/>} />
        <Route path='/healthcare-manager' element={<HealthManager/>} />
        <Route path='/health-safety' element={<HealthSafety/>} />
        <Route path='/health-worker-dashboard' element={<HealthCharts/>} />

        <Route path='/fireservice-worker' element={<FireService/>} />
        <Route path='/fireservice-safety' element={<FireSafety/>} />
        <Route path='/fireservice-manager' element={<FireServiceManager/>} />
        <Route path='/fireservice-dashboard' element={<FireServiceCharts/>} />

      </Routes>
    </Router>
  );
};

export default App;