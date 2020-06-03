import Menu from './components/Menu.jsx';
import Page from './pages/Page';
import RinkInfo from './pages/RinkInfo';
import ServerStats from './pages/ServerStats.jsx';
import UserInfo from './pages/UserInfo';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import axios from "axios";
import { Plugins } from '@capacitor/core';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { userToken: null, user: null, currentLocation: "/", apiRoot: "http://127.0.0.1:8000" };
    this.storage = Plugins.Storage;
  }

  async componentDidMount() {
    let token = await this.fetchStoredItem("userAppToken");
    console.log(token.value);
    if (token.value !== null) {
      this.setState({ userToken: token.value });
      this.getUserInformation(token.value);
    }
  }

  componentWillUnmount() {
  }


  async storeItem(itemKey, itemValue) {
    await this.storage.set({
      key: itemKey,
      value: itemValue
    });
  }

  async fetchStoredItem(itemKey) {
    return await this.storage.get({ key: itemKey });
  }

  async getUserInformation(token) {
    return await axios.get(this.state.apiRoot + `/api/user`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(result => {
      this.setState({ user: result.data })
    })
  }

  authenticateUser = async (email, password) => {
    return await axios.post(this.state.apiRoot + `/api/authenticate`,
      {
        "email": email,
        "password": password
      })
      .then(result => {
        console.log(result);
        console.log(result.status);
        if (result.data.status === "success") {
          //Set the user token to memory
          this.storeItem("userAppToken", result.data.token);
          this.setState({ userToken: result.data.token })
          this.getUserInformation(result.data.token);
          return true;
        }
        else
          return false;
      })
      .catch(error => {
        return alert("A unexpected API error occured. This is likely due to a issue with the server.");
      })
  }

  render = () => {
    if (this.state.user === null) {
      return (
        <LoginPage logIn={this.authenticateUser} />
      );
    } else {
      return (
        <IonApp>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Menu user={this.state.user} location={this.state.currentLocation} setLocation={(location) => { this.setState({ currentLocation: location }); }} />
              <IonRouterOutlet id="main">
                <Route path="/server/info" render={props => (<ServerStats authToken={this.state.userToken} apiRoot={this.state.apiRoot} />)} exact />
                <Route path="/users/stats" render={props => (<UserInfo authToken={this.state.userToken} apiRoot={this.state.apiRoot} />)} exact />
                <Route path="/rinks/stats" render={props => (<RinkInfo authToken={this.state.userToken} apiRoot={this.state.apiRoot} />)} exact />
                <Route path="/about" render={props => (<AboutPage authToken={this.state.userToken} apiRoot={this.state.apiRoot} />)} exact />
                <Redirect from="/" to="/server/info" exact />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp >
      );
    }
  };
}


export default App;
