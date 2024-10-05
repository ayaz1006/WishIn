import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AlbumsPage from "./pages/AlbumsPage";
import PhotoGalleryPage from "./pages/PhotoGalleryPage";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Layout>
                <PrivateRoute element={<AlbumsPage />} />
              </Layout>
            }
          />
          <Route
            path="/albums"
            element={
              <Layout>
                <PrivateRoute element={<AlbumsPage />} />
              </Layout>
            }
          />
          <Route
            path="/albums/:id"
            element={
              <Layout>
                <PrivateRoute element={<PhotoGalleryPage />} />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
