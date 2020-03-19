import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Button, notification } from 'antd'
import { EditStatus, SwitchStatus, SchemaForm } from 'gantd'
import Prism from 'prismjs'
import {format} from './utils'

const schema = {
    type: "object",
    title: "数据驱动表单",
    required: ["key_1"],
    propertyType: {
        key_1: {
            title: "文本",
            type: "string",
        },
        key_2: {
            title: "金额",
            type: "string",
            componentType: "InputMoney"
        },
        key_3: {
            title: "超链接",
            type: "string",
            componentType: "InputUrl"
        },
        key_4: {
            title: "手机号",
            type: "string",
            componentType: "InputCellPhone"
        },
    }
}

const uiSchema = {
    "field:col": 12,
    "form:gutter": 10,
    "field:labelCol": 4,
    "field:wrapperCol": 20,
    "field:labelAlign": "left",
    "form:style": {padding:10,background:'transparent'},
}

export default function BasicUse() {
    const [edit, setEdit] = useState(EditStatus.CANCEL)
    const formRef = useRef(null)
    const [data, setData] = useState({
        key_1: '数据文本',
        key_2: {
            key: 'CNY',
            value: '12'
        },
        key_3: 'https://www.npmjs.com/',
        key_4: {
            key: '86',
            value: '13945689732'
        }
    })

    const onSubmit = async () => {
        if (!formRef.current) return
        const { errors, values: formValues } = await formRef['current'].validateForm();
        if (errors) { return }
        notification.open({
            message: '表单值',
            description: <pre className="language-json">
                <code>
                    <div dangerouslySetInnerHTML={{
                        __html: Prism.highlight(format(JSON.stringify(formValues)), Prism.languages.json, 'json')
                    }} ></div>
                </code >
            </pre >,
            duration: 0,
        })
        console.log('formValues', formValues)
    }
    const useSwitch = useCallback(() => {
        setEdit(SwitchStatus)
    }, [])

    const titleConfig = {
        "title:extra": (<>
            {edit === EditStatus.EDIT && <Button onClick={useSwitch} className='gant-margin-5' size="small">退出编辑</Button>}
            {edit !== EditStatus.EDIT && <Button onClick={useSwitch} className='gant-margin-5' size="small">进入编辑</Button>}
            {edit === EditStatus.EDIT && < Button
                onClick={() => {
                    setEdit(EditStatus.SAVE)
                    onSubmit()
                }}
                className='gant-margin-5' size="small"
                type="primary"
            >
                保存
            </Button>}
        </>)
    }

    const onSave = useCallback((id, value, cb) => {
        setData({ ...data, [id]: value })
        cb()
    }, [data])

    return <>
        <SchemaForm
            wrappedComponentRef={formRef}
            onSave={onSave}
            edit={edit}
            data={data}
            schema={schema}
            uiSchema={uiSchema}
            titleConfig={titleConfig}
        />
    </>
}