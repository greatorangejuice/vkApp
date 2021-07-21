import React, {useState} from "react";
import {Button, Checkbox, FormLayout, Input, Link, Panel, PanelHeader, Select, Textarea} from "@vkontakte/vkui";
import FormField from "@vkontakte/vkui/dist/components/FormField/FormField";

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
    const {state, setState} = useState(initialState)

    return (
        <Panel id={id}>
            <PanelHeader>
                Создание заявки
            </PanelHeader>

            <FormLayout>
                <FormField
                    top='Курс'
                    required
                    // status={course ? 'valid' : 'error'}
                    // bottom={course ? 'Электронная почта введена верно!' : 'Пожалуйста, введите электронную почту'}
                >
                    <Input
                        type="number"
                        max='7'
                        name="course"
                    />
                </FormField>

                <FormField top="Факультет">
                    <Select
                        placeholder="Выберите пол"
                        options={[{
                            value: '0', label: 'Мужской'
                        }, {
                            value: '1', label: 'Женский'
                        }
                        ]}
                    />
                </FormField>

                <FormField top="Предмет">
                    <Select
                        placeholder="Выберете предмет"
                        options={[{
                            value: '0', label: 'Мужской'
                        }, {
                            value: '1', label: 'Женский'
                        }
                        ]}
                    />
                </FormField>

                <FormField top="О себе">
                    <Textarea/>
                </FormField>
                <Checkbox>Согласен со всем <Link>этим</Link></Checkbox>
                    <Button onClick={() => {console.log('click')}} size="l" stretched>Зарегистрироваться</Button>
            </FormLayout>
            <Button onClick={go} data-to='home'>Назад</Button>
        </Panel>
    )
}

export default OrderForm;
