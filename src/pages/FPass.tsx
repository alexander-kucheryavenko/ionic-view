import React, {useCallback, useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonAlert,
} from '@ionic/react';

import './style.css';
import ApiService from "../api/base";

export const RemindPassword: React.FC = () => {

    const [email, setEmail] = useState<string>();
    const [request, setRequest] = useState('');
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const handleEmail = (event: string | any) => {
        setEmail(event.detail.value);
    };

    const remind = async () => {
        let props = {email};
        await requestData(props)
    };

    const requestData = useCallback(async ({
                                               email,
                                           }) => {
        const {data} = await ApiService.post({
            resource: `auth/password/request`,
            params: {
                email: email
            }
        });
        await setRequest(data.message);
        await setShowAlert(true);
    }, []);

    const clear = () => {
        setEmail('');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Remind Password</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel position="floating">Enter your e-mail</IonLabel>
                        <IonInput value={email} onIonChange={handleEmail}/>
                    </IonItem>
                </IonList>
                <div className='ion-padding'>
                    <IonButton expand="block" type="submit" onClick={remind}>Send e-mail</IonButton>
                </div>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => {
                        clear();
                        setShowAlert(false)
                    }}
                    header={''}
                    message={request}
                    buttons={['OK']}
                />
            </IonContent>
        </IonPage>
    );
};

export default RemindPassword;

