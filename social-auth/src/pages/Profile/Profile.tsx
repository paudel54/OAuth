import Header from "../../components/Header/Header";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { logout } from "../../features/authSlice";
const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  useEffect(() => {
    if (Boolean(!user)) {
      navigate("/auth");
    }
  }, [navigate, user]);
  return (
    <div>
      <Header />
      {user && <ProfileCard user={user} handleLogout={handleLogout} />}
      <h1>This IS my Profile </h1>
    </div>
  );
};

export default Profile;
