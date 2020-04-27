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
import {useCamera, availableFeatures} from '@ionic/react-hooks/camera';
import './style.css';
import ApiService from "../api/base";
import Menu from "../components/Menu";
import {Plugins, CameraResultType, CameraSource} from '@capacitor/core';


const {Storage} = Plugins;

export const CreateCleaners: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [gallery, setGallery] = useState([]);
    const [services, setServices] = useState<never[string] | any>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [servicePrice, setServicePrice] = useState<number>(0);
    const [serviceName, setServiceName] = useState<string>();
    const [availablePhoto, setAvailablePhoto] = useState<boolean>(false);
    const {photo, getPhoto} = useCamera();
    // const [image, setImage] = useState<any>();


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
                file: image
            }
        });
        setAvailablePhoto(false)
        // @ts-ignore
        setGallery((prevState: SetStateAction<never[]>) => ([...prevState, response.data.path]))
        console.log('response', response.data.path);
    }
    console.log('----->', gallery)
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

    const onClick = () => {
        triggerCamera();
    };
    const uploadImages = () => {
        addImage(photo);
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
                        {photo && availablePhoto && <IonButton expand="block" onClick={uploadImages}>
                          add image
                        </IonButton>}
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
