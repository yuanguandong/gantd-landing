
import React, { useState } from 'react';
import {Input} from 'data-cell-g';

const Demo = () => {
  const [value, setValue] = useState('数据单元是读写分离的,点击右侧小笔进行编辑')
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }
  return <>
    <Input placeholder='可编辑' allowEdit={true} onSave={onSave} value={value} onChange={setValue} />
  </>
}

export default Demo