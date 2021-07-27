import React, {useEffect, useState} from "react";
import {Button, DatePicker, FormItem, FormLayout, Input, Panel, Select, Textarea} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import axios from "axios";


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
            const subjects = await axios.get('http://localhost:3005/api/subjects')
                .then(res => {
                    return res.data.results
                })
            setSubjects(subjects)
            const taskTypes = await axios.get('http://localhost:3005/api/task-types')
                .then(res => {
                    return res.data.results
                })
            setTaskTypes(taskTypes)

            const faculties = await axios.get('http://localhost:3005/api/faculties')
                .then(res => {
                    return res.data.results
                })
            setFaculties(faculties)
            console.log(faculties)
            setOrderState({...orderState, isLoaded: true})

            // const faculties = await axios.get('https://journal.bsuir.by/api/v1/faculties')
            //     .then(res => res.json())
            // console.log(faculties)

            // const user = await bridge.send('VKWebAppGetUserInfo');
            // console.log(user)
        }

        fetchData();
    }, []);

    const initialState = {
        course: 1,
        subjectId: null,
        university: null,
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

    const [orderState, setOrderState] = useState(initialState)
    const [subjects, setSubjects] = useState([])
    const [taskTypes, setTaskTypes] = useState([])
    const [faculties, setFaculties] = useState([])
    const [formControls, setFormControls] = useState(initialControls)


    const submitForm = async () => {
        console.log(orderState)
        // try {
        //     return await axios.post('http://localhost:3005/api/tasks/createfromvk', {
        //         title: 'Hey',
        //         description: 'Test'
        //     })
        // } catch (e) {
        //     console.log(e)
        // }
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

                <FormItem top="Университет">
                    <Select
                        placeholder="Не выбран"
                        name='university'
                        options={faculties.map((faculty) => (
                            {label: faculty.university.title, value: faculty.university.id}
                        ))}
                        onChange={(e) => {
                            handleChange(e)
                        }}
                    />
                </FormItem>

                <FormItem top="Факультет">
                    <Select
                        disabled={!orderState.university}
                        placeholder="Не выбран"
                        name='faculty'
                        options={faculties.filter( (faculty) => {
                           return faculty.university.id === +orderState.university
                        } ).map((facultyItem) => (
                            {label: facultyItem.title, value: facultyItem.id}
                        ) )}
                        onChange={(e) => {
                            handleChange(e)
                        }}
                    />
                </FormItem>

                {/*{formControls.course.touched ? <div>1</div> : <div>2</div>}*/}
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

                <FormItem top="Тип задания">
                    <Select
                        placeholder="Не выбран"
                        name='taskType'
                        options={taskTypes.map((task) => (
                            {label: task.title, value: task.id}
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

                <Button
                    disabled={!orderState.deadline}
                    onClick={submitForm}>Отправить</Button>
            </FormLayout>
        </Panel>
    )
}


export default OrderForm;


