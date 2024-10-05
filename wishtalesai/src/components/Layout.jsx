// import MyNavbar from "./MyNavbar";

// const Layout = ({ children }) => (
//   <>
//     <MyNavbar />
//     {children}
//   </>
// );

// export default Layout;

import MyNavbar from "./MyNavbar";

const Layout = ({ children }) => (
  <>
    <MyNavbar />
    <div>{children}</div>
  </>
);

export default Layout;
