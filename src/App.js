import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Landing from './landing/Landing.js'
import Admin from './admin/Admin.js'
import Invitee from './invitee/Invitee.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './firebaseApp.js'

const theme = createTheme({
  stepper: {
    iconColor: "#B7004C"
  }
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" render={() => (<Landing />) } />
          <Route exact path="/admin" render={() => (<Admin />) } />
          <Route exact path="/rsvp" render={() => (<Invitee />)} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
