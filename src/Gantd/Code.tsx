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
  import React, { useState, useRef, useCallback, useEffect  } from 'react'
  import { Button } from 'antd'
  import {SchemaForm,EditStatus,SwitchStatus} from 'gantd'
  // import SchemaForm from 'schema-form-g'
  // import { EditStatus, SwitchStatus } from 'data-cell-g'


  
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