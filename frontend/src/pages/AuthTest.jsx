import { useAuth } from "../context/AuthContext";

function AuthTest() {
  const {
    user,
    isAuthenticated,
    isLoading,
    logout,
  } = useAuth();

  if (isLoading) {
    return <h2>Checking authentication...</h2>;
  }

  if (!isAuthenticated) {
    return <h2>Not logged in</h2>;
  }

  return (
    <div>
      <h2>Authenticated</h2>

      <p>ID: {user.id}</p>
      <p>Name: {user.full_name}</p>
      <p>Email: {user.email}</p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default AuthTest;