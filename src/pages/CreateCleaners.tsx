import React, {useState, useCallback, SetStateAction} from 'react';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonButtons,
    IonMenuButton,
    IonModal,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
} from '@ionic/react';
import './style.css';
import ApiService from "../api/base";
import Menu from "../components/Menu";
import {Plugins} from '@capacitor/core';


const {Storage} = Plugins;

export const CreateCleaners: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [gallery, setGallery] = useState([]);
    const [services, setServices] = useState<never[string] | any>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [servicePrice, setServicePrice] = useState<number>(0);
    const [serviceName, setServiceName] = useState<string>();

    const create = async () => {
        let props = {name, description, gallery, services};
        await requestData(props);
        setName('');
        setDescription('');
        setServices([]);
        setGallery([]);
    };

    const requestData = useCallback(async ({
                                               name,
                                               description,
                                               gallery,
                                               services,
                                           }) => {
        const {value} = await Storage.get({key: 'token'});
        await ApiService.post({
            resource: `cleaners/create`,
            params: {
                token: value,
                cleaner: {name, description, gallery, services}
            }
        });
    }, []);

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

    const handleName = (event: string | any) => {
        setName(event.detail.value.trim());
    };

    const handleDescription = (event: string | any) => {
        setDescription(event.detail.value.trim())
    };
    const openServices = () => {
        setShowModal(true);
    };
    const handleServicePrice = (event: number) => {
        setServicePrice(event);
    };
    const handleServiceName = (event: any) => {
        setServiceName(event.detail.value.trim());
    };
    const handleServices = () => {
        setShowModal(false);
        let a = {
            name: serviceName,
            price: servicePrice,
        };
        services.push(a);
        setServicePrice(0);
        setServiceName('');
    };
    const closeService = () => {
        setShowModal(false);
        setServicePrice(0);
        setServiceName('');
    };

    const uploadImagesWithComp = async (e: Blob) => {
        const imageDataUrl = await readFile(e);
        addImage(imageDataUrl);
    };
    const readFile = (image: Blob) =>
        new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => resolve(reader.result), false);
            reader.readAsDataURL(image);
        });
    return (
        <>
            <Menu/>
            <div className="ion-page" id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton autoHide={false}/>
                        </IonButtons>
                        <IonTitle>Create cleaners</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
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
                            {gallery && gallery.map((item) => <IonImg
                                style={{width: "100px", height: "100px", marginLeft: ".75em"}}
                                src={item}
                            />)}
                        </IonItem>
                        <IonItem>
                            <IonLabel onClick={openServices}>Services</IonLabel>
                        </IonItem>
                        {services.map((i: object | any) =>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>{i.name}</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    {i.price}
                                </IonCardContent>
                            </IonCard>
                        )}
                    </IonList>
                    <IonModal isOpen={showModal}>
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
                    <div className='ion-padding'>
                        <IonButton expand="block" onClick={create}>
                            Create cleaner
                        </IonButton>
                    </div>
                </IonContent>
            </div>
        </>
    );
};
export default CreateCleaners;
