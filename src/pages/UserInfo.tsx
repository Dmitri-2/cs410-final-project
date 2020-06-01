import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import { IonGrid, IonRow, IonCol } from '@ionic/react';

import SampleCard from "../components/SampleCard"

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

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
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SampleCard />
        <IonRow>
          <IonCol><SampleCard /></IonCol>
          <IonCol><SampleCard /></IonCol>
        </IonRow>
        <IonRow>
          <IonCol><SampleCard /></IonCol>
          <IonCol><SampleCard /></IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Page;
