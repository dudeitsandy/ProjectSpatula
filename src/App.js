import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

// Context
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Components
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import PrivateRoute from './routes/PrivateRoute';

// Pages
import Home from './pages/Home/Home';
import KitchenListing from './pages/KitchenListing/KitchenListing';
import KitchenDetails from './pages/KitchenDetails/KitchenDetails';
import SignIn from './components/auth/SignIn/SignIn';
import SignUp from './components/auth/SignUp/SignUp';
import MyKitchens from './pages/MyKitchens/MyKitchens';
import CreateKitchen from './pages/CreateKitchen/CreateKitchen';
import EditKitchen from './pages/EditKitchen/EditKitchen';
import Profile from './pages/Profile/Profile';
import Bookings from './pages/Bookings/Bookings';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <AppContainer>
            <Header />
            <MainContent>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/kitchens" element={<KitchenListing />} />
                <Route path="/kitchen/:id" element={<KitchenDetails />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                {/* Protected Routes */}
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/bookings"
                  element={
                    <PrivateRoute>
                      <Bookings />
                    </PrivateRoute>
                  }
                />
                {/* Kitchen Management Routes */}
                <Route
                  path="/my-kitchens"
                  element={
                    <PrivateRoute>
                      <MyKitchens />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/kitchen/create"
                  element={
                    <PrivateRoute>
                      <CreateKitchen />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/kitchen/edit/:id"
                  element={
                    <PrivateRoute>
                      <EditKitchen />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </MainContent>
            <Footer />
          </AppContainer>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;