import React, {useCallback, useEffect, useState} from 'react';
import Menu from "../components/Menu";
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonText} from "@ionic/react";
import ApiService from "../api/base";
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

const Home: React.FC = () => {

    const [user, setUser] = useState<string>();
    const [balance, setBalance] = useState<number>();


    const getData = useCallback(async () => {
        const {value} = await Storage.get({key: 'token'});
        const {data} = await ApiService.post({
            resource: `auth/verify`,
            params: {
                token: value
            }
        });
        await setUser(data.candidate.firstName);
        await setBalance(data.candidate.balance);
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <>
            <Menu/>
            <div className="ion-page" id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton autoHide={false}/>
                        </IonButtons>
                        <IonTitle>Home</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent class="ion-padding">
                    <IonText color="dark">
                        <h1>Welcome, {user}!</h1>
                        <h2>Your balance {balance}.</h2>
                    </IonText>
                </IonContent>
            </div>
        </>
    )
};

export default Home;
