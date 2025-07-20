import Navbar from "../components/Navbar";

const ClientLayout = ({ children }) => {
  return (
    <>
      <Navbar userRole="client" />
      <main className="px-8 py-6">{children}</main>
    </>
  );
};

export default ClientLayout;
