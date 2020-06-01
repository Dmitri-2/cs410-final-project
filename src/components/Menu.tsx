import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { informationCircleOutline, statsChartOutline, archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, analyticsOutline, mailSharp, paperPlaneOutline, peopleOutline, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Server Overview',
    url: '/server/info',
    iosIcon: analyticsOutline,
    mdIcon: analyticsOutline
  },
  {
    title: 'User Statistics',
    url: '/users/stats',
    iosIcon: peopleOutline,
    mdIcon: peopleOutline
  },
  {
    title: 'Rink Statistics',
    url: '/rinks/stats',
    iosIcon: statsChartOutline,
    mdIcon: statsChartOutline
  },
  {
    title: 'About',
    url: '/about',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleOutline
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>MusicQ Monitoring Dashboard</IonListHeader>
          <IonNote>For moitoring user and server activity.</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        {/* <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
