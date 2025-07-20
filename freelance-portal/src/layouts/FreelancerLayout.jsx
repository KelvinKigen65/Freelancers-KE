import Navbar from "../components/Navbar";

const FreelancerLayout = ({ children }) => {
  return (
    <>
      <Navbar userRole="freelancer" />
      <main className="px-8 py-6">{children}</main>
    </>
  );
};

export default FreelancerLayout;
