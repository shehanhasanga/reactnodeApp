import NavComponent from "./component/nav/NavComponent";
import NavHeader from "./component/NavHeader/NavHeader";
import './styles/style.scss';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';

// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';

// react-bootstrap-table2 styles
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// rc-slider style
import 'rc-slider/assets/index.css';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import { SocketProvider } from './contexts/Socket';
import { SET_AUTH } from './containers/Authentication/constants';
import Application from './containers/Application';
import ScrollToTop from './scrollToTop';
import setToken from './utils/token';

// Authentication
const token = localStorage.getItem('token');

if (token) {
    // authenticate api authorization
    setToken(token);

    // authenticate routes
    store.dispatch({ type: SET_AUTH });
}
function App() {
  return (
      // <Provider store={store}>
      <Provider store={store}>
          <ConnectedRouter history={history}>
          <Application />
          </ConnectedRouter>
      </Provider>
  );
}

export default App;
