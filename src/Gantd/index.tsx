import React, { useEffect } from 'react'
import { Button, Icon, notification, Row, Col } from 'antd'
import classnames from 'classnames'
import Prism from 'prismjs'
Prism.highlightAll()

import Header from './Header'
import Banner from './Banner'
import Block from './Block'
import Footer from './Footer'

import bannerbkgImg from './images/bannerbkg.png'
import bannerImg from './images/bannerimg.png'
import formImg from './images/form.png'
import childImg from './images/child.png'
import dataCellImg from './images/datacell.png'
import plusImg from './images/+.png'
import layoutImg from './images/layout.png'
import lightImg from './images/light.png'
import moreImg from './images/more.png'
import rwImg from './images/rw.png'
import singleImg from './images/single.png'
import tableImg from './images/table.png'
import table1Img from './images/table1.png'
import table3Img from './images/table3.png'
import timeImg from './images/time.png'
import viewImg from './images/view.png'

import Code from './Code'

import SchemaFormDemo from './SchemaFormDemo'
import DataCellDemo from './DataCellDemo'
import SmartTableDemo from './SmartTableDemo'

const span = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 24,
  xxl: 24
}

const Page = (props: any) => {

  useEffect(() => {
    notification.open({
      message: `欢迎`,
      description:
        <>😄 欢迎使用, 欢迎提PR和issue,感谢star,多多关照 🙏</>,
      placement: "bottomRight",
      duration: 0,
    });
  }, []);


  return (
    <div className="home-page" style={{ background: `url(${bannerbkgImg}) top center no-repeat` }}>
      <Header key="header" />








      <Banner id="banner" key="banner"
        style={{ height: 'calc(100vh - 61px)', color: '#000' }}
        img={bannerImg}
        content={<>
          <div className="title">
            GantD
          </div>
          <div className="content">
            <div>面向B端管理型软件,专注于数据密集型业务场景, 基于Antd聚合型React组件库。</div>
            <div>在Antd的基础上做了不同程度的针对性的强化，亦可以视作为Antd的补充，可以和Antd同时使用</div>
          </div>
          <Button size="large" type="primary" className="gant-margin-v-20">开始使用</Button>
          <Button size="large" className={classnames('gant-margin-h-20', 'gant-margin-v-20')}>查看文档</Button>
          <div className="github"><Icon type="github" /> github</div>
        </>}
      />













      <Banner id="datacell" key="datacell"
        img={dataCellImg}
        imageAlign='left'
        content={<>
          <div className="title" style={{ fontSize: 24 }}>
            数据单元
          </div>
          <div className="content">
            <div>对于对象的信息，我们并不是一上来就要去更改，更多的时候应该是先去读这个对象。</div>
            <div>我们需要一种机制让读写分离开,而不是让用户一来就看到很多编辑框。</div>

            <div>数据单元是数据展示的最小单元组件，描述的是业务的属性，它可以支持读模式和写模式。</div>

          </div>
          <Button size="large" type="primary" className="gant-margin-v-20">查看示例</Button>
          <div className="github"><Icon type="github" /> github</div>
        </>}
      />


      <Block
        title="Data Cell"
        style={{ background: 'rgba(128,128,128,0.03)' }}
        data={[{
          img: rwImg,
          title: '读写分离',
          content: '每个数据单元都分别有读状态和写状态'
        }, {
          img: singleImg,
          title: '独立编辑',
          content: '可以单独控制每个数据单元的编辑状态'
        }, {
          img: table1Img,
          title: '支持在表格中使用',
          content: '在表格的单元格编辑时使用数据单元'
        }]}
        extra={
          <div className="full-width" style={{ maxWidth: 1000, marginTop: 50 }}>
            <Row>
              <Col {...span}>
                <div className="demo-box">
                  <DataCellDemo />
                </div>
              </Col>
              <Col {...span}>
                <pre className="language-tsx">
                  <code >
                    {Code.dataCell}
                  </code>
                </pre>
              </Col>
            </Row>
          </div>
        }
      />











      <Banner id="form" key="form"
        img={formImg}
        imageAlign='right'
        content={<>
          <div className="title" style={{ fontSize: 24 }}>
            表单
          </div>
          <div className="content">
            表单是业务开发中最常见的业务场景，表单的复杂程度往往需要我们使用大量的代码与时间去构建一个表单业务。我们如果用一种结构化的数据去描述我们的表单业务，以数据驱动的方式生成我们的业务表单，就能达到提效的作用。

          </div>
          <Button size="large" type="primary" className="gant-margin-v-20">查看示例</Button>
          <div className="github"><Icon type="github" /> github</div>
        </>}
      />


      <Block
        title="Schema Form"
        style={{ background: 'rgba(128,128,128,0.03)' }}
        data={[{
          img: timeImg,
          title: '快速构建',
          content: '通过schema数据快速构建出复杂表单'
        }, {
          img: layoutImg,
          title: '灵活布局',
          content: '通过uiSchema对表单进行快速的布局自定义'
        }, {
          img: rwImg,
          title: '读写分离',
          content: '基于数据单元实现表单的读写分离'
        }, {
          img: childImg,
          title: '支持嵌套',
          content: '通过schema语义可以描述出复杂类型的嵌套型表单'
        }, {
          img: plusImg,
          title: '拓展灵活',
          content: '基于数据单元的可拓展性，可以支持自定义数据单元的拓展'
        }, {
          img: lightImg,
          title: '结构明了',
          content: '同时支持可选的headerConfig配置负责表格标题的表现'
        }]}
        extra={
          <div className="full-width" style={{ maxWidth: 1000, marginTop: 50 }}>
            <Row>
              <Col {...span}>
                <div className="demo-box">
                  <SchemaFormDemo />
                </div>
              </Col>
              <Col {...span}>
                <pre className="language-tsx">
                  <code >
                    {Code.form}
                  </code>
                </pre>
              </Col>
            </Row>
          </div>
        }
      />










      <Banner id="table" key="table"
        img={table3Img}
        imageAlign='left'
        content={<>
          <div className="title" style={{ fontSize: 24 }}>
            表格
          </div>
          <div className="content">
            对于数据密集型管理系统，尽可能少的空间展示尽可能多的内容和操作一直是很多用户的诉求，对于表格，我们往这个方向做了些优化，特性有多视图自定义，单元格编辑强化，虚拟滚动等
          </div>
          <Button size="large" type="primary" className="gant-margin-v-20">查看示例</Button>
          <div className="github"><Icon type="github" /> github</div>
        </>}
      />


      <Block
        title="Smart Table"
        style={{ background: 'rgba(128,128,128,0.03)' }}
        span={3}
        data={[{
          img: rwImg,
          title: '单元格编辑',
          content: '基于数据单元实现表单的读写分离单元格编辑'
        }, {
          img: viewImg,
          title: '多视图',
          content: '快速配置、切换多种不同视图展现'
        }, {
          img: tableImg,
          title: '虚拟滚动',
          content: '大批量数据展现时性能优化'
        }]}
        extra={
          <div className="full-width" style={{ maxWidth: 1000, marginTop: 50 }}>
            <Row>
              <Col {...span}>
                <div className="demo-box">
                  <SmartTableDemo />
                </div>
              </Col>
              <Col {...span}>
                <pre className="language-tsx">
                  <code >
                    {Code.table}
                  </code>
                </pre>
              </Col>
            </Row>
          </div>
        }
      />











      <div style={{ backgroundImage: 'linear-gradient(45deg, #2E2D99 0%, #0F0F2D 100%)', color: '#fff' }}>
        <Banner key="more"
          img={moreImg}
          imageAlign='right'
          content={<>
            <div className="title" style={{ fontSize: 24 }}>
              其他
          </div>
            <div className="content">
              除了表格和表单是我们主要研究的对象，我们还做了一些其他组件，比如布局容器的归纳收敛、和一些其他组件，希望能给你带来帮助。

          </div>
            <Button size="large" className="gant-margin-v-20">开始使用</Button>
            <a>
              <div className="github">

                <Icon type="github" /> github

              </div>
            </a>
          </>}
        />
      </div>


      <Footer />

    </div>
  );
}

export default Page;
