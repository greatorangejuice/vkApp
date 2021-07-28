import React, {useEffect, useState} from "react";
import {Button, DatePicker, FormItem, FormLayout, Input, Panel, Select, Textarea} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import axios from "axios";
import {withRouter} from 'react-router-dom';


const OrderForm = (props) => {
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

            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setOrderState({...orderState, isLoaded: true})
        }

        fetchData();
    }, []);

    const initialState = {
        course: 1,
        subjectId: null,
        universityId: null,
        facultyId: null,
        description: null,
        dueDate: null,
        taskTypeId: null,
        customerVkId: null,
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
    const [user, setUser] = useState(null);


    const submitForm = async () => {
        console.log(orderState)
        try {
            const state = {...orderState};
            const data = {
                ...orderState,
                taskTypeId: +state.taskTypeId,
                universityId: +state.universityId,
                facultyId: +state.facultyId,
                subjectId: +state.subjectId,
                customerVkId: user.id,
                title: 'new Task',
                dueDate: new Date(state.dueDate.year, state.dueDate.month, state.dueDate.day)
            }
            console.log(data)
            return await axios.post('http://localhost:3005/api/tasks/createfromvk', data).then(
                () => {
                    goToMain()
                }
            )
        } catch (e) {
            console.log(e)
        }
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

    const goToMain = () => {
        props.history.push('/')
    }

    return (
        <Panel>
            <FormLayout>

                <FormItem top="Университет">
                    <Select
                        placeholder="Не выбран"
                        name='universityId'
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
                        disabled={!orderState.universityId}
                        placeholder="Не выбран"
                        name='facultyId'
                        options={faculties.filter((faculty) => {
                            return faculty.university.id === +orderState.universityId
                        }).map((facultyItem) => (
                            {label: facultyItem.title, value: facultyItem.id}
                        ))}
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
                        name='taskTypeId'
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
                        name='subjectId'
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
                        name='dueDate'
                        onDateChange={(value) => {
                            setOrderState({...orderState, dueDate: value})
                        }}
                        dayPlaceholder="ДД"
                        monthPlaceholder="ММММ"
                        yearPlaceholder="ГГГГ"
                    />
                </FormItem>

                <Button
                    onClick={submitForm}>Отправить</Button>
            </FormLayout>
        </Panel>
    )
}


export default withRouter(OrderForm);


