import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ path, component: Component }) => {
  const [auth, setAuth] = useContext(AuthContext);

  if (auth) {
    return <Route path={path} render={() => <Component />} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default ProtectedRoute;
