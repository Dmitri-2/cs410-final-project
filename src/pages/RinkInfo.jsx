import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonLoading } from '@ionic/react';
import { IonGrid, IonRow, IonCol, IonModal, IonList } from '@ionic/react';
import axios from "axios";
import Chart from 'chart.js';

import SampleCard from "../components/SampleCard"

import React from 'react';
import { useParams } from 'react-router';
import './Page.css';

class RinkInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { allRinks: [], selectedRink: null, selectedRinkDetail: null, rinkModalOpen: false, rinkAdminModalOpen: false };
  }

  componentDidMount() {
    this.getAllRinks();
    this.drawCharts();
  }

  setRinkModalStatus(state) {
    this.setState({ rinkModalOpen: state });
  }

  setRinkAdminModalStatus(state) {
    if (state == true) {
      //If modal is being opened - get the data 
      this.getSelectedRinkAdmins();
    }
    else {
      //If the modal is being closed - clear the variable
      this.setState({ selectedRinkDetail: null })
    }
    this.setState({ rinkAdminModalOpen: state });
  }

  getAllRinks = async () => {

    await axios.get(this.props.apiRoot + `/api/rinks/all`,
      { headers: { Authorization: `Bearer ${this.props.authToken}` } }
    ).then(result => {
      console.log(result.data);
      this.setState({ allRinks: result.data }) //Gets all the users from the API
    })
    this.membersChart.data.labels = this.state.allRinks.map((rink) => rink.name);
    this.membersChart.data.datasets[0].data = this.state.allRinks.map((rink) => rink.members_count);
    this.membersChart.update();

    this.rinkMusicChart.data.labels = this.state.allRinks.map((rink) => rink.name);
    this.rinkMusicChart.data.datasets[0].data = this.state.allRinks.map((rink) => rink.queued_music.length);
    this.rinkMusicChart.update();
  }

  getSelectedRinkAdmins = async () => {
    if (this.state.selectedRink == null) return;
    await axios.get(this.props.apiRoot + `/api/rinks/` + this.state.selectedRink.id + `/detail`,
      { headers: { Authorization: `Bearer ${this.props.authToken}` } }
    ).then(result => {
      console.log(result.data);
      this.setState({ selectedRinkDetail: result.data }) //Gets all the users from the API
    })
  }

  drawCharts() {
    var ctx = document.getElementById('rinkMembersChart').getContext('2d');
    this.membersChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.state.allRinks.map((rink) => rink.name),
        datasets: [{
          label: 'Members',
          data: this.state.allRinks.map((rink) => rink.members_count),
          backgroundColor: 'rgba(33, 59, 231, 0.3)',
          borderColor: 'rgba(33, 59, 231, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    var ctx = document.getElementById('rinkMusicChart').getContext('2d');
    this.rinkMusicChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.state.allRinks.map((rink) => rink.name),
        datasets: [{
          label: 'Music',
          data: this.state.allRinks.map((rink) => rink.members_count),
          backgroundColor: "rgba(45, 194, 191, 0.3)",
          borderColor: "rgba(45, 194, 191, 1)",
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  render = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle class="ion-text-center" >Rink Information and Statistics</IonTitle>
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
                  <IonCardTitle className="ion-text-center"> <h2>Total Rinks</h2></IonCardTitle>
                  <IonCardSubtitle className="ion-text-center"> Total Number of Rinks Registered </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonTitle className="ion-text-center">
                    <h1 className="font-50"> {this.state.allRinks.length} </h1>
                  </IonTitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeMd="6" sizeLg="3" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2>Active Rinks </h2></IonCardTitle>
                  <IonCardSubtitle className="ion-text-center"> Rinks With More Than 1 Member</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonTitle className="ion-text-center">
                    <h1 className="font-50"> {this.state.allRinks.map(rink => rink.members_count > 1 ? 1 : 0).reduce((r, v) => r + v, 0)} </h1>
                  </IonTitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeMd="6" sizeLg="3" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2>Queued Music </h2></IonCardTitle>
                  <IonCardSubtitle className="ion-text-center"> Total Amount of Music Queued</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonTitle className="ion-text-center">
                    <h1 className="font-50"> {this.state.allRinks.map(rink => rink.queued_music.length).reduce((r, v) => r + v, 0)} </h1>
                  </IonTitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeMd="6" sizeLg="3" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2> Total Coaches </h2></IonCardTitle>
                  <IonCardSubtitle className="ion-text-center"> Total Coaches Across All Rinks </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonTitle className="ion-text-center">
                    <h1 className="font-50"> {this.state.allRinks.map(rink => rink.members.filter(member => member.is_coach).length).reduce((r, v) => r + v, 0)} </h1>
                  </IonTitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol sizeMd="6" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2>All Rinks</h2></IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <canvas id="rinkMembersChart" width="500" height="200"></canvas>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeMd="6" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2>Queued Music Per Rink </h2></IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <canvas id="rinkMusicChart" width="500" height="200"></canvas>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="ion-text-center"> <h2>All Ice Rinks</h2></IonCardTitle>
            </IonCardHeader>
            <IonCardContent style={{ overflow: "scroll" }}>
              <table>
                <thead>
                  <tr>
                    <th> <IonLabel color="primary"> Id </IonLabel> </th>
                    <th> <IonLabel color="primary"> Name </IonLabel> </th>
                    <th> <IonLabel color="primary"> City </IonLabel> </th>
                    <th> <IonLabel color="primary"> State </IonLabel> </th>
                    <th> <IonLabel color="primary"> Description </IonLabel> </th>
                    <th> <IonLabel color="primary"> Action </IonLabel> </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.allRinks.map(rink => (
                    <tr key={rink.id}>
                      <td><IonLabel color="dark"> {rink.id} </IonLabel> </td>
                      <td><IonLabel color="dark"> {rink.name} </IonLabel> </td>
                      <td><IonLabel color="dark"> {rink.city} </IonLabel> </td>
                      <td><IonLabel color="dark"> {rink.state} </IonLabel> </td>
                      <td><IonLabel color="dark"> {rink.description} </IonLabel> </td>
                      <td>
                        <IonLabel color="dark" className="ion-text-capitalize">
                          <IonButton size="small" onClick={() => { this.setRinkModalStatus(true); this.setState({ selectedRink: rink }) }}>View</IonButton>
                        </IonLabel>
                        <IonLabel color="dark" className="ion-text-capitalize">
                          <IonButton size="small" color="secondary" onClick={() => { this.setState({ selectedRink: rink }, () => this.setRinkAdminModalStatus(true)); }}>Manage Admins</IonButton>
                        </IonLabel>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </IonCardContent>
          </IonCard>


          <IonModal isOpen={this.state.rinkModalOpen} cssClass='my-custom-class'>
            {this.state.selectedRink == null ? (
              <h2>
                Oops! Please select a rink for this modal!
              </h2>
            ) : (
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-center"> <h2> {this.state.selectedRink.name} </h2></IonCardTitle>
                    <IonCardSubtitle className="ion-text-center">Rink Detail View </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonList className="ion-margin-bottom" key={this.state.selectedRink.id}>
                      <IonItem key="modal-name">
                        <IonLabel> <strong> Name: </strong>{this.state.selectedRink.name}</IonLabel>
                      </IonItem>
                      <IonItem key="modal-city">
                        <IonLabel><strong>City: </strong> {this.state.selectedRink.city}</IonLabel>
                      </IonItem>
                      <IonItem key="modal-state">
                        <IonLabel><strong>State:</strong> {this.state.selectedRink.state}</IonLabel>
                      </IonItem>
                      <IonItem key="modal-country">
                        <IonLabel><strong>Country:</strong> {this.state.selectedRink.country}</IonLabel>
                      </IonItem>
                      <IonItem key="modal-description">
                        <IonLabel><strong>Description:</strong> {this.state.selectedRink.description}</IonLabel>
                      </IonItem>
                      <IonItem key="modal-queue">
                        <IonLabel><strong>Music in Queue:</strong> {this.state.selectedRink.queued_music.length}</IonLabel>
                      </IonItem>
                      <IonItem key="modal-members">
                        <IonLabel><strong>Rink Members:</strong> {this.state.selectedRink.members_count}</IonLabel>
                      </IonItem>
                      <IonItem key="modal-created">
                        <IonLabel><strong>Created At: </strong> {(new Date(this.state.selectedRink.created_at)).toDateString()}</IonLabel>
                      </IonItem>
                      <IonItem key="modal-update-date" style={{ marginBottom: "20px" }}>
                        <IonLabel><strong>Last Updated: </strong> {(new Date(this.state.selectedRink.updated_at)).toDateString()}</IonLabel>
                      </IonItem>
                    </IonList>
                  </IonCardContent>
                </IonCard >
              )
            }
            <IonButton onClick={() => this.setRinkModalStatus(false)}>Close</IonButton>
          </IonModal >

          {/*The Admin Managing Modal */}
          <IonModal isOpen={this.state.rinkAdminModalOpen} cssClass='my-custom-class'>
            {this.state.selectedRinkDetail == null ? (
              <div>
                <IonLoading
                  cssClass='my-custom-class'
                  message={'Loading...'}
                />
              </div>
            ) : (
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-center"> <h2> {this.state.selectedRink.name} </h2></IonCardTitle>
                    <IonCardSubtitle className="ion-text-center">Manage Administrators</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonRow>
                      <IonCol>
                        {(this.state.selectedRinkDetail.members.filter(member => member.user != null && member.is_admin).length != 0) ? (
                          <table>
                            <thead>
                              <tr>
                                <th> <IonLabel color="primary"> Admin Name </IonLabel> </th>
                                <th> <IonLabel color="primary"> Action </IonLabel> </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.selectedRinkDetail.members.filter(member => member.user != null && member.is_admin).map(member => (
                                <tr key={member.id}>
                                  <td><IonLabel color="dark"> {member.user.name} </IonLabel> </td>
                                  <td> <IonButton size="small" color="danger" onClick={() => { }}>Remove</IonButton></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                            <div>
                              <h2>No admins for this rink!</h2>
                            </div>
                          )
                        }
                      </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                      <IonCol size="3">
                        <IonLabel>
                          <IonButton color="success"> Add Admin </IonButton>
                        </IonLabel>
                      </IonCol>
                    </IonRow>
                  </IonCardContent>
                </IonCard >
              )
            }
            <IonButton onClick={() => this.setRinkAdminModalStatus(false)}>Close</IonButton>
          </IonModal >

        </IonContent>
      </IonPage>
    );
  }
};

export default RinkInfo;
