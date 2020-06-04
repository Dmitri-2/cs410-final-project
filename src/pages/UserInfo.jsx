import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import './Page.css';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonText, IonModal, IonList } from '@ionic/react';
import axios from "axios";
import Chart from 'chart.js';

import SampleCard from "../components/SampleCard"


class UserInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { allUsers: [], userModalOpen: false, selectedUser: null };
  }

  componentDidMount() {
    this.getAllUsers();
    // this.getServerLoad();
    // this.timer5sec = setInterval(() => this.makeApiCalls(), 3000);
    // this.drawChart();
    // this.getUptime();
    var ctx = document.getElementById('userEmailChart').getContext('2d');
    this.emailChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["Verified", "Pending"],
        datasets: [{
          label: "User Email Verification Status",
          data: [1, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
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
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
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

  getAllUsers = async () => {

    await axios.get(this.props.apiRoot + `/api/users/all`,
      { headers: { Authorization: `Bearer ${this.props.authToken}` } }
    ).then(result => {
      console.log(result.data);
      this.setState({ allUsers: result.data }) //Gets all the users from the API
    })
    // this.updateCpuChart();
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

          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="ion-text-center"> <h2>All Application Users</h2></IonCardTitle>
            </IonCardHeader>

            <IonCardContent style={{ overflow: "scroll" }}>
              <IonRow className="ion-justify-content-center">
                <IonCol>
                  <table style={{ margin: "auto" }}>
                    <tr>
                      <th> <IonLabel color="primary"> Id </IonLabel> </th>
                      <th> <IonLabel color="primary"> Name </IonLabel> </th>
                      <th> <IonLabel color="primary"> Email </IonLabel> </th>
                      <th> <IonLabel color="primary"> Email Verified</IonLabel> </th>
                      <th> <IonLabel color="primary"> Type </IonLabel> </th>
                      <th> <IonLabel color="primary"> View </IonLabel> </th>
                    </tr>
                    <tbody>
                      {this.state.allUsers.map(user => (
                        <tr>
                          <td><IonLabel color="dark"> {user.id} </IonLabel> </td>
                          <td><IonLabel color="dark"> {user.name} </IonLabel> </td>
                          <td><IonLabel color="dark"> {user.email} </IonLabel> </td>
                          <td><IonLabel color="dark"> {user.email_verified_at == null ? "No" : "Yes"} </IonLabel> </td>
                          <td><IonLabel color="dark" className="ion-text-capitalize">  {user.type} </IonLabel> </td>
                          <td> <IonLabel color="dark" className="ion-text-capitalize">
                            <IonButton size="small" onClick={() => { this.setUserModalStatus(true); this.setState({ selectedUser: user }) }}>View</IonButton>
                          </IonLabel>
                          </td>
                        </tr>

                      ))}
                    </tbody>
                  </table>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
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
