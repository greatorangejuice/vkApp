import React, {useState, useEffect} from "react";
import {Button, Checkbox, FormLayout, Input, Link, Panel, PanelHeader, Select, Textarea, FormItem} from "@vkontakte/vkui";
import * as PropTypes from "prop-types";
import Home from "./Home";
import bridge from "@vkontakte/vk-bridge";


const OrderForm = () => {

    useEffect(() => {
        bridge.subscribe(({ detail: { type, data }}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });
        async function fetchData() {
            const data = await fetch('http://localhost:3005/api/subjects')
                .then(res => res.json())
            console.log(data.results)
        }
        fetchData();
    }, []);

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
        <Panel>
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
                <FormItem top="Факультет">
                    <Input type="password" placeholder="Введите пароль" />
                </FormItem>
            </FormLayout>
        </Panel>
    )
}


// OrderForm.propTypes = {
//     id: PropTypes.string.isRequired,
//     go: PropTypes.func.isRequired,
// };


export default OrderForm;


