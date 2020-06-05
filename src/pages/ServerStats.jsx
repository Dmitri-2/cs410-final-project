import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardTitle, IonText } from '@ionic/react';
import React from 'react';
import './Page.css';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import axios from "axios";
import Chart from 'chart.js';


import ServerUptimeCard from "../components/ServerUptimeCard.jsx"


class ServerStats extends React.Component {

  constructor(props) {
    super(props);
    this.state = { latestCPUInfo: null, allCPUInfo: [], allCPUInfoLabels: [], ramData: {}, uptime: {} };
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
    this.cpuChart.data.labels = this.state.allCPUInfoLabels;
    this.cpuChart.data.datasets[0].data = this.state.allCPUInfo.map(info => info.min1);
    this.cpuChart.data.datasets[1].data = this.state.allCPUInfo.map(info => info.min5);
    this.cpuChart.data.datasets[2].data = this.state.allCPUInfo.map(info => info.min15);
    this.cpuChart.update();
  }

  updateRamChart() {
    this.ramChart.data.datasets[0].data = Object.values(this.state.ramData);
    this.ramChart.update();
  }

  drawChart() {
    var cpuCtx = document.getElementById('cpuLoadChart').getContext('2d');
    this.cpuChart = new Chart(cpuCtx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: '1-Min Avg',
          data: this.state.allCPUInfo.map(info => info.min1),
          backgroundColor: 'rgba(255, 100, 130, 0.3)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: '5-Min Avg',
          data: this.state.allCPUInfo.map(info => info.min5),
          backgroundColor: 'rgba(33, 59, 231, 0.3)',
          borderColor: 'rgba(33, 59, 231, 1)',
          borderWidth: 1
        },
        {
          label: '15-Min Avg',
          data: this.state.allCPUInfo.map(info => info.min15),
          backgroundColor: 'rgba(45, 194, 191, 0.3)',
          borderColor: 'rgba(45, 194, 191, 1)',
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

    var ramCtx = document.getElementById('ramChart').getContext('2d');
    this.ramChart = new Chart(ramCtx, {
      type: 'doughnut',
      data: {
        labels: ["Used", "Free", "Buffered"],
        datasets: [{
          label: "RAM Useage",
          data: [Object.values(this.state.ramData)],
          backgroundColor: [
            'rgba(250, 20, 23, 0.3)',
            'rgba(3, 200, 52, 0.3)',
            'rgba(230, 215, 75, 0.3)'
          ],
          borderColor: [
            'rgba(250, 20, 23, 1)',
            'rgba(3, 200, 52, 1)',
            'rgba(230, 215, 75, 1)'
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
      let time = new Date();
      this.setState({ latestCPUInfo: result.data }) //Gets min1, min5, min15
      this.setState({ allCPUInfo: [...this.state.allCPUInfo, result.data] })
      this.setState({ allCPUInfoLabels: [...this.cpuChart.data.labels, time.getMinutes() + ":" + time.getSeconds()] });
      if (this.state.allCPUInfo.length >= 50) {
        this.state.allCPUInfo.splice(0, 1);
        this.state.allCPUInfoLabels.splice(0, 1);
      }
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
                <IonTitle className="ion-text-center"> <h1>{this.state.latestCPUInfo ? (Number(this.state.latestCPUInfo.min1) * 100.0).toFixed(3) + "%" : "N/A"}</h1></IonTitle>
              </IonCardHeader>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle className="ion-text-center">5-Minute Load Average</IonCardTitle>
                <IonTitle className="ion-text-center"> <h1>{this.state.latestCPUInfo ? (Number(this.state.latestCPUInfo.min5) * 100.0).toFixed(3) + "%" : "N/A"}</h1></IonTitle>
              </IonCardHeader>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle className="ion-text-center">15-Minute Load Average</IonCardTitle>
                <IonTitle className="ion-text-center"> <h1>{this.state.latestCPUInfo ? (Number(this.state.latestCPUInfo.min15) * 100.0).toFixed(3) + "%" : "N/A"}</h1></IonTitle>
              </IonCardHeader>
            </IonCard>
          </IonRow>
          <IonRow>
            <IonCol sizeMd="6" size="12">
              <IonCard>
                <IonCardHeader class="ion-text-center" color="medium">
                  <IonText>
                    <h1> Server RAM Useage </h1>
                  </IonText>
                </IonCardHeader>
                <canvas id="ramChart" width="300" height="300"></canvas>
              </IonCard >
            </IonCol>
            <IonCol sizeMd="6" size="12">
              <IonCard>
                <IonCardHeader class="ion-text-center" color="medium">
                  <IonText>
                    <h1>  Live CPU Load </h1>
                  </IonText>
                </IonCardHeader>
                <canvas id="cpuLoadChart" width="300" height="300"></canvas>
              </IonCard >
            </IonCol>
          </IonRow>
        </IonContent>
      </IonPage>
    );
  };
}


export default ServerStats;
