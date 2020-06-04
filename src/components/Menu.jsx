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
  IonTitle
} from '@ionic/react';

import React from 'react';
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { informationCircleOutline, statsChartOutline, musicalNotesOutline, archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, analyticsOutline, mailSharp, paperPlaneOutline, peopleOutline, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';


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

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

  render = () => {
    // const location = useLocation();
    const location = this.props.location;

    return (
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>MusicQ Monitoring Dashboard</IonListHeader>
            <IonNote>For moitoring user and server activity.</IonNote>
            <IonItemDivider />
            {/* <IonListHeader>Labels</IonListHeader> */}
            {/* <IonTitle className="ion-margin-top">Welcome {this.props.user.name}</IonTitle> */}
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
      </IonMenu >
    );
  }

};

export default Menu;
