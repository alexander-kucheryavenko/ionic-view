import React, {useState, useCallback, useEffect} from 'react';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonButtons,
    IonMenuButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonModal
} from '@ionic/react';
import './style.css';
import ApiService from "../api/base";
import Menu from "../components/Menu";
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

export const Users: React.FC = () => {

    const [users, setUsers] = useState<object[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [user, setUser] = useState<object | any>();

    const getData = useCallback(async () => {
        const {value} = await Storage.get({key: 'token'});
        const {data} = await ApiService.post({
            resource: `auth/getall`,
            params: {
                token: value
            }
        });
        await setUsers(data);
    }, []);

    const updateUser = useCallback(async (user) => {
        const {value} = await Storage.get({key: 'token'});
        await ApiService.post({
            resource: `auth/update`,
            params: {
                token: value,
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    wantBeAdmin: false,
                    role: 1,
                }
            }
        });
        getData();
    }, [getData]);

    useEffect(() => {
        getData();
    }, [getData]);

    const openUser = (i: any) => {
        setUser(i);
        setShowModal(true);
    };

    const doAdmin = (user: any) => {
        setShowModal(false);
        updateUser(user);
    };

    const closeService = () => {
        setShowModal(false);
    };

    return (
        <>
            <Menu/>
            <div className="ion-page" id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton autoHide={false}/>
                        </IonButtons>
                        <IonTitle>Users</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="6">E-mail</IonCol>
                                    <IonCol>Role</IonCol>
                                    <IonCol>Want be Admin</IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        {users?.length ? users.map((i: object | any) =>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow className='ion-align-items-center' onClick={() => openUser(i)}>
                                            <IonCol size="6">{i.email}</IonCol>
                                            <IonCol>{i.role ? 'Admin' : 'User'}</IonCol>
                                            <IonCol>{i.wantBeAdmin ? 'Yes' : 'No'}</IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                            )
                            : null}
                    </IonList>
                    <IonModal isOpen={showModal}>
                        {user ? <div>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>User info</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonItem>
                                        Name: {user.firstName} {user.lastName}
                                    </IonItem>
                                    <IonItem>
                                        E-mail: {user.email}
                                    </IonItem>
                                    <IonItem>
                                        Role: {user.role ? 'Admin' : 'User'}
                                    </IonItem>
                                    <IonItem>
                                        Want be admin: {user.wantBeAdmin ? 'Yes' : 'No'}
                                    </IonItem>
                                </IonCardContent>
                                <IonItem>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol>
                                                <IonButton onClick={() => doAdmin(user)}>Make a user an admin</IonButton>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol>
                                                <IonButton onClick={closeService}>Close</IonButton>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                            </IonCard>
                        </div> : null}
                    </IonModal>
                </IonContent>
            </div>
        </>
    );
};

export default Users;
