
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PetDetail from './pages/PetDetail';
import AdoptionForm from './pages/AdoptionForm';
import Progress from './pages/Progress';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Community from './pages/Community';
import ChatDetail from './pages/ChatDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pet/:id" element={<PetDetail />} />
          <Route path="/form" element={<AdoptionForm />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/community" element={<Community />} />
          <Route path="/chat/:id" element={<ChatDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
