import React, {useState, useCallback} from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonButton,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonInput,
    IonAlert,
} from '@ionic/react';
import './style.css';
import ApiService from "../api/base";

export const Registration: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [truePassword, setTruePassword] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [wantBeAdmin, setWantBeAdmin] = useState<boolean>(false);
    const [validEmail, setValidEmail] = useState<boolean>(false);

    const registration = async () => {
        setShowAlert(true);
        let props = {firstName, lastName, email, password, wantBeAdmin};
        await requestData(props);

    };

    const requestData = useCallback(async ({
                                               firstName,
                                               lastName,
                                               email,
                                               password,
                                               wantBeAdmin,
                                           }) => {
        await ApiService.post({
            resource: `auth/registration`,
            params: {
                user: {firstName, lastName, email, password, wantBeAdmin}
            }
        });
    }, []);

    const handleFirstName = (event: string | any) => {
        setFirstName(event.detail.value);
    };
    const handleLastName = (event: string | any) => {
        setLastName(event.detail.value.trim());
    };
    const handleEmail = (event: string | any) => {
        setValidEmail(event.detail.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && event.detail.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).input);
        setEmail(event.detail.value)
    };
    const handlePassword = (event: string | any) => {
        setPassword(event.detail.value.trim());
    };
    const handleTruePassword = (event: string | any) => {
        setTruePassword(event.detail.value.trim());
    };
    const handleAdmin = (event: boolean) => {
        setWantBeAdmin(event);
    };

    const clear = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setTruePassword('');
        setWantBeAdmin(false);
    };

    const validation = () => {
        return !(firstName &&
            lastName &&
            validEmail &&
            email &&
            password &&
            password === truePassword);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registration</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel position="floating">First Name</IonLabel>
                        <IonInput value={firstName} onIonChange={handleFirstName}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Last Name</IonLabel>
                        <IonInput value={lastName} onIonChange={handleLastName}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput value={email} onIonChange={handleEmail}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput value={password} onIonChange={handlePassword}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Confirm Password</IonLabel>
                        <IonInput value={truePassword} onIonChange={handleTruePassword}/>
                    </IonItem>
                </IonList>
                <IonItem>
                    <IonLabel>Want be admin</IonLabel>
                    <IonCheckbox color="primary" checked={wantBeAdmin} slot="start"
                                 onIonChange={(e) => handleAdmin(e.detail.checked)}/>
                </IonItem>
                <div className='ion-padding'>
                    <IonButton expand="block" type="submit" onClick={registration}
                               disabled={validation()}
                    >
                        Register
                    </IonButton>
                </div>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => {
                        clear();
                        setShowAlert(false)
                    }}
                    header={'Verify your account'}
                    message={'An email has been sent to your mail with a link to confirm your account.'}
                    buttons={['OK']}
                />
            </IonContent>
        </IonPage>
    );
};
export default Registration;
