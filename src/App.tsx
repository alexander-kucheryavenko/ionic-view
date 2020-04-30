import React, {SetStateAction, useCallback, useEffect, useState} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonPage
} from '@ionic/react';
import {Plugins} from '@capacitor/core';

import {IonReactRouter} from '@ionic/react-router';
import {triangle} from 'ionicons/icons';
import Login from './pages/Login';
import Registration from './pages/Registration';
import RemindPassword from './pages/FPass';
import Home from "./pages/Home";
import Cleaners from "./pages/Cleaners";
import CreateCleaners from "./pages/CreateCleaners";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import AllOrders from "./pages/AllOrders";
import ChangePassword from "./pages/ChangePassword";
import EditCleaners from "./pages/EditCleaners";

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';

const {Storage} = Plugins;


const App: React.FC = () => {

        const [token, setToken] = useState<string | null>();

        const getData = useCallback(async () => {
            const {value} = await Storage.get({key: 'token'});
            await setToken(value);
        }, []);

        useEffect(() => {
            getData();
        }, [getData, token]);
        return (
            <IonApp>
                <IonReactRouter>
                    <IonPage>

                        <IonTabs>
                            <IonRouterOutlet>
                                <Route path="/login"
                                       render={() => token ? <Redirect to="/home/"/> : <Login setToken={setToken}/>}
                                       exact={true}/>
                                <Route path="/registration"
                                       render={() => token ? <Redirect to="/home/"/> : <Registration setToken={setToken}/>}
                                       exact={true}/>
                                <Route path="/remind_password" component={RemindPassword}/>
                                <Route path="/update-password" component={ChangePassword}/>
                                <Route path="/home/" component={Home} exact={true}/>
                                <Route path="/cleaners" component={Cleaners}/>
                                <Route path="/edit-cleaners" component={EditCleaners}/>
                                <Route path="/users" component={Users}/>
                                <Route path="/create_cleaners" component={CreateCleaners}/>
                                <Route path="/orders" component={Orders}/>
                                <Route path="/all_orders" component={AllOrders}/>
                                <Route path="/" render={() => <Redirect to="/login/"/>} exact={true}/>
                            </IonRouterOutlet>
                            {token ? <IonTabBar slot="bottom"/>
                                :
                                <IonTabBar slot="bottom">
                                    <IonTabButton tab="login" href="/login">
                                        <IonIcon icon={triangle}/>
                                        <IonLabel>Login page</IonLabel>
                                    </IonTabButton>
                                    < IonTabButton tab="registration" href="/registration">
                                        <IonIcon icon={triangle}/>
                                        <IonLabel>Registration page</IonLabel>
                                    </IonTabButton>
                                    <IonTabButton tab="remind_password" href="/remind_password">
                                        <IonIcon icon={triangle}/>
                                        <IonLabel>Forget Password</IonLabel>
                                    </IonTabButton>
                                </IonTabBar>
                            }
                        </IonTabs>
                    </IonPage>
                </IonReactRouter>
            </IonApp>
        )
    }
;

export default App;
