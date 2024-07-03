import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserForm from './components/UserForm';
import SecondPage from './components/DataTable';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route
          path="/second-page"
          element={<ProtectedRoute component={SecondPage} />}
        />
      </Routes>
    </Router>
  );
};

const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const userDetails = localStorage.getItem('userDetails');
  return userDetails ? <Component /> : <Navigate to="/" />;
};

export default App;
