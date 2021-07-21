import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

const Home = ({id, go, fetchedUser}) => {
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
                    <Button size="m" level="2" mode='secondary' onClick={go} data-to="form">
                        Посмотреть текущие
                    </Button>
                </Div>
            </Group>
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
