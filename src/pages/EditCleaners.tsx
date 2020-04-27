import React, {SetStateAction, useCallback, useEffect, useState} from 'react';
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
    IonLabel, IonRow, IonCol, IonGrid, IonList, IonInput, IonImg
} from '@ionic/react';
import Menu from "../components/Menu";
import ApiService from "../api/base";
import {CameraResultType, Plugins} from '@capacitor/core';
import {availableFeatures, useCamera} from "@ionic/react-hooks/camera";

const {Storage} = Plugins;

export const EditCleaners: React.FC = () => {

    const [cleaners, setCleaners] = useState<object[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalAddService, setShowModalAddService] = useState<boolean>(false);
    const {photo, getPhoto} = useCamera();
    const [availablePhoto, setAvailablePhoto] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [gallery, setGallery] = useState([]);
    const [services, setServices] = useState<never[string] | any>([]);
    const [service, setService] = useState<never[string] | any>([]);
    const [servicePrice, setServicePrice] = useState<number>(0);
    const [cleaner, setCleaner] = useState<any>();
    const [serviceName, setServiceName] = useState<string>();

    const showCleaner = (e: any, i: any) => {
        setShowModal(true);
        setCleaner(i);
        console.log(i);
        setDescription(i.description);
        setName(i.name);
        setService(i.services);
    };

    const addImage = async (image: any) => {
        const response = await ApiService.post({
            resource: `cleaners/gallery`,
            params: {
                file: image
            }
        });
        setAvailablePhoto(false);
        // @ts-ignore
        setGallery((prevState: SetStateAction<never[]>) => ([...prevState, response.data.path]));
        console.log('response', response.data.path);
    };
    console.log('----->', gallery);

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

    const updateData = useCallback(async ({
                                              name,
                                              description,
                                              gallery,
                                              services,
                                          }) => {
        const {value} = await Storage.get({key: 'token'});
        const {data} = await ApiService.post({
            resource: `cleaners/update`,
            params: {
                token: value,
                cleaner: {name, description, gallery, services}
            }
        });
        await setCleaners(data);
    }, []);

    const handleName = (event: string | any) => {
        setName(event.detail.value.trim());
    };

    const handleDescription = (event: string | any) => {
        setDescription(event.detail.value.trim())
    };

    const openServices = () => {
        setShowModalAddService(true);
    };

    const handleServicePrice = (event: number) => {
        setServicePrice(event);
    };

    const handleServiceName = (event: any) => {
        setServiceName(event.detail.value.trim());
    };

    const handleServices = () => {
        setShowModalAddService(false);
        let a = {
            name: serviceName,
            price: servicePrice,
        };
        service.push(a);
        setServicePrice(0);
        setServiceName('');
    };

    const triggerCamera = useCallback(async () => {
        if (availableFeatures.getPhoto) {
            await getPhoto({
                quality: 100,
                allowEditing: false,
                resultType: CameraResultType.DataUrl
            });
            setAvailablePhoto(true)
        }
    }, [getPhoto]);

    const onClick = () => {
        triggerCamera();
    };

    const uploadImages = () => {
        addImage(photo);
    };

    const removeService = () => {
        let a = service.slice(0, service.length - 1);
        setService(a);
    };

    const closeService = () => {
        setShowModalAddService(false);
        setServicePrice(0);
        setServiceName('');
    };

    const confirmChanges = () => {
        setShowModal(false)
    };

    useEffect(() => {
        console.log(service.length);
        getData();
    }, [getData, service, services, cleaner]);

    return (
        <>
            <Menu/>
            <div className="ion-page" id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton autoHide={false}/>
                        </IonButtons>
                        <IonTitle>Edit cleaners</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {cleaners?.length ? cleaners.map((i: object | any) =>
                            <IonCard id={i._id} onClick={(e) => showCleaner(e, i)}>
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
                        {cleaner ?
                            <IonList>
                                <IonItem>
                                    <IonLabel position="floating">Name</IonLabel>
                                    <IonInput value={name} onIonChange={handleName}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Description</IonLabel>
                                    <IonInput value={description} onIonChange={handleDescription}/>
                                </IonItem>
                                <IonItem>
                                    {availableFeatures.getPhoto ? null : (
                                        <input
                                            type="file"
                                            onChange={(e: any) => {
                                                addImage(e.target.files[0]);
                                            }}
                                        />
                                    )}
                                    <IonButton style={{marginTop: ".75em"}} onClick={onClick}>
                                        take photo
                                    </IonButton>
                                    {gallery && gallery.map((item) => <IonImg
                                        style={{width: "100px", height: "100px", marginLeft: ".75em"}}
                                        src={item}
                                    />)}
                                </IonItem>
                                <IonItem>
                                    <IonLabel onClick={openServices}>Services</IonLabel>
                                </IonItem>
                                {service.map((item: any | undefined, index: any) => {
                                    return (<IonItem>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol>
                                                    <IonLabel>{item.name}</IonLabel>
                                                </IonCol>
                                                {service.length === index + 1 ?
                                                    <IonCol>
                                                        <IonButton onClick={removeService}>
                                                            Delete service
                                                        </IonButton>
                                                    </IonCol>
                                                    :
                                                    null
                                                }
                                            </IonRow>
                                            <IonRow>
                                                <IonCol>
                                                    <IonLabel>Cost {item.price}</IonLabel>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonItem>)
                                })
                                }
                            </IonList>
                            : null
                        }
                        <IonItem>
                            <IonButton onClick={confirmChanges}>Confirm changes</IonButton>
                            <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
                        </IonItem>
                    </IonModal>
                    <IonModal isOpen={showModalAddService}>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Add service</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonItem>
                                    <IonLabel position="floating">Service Name</IonLabel>
                                    <IonInput type='text' value={serviceName} onIonChange={handleServiceName}/>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Price</IonLabel>
                                    <IonInput value={servicePrice} type='number' onIonChange={(e) => {
                                        const num = Number(e.detail.value);
                                        handleServicePrice(num);
                                    }}/>
                                </IonItem>
                            </IonCardContent>
                        </IonCard>
                        <IonItem>
                            <IonButton size="large" onClick={handleServices}>Add service</IonButton>
                            <IonButton size="large" onClick={closeService}>Close</IonButton>
                        </IonItem>
                    </IonModal>
                </IonContent>
            </div>
        </>
    );
};

export default EditCleaners;
