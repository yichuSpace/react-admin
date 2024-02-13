import { Form, Space, Button, Row, Col } from 'antd';
/**
 * 搜索表单容器组件封装
 * @param props
 * @returns
 */
export default function SearchForm(props: any) {
  return (
    <Form
      className="search-form"
      form={props.form}
      layout="vertical"
      initialValues={props.initialValues}
    >
      <Row gutter={[16, 16]}>
        <Col span={24} lg={18}>
          {props.children}
        </Col>
        <Col span={24} lg={6}>
          <div className="mt-6 flex w-full justify-end">
            <Space align="end" size={24}>
              <Button type="primary" onClick={props.onHandleSearchForm}>
                搜索
              </Button>
              <Button type="default" onClick={props.onHandleSearchForm}>
                重置
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </Form>
  );
}
