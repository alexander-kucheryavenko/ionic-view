import React, {useState, useCallback, useEffect} from 'react';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonButtons,
    IonMenuButton,
    IonGrid,
    IonRow,
    IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonModal, IonButton
} from '@ionic/react';
import './style.css';
import ApiService from "../api/base";
import Menu from "../components/Menu";
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

export const Orders: React.FC = () => {

    const [orders, setOrders] = useState<object[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [order, setOrder] = useState<any>();

    const getData = useCallback(async () => {
        const {value} = await Storage.get({key: 'token'});
        const {data} = await ApiService.post({
            resource: `orders/get`,
            params: {
                token: value
            }
        });
        await setOrders(data);
    }, []);

    const removeOrder = useCallback(async (order) => {
        const {value} = await Storage.get({key: 'token'});
        await ApiService.post({
            resource: `orders/delete`,
            params: {
                token: value,
                id: order._id
            }
        });
        getData()
    }, [getData]);

    useEffect(() => {
        getData();
    }, [getData]);

    const showOrder = async (i: any) => {
        setShowModal(true);
        setOrder(i)
    };

    const closeOrder = () => {
        setShowModal(false);
    };

    const deleteOrder = (order: any) => {
        setShowModal(false);
        removeOrder(order);
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
                        <IonTitle>My orders</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                        {orders?.length ? orders.map((i: object | any) =>
                                <IonCard id={i._id} onClick={() => showOrder(i)}>
                                    <IonCardHeader>
                                        <IonCardTitle>Cleaner: {i.cleaner.name}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonItem>Name: {i.name}</IonItem>
                                        <IonItem>Price: {i.price}</IonItem>
                                        <IonItem>Created by: {i.createdBy}</IonItem>
                                        <IonItem>Status: {i.status}</IonItem>
                                    </IonCardContent>
                                </IonCard>
                            )
                            : null}
                        <IonModal isOpen={showModal}>
                            {order ? <div>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>Order info</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonItem>
                                            Cleaner: {order.cleaner.name}
                                        </IonItem>
                                        <IonItem>
                                            Creation date: {order.createdDate}
                                        </IonItem>
                                        <IonItem>
                                            Created by: {order.createdBy}
                                        </IonItem>
                                        <IonItem>
                                            Order: {order.name}
                                        </IonItem>
                                        <IonItem>
                                            Price: {order.price}
                                        </IonItem>
                                        <IonItem>
                                            Status: {order.status}
                                        </IonItem>
                                        <IonItem>
                                            Message: {order.message ? order.message : 'no message'}
                                        </IonItem>
                                    </IonCardContent>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol>
                                                <IonButton onClick={() => deleteOrder(order)}>Delete order</IonButton>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol>
                                                <IonButton onClick={closeOrder}>Close</IonButton>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonCard>
                            </div> : null}
                        </IonModal>
                </IonContent>
            </div>
        </>
    );
};

export default Orders;
