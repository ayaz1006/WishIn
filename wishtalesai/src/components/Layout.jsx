import MyNavbar from "./MyNavbar";

const Layout = ({ children }) => (
  <>
    <MyNavbar />
    <div>{children}</div>
  </>
);

export default Layout;
