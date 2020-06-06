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
  IonItemDivider,
} from '@ionic/react';

import React from 'react';
import {
  informationCircleOutline, statsChartOutline, musicalNotesOutline,
  analyticsOutline, peopleOutline
} from 'ionicons/icons';
import './Menu.css';

// List of all the pages in the application 
const appPages = [
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
    title: 'Music Statistics',
    url: '/music/stats',
    iosIcon: musicalNotesOutline,
    mdIcon: musicalNotesOutline
  },
  {
    title: 'About',
    url: '/about',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleOutline
  }
];

class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

  render = () => {
    const location = this.props.location;

    return (
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>MusicQ Monitoring Dashboard</IonListHeader>
            <IonNote>For moitoring user and server activity.</IonNote>
            <IonItemDivider />
            <h3 className="ion-margin-top" style={{ marginLeft: "10px" }}>Welcome {this.props.user.name}</h3>
            <IonNote>{this.props.user.email}</IonNote>
            <IonItemDivider className="ion-margin-bottom" />
            {appPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location === appPage.url ? 'selected' : ''} routerLink={appPage.url} onClick={() => this.props.setLocation(appPage.url)} routerDirection="none" lines="none" detail={false}>
                    <IonIcon slot="start" icon={appPage.iosIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
          </IonList>
        </IonContent>
      </IonMenu >
    );
  }

};

export default Menu;
