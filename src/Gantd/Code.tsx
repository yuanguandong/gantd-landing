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
  import { Button, notification } from 'antd'
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
  import React, { useState, useCallback } from 'react'
  import { Button, notification, message } from 'antd'
  import { SmartTable, EditStatus, SwitchStatus } from 'gantd'
  import Prism from 'prismjs'
  import { format } from './utils'
  import _ from 'lodash'
  import Mock from 'mockjs'
  const {  Random } = Mock
  
  
  var editTableColumns = [
    {
      fieldName: 'name',
      title: '姓名',
      componentType: 'Input'
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
      componentType: 'DatePicker'
    }
  ]
  var editTableSchema = {
    supportColumnFields: editTableColumns,
    systemViews: [
      {
        viewId: 'systemView',
        name: "全字段视图",
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
        viewId: 'simple',
        name: "简洁自适应高度视图",
        version: '2020-02-20 02:20:02',
        panelConfig: {
          wrap: false,
          isZebra: false,
          bordered: false,
          clickable: true,
          footerDirection: 'row-reverse',
          heightMode: 'auto',
          columnFields: [
            {
              fieldName: 'name',
            },
            {
              fieldName: 'href',
  
            },
            {
              fieldName: 'motto',
            }
          ]
        }
      }
    ]
  }
  var editTableData = Array(15).fill().map(() => ({
    name: Random.cname(),
    age: Random.natural(20, 70),
    domain: Random.url(),
    email: Random.email(),
    birth: Random.datetime('yyyy-MM-dd'),
    cellPhone: { value: Random.string('number', 11) },
    bio: [{ value: Random.cparagraph(1, 3) }],
    price: { value: Random.float(9, 50, 2, 2) },
    address: ["CHN", "510000", "510100"],
  }))
  const Page = () => {
    const [stateData, setStateData] = useState(editTableData)
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
        notification.open({
          message: '差异数据行',
          description: <pre className="language-json">
            <code>
              <div dangerouslySetInnerHTML={{
                __html: Prism.highlight(format(JSON.stringify(diff)), Prism.languages.json, 'json')
              }} ></div>
            </code >
          </pre >,
          duration: 0,
        })
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
          tableKey="EditInlineUse"
          rowKey="id"
          title="行内编辑"
          schema={editTableSchema}
          dataSource={stateData}
          editable={editing}
          bodyHeight={300}
          bodyWidth={1630}
          onSave={onSave}
          headerRight={
            <>
              <Button
                icon={editing === EditStatus.EDIT ? "roolback" : "edit"}
                size="small"
                onClick={() => { if (editing === EditStatus.CANCEL) { message.info('请单击单元格进行编辑') }; setEditing(SwitchStatus) }}
              >
                {editing === EditStatus.EDIT ? "结束" : "进入"}编辑
              </Button>
              {editing === EditStatus.EDIT && <Button
                icon="save"
                size="small"
                type="primary"
                onClick={handleSave}
              >
                保存
              </Button>}
            </>
          }
        />
      </div>
    )
  }
  
  export default Page
  `
}