import React, {useEffect, useState} from "react";
import {Button, DatePicker, FormItem, FormLayout, Input, Panel, Select, Textarea} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";


const OrderForm = () => {

    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        async function fetchData() {
            const subjects = await fetch('http://localhost:3005/api/subjects')
                .then(res => res.json())
            setSubjects(subjects.results)
            setOrderState({...orderState, isLoaded: true})

            const faculties = await fetch('https://journal.bsuir.by/api/v1/faculties')
                .then(res => res.json())
            console.log(faculties)

            const user = await bridge.send('VKWebAppGetUserInfo');
            console.log(user)
        }

        fetchData();
    }, []);

    const initialState = {
        course: 1,
        subjectId: null,
        faculty: null,
        description: null,
        deadline: null,
        taskType: null,
        isLoaded: false,
    }
    const initialControls = {
        course: {
            errorMessage: 'Введите корректный курс',
            valid: false,
            touched: false,
            validation: {
                required: false,
            }
        },
        description: {
            errorMessage: 'Введите подробное описание',
            valid: false,
            touched: false,
            validation: {
                required: true,
            }
        }
    }
    const taskTypes = [
        {
            name: 'Лабораторная работа',
            id: 0,
        },
        {
            name: 'Курсовая работа',
            id: 1,
        },
        {
            name: 'Контрольная работа',
            id: 2,
        },
    ]

    const [orderState, setOrderState] = useState(initialState)
    const [subjects, setSubjects] = useState([])
    const [faculties, setFaculties] = useState([])
    const [formControls, setFormControls] = useState(initialControls)


    const submitForm = () => {
        console.log(orderState)

    }

    const handleChange = (e) => {
        const {name} = e.currentTarget;
        const currentControl = {...formControls[name], touched: true}

        setOrderState({...orderState, [name]: e.target.value});
        setFormControls({...formControls, [name]: currentControl})
    }

    const dates = {day: new Date().getDate() + 1, month: new Date().getMonth() + 1, year: new Date().getFullYear()};


    if (!orderState.isLoaded) {
        return (
            <Panel>
                Loading
            </Panel>
        )
    }


    return (
        <Panel>
            <FormLayout>
                {formControls.course.touched ? <div>1</div> : <div>2</div>}
                <FormItem
                    top="Курс"
                >
                    <Input
                        type='number'
                        name="course"
                        value={orderState.course}
                        onChange={(e) => {
                            handleChange(e)
                        }}
                    />
                </FormItem>
                <FormItem top="Факультет">
                    <Input
                        name='faculty'
                        placeholder="Не выбрано"
                        onChange={(e) => {
                            handleChange(e)
                        }}
                    />
                </FormItem>

                <FormItem top="Тип задания">
                    <Select
                        placeholder="Не выбран"
                        name='subjectId'
                        options={taskTypes.map((task) => (
                            {label: task.name, value: task.id}
                        ))}
                        onChange={(e) => {
                            handleChange(e)
                        }}
                    />
                </FormItem>

                <FormItem top="Предмет">
                    <Select
                        placeholder="Не выбран"
                        options={subjects.map((subject) => (
                            {label: subject.title, value: subject.id}
                        ))}
                        name='taskType'
                        onChange={(e) => {
                            handleChange(e)
                        }}
                    />
                </FormItem>

                <FormItem top="Описание задания">
                    <Textarea
                        name='description'
                        onChange={(e) => {
                            handleChange(e)
                        }}
                        placeholder="Подробное описание того, что тебе нужно сделать"/>
                </FormItem>

                <FormItem top="Срок выполнения">
                    <DatePicker
                        min={dates}
                        name='deadline'
                        onDateChange={(value) => {
                            setOrderState({...orderState, deadline: value})
                        }}
                        dayPlaceholder="ДД"
                        monthPlaceholder="ММММ"
                        yearPlaceholder="ГГГГ"
                    />
                </FormItem>

                <Button onClick={submitForm}>Отправить</Button>
            </FormLayout>
        </Panel>
    )
}


export default OrderForm;


