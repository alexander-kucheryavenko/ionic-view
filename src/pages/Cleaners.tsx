import React, {useCallback, useEffect, useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButtons,
    IonMenuButton,
    IonItem,
    IonModal,
    IonButton,
    IonLabel, IonRow, IonCol, IonGrid
} from '@ionic/react';
import Menu from "../components/Menu";
import ApiService from "../api/base";
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

export const Cleaners: React.FC = () => {

    const [cleaners, setCleaners] = useState<object[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [id, setId] = useState<string>('');

    const showCleaner = async (e: any) => {
        setShowModal(true);
        let id = e.currentTarget.id;
        await setId(id);
        await getDataCleaner(id);
    };

    const getDataCleaner = useCallback(async (i) => {
        const {value} = await Storage.get({key: 'token'});
        await ApiService.post({
            resource: `orders/get`,
            params: {
                token: value,
                id: i,
            }
        });
    }, []);

    const createOrder = useCallback(async (item, event, service) => {
        const {value} = await Storage.get({key: 'token'});
        await ApiService.post({
            resource: `orders/create`,
            params: {
                token: value,
                order: {
                    name: service.name,
                    price: service.price,
                    cleaner: {
                        name: item.name,
                        id: item._id
                    }
                }
            }
        });
    }, []);

    const getData = useCallback(async () => {
        const {value} = await Storage.get({key: 'token'});
        const {data} = await ApiService.post({
            resource: `cleaners/getall`,
            params: {
                token: value
            }
        });
        await setCleaners(data);
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
                        <IonTitle>Cleaners</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {cleaners?.length ? cleaners.map((i: object | any) =>
                            <IonCard id={i._id} onClick={showCleaner}>
                                {i.gallery.map((image: string | undefined) =>
                                    <img src={image} alt='Not img'/>
                                )}
                                <IonCardHeader>
                                    <IonCardTitle>{i.name}</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    {i.description}
                                    {i.services.map((service: any | undefined) =>
                                        <IonItem>
                                            <IonLabel>{service.name}</IonLabel>
                                            <IonLabel>Cost {service.price}</IonLabel>
                                        </IonItem>
                                    )}
                                </IonCardContent>
                            </IonCard>
                        )
                        : null}
                    <IonModal isOpen={showModal}>
                        {cleaners.map((i: object | any) => {
                                if (id === i._id) {
                                    return (
                                        <IonCard>
                                            <IonCardHeader>
                                                <IonCardTitle>{i.name}</IonCardTitle>
                                            </IonCardHeader>
                                            <IonCardContent>
                                                {i.description}
                                                {i.services.map((service: any | undefined) =>
                                                    <IonItem>
                                                        <IonGrid>
                                                            <IonRow>
                                                                <IonCol>
                                                                    <IonLabel>{service.name}</IonLabel>
                                                                </IonCol>
                                                            </IonRow>
                                                            <IonRow>
                                                                <IonCol>
                                                                    <IonLabel>Cost {service.price}</IonLabel>
                                                                </IonCol>
                                                                <IonCol>
                                                                    <IonButton onClick={(e) => createOrder(i, e, service)}
                                                                               expand="block">
                                                                        Add order
                                                                    </IonButton>
                                                                </IonCol>
                                                            </IonRow>
                                                        </IonGrid>
                                                    </IonItem>)
                                                }
                                            </IonCardContent>
                                        </IonCard>
                                    )
                                } else {
                                    return null
                                }
                            }
                        )}
                        <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
                    </IonModal>
                </IonContent>
            </div>
        </>
    );
};

export default Cleaners;
