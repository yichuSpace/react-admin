import { Card, Table, Form, Input, Select, DatePicker, Row, Col, Button } from 'antd';
import { useState } from 'react';

const { RangePicker } = DatePicker;
function IndicatorChangeApplicationPage() {
  const [searchForm] = Form.useForm();

  const linkNameOptions = [
    [
      { value: 'jack', label: 'Jack' },
      { value: 'lucy', label: 'Lucy' },
      { value: 'Yiminghe', label: 'yiminghe' },
      { value: 'disabled', label: 'Disabled' },
    ],
  ];

  const columns = [
    { title: '工作单编号', dataIndex: 'a' },
    { title: '指标名称', dataIndex: 'b' },
    { title: '指标分类', dataIndex: 'c' },
    { title: '指标标识', dataIndex: 'd' },
    { title: '指标描述', dataIndex: 'e' },
  ];

  const queryTableListData = () => {
    return new Array(10).fill('').map((_, item) => {
      return {
        id: item,
        a: '工作单编号',
        b: '指标名称',
        c: '指标分类',
        d: '指标标识',
        e: '指标描述',
      };
    });
  };

  const [tableListData, setTableListData] = useState(queryTableListData());

  const [formData] = useState({
    a: '1',
    b: null,
    c: null,
    d: null,
    e: null,
  });
  const onHandleSearchForm = () => {
    console.log(searchForm);
    console.log(searchForm.getFieldValue('a'));
    console.log(searchForm.getFieldsValue());
    console.log(formData);
    setTableListData(queryTableListData());
    console.log(tableListData);
  };
  const onHandleResetForm = () => {
    searchForm.resetFields();
  };

  return (
    <>
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={24} lg={18}>
            <Form form={searchForm} layout="vertical" initialValues={formData}>
              <Row gutter={[16, 16]}>
                <Col span={24} lg={6}>
                  <Form.Item label="指标名称：" name="a">
                    <Input placeholder="请输入指标名称" allowClear />
                  </Form.Item>
                </Col>
                <Col span={24} lg={6}>
                  <Form.Item label="工作单编号" name="b">
                    <Input placeholder="请输入工作单编号" allowClear />
                  </Form.Item>
                </Col>
                <Col span={24} lg={6}>
                  <Form.Item label="指标分类" name="c">
                    <Input placeholder="请输入指标名称" allowClear />
                  </Form.Item>
                </Col>
                <Col span={24} lg={6}>
                  <Form.Item label="环节名称" name="d">
                    <Select allowClear placeholder="请选择环节名称" options={linkNameOptions} />
                  </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                  <Form.Item label="申请时间" name="e">
                    <RangePicker allowClear style={{ width: '100%' }} format="YYYY-MM-DD" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col span={24} lg={6}>
            <div className="mt-5 flex justify-end">
              <Button type="primary" onClick={onHandleSearchForm} className="mr-10">
                搜索
              </Button>
              <Button onClick={onHandleResetForm}>重置</Button>
            </div>
          </Col>
        </Row>
      </Card>
      <Card>
        <Table columns={columns} dataSource={tableListData} />
      </Card>
    </>
  );
}

export default IndicatorChangeApplicationPage;
