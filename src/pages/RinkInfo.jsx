import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import axios from "axios";
import Chart from 'chart.js';

import SampleCard from "../components/SampleCard"

import React from 'react';
import { useParams } from 'react-router';
import './Page.css';

class RinkInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { allRinks: [] };
  }

  componentDidMount() {
    this.getAllRinks();
    this.drawChart();
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
    // this.updateCpuChart();
    // this.updateChartWithUserEmailVerifiedDataSet();
    // this.updateUserTypeChart();
  }

  drawChart() {
    var ctx = document.getElementById('rinkMembersChart').getContext('2d');
    this.membersChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.state.allRinks.map((rink) => rink.name),
        datasets: [{
          label: 'Members',
          data: this.state.allRinks.map((rink) => rink.members_count),
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
          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="ion-text-center"> <h2>All Rinks</h2></IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonRow>
                <IonCol>
                  <canvas id="rinkMembersChart" width="500" height="200"></canvas>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="ion-text-center"> <h2>All Rinks</h2></IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonRow style={{ borderBottom: "groove" }} >
                <IonCol size="2">
                  <IonLabel color="primary" style={{ fontSize: "20px" }}> Id </IonLabel>
                </IonCol>
                <IonCol size="2">
                  <IonLabel color="primary" style={{ fontSize: "20px" }}> Name </IonLabel>
                </IonCol>
                <IonCol size="2">
                  <IonLabel color="primary" style={{ fontSize: "20px" }}> City </IonLabel>
                </IonCol>
                <IonCol size="3">
                  <IonLabel color="primary" style={{ fontSize: "20px" }}> State </IonLabel>
                </IonCol>
                <IonCol size="3">
                  <IonLabel color="primary" style={{ fontSize: "20px" }}> Description </IonLabel>
                </IonCol>
                {/* <IonCol size="2">
                  <IonLabel color="primary" style={{ fontSize: "20px" }}> Type </IonLabel>
                </IonCol>
                <IonCol size="1">
                  <IonLabel color="primary" style={{ fontSize: "20px" }}> Type </IonLabel>
                </IonCol> */}
              </IonRow>
              {this.state.allRinks.map(rink => (
                <IonRow style={{ borderBottom: "1px solid black" }} key={rink.id}>
                  <IonCol size="2">
                    <IonLabel color="dark"> {rink.id} </IonLabel>
                  </IonCol>
                  <IonCol size="2">
                    <IonLabel color="dark"> {rink.name} </IonLabel>
                  </IonCol>
                  <IonCol size="2">
                    <IonLabel color="dark"> {rink.city} </IonLabel>
                  </IonCol>
                  <IonCol size="3">
                    <IonLabel color="dark"> {rink.state} </IonLabel>
                  </IonCol>
                  <IonCol size="3">
                    <IonLabel color="dark"> {rink.description} </IonLabel>
                  </IonCol>
                  {/* <IonCol size="2">
                    <IonLabel color="dark" className="ion-text-capitalize">  {user.type} </IonLabel>
                  </IonCol>
                  <IonCol size="1">
                    <IonLabel color="dark" className="ion-text-capitalize">
                      <IonButton size="small" onClick={() => { this.setUserModalStatus(true); this.setState({ selectedUser: user }) }}>View</IonButton>
                    </IonLabel>
                  </IonCol> */}
                </IonRow>
              ))}
            </IonCardContent>
          </IonCard>

        </IonContent>
      </IonPage>
    );
  }
};

export default RinkInfo;
