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
    IonButton, IonRow, IonCol, IonGrid, IonTextarea, IonLabel, IonInput
} from '@ionic/react';
import './style.css';
import ApiService from "../api/base";
import Menu from "../components/Menu";
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

export const AllOrders: React.FC = () => {

    const [orders, setOrders] = useState<object[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalRequest, setShowModalRequest] = useState<boolean>(false);
    const [order, setOrder] = useState<object | any>();
    const [createdBy, setCreatedBy] = useState<string>();
    const [orderName, setOrderName] = useState<string>();
    const [price, setPrice] = useState<string>();
    const [date, setDate] = useState<string>();
    const [request, setRequest] = useState<string>();


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
                    name: orderName,
                    price: price,
                    status: status,
                    comment: request,
                }
            }
        });
        getData();
    }, [getData, orderName, price, request]);

    useEffect(() => {
        getData();
    }, [getData]);

    const closeOrder = () => {
        setShowModal(false);
    };

    const returnOrder = (order: object) => {
        setShowModalRequest(true);
    };

    const ShowModalRequest = () => {
        setShowModalRequest(false);
        setShowModal(false);
        let status = 'return';
        updateOrder(order, status)
    };

    const confirmOrder = (order: object) => {
        setShowModal(false);
        let status = 'confirm';
        updateOrder(order, status)
    };

    const showOrder = async (i: any) => {
        setShowModal(true);
        setCreatedBy(i.createdBy);
        setOrderName(i.name);
        setPrice(i.price);
        setDate(i.createdDate);
        setOrder(i)
    };

    const handleRequest = (event: string | any) => {
        setRequest(event.detail.value.trim());
    };

    const handleCreatedBy = (event: string | any) => {
        setCreatedBy(event.detail.value.trim());
    };

    const handleOrderName = (event: string | any) => {
        setOrderName(event.detail.value.trim());
    };

    const handlePrice = (event: string | any) => {
        setPrice(event.detail.value.trim());
    };

    const handleDate = (event: string | any) => {
        setDate(event.detail.value.trim());
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
                                        <IonLabel position="floating">Created by</IonLabel>
                                        <IonInput value={createdBy} onIonChange={handleCreatedBy}/>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Creation date</IonLabel>
                                        <IonInput value={date} onIonChange={handleDate}/>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Order</IonLabel>
                                        <IonInput value={orderName} onIonChange={handleOrderName}/>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Price</IonLabel>
                                        <IonInput value={price} onIonChange={handlePrice}/>
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
                    <IonModal isOpen={showModalRequest}>
                        <IonItem>Please, enter your feedback.</IonItem>
                        <IonTextarea value={request} onIonChange={handleRequest}/>
                        <IonButton onClick={ShowModalRequest}>Send</IonButton>
                    </IonModal>
                </IonContent>
            </div>
        </>
    );
};

export default AllOrders;
