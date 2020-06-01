
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import React from 'react';
import Chart from 'chart.js';

class ServerUptimeCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render = () => (
        <IonCard>
            <IonCardHeader class="ion-text-center" color="medium">
                <h3>The server has been up for: </h3>
                <IonText olor="light">
                    <h1 style={{ fontSize: "50px" }}> {this.state.date.toLocaleTimeString()} </h1>
                </IonText>
            </IonCardHeader>
        </IonCard >
    );
};

export default ServerUptimeCard;



