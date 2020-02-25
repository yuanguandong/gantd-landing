export default {
  dataCell: `
import React, { useState } from 'react'
import {Input} from 'gantd'
//import Input from 'data-cell-g'
const Demo = () => {
  const [value, setValue] = useState('')
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }
  return <Input allowEdit={true} onSave={onSave} value={value} onChange={setValue} />
}
  `,

  form:`
import React, { useState, useRef } from 'react'
import { Button } from 'antd'
import { SchemaForm, EditStatus } from 'gantd'
//import SchemaForm from 'schema-form-g'
//import EditStatus from 'data-cell-g'

const schema = {
    type: "object",
    title: "普通表单",
    propertyType: {
        key_1: {
            title: "普通输入框",
            type: "string",
        },
        key_2: {
            title: "数字输入框",
            type: "number",
            componentType: "InputNumber"
        },
        key_3: {
            title: "金额",
            type: "string",
            componentType: "InputMoney"
        },
        key_4: {
            title: "url地址",
            type: "string",
            componentType: "Url"
        },
        key_5: {
            title: "邮箱",
            type: "string",
            componentType: "Email"
        },
        key_6: {
            title: "语言",
            type: "string",
            componentType: "Language"
        },
        key_7: {
            title: "手机号",
            type: "string",
            componentType: "CellPhone"
        },
    }
}

const uiSchema = {
    "ui:col": 24,
    "ui:gutter": 10,
    "ui:labelCol": 4,
    "ui:wrapperCol": 20,
    "ui:labelAlign": "left",
    "ui:padding": 10,
    "ui:backgroundColor": "#fff"
}

function BasicUse() {
    const [edit, setEdit] = useState(EditStatus.EDIT)
    const formRef = useRef(null)

    const onSubmit = async () => {
        if (!formRef.current) return;
        const { errors, values: formValues } = await formRef.current.validateForm()
        console.log('formValues', formValues)
    }
    return <div style={{ margin: 10 }}>
        <SchemaForm
            wrappedComponentRef={formRef}
            edit={edit}
            schema={schema}
            uiSchema={uiSchema}
        />
        <div style={{ float: 'right' }}>
            <Button type='primary' onClick={onSubmit}>提交</Button>
        </div>
    </div>
}
  `,
  table:`
import React, { useState } from 'react'
import { Button } from 'antd'
import {SmartTable} from 'gantd'
//import SmartTable from 'smart-table-g'


function BasicUse() {
  const tableSchema = {
    supportColumnFields: [
      {
          fieldName: 'name',
          title: '姓名'
      },
      {
          fieldName: 'gender',
          title: '性别',
          render: V => V === 'MALE' ? '男' : '女'
      },
      {
          fieldName: 'age',
          title: '年龄'
      },
      {
          fieldName: 'height',
          title: '身高'
      }
    ],
    systemViews: [
      {
        viewId: 'systemView1',
        name: "系统视图1",
        version: '2020-02-10 09:45:37',
        panelConfig: {
          wrap: false,
          isZebra: false,
          columnFields: [
            {
              fieldName: 'name',
            },
            {
              fieldName: 'gender',
            },
            {
              fieldName: 'age',
            },
            {
              fieldName: 'height',
            }
          ]
        }
      }
    ]
  }
  return (
      <div style={{ margin: 10 }}>
        <SmartTable
          tableKey="BasicUse"
          schema={tableSchema}
          dataSource={dataSource}
        />
      </div>
  )
}
  `
}