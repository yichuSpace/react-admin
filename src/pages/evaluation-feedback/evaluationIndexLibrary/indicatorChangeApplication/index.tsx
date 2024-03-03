import {
  Card,
  Table,
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Space,
  Button,
  Modal,
  message,
} from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchFormRender from '@/pages/evaluation-feedback/components/SearchFormRender';

import type { PaginationProps, TableProps } from 'antd';

const { RangePicker } = DatePicker;
interface TableListDataType {
  id: number;
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
}
interface QueryTableListDataType {
  msg: string | null;
  data: TableListDataType[];
  total: number;
  pageSize: number | undefined;
}

interface SearchFormDataType {
  a: string | null;
  b: string | null;
  c: string | null;
  d: string | null;
  e: string[] | null; // 指定数组元素的类型，例如 string[] 或 number[] 等
}
interface PaginationParamsType {
  pageSize: number | undefined;
  pageNum: number | undefined;
}

type QueryTableListParamsType = SearchFormDataType & PaginationParamsType;

function IndicatorChangeApplicationPage() {
  const [searchForm] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();

  const linkNameOptions = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' },
    { value: 'disabled', label: 'Disabled' },
  ];
  const onHandleDelete = async (item: TableListDataType) => {
    const config = {
      title: '提示',
      content: '确定删除吗？',
    };
    console.log(item);
    const confirmResult = await modal.confirm(config);
    if (confirmResult) {
      console.log('object');
      // 执行删除操作
      message.success('删除成功');
    } else {
      message.error('删除失败');
    }
    console.log(item, confirmResult);
  };
  const onOpenDetail = (item: TableListDataType) => {
    console.log(item);
    navigate('/evaluation-feedback/evaluationIndexLibrary/indicatorChangeApplicationDetail');
  };
  const columns: TableProps<TableListDataType>['columns'] = [
    { title: '工作单编号', dataIndex: 'a' },
    { title: '指标名称', dataIndex: 'b' },
    { title: '指标分类', dataIndex: 'c' },
    { title: '指标标识', dataIndex: 'd' },
    { title: '指标描述', dataIndex: 'e' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => onOpenDetail(record)}>详情</Button>
          <Button onClick={() => onHandleDelete(record)}>删除</Button>
        </Space>
      ),
    },
  ];

  const [tableListData, setTableListData] = useState<TableListDataType[]>([]);
  const [tableListTotal, setTableListTotal] = useState(0);
  const [paginationParams, setPaginationParams] = useState<PaginationParamsType>({
    pageNum: 1,
    pageSize: 10,
  });

  const [formData] = useState<SearchFormDataType>({
    a: null,
    b: null,
    c: null,
    d: null,
    e: null,
  });

  const queryTableListData = (
    params: QueryTableListParamsType,
  ): Promise<QueryTableListDataType> => {
    return new Promise((resolve) => {
      const list = new Array(params.pageSize).fill(null).map((_, item) => {
        return {
          id: item,
          a: `工作单编号${params.pageNum}`,
          b: '指标名称',
          c: '指标分类',
          d: '指标标识',
          e: '指标描述',
        };
      });
      resolve({
        msg: '200',
        pageSize: params.pageSize,
        data: list,
        total: 100,
      });
    });
  };

  const getTableListData = async () => {
    const searchFormParams = searchForm.getFieldsValue();
    const params = {
      ...searchFormParams,
      ...paginationParams,
    };
    const res = await queryTableListData(params);
    setTableListData(res.data);
    setTableListTotal(res.total);
  };
  const onHandleSearchForm = async () => {
    getTableListData();
  };
  const onHandleResetForm = async () => {
    setPaginationParams({
      pageNum: 1,
      pageSize: 10,
    });
    await searchForm.resetFields();

    getTableListData();
  };

  const onHandlePageChange: PaginationProps['onChange'] = (current, pageSize) => {
    setPaginationParams({
      pageNum: current,
      pageSize,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchFormParams = searchForm.getFieldsValue();
        const params = {
          ...searchFormParams,
          ...paginationParams,
        };
        const res = await queryTableListData(params);
        setTableListData(res.data);
        setTableListTotal(res.total);
      } catch (error) {
        // 处理错误
      }
    };

    fetchData();

    return () => {
      // 取消请求（如果需要）
    };
  }, [searchForm, paginationParams]);

  return (
    <Card>
      <SearchFormRender
        form={searchForm}
        initialValues={formData}
        onHandleSearchForm={onHandleSearchForm}
        onHandleResetForm={onHandleResetForm}
      >
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
      </SearchFormRender>

      <Table
        columns={columns}
        dataSource={tableListData}
        pagination={{
          showSizeChanger: true,
          total: tableListTotal,
          onChange: onHandlePageChange,
          current: paginationParams.pageNum,
          pageSize: paginationParams.pageSize,
        }}
      />
      {contextHolder}
    </Card>
  );
}

export default IndicatorChangeApplicationPage;
