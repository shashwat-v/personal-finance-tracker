import { FaUserCircle } from "react-icons/fa";
import { Sidebar } from "../components/index";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logOut } from "../redux/slices/auth/userSlice";
import { CiLogout } from "react-icons/ci";
function Layout() {
  const dispatch = useDispatch();

  // Get authentication status from Redux store
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logOut());
  };

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/6 h-screen bg-[#EEEDEB] sticky top-0 hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto m-3">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end gap-3">
            <button onClick={handleLogout}>
              <span className="text-[30px] ">
                <CiLogout />
              </span>
            </button>
            <span className="text-[30px] ">
              <FaUserCircle />
            </span>
          </div>
          <div className="flex-1 p-4 2xl:px-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
