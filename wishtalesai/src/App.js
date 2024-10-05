import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AlbumsPage from "./pages/AlbumsPage";
import PhotoGalleryPage from "./pages/PhotoGalleryPage";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import axios from "axios";

const App = () => {
  const url = `https://wishin.onrender.com/`;
  const interval = 30000; // Interval in milliseconds (30 seconds)

  function reloadWebsite() {
    axios
      .get(url)
      .then((response) => {
        console.log(
          `Reloaded at ${new Date().toISOString()}: Status Code ${
            response.status
          }`
        );
      })
      .catch((error) => {
        console.error(
          `Error reloading at ${new Date().toISOString()}:`,
          error.message
        );
      });
  }
  setInterval(reloadWebsite, interval);

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
