
import { IonCard, IonCardHeader, IonText } from '@ionic/react';
import React from 'react';
import Timer from 'react-compound-timer';

class ServerUptimeCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        //Create a timer that goes off every second 
        this.timerID = setInterval(
            () => this.updateTimer(),
            1000
        );
    }

    componentWillUnmount() {
        // Remove the timer when the component unmounts 
        clearInterval(this.timerID);
    }

    // Every second - update the display 
    updateTimer() {
        this.setState({
            date: new Date()
        });
    }

    render = () => {

        // Figure out the days, hours, minutes and seconds of server uptime 
        let isObject = this.props.uptime.days != undefined;
        let days = isObject ? parseInt(this.props.uptime.days) : 0;
        let hours = isObject ? parseInt(this.props.uptime.hours) : 0;
        let minutes = isObject ? parseInt(this.props.uptime.minutes) : 0;
        let seconds = isObject ? parseInt(this.props.uptime.seconds) : 0;

        // Convert all of the time into milliseconds for the react-compound-timer library 
        let time = (days * 86400000) + (hours * 3600000) + (minutes * 60000) + (seconds * 1000);

        return (
            <IonCard>
                <IonCardHeader class="ion-text-center" color="medium">
                    <h3>The server has been up for: </h3>

                    {isObject ? (
                        <IonText olor="light">
                            <h1 style={{ fontSize: "50px" }}>
                                <Timer initialTime={time}>
                                    <Timer.Days /> days <Timer.Hours /> hours <Timer.Minutes /> minutes <Timer.Seconds /> seconds
                                </Timer>
                            </h1>
                        </IonText>
                    ) : (
                            <h2> Loading... </h2>
                        )
                    }
                </IonCardHeader>
            </IonCard >
        );
    }
};

export default ServerUptimeCard;



