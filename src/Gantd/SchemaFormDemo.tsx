import React, { useState, useRef, useCallback, useEffect  } from 'react'
import { Button, notification } from 'antd'
import SchemaForm from 'schema-form-g'
import { EditStatus, SwitchStatus } from 'data-cell-g'
import Code from './Code'
import Prism from 'prismjs'


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
            componentType: "Url"
        },
        key_4: {
            title: "手机号",
            type: "string",
            componentType: "CellPhone"
        },
    }
}

const uiSchema = {
    "ui:col": 12,
    "ui:gutter": 10,
    "ui:labelCol": 4,
    "ui:wrapperCol": 20,
    "ui:labelAlign": "left",
    "ui:padding": 10,
    "ui:backgroundColor": "transparent",
}

export default function BasicUse() {
    const [edit, setEdit] = useState(EditStatus.CANCEL)
    const formRef = useRef(null)

    const onSubmit = async () => {
        if (!formRef.current) return
        const { errors, values: formValues } = await formRef['current'].validateForm();
        if (errors) { return }
        notification.open({
            message: '表单值',
            description: <pre className="language-json">
                <code>
                    <div dangerouslySetInnerHTML={{
                        __html: Prism.highlight(JSON.stringify(formValues), Prism.languages.json, 'json')
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

    useEffect(() => {
        formRef['current'].setFieldsValue({
            key_1:'数据文本',
            key_2:168.2,
            key_3:'https://www.npmjs.com/',
            key_4:{
                code:'86',
                value:'13945689732'
            }
        })
    })

    const titleConfig = {
        "title:extra": (<>
            {edit === EditStatus.EDIT && <Button onClick={useSwitch} className='gant-margin-5' size="small">退出编辑</Button>}
            {edit !== EditStatus.EDIT && <Button onClick={useSwitch} className='gant-margin-5' size="small">进入编辑</Button>}
            <Button
                onClick={() => {
                    setEdit(EditStatus.SAVE)
                    onSubmit()
                }}
                className='gant-margin-5' size="small"
            >
                保存
            </Button>
        </>)
    }
    return <>
        <SchemaForm
            wrappedComponentRef={formRef}
            edit={edit}
            schema={schema}
            uiSchema={uiSchema}
            titleConfig={titleConfig}
        />
    </>
}