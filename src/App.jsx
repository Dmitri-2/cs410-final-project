import Menu from './components/Menu';
import Page from './pages/Page';
import RinkInfo from './pages/RinkInfo';
import ServerStats from './pages/ServerStats';
import UserInfo from './pages/UserInfo';
import AboutPage from './pages/AboutPage';
import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import axios from "axios";

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
    this.state = { user: null };
  }

  componentDidMount() {
    // this.timerID = setInterval(
    //   () => this.tick(),
    //   1000
    // );
  }

  componentWillUnmount() {
    // clearInterval(this.timerID);
  }

  render = () => {
    if (this.state.user === null) {
      return (
        <div>
          <h1>You need to log in!</h1>
        </div>
      );
    }

    return (
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/server/info" component={ServerStats} exact />
              <Route path="/users/stats" component={UserInfo} exact />
              <Route path="/rinks/stats" component={RinkInfo} exact />
              <Route path="/about" component={AboutPage} exact />
              <Redirect from="/" to="/server/info" exact />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp >
    );

  };
}


export default App;
