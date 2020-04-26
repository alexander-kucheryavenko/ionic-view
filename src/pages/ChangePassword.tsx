import React, {useCallback, useState} from 'react';
import {
    IonAlert,
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';

import './style.css';
import ApiService from "../api/base";

export const ChangePassword: React.FC = () => {

    const [password, setPassword] = useState<string>();
    const [request, setRequest] = useState('');
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const handlePassword = (event: string | any) => {
        setPassword(event);
    };

    const editPassword = async () => {
        await requestData(password)
    };

    const requestData = useCallback(async ({
                                               password
                                           }) => {
        const tokenInLink = window.location.search;
        const regExp=/token=()/i;
        const token = tokenInLink.replace(regExp, '');
        const {data} = await ApiService.post({
            resource: `auth/password/update`,
            params: {
                token: token,
                password: password
            }
        });
        setRequest(data.message);
        setShowAlert(true);
    }, []);

    const clear = () => {
        setPassword('');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Change Password</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel position="floating">Please, enter your new password</IonLabel>
                        <IonInput value={password} onIonChange={(e) => handlePassword(e.detail.value)}/>
                    </IonItem>
                </IonList>
                <div className='ion-padding'>
                    <IonButton expand="block" type="submit" onClick={editPassword}>Change password</IonButton>
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

export default ChangePassword;
