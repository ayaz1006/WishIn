// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// const PhotoGalleryPage = () => {
//   const { id } = useParams();
//   const [photos, setPhotos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPhotos = async () => {
//       try {
//         const response = await axios.get(
//           `https://jsonplaceholder.typicode.com/albums/${id}/photos`
//         );
//         setPhotos(response.data);
//       } catch (err) {
//         setError("Failed to fetch photos.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPhotos();
//   }, [id]);

//   return (
//     <div className="container mt-4">
//       <h1>Photo Gallery</h1>
//       {loading && <div className="spinner-border" role="status"></div>}
//       {error && <div className="alert alert-danger">{error}</div>}
//       <div className="row">
//         {photos.map((photo) => (
//           <div key={photo.id} className="col-md-4 mb-3">
//             <div className="card">
//               <img
//                 src={photo.thumbnailUrl}
//                 className="card-img-top"
//                 alt={photo.title}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{photo.title}</h5>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <Link to="/albums" className="btn btn-secondary mb-3">
//         Back to Albums
//       </Link>
//     </div>
//   );
// };

// export default PhotoGalleryPage;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PhotoGalleryPage = () => {
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on load and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile if width <= 768px
    };

    handleResize(); // Check screen size when the component mounts
    window.addEventListener("resize", handleResize); // Add resize listener

    return () => window.removeEventListener("resize", handleResize); // Cleanup listener on unmount
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/${id}/photos`
        );
        setPhotos(response.data);
      } catch (err) {
        setError("Failed to fetch photos.");
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [id]);

  return (
    <div className="container mt-4">
      <h1>Photo Gallery</h1>
      {loading && <div className="spinner-border" role="status"></div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {photos.map((photo) => (
          <div key={photo.id} className="col-12 col-sm-6 col-md-4 mb-3">
            <div className="card">
              <img
                src={isMobile ? photo.thumbnailUrl : photo.url} // Conditional rendering based on screen size
                className="card-img-top"
                alt={photo.title}
              />
              <div className="card-body">
                <h5 className="card-title">{photo.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/albums" className="btn btn-warning mb-3">
        Back to Albums
      </Link>
    </div>
  );
};

export default PhotoGalleryPage;
