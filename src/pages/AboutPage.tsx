import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import './Page.css';
import { IonRow, IonCol } from '@ionic/react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';

// Functional Component for the About Page
// Is pretty much only a static display of data
// Has no funcitons and or data associated with it 
//
const AboutPage: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle class="ion-text-center" > About This Dashboard </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>About this website</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            This website is intended to be an administrator monitoring dashboard for MusicQ (<a href="http://www.musicq.io">www.musicq.io</a>).
            Built by Dmitri Murphy as the final project for CS410. It features multiple views of different information, including statistics on how the server
            is functioning, users who have signed up for the website, and rinks that have been created on the site.
            </IonCardContent>
        </IonCard>
        <IonRow>
          <IonCol size="12" sizeSm="6">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Technologies Used</IonCardTitle>
                <IonCardSubtitle> Lot's of them </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className="ion-color-dark">
                <p>
                  This website uses a array of various technologies on both the front-end and the backend.
               </p>
                <h2 style={{ marginTop: "10px" }}>Front-End Technologies:</h2>
                <ol>
                  <li>React</li>
                  <li>Ionic Framework</li>
                  <li>Chart.js</li>
                  <li>Axios</li>
                </ol>
                <h2>Back-End Technologies:</h2>
                <ol>
                  <li>Laravel</li>
                  <li>Laravel Sanctum (for API auth)</li>
                  <li>Postgres</li>
                </ol>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeSm="6">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Deployment + Repository</IonCardTitle>
                <IonCardSubtitle>AWS / Github </IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                <p>
                  The website is deployed as a sub-domain for MusicQ, which is running on AWS.
               </p>
                <h2 style={{ margin: "10px 0" }}>Deployment</h2>
                <p>
                  The AWS service that this app is running on is <a href="https://aws.amazon.com/lightsail/">AWS Lightsail</a>,
                  which I have found to be one of the simpler options that provides a lot of control over deployement.
               </p>
                <h2 style={{ margin: "10px 0" }}>Repository</h2>
                <p>
                  The code for this front-end dashboard is available on Github
                  (<a href="https://github.com/Dmitri-2/cs410-final-project">CS410 Final Project</a>).
                  The code for the back-end API, I have in a private repository on Github, since this might be a project that I develop further on my own.
               </p>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default AboutPage;
