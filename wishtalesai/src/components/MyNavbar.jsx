// import { Navbar, Nav, Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const MyNavbar = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
//       <Container>
//         <Navbar.Brand href="/">My App</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="/albums">Albums</Nav.Link>
//             {!isLoggedIn ? (
//               <>
//                 <Nav.Link href="/login">Login</Nav.Link>
//                 <Nav.Link href="/signup">Signup</Nav.Link>
//               </>
//             ) : (
//               <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
//                 Logout
//               </Nav.Link>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default MyNavbar;

import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // Import necessary hooks
import "bootstrap-icons/font/bootstrap-icons.css"; // Make sure Bootstrap icons are available

const MyNavbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Theme state (default is light)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme); // Apply theme to body
    localStorage.setItem("theme", theme); // Save the user's theme preference in localStorage
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Navbar
      // bg={theme === "light" ? "light" : "dark"}
      bg={"dark"}
      // variant={theme === "light" ? "light" : "dark"}
      variant={"dark"}
      expand="lg"
      className="mb-4"
    >
      <Container>
        <Navbar.Brand href="/">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/albums">Albums</Nav.Link>
            {!isLoggedIn ? (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </Nav.Link>
            )}
          </Nav>
          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="btn btn-outline-secondary d-flex align-items-center"
            aria-label="Toggle theme"
          >
            <i
              className={`bi ${
                theme === "light" ? "bi-brightness-high" : "bi-moon"
              }`}
              style={{ fontSize: "1.5rem" }}
            ></i>
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
