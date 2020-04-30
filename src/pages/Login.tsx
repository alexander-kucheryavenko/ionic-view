import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useState
} from 'react';
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
} from '@ionic/react';
import {Plugins} from '@capacitor/core';

import ApiService from "../api/base";

import './style.css';

const {Storage} = Plugins;

interface ChildComponentProps {
    setToken: Dispatch<SetStateAction<string | null | undefined>>
}

const Login: React.FunctionComponent<ChildComponentProps> = ({setToken}) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const signIn = async () => {
        let props = {email, password};
        await requestData(props);
    };

    const requestData = useCallback(async ({
                                               email,
                                               password,
                                           }) => {
        const {data} = await ApiService.post({
            resource: `auth/login`,
            params: {
                user: {email, password}
            }
        });
        await Storage.set({
            key: 'token',
            value: data.token
        });
        setToken(data.token)
    }, []);

    const handleLogin = (event: string | any) => {
        setEmail(event.detail.value);
    };

    const handlePassword = (event: string | any) => {
        setPassword(event.detail.value);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem>
                        <IonLabel position="floating">Login</IonLabel>
                        <IonInput value={email} onIonChange={handleLogin}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput value={password} onIonChange={handlePassword}/>
                    </IonItem>
                </IonList>
                <div className='ion-padding'>
                    <IonButton expand="block" type="submit" onClick={signIn}>
                        Authorization
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
