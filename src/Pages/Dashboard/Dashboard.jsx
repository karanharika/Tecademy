// import { useAuth } from "../../auth/useAuth";
import { useAuth } from "../../auth/authContext";

import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { user, loading } = useAuth();
  // const { user } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="p-6">
      <h1 className="text-2xl">Dashboard</h1>
      <h1 className="text-2xl">Dashboard</h1>
      <h1 className="text-2xl">Dashboard</h1>
      <h1 className="text-2xl">Dashboard</h1>
      <h1 className="text-2xl">Dashboard</h1>
      <h1 className="text-2xl">Dashboard</h1>
      <h1 className="text-2xl">Dashboard</h1>
      <h1 className="text-2xl">Dashboard</h1>
      <h1 className="text-2xl">Dashboard</h1>
      <h1 className="text-2xl">Dashboard</h1>
      <p>Welcome back, {user.username}!</p>
    </div>
  );
}
