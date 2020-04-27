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
import {Plugins} from '@capacitor/core';

const {Storage} = Plugins;

export const EditCleaners: React.FC = () => {

    const [cleaners, setCleaners] = useState<object[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalAddService, setShowModalAddService] = useState<boolean>(false);
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
        setDescription(i.description);
        setName(i.name);
        setGallery(i.gallery);
        setService(i.services);
    };

    const addImage = async (image: any) => {
        const response = await ApiService.post({
            resource: `cleaners/gallery`,
            params: {
                file: {
                    dataUrl: image,
                    format: 'png'
                }
            }
        });
        // @ts-ignore
        setGallery((prevState: SetStateAction<never[]>) => ([...prevState, response.data.path]));
        console.log('response', response.data.path);
    };

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
                                              cleaner,
                                              service
                                          }) => {
        const {value} = await Storage.get({key: 'token'});
        services = service;
        await ApiService.post({
            resource: `cleaners/update`,
            params: {
                token: value,
                cleaner: {name, description, gallery, services, _id: cleaner._id}
            }
        });
        getData();
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

    const removeService = () => {
        let a = service.slice(0, service.length - 1);
        setService(a);
    };

    const removeImage = () => {
        let a = gallery.slice(0, gallery.length - 1);
        setGallery(a);
    };

    const closeService = () => {
        setShowModalAddService(false);
        setServicePrice(0);
        setServiceName('');
    };

    const confirmChanges = async () => {
        setShowModal(false);
        let props = {name, description, gallery, services, cleaner, service};
        await updateData(props);
        setServices([]);
        setService([]);
    };

    const readFile = (image: Blob) =>
        new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => resolve(reader.result), false);
            reader.readAsDataURL(image);
        });

    const uploadImagesWithComp = async (e: Blob) => {
        const imageDataUrl = await readFile(e);
        addImage(imageDataUrl);
    };

    useEffect(() => {
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
                                    <div className="fileUpload btn btn-primary">
                                        <span>Upload Image</span>
                                        <input type="file" className="upload" onChange={(e: any) => {
                                            uploadImagesWithComp(e.target.files[0])
                                        }}/>
                                    </div>
                                    {gallery && gallery.map((item: string | undefined, index: number) =>
                                        gallery.length === index + 1 ?
                                            <IonImg
                                                className='last-image'
                                                style={{width: "100px", height: "100px", marginLeft: ".75em"}}
                                                src={item}
                                                onClick={removeImage}
                                            />
                                            :
                                            <IonImg
                                                style={{width: "100px", height: "100px", marginLeft: ".75em"}}
                                                src={item}
                                            />
                                    )}
                                </IonItem>
                                <IonItem>
                                    <IonLabel onClick={openServices}>Services</IonLabel>
                                </IonItem>
                                {service.map((item: any | undefined, index: number) => {
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
