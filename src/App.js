import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import OrderForm from "./panels/Order-form";

const ROUTES = {
	HOME: 'home',
	FORM: 'form'
}



const App = () => {
	const [activePanel, setActivePanel] = useState(ROUTES.HOME);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const data = await fetch('http://localhost:3005/api/users/search')
				.then(res => res.json())
			console.log(data)
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
			console.log(user)
		}
		fetchData();
	}, []);

	const go = e => {
		console.log('GO')
		console.log(e.currentTarget.dataset.to)
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id={ROUTES.HOME} fetchedUser={fetchedUser} go={go} />
			<OrderForm id={ROUTES.FORM} go={go} />
		</View>
	);
}

export default App;

