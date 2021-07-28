import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import {Route} from 'react-router-dom';

import Home from './panels/Home';
import OrderForm from "./panels/Order-form";
import Orders from "./panels/Orders";

const ROUTES = {
    HOME: 'home',
    FORM: 'form',
    TESTFORM: 'order'
}

const App = () => {
    const [activePanel, setActivePanel] = useState(ROUTES.HOME);
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);

    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);
        }

        fetchData();
    }, []);


    return (
        <div>
            <nav>
                <ul>
                    <li><a href="/order-form">Создать задание</a></li>
                    <li><a href="/orders">Посмотреть текущие</a></li>
                </ul>
            </nav>
            <Route path='/' exact component={Home} render={() => <h1>HomePage</h1>}/>
            <Route path='/order-form' component={OrderForm}/>
            <Route path='/orders' component={Orders}/>
        </div>

    );
}

export default App;

