import React, {useState} from 'react';
import {Button, Div, Group, Panel} from "@vkontakte/vkui";
import {withRouter} from "react-router-dom";

const Home = (props) => {
    const initialState = {
        course: 1,
        subjectId: null,
        faculty: null,
    }
    const [state, setState] = useState(initialState)

    const navigateTo = (path) => {
        props.history.push(path)
    }

    return (
        <Panel>

            <Group title="Navigation Example">
                <p> Привет, {props.fetchedUser?.first_name || 'user'}, здесь ты можешь оставить заявку на выполнение
                    какой-либо работы, будь то лаба, контрольная, курсач
                </p>
                <p>После заполнения формы убедись, что личные сообщения открыты и к тебе можно постучаться в личные сообщения</p>
                <Div>
                    <Button size="m" level="2"  onClick={() => {navigateTo('/order-form')}}>
                        Создать новое задание
                    </Button>
                    <Button size="m" level="2" mode='secondary' onClick={() => {navigateTo('/orders')}}>
                        Посмотреть текущие
                    </Button>
                </Div>
            </Group>

        </Panel>
    )
};

export default withRouter(Home);
