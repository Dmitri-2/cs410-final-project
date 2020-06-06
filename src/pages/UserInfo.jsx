import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Page.css';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonText, IonModal, IonList } from '@ionic/react';
import axios from "axios";
import Chart from 'chart.js';


class UserInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { allUsers: [], userModalOpen: false, selectedUser: null };
  }

  componentDidMount() {
    // When we render - get all the users 
    this.getAllUsers();

    //Create the ChartJs graphs 
    var ctx = document.getElementById('userEmailChart').getContext('2d');
    this.emailChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["Verified", "Pending"],
        datasets: [{
          label: "User Email Verification Status",
          data: [1, 2],
          backgroundColor: [
            'rgba(3, 200, 52, 0.3)',
            'rgba(250, 20, 23, 0.3)'
          ],
          borderColor: [
            'rgba(3, 200, 52, 1)',
            'rgba(250, 20, 23, 1)'
          ],
          borderWidth: 1
        }]
      }
    });

    var ctx = document.getElementById('userTypeChart').getContext('2d');
    this.typeChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["Regular", "Coach", "Admin"],
        datasets: [{
          label: "User Type Count",
          data: [1, 2, 3],
          backgroundColor: [
            'rgba(33, 59, 231, 0.3)',
            'rgba(250, 131, 20, 0.3)',
            'rgba(45, 194, 191, 0.3)'
          ],
          borderColor: [
            'rgba(33, 59, 231, 1)',
            'rgba(250, 131, 20, 1)',
            'rgba(45, 194, 191, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
  }

  updateChartWithUserEmailVerifiedDataSet() {
    let notVerified = this.state.allUsers.filter(user => user.email_verified_at === null).length;
    let verified = this.state.allUsers.length - notVerified;
    this.emailChart.data.datasets[0].data = [verified, notVerified];
    this.emailChart.update();
  }

  updateUserTypeChart() {
    let regular = this.state.allUsers.filter(user => user.type === "regular").length;
    let coach = this.state.allUsers.filter(user => user.type === "coach").length;
    let admin = this.state.allUsers.filter(user => user.type === "admin").length;
    this.typeChart.data.datasets[0].data = [regular, coach, admin];
    this.typeChart.update();
  }

  // Function to get all users from the API 
  getAllUsers = async () => {
    await axios.get(this.props.apiRoot + `/api/users/all`,
      { headers: { Authorization: `Bearer ${this.props.authToken}` } }
    ).then(result => {
      this.setState({ allUsers: result.data }) // Store all users in state 
    })
    this.updateChartWithUserEmailVerifiedDataSet();
    this.updateUserTypeChart();
  }

  setUserModalStatus = (value) => {
    this.setState({ userModalOpen: value })
  }


  render = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle class="ion-text-center" >User Information and Statistics</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{this.props.name}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonRow>
            <IonCol sizeMd="6" sizeLg="3" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2>Total Users</h2></IonCardTitle>
                  <IonCardSubtitle className="ion-text-center"> Total Number of Users Registered </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonTitle className="ion-text-center">
                    <h1 className="font-50"> {this.state.allUsers.length} </h1>
                  </IonTitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeMd="6" sizeLg="3" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2> Unlimited Users</h2></IonCardTitle>
                  <IonCardSubtitle className="ion-text-center"> Users w/ Unlimited Subscriptions</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonTitle className="ion-text-center">
                    <h1 className="font-50"> {this.state.allUsers.map(user => user.subscription.has_unlimited_plays ? 1 : 0).reduce((r, v) => r + v, 0)} </h1>
                  </IonTitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeMd="6" sizeLg="3" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2>Play Credits </h2></IonCardTitle>
                  <IonCardSubtitle className="ion-text-center"> Total Credits Across All Users</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonTitle className="ion-text-center">
                    <h1 className="font-50"> {this.state.allUsers.map(user => user.subscription.play_credits).reduce((r, v) => r + v, 0)} </h1>
                  </IonTitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeMd="6" sizeLg="3" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2>Total Sub-Users</h2></IonCardTitle>
                  <IonCardSubtitle className="ion-text-center"> Profiles Under a User Account</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonTitle className="ion-text-center">
                    <h1 className="font-50"> {this.state.allUsers.map(user => user.sub_users.length).reduce((r, v) => r + v, 0)} </h1>
                  </IonTitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol sizeMd="6" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2>User Email Verification Status </h2></IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <canvas id="userEmailChart" width="300" height="200"></canvas>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeMd="6" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2>User Type Overview</h2></IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <canvas id="userTypeChart" width="300" height="200"></canvas>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2>All Application Users</h2></IonCardTitle>
                </IonCardHeader>

                <IonCardContent style={{ overflow: "scroll" }}>

                  <table style={{ margin: "auto" }}>
                    <thead>
                      <tr>
                        <th> <IonLabel color="primary"> Id </IonLabel> </th>
                        <th> <IonLabel color="primary"> Name </IonLabel> </th>
                        <th> <IonLabel color="primary"> Email </IonLabel> </th>
                        <th> <IonLabel color="primary"> Email Verified</IonLabel> </th>
                        <th> <IonLabel color="primary"> Type </IonLabel> </th>
                        <th> <IonLabel color="primary"> Credits </IonLabel> </th>
                        <th> <IonLabel color="primary"> Sub-Users </IonLabel> </th>
                        <th> <IonLabel color="primary"> View </IonLabel> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.allUsers.map(user => (
                        <tr key={user.id}>
                          <td><IonLabel color="dark"> {user.id} </IonLabel> </td>
                          <td><IonLabel color="dark"> {user.name} </IonLabel> </td>
                          <td><IonLabel color="dark"> {user.email} </IonLabel> </td>
                          <td><IonLabel color="dark"> {user.email_verified_at == null ? "No" : "Yes"} </IonLabel> </td>
                          <td><IonLabel color="dark" className="ion-text-capitalize">  {user.type} </IonLabel> </td>
                          <td><IonLabel color="dark" className="ion-text-capitalize">  {user.subscription.has_unlimited_plays ? "Unlimited" : user.subscription.play_credits + " credits"} </IonLabel> </td>
                          <td><IonLabel color="dark" className="ion-text-capitalize">  {user.sub_users.length} </IonLabel> </td>
                          <td> <IonLabel color="dark" className="ion-text-capitalize">
                            <IonButton size="small" onClick={() => { this.setUserModalStatus(true); this.setState({ selectedUser: user }) }}>View</IonButton>
                          </IonLabel>
                          </td>
                        </tr>

                      ))}
                    </tbody>
                  </table>

                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonModal isOpen={this.state.userModalOpen} cssClass='my-custom-class'>
            {this.state.selectedUser == null ? (
              <h2>
                Oops! Please select a user for this modal!
              </h2>
            ) : (
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-center"> <h2> {this.state.selectedUser.name} </h2></IonCardTitle>
                    <IonCardSubtitle className="ion-text-center">User Detail View </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonList className="ion-margin-bottom">
                      <IonItem key="modal-name">
                        <IonLabel> <strong> Name: </strong>{this.state.selectedUser.name}</IonLabel>
                      </IonItem>
                      <IonItem key="modal-email">
                        <IonLabel><strong>Email: </strong> {this.state.selectedUser.email}</IonLabel>
                      </IonItem>
                      <IonItem key="modal-email-at">
                        <IonLabel><strong>Email Verified At: </strong> {this.state.selectedUser.email_verified_at == null ? "Not verified yet" : (new Date(this.state.selectedUser.email_verified_at)).toDateString()}</IonLabel>
                      </IonItem>
                      <IonItem key="modal-type">
                        <IonLabel><strong>Account Type: </strong> {this.state.selectedUser.type}</IonLabel>
                      </IonItem>
                      <IonItem key="modal-street-address">
                        <IonLabel><strong>Street Address: </strong> {this.state.selectedUser.street_address == "" ? "No address on file" : this.state.selectedUser.street_address}</IonLabel>
                      </IonItem>
                      <IonItem key="modal-city">
                        <IonLabel><strong>City: </strong> {this.state.selectedUser.city == "" ? "N/A" : this.state.selectedUser.city}</IonLabel>
                      </IonItem>
                      <IonItem key="modal-state">
                        <IonLabel><strong>State: </strong> {this.state.selectedUser.state == "" ? "N/A" : this.state.selectedUser.state}</IonLabel>
                      </IonItem>
                      <IonItem key="modal-created">
                        <IonLabel><strong>Account Created: </strong> {(new Date(this.state.selectedUser.created_at)).toDateString()}</IonLabel>
                      </IonItem>
                      <IonItem key="modal-update-date" style={{ marginBottom: "20px" }}>
                        <IonLabel><strong>Account Last Updated: </strong> {(new Date(this.state.selectedUser.updated_at)).toDateString()}</IonLabel>
                      </IonItem>
                    </IonList>
                  </IonCardContent>
                </IonCard >
              )
            }
            <IonButton onClick={() => this.setUserModalStatus(false)}>Close</IonButton>
          </IonModal >
        </IonContent >
      </IonPage >
    );
  }

};

export default UserInfo;
