
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import React from 'react';
import Chart from 'chart.js';

class ServerRamCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {


    }



    render = () => (
        <IonCard>
            <IonCardHeader class="ion-text-center" color="medium">
                <IonText>
                    <h1> Server RAM Useage </h1>
                </IonText>
            </IonCardHeader>
            <canvas id="myChart" width="400" height="400"></canvas>

        </IonCard >
    );
};

export default ServerRamCard;



