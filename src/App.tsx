import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserForm from './components/UserForm';
import SecondPage from './components/DataTable';
import DepartmentList from './components/DepartmentList';
import Container from '@mui/material/Container'
import NavBar from './components/navbar';

const App: React.FC = () => {
  return (
    <Container component={"section"} maxWidth="lg" sx={{mx:"auto"}}>
       <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/departments" element={<DepartmentList />} />
        <Route
          path="/second-page"
          element={<ProtectedRoute component={SecondPage} />}
        />
      </Routes>
    </Router>
    </Container>
   
  );
};

const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const userDetails = localStorage.getItem('userDetails');
  return userDetails ? <Component /> : <Navigate to="/" />;
};

export default App;
