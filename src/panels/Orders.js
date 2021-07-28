import React, {useEffect, useState} from "react";
import bridge from "@vkontakte/vk-bridge";
import axios from "axios";
import {Div, Panel} from "@vkontakte/vkui";

const Orders = () => {

    useEffect(() => {
        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            const orders = await axios.get(`http://localhost:3005/api/tasks/vk-user-orders/${user.id}`)
                .then(res => {
                    return res.data.results
                })
            setOrders(orders)
            console.log(orders)
            setState({...state, isLoaded: true})
        }

        fetchData()
    }, [])

    const initialState = {
        isLoaded: false
    }

    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState(null);
    const [state, setState] = useState(initialState);
    if (!state.isLoaded) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <Panel>
            <h3>Ваши текущие заявки</h3>
            <Div>
                <ul>
                    {orders.map((order, i) => (
                        <div key={i}>
                            <div>
                                <div>{order.taskType.title} по предмету {order.subject.title}</div>
                                <div>Статус: {order.status ? <p>Кто-то взял и скоро свяжется :)</p> : <p>Пока никто не взял</p>}</div>
                            </div>
                        </div>

                    ))}
                </ul>
            </Div>
        </Panel>
    )
}

export default Orders
