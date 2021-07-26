import React, {useState} from "react";
import {Button, Checkbox, FormLayout, Input, Link, Panel, PanelHeader, Select, Textarea, FormItem} from "@vkontakte/vkui";
import * as PropTypes from "prop-types";
import Home from "./Home";


const OrderForm = ({id, go}) => {
    const faculties = [
        {name: 'БГУИР', value: 'bsuir'},
        {name: 'БНТУ', value: 'bntu'},
        {name: 'БГУ', value: 'bsu'}
    ]
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
            <PanelHeader>
                Создание заявки
            </PanelHeader>
            <FormLayout>
                <FormItem
                    top="Курс"
                >
                    <Input
                        name="course"
                        value={1}
                        onChange={(e) => {handleChange(e)}}
                    />
                </FormItem>
                <FormItem top="Пароль">
                    <Input type="password" placeholder="Введите пароль" />
                </FormItem>
            </FormLayout>
            <Button onClick={go} data-to='home'>Назад</Button>
        </Panel>
    )
}


OrderForm.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};


export default OrderForm;


