import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 10;

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/albums"
        );
        setAlbums(response.data);
      } catch (err) {
        setError("Failed to fetch albums.");
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h1>Albums</h1>
      {loading && <div className="spinner-border" role="status"></div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {currentAlbums.map((album) => (
          <div key={album.id} className="col-md-4 mb-5">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{album.title}</h5>
                <Link to={`/albums/${album.id}`} className="btn btn-primary">
                  View Photos
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
            >
              Prev
            </button>
          </li>
          {Array.from(
            { length: Math.ceil(albums.length / albumsPerPage) },
            (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
          <li
            className={`page-item ${
              currentPage === Math.ceil(albums.length / albumsPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AlbumsPage;
