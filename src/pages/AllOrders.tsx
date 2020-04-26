import React, {useState, useCallback, useEffect} from 'react';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonModal,
    IonButton, IonRow, IonCol, IonGrid
} from '@ionic/react';
import './style.css';
import ApiService from "../api/base";
import Menu from "../components/Menu";
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

export const AllOrders: React.FC = () => {

    const [orders, setOrders] = useState<object[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [order, setOrder] = useState<object | any>();

    const getData = useCallback(async () => {
        const {value} = await Storage.get({key: 'token'});
        const {data} = await ApiService.post({
            resource: `orders/getall`,
            params: {
                token: value
            }
        });
        await setOrders(data);
    }, []);

    const updateOrder = useCallback(async (order, status) => {
        const {value} = await Storage.get({key: 'token'});
        await ApiService.post({
            resource: `orders/update`,
            params: {
                token: value,
                order: {
                    _id: order._id,
                    name: order.name,
                    price: order.price,
                    status: status,
                }
            }
        });
        getData();
    }, [getData]);

    useEffect(() => {
        getData();
    }, [getData]);

    const closeOrder = () => {
        setShowModal(false);
    };

    const returnOrder = (order: object) => {
        setShowModal(false);
        let status = 'return';
        updateOrder(order, status)
    };

    const confirmOrder = (order: object) => {
        setShowModal(false);
        let status = 'confirm';
        updateOrder(order, status)
    };

    const showOrder = async (i: object) => {
        setShowModal(true);
        setOrder(i)
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
                        <IonTitle>All orders</IonTitle>
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
                                </IonCardContent>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol>
                                            <IonButton onClick={() => confirmOrder(order)}>Confirm order</IonButton>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol>
                                            <IonButton onClick={() => returnOrder(order)}>Return order</IonButton>
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

export default AllOrders;
