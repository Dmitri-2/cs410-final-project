import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonLabel } from '@ionic/react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import axios from "axios";
import Chart from 'chart.js';

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
            'rgba(33, 59, 231, 0.3)',
            'rgba(250, 131, 20, 0.3)',
            'rgba(29, 156, 22, 0.3)'
          ],
          borderColor: [
            'rgba(33, 59, 231, 1)',
            'rgba(250, 131, 20, 1)',
            'rgba(29, 156, 22, 1)'
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
          <IonRow>
            <IonCol sizeMd="6" sizeLg="3" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2>Total Music</h2></IonCardTitle>
                  <IonCardSubtitle className="ion-text-center"> Total Number of Music Uploaded </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonTitle className="ion-text-center">
                    <h1 className="font-50"> {this.state.allMusic.length} </h1>
                  </IonTitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeMd="6" sizeLg="3" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2>Short Program  </h2></IonCardTitle>
                  <IonCardSubtitle className="ion-text-center"> Short Program Music </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonTitle className="ion-text-center">
                    <h1 className="font-50"> {this.state.allMusic.filter((music) => music.type === "short").length} </h1>
                  </IonTitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeMd="6" sizeLg="3" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2>Freeskate Music </h2></IonCardTitle>
                  <IonCardSubtitle className="ion-text-center"> Long Program Music </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonTitle className="ion-text-center">
                    <h1 className="font-50"> {this.state.allMusic.filter((music) => music.type === "long").length} </h1>
                  </IonTitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeMd="6" sizeLg="3" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center"> <h2> Dance Music </h2></IonCardTitle>
                  <IonCardSubtitle className="ion-text-center"> Dance Program Music </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonTitle className="ion-text-center">
                    <h1 className="font-50"> {this.state.allMusic.filter((music) => music.type === "dance").length} </h1>
                  </IonTitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
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
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12">
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
                        <th> <IonLabel color="primary"> Date Updated</IonLabel> </th>
                        <th> <IonLabel color="primary"> Date Uploaded</IonLabel> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.allMusic.map(music => (
                        <tr key={music.id}>
                          <td><IonLabel color="dark"> {music.id} </IonLabel> </td>
                          <td><IonLabel color="dark"> {music.title} </IonLabel> </td>
                          <td><IonLabel color="dark" className="ion-text-capitalize"> {music.type} </IonLabel> </td>
                          <td><IonLabel color="dark"> {music.user != null ? music.user.name : "N/A"} </IonLabel> </td>
                          <td><IonLabel color="dark">  {(new Date(music.updated_at)).toDateString()} </IonLabel> </td>
                          <td><IonLabel color="dark">  {(new Date(music.created_at)).toDateString()} </IonLabel> </td>
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
