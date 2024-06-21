import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';
import SomeLink1Page from './pages/SomeLink1Page';
import SomeLink2Page from './pages/SomeLink2Page';

<Switch>
  <ProtectedRoute
    path="/register"
    component={RegisterPage}
    requiredPermission="/register"
  />
  <ProtectedRoute
    path="/someLink1"
    component={SomeLink1Page}
    requiredPermission="/someLink1"
  />
  <ProtectedRoute
    path="/someLink2"
    component={SomeLink2Page}
    requiredPermission="/someLink2"
  />
</Switch>
