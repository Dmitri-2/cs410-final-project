import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import { IonGrid, IonRow, IonCol } from '@ionic/react';

import SampleCard from "../components/SampleCard"
import ServerRamCard from "../components/ServerRamCard.jsx"
import ServerUptimeCard from "../components/ServerUptimeCard.jsx"

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

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
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ServerUptimeCard />
        <IonRow>
          <IonCol><ServerRamCard /></IonCol>
          <IonCol><SampleCard /></IonCol>
        </IonRow>
        <SampleCard />
        {/* <canvas id="myChart" width="400" height="400"></canvas> */}

        {/* <ExploreContainer name={name} /> */}
      </IonContent>
    </IonPage>
  );
};

export default Page;
