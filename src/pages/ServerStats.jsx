import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonText } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import axios from "axios";
import Chart from 'chart.js';


import SampleCard from "../components/SampleCard"
import ServerRamCard from "../components/ServerRamCard.jsx"
import ServerUptimeCard from "../components/ServerUptimeCard.jsx"


class ServerStats extends React.Component {

  constructor(props) {
    super(props);
    this.state = { latestCPUInfo: null, allCPUInfo: [], ramData: {}, uptime: {} };
  }

  componentDidMount() {
    this.makeApiCalls();
    this.getServerLoad();
    this.timer5sec = setInterval(() => this.makeApiCalls(), 3000);
    this.drawChart();
    this.getUptime();
  }

  componentWillUnmount() {
    clearInterval(this.timer5sec);
  }

  makeApiCalls() {
    this.getServerLoad();
    this.getRamLoad();
  }

  updateCpuChart() {
    console.log(this.cpuChart.data.datasets[0].data);
    this.cpuChart.data.labels = this.state.allCPUInfo.map((info, index) => index * 3);
    this.cpuChart.data.datasets[0].data = this.state.allCPUInfo.map(info => info.min1);
    this.cpuChart.update();
    // console.log(this.state.allCPUInfo.map(info => info.min1));
  }

  updateRamChart() {
    this.ramChart.data.datasets[0].data = Object.values(this.state.ramData);
    this.ramChart.update();
  }

  drawChart() {
    var ctx = document.getElementById('cpuLoadChart').getContext('2d');
    this.cpuChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.state.allCPUInfo.map((info, index) => (index * 3) + " seconds"),
        datasets: [{
          label: 'CPU Load',
          data: this.state.allCPUInfo.map(info => info.min1),
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



    var ctx = document.getElementById('ramChart').getContext('2d');
    this.ramChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["Used", "Free", "Buffer"],
        datasets: [{
          label: "RAM Useage",
          data: [Object.values(this.state.ramData)],
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

  getServerLoad = async () => {

    await axios.get(this.props.apiRoot + `/api/stats/load`,
      { headers: { Authorization: `Bearer ${this.props.authToken}` } }
    ).then(result => {
      this.setState({ latestCPUInfo: result.data }) //Gets min1, min5, min15
      this.setState({ allCPUInfo: [...this.state.allCPUInfo, result.data] })
    })
    this.updateCpuChart();
  }

  getRamLoad = async () => {
    await axios.get(this.props.apiRoot + `/api/stats/memory`,
      { headers: { Authorization: `Bearer ${this.props.authToken}` } }
    ).then(result => {
      this.setState({ ramData: result.data }) //Gets free, used, and buffer
    })
    this.updateRamChart();
  }


  getUptime = async () => {
    await axios.get(this.props.apiRoot + `/api/stats/uptime`,
      { headers: { Authorization: `Bearer ${this.props.authToken}` } }
    ).then(result => {
      this.setState({ uptime: result.data }) //Gets free, used, and buffer
    })
  }

  render = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle class="ion-text-center">Server Overview</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{this.props.name}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ServerUptimeCard uptime={this.state.uptime} />
          <IonRow className="ion-justify-content-center">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle className="ion-text-center">1-Minute Load Average</IonCardTitle>
                <IonTitle className="ion-text-center"> <h1>{this.state.latestCPUInfo ? Number(this.state.latestCPUInfo.min1).toFixed(3) + "%" : "N/A"}</h1></IonTitle>
              </IonCardHeader>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle className="ion-text-center">5-Minute Load Average</IonCardTitle>
                <IonTitle className="ion-text-center"> <h1>{this.state.latestCPUInfo ? Number(this.state.latestCPUInfo.min5).toFixed(3) + "%" : "N/A"}</h1></IonTitle>
              </IonCardHeader>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle className="ion-text-center">15-Minute Load Average</IonCardTitle>
                <IonTitle className="ion-text-center"> <h1>{this.state.latestCPUInfo ? Number(this.state.latestCPUInfo.min15).toFixed(3) + "%" : "N/A"}</h1></IonTitle>
              </IonCardHeader>
            </IonCard>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonCard>
                <IonCardHeader class="ion-text-center" color="medium">
                  <IonText>
                    <h1> Server RAM Useage </h1>
                  </IonText>
                </IonCardHeader>
                <canvas id="ramChart" width="400" height="400"></canvas>
              </IonCard >
            </IonCol>
            <IonCol size="6">
              <IonCard>
                <IonCardHeader class="ion-text-center" color="medium">
                  <IonText>
                    <h1> Server RAM Useage </h1>
                  </IonText>
                </IonCardHeader>
                <canvas id="cpuLoadChart" width="400" height="400"></canvas>

              </IonCard >
            </IonCol>
          </IonRow>
        </IonContent>
      </IonPage>
    );
  };
}


export default ServerStats;
