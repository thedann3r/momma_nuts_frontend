import NavBar from "./Navbar/NavBar";

function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      <div className="main-content">
        {children}
      </div>
    </>
  );
}

export default MainLayout;
