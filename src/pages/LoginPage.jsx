import {
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonInput, IonItem,
  IonItemDivider, IonCard, IonCardContent, IonCardHeader, IonLabel, IonButton, IonAlert
} from '@ionic/react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import React from 'react';
import './Page.css';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user: null, failedAlert: false, email: "", password: "" };
  }

  setShowLoginFailedAlert(state) {
    this.setState({ failedAlert: state })
  }

  attemptToLogUserIn = async () => {
    // (async () => { })();
    // console.log(await this.props.logIn(this.state.email, this.state.password));
    // return;
    let result = await this.props.logIn(this.state.email, this.state.password);
    // Storage.set('name', 'Max');

    console.log(result);
    if (result === false) {
      this.setShowLoginFailedAlert(true);
    }
  }

  render = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="ion-text-center"> Welcome to the MusicQ Admin Dashboard </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonRow className="ion-justify-content-center">
            {/* <IonCol className="ion-align-self-start">ion-col start</IonCol> */}

            <IonCol className="ion-align-self-center ion-text-center ion-margin-top" size-sm="auto" size-md="4" size-sm >
              <IonCard>
                <IonCardHeader>
                  <h4> Please Log-In With Your Credentials </h4>
                </IonCardHeader>
                <IonCardContent>
                  <form>
                    <IonItem>
                      <IonLabel position="stacked">Email</IonLabel>
                      <IonInput type="text" placeholder="Enter your email" value={this.state.email} onIonChange={e => this.setState({ email: e.detail.value })}></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="stacked">Password</IonLabel>
                      <IonInput type="password" placeholder="Enter your password" value={this.state.password} onIonChange={e => this.setState({ password: e.detail.value })}></IonInput>
                    </IonItem>
                  </form>
                  <IonAlert
                    isOpen={this.state.failedAlert}
                    onDidDismiss={() => this.setShowLoginFailedAlert(false)}
                    cssClass='ion-text-center'
                    header={'Incorrect Email or Password'}
                    subHeader={''}
                    message={'<div class="ion-text-center"> Incorrect Email or Password </div>'}
                    buttons={['Try Again']}
                  />
                  <IonButton className="ion-margin-top" expand="block" onClick={() => this.attemptToLogUserIn()}> Log-In </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            {/* <IonCol className="ion-align-self-end">ion-col end</IonCol> */}
          </IonRow>

        </IonContent>
      </IonPage >
    );
  }
}

export default LoginPage;
