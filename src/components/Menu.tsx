import React, {useCallback, useState, useEffect} from 'react';
import {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
} from '@ionic/react';
import ApiService from "../api/base";
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

export const Menu: React.FC = () => {

    const [role, setRole] = useState<number>();

    const getData = useCallback(async () => {
        const {value} = await Storage.get({key: 'token'});
        const {data} = await ApiService.post({
            resource: `auth/verify`,
            params: {
                token: value
            }
        });
        await setRole(data.candidate.role);
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const logOut = async () => {
        await Storage.remove({key: 'token'});
    };

    return (
        <>
            <IonMenu side="start" content-id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem href="/home">
                            <IonLabel>Home</IonLabel>
                        </IonItem>
                        {role === 1 ? (
                                <div>
                                    <IonItem href="/users">
                                        <IonLabel>Users</IonLabel>
                                    </IonItem>
                                    <IonItem href="/create_cleaners">
                                        <IonLabel>Create cleaners</IonLabel>
                                    </IonItem>
                                    <IonItem href="/all_orders">
                                        <IonLabel>All orders</IonLabel>
                                    </IonItem>
                                    <IonItem href="/edit-cleaners">
                                        <IonLabel>Edit cleaners</IonLabel>
                                    </IonItem>
                                </div>
                            )
                            :
                            null
                        }
                        <IonItem href="/cleaners">
                            <IonLabel>Cleaners</IonLabel>
                        </IonItem>
                        <IonItem href="/orders">
                            <IonLabel>My orders</IonLabel>
                        </IonItem>
                        <IonItem onClick={logOut} href="/login">
                            <IonLabel>Log out</IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonMenu>
        </>
    )
};

export default Menu;
