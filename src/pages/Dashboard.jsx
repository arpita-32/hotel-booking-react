import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "../components/core/Dashboard/AdminSidebar";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { USER_ROLE } from "../services/operations/authAPI";
import NavBar from "../components/common/NavBar"; // Import NavBar component
import Footer from "../components/common/Footer"; // Import Footer component

function Dashboard() {
  const { loading: profileLoading, user } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Add NavBar at the top */}
      <NavBar />
      
      {/* Main content area with sidebar and outlet */}
      <div className="relative flex flex-col md:flex-row flex-1 bg-richblack-900">
        {user.role === USER_ROLE.ADMIN ? <AdminSidebar /> : <Sidebar />}
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto bg-richblack-800">
          <div className="mx-auto w-11/12 max-w-[1000px] py-6 sm:py-8 md:py-10">
            <Outlet />
          </div>
        </div>
      </div>
      
      {/* Add Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default Dashboard;