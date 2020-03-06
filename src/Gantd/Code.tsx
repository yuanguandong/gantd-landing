export default {
  dataCell: `
import React, { useState } from 'react'
import {Input} from 'gantd'
//import Input from 'data-cell-g'
const Demo = () => {
  const [value, setValue] = useState('数据单元是读写分离的;请点击右侧小笔进行编辑')
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }
  return <Input allowEdit={true} onSave={onSave} value={value} onChange={setValue} />
}
  `,

  form: `
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from 'antd'
import { EditStatus, SwitchStatus, SchemaForm } from 'gantd'



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
  `,
  table: `
  import React, { useState, useRef, useCallback, useEffect } from 'react'
  import { Button,  message } from 'antd'
  import {SmartTable,EditStatus,SwitchStatus} from 'gantd'
  // import SmartTable from 'smart-table-g'
  // import { EditStatus, SwitchStatus } from 'data-cell-g'

  
  const tableColumns = [
    {
      fieldName: 'name',
      title: '姓名'
    },
    {
      fieldName: 'age',
      title: '年龄',
      componentType: 'InputNumber'
    },
    {
      fieldName: 'cellPhone',
      title: '手机号',
      componentType: 'InputCellPhone'
    },
    {
      fieldName: 'domain',
      title: '个人主页',
      componentType: 'InputUrl'
    },
    {
      fieldName: 'email',
      title: '邮箱',
      componentType: 'InputEmail'
    },
    {
      fieldName: 'bio',
      title: '简介',
      componentType: 'InputLanguage',
      props: {
        localeList: [
          { locale: 'zh-CN', label: '中文' },
          { locale: 'en-US', label: '英文' },
        ]
      }
    },
    {
      fieldName: 'price',
      title: '挂号费',
      componentType: 'InputMoney'
    },
    {
      fieldName: 'address',
      title: '地址',
      componentType: 'LocationSelector'
    },
    {
      fieldName: 'birth',
      title: '生日',
      componentType: 'DataPicker'
    }
  ]
  const tableSchema = {
    supportColumnFields: tableColumns,
    systemViews: [
      {
        viewId: 'systemView',
        name: "系统视图",
        version: '2020-02-20 02:20:02',
        panelConfig: {
          wrap: false,
          columnFields: [
            {
              fieldName: 'name',
              width: 80
            },
            {
              fieldName: 'age',
              width: 70
            },
            {
              fieldName: 'cellPhone',
              width: 230
            },
            {
              fieldName: 'domain',
              width: 200
            },
            {
              fieldName: 'email',
              width: 170
            },
            {
              fieldName: 'bio',
              width: 375
            },
            {
              fieldName: 'price',
              width: 150
            },
            {
              fieldName: 'address',
              width: 195
            },
            {
              fieldName: 'birth',
              width: 160
            }
          ]
        }
      },{
        viewId: 'systemView1',
        name: "简洁视图",
        version: '2020-02-20 02:20:02',
        panelConfig: {
          wrap: true,
          isZebra:false,
          bordered:false,
          footerDirection:'row-reverse',
          columnFields: [
            {
              fieldName: 'name',
              width: 80
            },
            {
              fieldName: 'age',
              width: 70
            },
            {
              fieldName: 'cellPhone',
              width: 230
            },
            {
              fieldName: 'domain',
              width: 200
            },
            {
              fieldName: 'email',
              width: 170
            }
          ]
        }
      }
    ]
  }
  export default function EditInlineUse() {
    
  
    const data = [
      {
        name: '王医生',
        age: 55,
        cellPhone: { phone: "18010032938" },
        domain: 'https://www.baidu.com/',
        email: 'doc_wang@qq.com',
        bio: { locale: 'zh-CN', value: '华西口腔主任医师。' },
        price: { money: 29.9 },
        address: ["CHN", "510000", "510100"],
        birth: '1965-04-24',
      },
      {
        name: '张医生',
        age: 42,
        cellPhone: { phone: "13583384957" },
        domain: 'https://www.google.com/',
        email: 'doc_zhang@163.com',
        bio: { locale: 'zh-CN', value: '北京协和泌尿科主任医师。' },
        price: { money: 19.9 },
        address: ["CHN", "110000", "110101"],
        birth: '1977-01-04',
      },
      {
        name: '李医生',
        age: 35,
        cellPhone: { phone: "13777574848" },
        domain: 'https://www.souhu.com/',
        email: 'doc_li@souhu.com',
        bio: { locale: 'zh-CN', value: '上海第一人民医院妇产科主治医师。' },
        price: { money: 9.9 },
        address: ["CHN", "310000", "310104"],
        birth: '1986-02-14',
      }
    ]
  
    const [stateData, setStateData] = useState(data)
    const [editing, setEditing] = useState(EditStatus.CANCEL);
    const getDifference = useCallback(
      (current, old) => {
        const result = []
        for (let i = 0, len = current.length; i < len; i++) {
          const { children = [], ...currentItem } = current[i]
          const { children: oldChildren = [], ...oldItem } = old[i]
          if (!_.isEqual(currentItem, oldItem)) {
            result.push(currentItem)
          }
          if (children.length && oldChildren.length && !_.isEqual(children, oldChildren)) {
            const diff = getDifference(children, oldChildren)
            result.push.apply(result, diff)
          }
        }
        return result
      },
      [],
    )
    const onSave = useCallback(
      (newStateData) => {
        const diff = getDifference(newStateData, stateData)
        setStateData(newStateData)
        console.log('差异数据：', diff)
      },
      [stateData],
    )
    const handleSave = useCallback(() => {
      setEditing(EditStatus.SAVE)
    }, [])
    return (
      <div style={{ margin: 10 }}>
        <SmartTable
          title={'聪明的表格'}
          tableKey="EditInlineUse"
          rowKey="id"
          schema={tableSchema}
          dataSource={stateData}
          editable={editing}
          bodyHeight={300}
          bodyWidth={1630}
          onSave={onSave}
          headerRight={<>
            <Button
              icon={editing === EditStatus.EDIT ? "roolback" : "edit"}
              className="marginh5"
              size="small"
              onClick={() => { if (editing === EditStatus.CANCEL) { message.info('请单击单元格进行编辑') }; setEditing(SwitchStatus) }}
            >
              {editing === EditStatus.EDIT ? "结束" : "进入"}编辑
            </Button>
            {editing === EditStatus.EDIT && <Button
              icon="save"
              className="marginh5"
              size="small"
              type="primary"
              onClick={handleSave}
            >
              保存
            </Button>}
          </>}
        />
      </div>
    )
  }
  `
}