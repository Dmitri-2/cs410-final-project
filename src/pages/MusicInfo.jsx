import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import axios from "axios";
import Chart from 'chart.js';

import SampleCard from "../components/SampleCard"

import React from 'react';
import { useParams } from 'react-router';
import './Page.css';

class MusicInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { allMusic: [] };
  }

  componentDidMount() {
    this.getAllRinks();
    this.drawChart();
  }

  getAllRinks = async () => {

    await axios.get(this.props.apiRoot + `/api/music/all`,
      { headers: { Authorization: `Bearer ${this.props.authToken}` } }
    ).then(result => {
      console.log(result.data);
      this.setState({ allMusic: result.data }) //Gets all the users from the API
    })
    // this.membersChart.data.labels = this.state.allRinks.map((rink) => rink.name);
    this.musicChart.data.datasets[0].data = [this.state.allMusic.filter((music) => music.type === "long").length,
    this.state.allMusic.filter((music) => music.type === "short").length,
    this.state.allMusic.filter((music) => music.type === "dance").length];
    this.musicChart.update();
  }

  drawChart() {
    var ctx = document.getElementById('musicChart').getContext('2d');
    this.musicChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ["Long", "Short", "Dance"],
        datasets: [{
          label: 'Music Type',
          data: [this.state.allMusic.filter((music) => music.type === "long").length,
          this.state.allMusic.filter((music) => music.type === "short").length,
          this.state.allMusic.filter((music) => music.type === "dance").length],
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
              <IonCardTitle className="ion-text-center"> <h2>Music Types</h2></IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonRow>
                <IonCol>
                  <canvas id="musicChart" width="500" height="200"></canvas>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeMd="8" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2>All Music Stored</h2></IonCardTitle>
                </IonCardHeader>

                <IonCardContent style={{ overflow: "scroll" }}>

                  <table style={{ margin: "auto" }}>
                    <thead>
                      <tr>
                        <th> <IonLabel color="primary"> Id </IonLabel> </th>
                        <th> <IonLabel color="primary"> Title </IonLabel> </th>
                        <th> <IonLabel color="primary"> Type </IonLabel> </th>
                        <th> <IonLabel color="primary"> Owner</IonLabel> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.allMusic.map(music => (
                        <tr key={music.id}>
                          <td><IonLabel color="dark"> {music.id} </IonLabel> </td>
                          <td><IonLabel color="dark"> {music.title} </IonLabel> </td>
                          <td><IonLabel color="dark" className="ion-text-capitalize"> {music.type} </IonLabel> </td>
                          <td><IonLabel color="dark"> {music.user != null ? music.user.name : "N/A"} </IonLabel> </td>
                          {/* <td><IonLabel color="dark"> {user.email_verified_at == null ? "No" : "Yes"} </IonLabel> </td>
                          <td><IonLabel color="dark" className="ion-text-capitalize">  {user.type} </IonLabel> </td>
                          <td> <IonLabel color="dark" className="ion-text-capitalize">
                            <IonButton size="small" onClick={() => { this.setUserModalStatus(true); this.setState({ selectedUser: user }) }}>View</IonButton>
                          </IonLabel>
                          </td> */}
                        </tr>

                      ))}
                    </tbody>
                  </table>

                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonPage>
    );
  }
};

export default MusicInfo;
