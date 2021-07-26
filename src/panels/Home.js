import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Group, Panel, PanelHeader, Div, FormLayout, FormItem, Input} from "@vkontakte/vkui";

const Home = ({id, go, fetchedUser}) => {
    const initialState = {
        course: 1,
        subjectId: null,
        faculty: null,
    }
    const [state, setState] = useState(initialState)

    const handleChange = (e, field = 'course') => {
        console.log('PREVIOUS STATE')
        console.log(`State: ${JSON.stringify(state)}`)
        console.log('================')
        // console.log(e.target.value)
        setState({...state, [`${field}`]: e.target.value})
        // console.log(`State: ${state.course}`)
        console.log(`State: ${JSON.stringify(state)}`)
    }
    return (
        <Panel id={id}>
            <PanelHeader>BSUIRHub miniApp</PanelHeader>

            <Group title="Navigation Example">
                <p> Привет, {fetchedUser?.first_name || 'user'}, здесь ты можешь оставить заявку на выполнение
                    какой-либо работы, будь то лаба, контрольная, курсач
                </p>
                <p>После заполнения формы убедись, что личные сообщения открыты и к тебе можно постучаться в личные сообщения</p>
                <Div>
                    <Button size="m" level="2"  onClick={go} data-to="form">
                        Создать новое задание
                    </Button>
                    <Button size="m" level="2" mode='secondary' onClick={go} data-to="order">
                        Посмотреть текущие
                    </Button>
                </Div>
            </Group>

            <FormLayout>
                <FormItem
                    top="Курс"
                >
                    <Input
                        name="course"
                        value={state.course}
                        onChange={(e) => {handleChange(e)}}
                    />
                </FormItem>
                <FormItem top="Пароль">
                    <Input type="password" placeholder="Введите пароль" />
                </FormItem>
            </FormLayout>
        </Panel>
    )
};

Home.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Home;
