import React, { Fragment, useState, useEffect } from "react";
import {
  Collapse,
  Form,
  Input,
  Select,
  Button,
  Table,
  Tag,
  Divider,
  message,
} from "antd";
import Model from "../../../components/Model/index";
import { SettingOutlined, DeleteOutlined } from "@ant-design/icons";
import { tuple } from "antd/lib/_util/type";

const options = [
  { label: "value1", value: "生效条件名称1" },
  { label: "value2", value: "生效条件名称2" },
  { label: "value3", value: "生效条件名称3" },
  { label: "value4", value: "生效条件名称4" },
  { label: "value5", value: "生效条件名称5" },
  { label: "value6", value: "生效条件名称6" },
  { label: "value7", value: "生效条件名称7" },
  { label: "value8", value: "生效条件名称8" },
  { label: "value9", value: "生效条件名称9" },
  { label: "value10", value: "生效条件名称10" },
];
const callback = (callbcakData) => {
  console.log("选中的值:", callbcakData);
};
const { Panel } = Collapse;
const { Option } = Select;
const Options = [
  { name: "手枪", id: "1" },
  { name: "狙击枪", id: "2" },
  { name: "步枪", id: "3" },
  { name: "霰弹枪", id: "4" },
];
const columns = [
  {
    title: "序号",
    dataIndex: "id",
    sorter: (a, b) => a.id - b.id,
    width: 200,
    align: "center",
  },
  {
    title: "角色",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
    width: 200,
    align: "center",
  },
  {
    title: "武器",
    dataIndex: "wipper",
    width: 200,
    align: "center",
  },
  {
    title: "星级",
    dataIndex: "age",
    width: 200,
    align: "center",
  },
  {
    title: "状态",
    dataIndex: "tags",
    width: 200,
    align: "center",
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag === "A" ? "red" : tag === "S" ? "yellow" : "blue";
          return (
            <Tag color={color} key={tag}>
              {tag}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "操作",
    width: 200,
    align: "center",
    dataIndex: "diff",
    render: (text, row) => (
      <>
        {text === "modal" ? (
          <Model
            config={{
              title: "选择生效条件",
              data: options,
              type: "button",
              callback: (ev) => {
                callback(ev);
              },
            }}
          />
        ) : (
          <span>
            <Button
              type="dashed"
              shape="circle"
              title="编辑"
              icon={<SettingOutlined />}
              onClick={() => {
                handleButtonType(row);
              }}
            ></Button>
            <Divider type="vertical" />
            <Button
              type="dashed"
              shape="circle"
              title="删除"
              icon={<DeleteOutlined />}
              onClick={() => {
                handleButtonDel(row);
              }}
            ></Button>
          </span>
        )}
      </>
    ),
  },
];

const d1 = [
  {
    id: "1",
    key: "1",
    name: "阿卡丽",
    wipper: "手枪",
    age: "★",
    tags: ["A"],
  },
  {
    id: "2",
    key: "2",
    name: "瑞文",
    wipper: "步枪",
    age: "★★",
    tags: ["S"],
  },
  {
    id: "3",
    key: "3",
    name: "凯特琳",
    wipper: "狙击枪",
    age: "★★★",
    tags: ["B"],
  },
  {
    id: "4",
    key: "4",
    name: "莉莉娅",
    wipper: "步枪",
    age: "★",
    tags: ["A", "B", "S"],
    diff: "modal",
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "莉莉娅", // Column configuration not to be checked
    name: record.name,
  }),
};
const handleButtonType = (row) => {};
const handleButtonDel = (row) => {
  console.log(row);
  message.success("id:" + row.id + ", " + row.name);
};
const TableEplex = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState(d1);
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState(["", ""]);

  useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
      setTimeout(() => {
        setData(d1);
      }, 500);
    }
  }, [data.length]);

  const onHandleChange = (value) => {
    if (value.length !== 0) {
      setInputValue(value);
      const newInput = data.filter((items) => {
        return items.name.indexOf(value) !== -1;
      });
      setNewData(newInput);
    } else {
      setInputValue("");
      setNewData(d1);
    }
  };
  const onHandleSelect = (value) => {
    if (value) {
      const select1 = selectValue;
      select1.splice(0, 1, value);
      setSelectValue(select1);
    } else {
      const select1 = selectValue;
      select1.splice(0, 1, "");
      setSelectValue(select1);
    }
  };
  const onHandleSelect2 = (value) => {
    if (value) {
      const select2 = selectValue;
      select2.splice(1, 1, value);
      setSelectValue(select2);
    } else {
      const select2 = selectValue;
      select2.splice(1, 1, "");
      setSelectValue(select2);
    }
  };
  const handleOnClick = () => {
    console.log("input:" + inputValue, selectValue);
    setLoading(true);
    setTimeout(() => {
      setData(newData);
      setLoading(false);
    }, 500);
  };
  console.log(newData);
  return (
    <Fragment>
      <div className="app-container">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="筛选" key="1">
            <Form layout="inline">
              <Form.Item label="角色名称：">
                <Input
                  placeholder="请输入角色名称"
                  allowClear
                  onChange={(e) => {
                    onHandleChange(e.target.value);
                  }}
                  onPressEnter={() => {
                    handleOnClick();
                  }}
                />
              </Form.Item>
              <Form.Item label="类型：">
                <Select
                  style={{ width: 120 }}
                  showSearch
                  allowClear
                  placeholder="搜索"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(value) => {
                    onHandleSelect(value);
                  }}
                >
                  {Options &&
                    Array.isArray(Options) &&
                    Options.length > 0 &&
                    Options.map((items) => {
                      return (
                        <Option key={items.id} value={items.name}>
                          {items.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item label="星级">
                <Select
                  style={{ width: 120 }}
                  placeholder="选择"
                  allowClear
                  onChange={(value) => {
                    onHandleSelect2(value);
                  }}
                >
                  <Option key={1} value={"★"}>
                    ★
                  </Option>
                  <Option key={2} value={"★★"}>
                    ★★
                  </Option>
                  <Option key={3} value={"★★★"}>
                    ★★★
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => {
                    handleOnClick();
                  }}
                >
                  查询
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
        <br />
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          columns={columns}
          dataSource={newData}
          rowKey={(record) => record.id}
          loading={loading}
        />
      </div>
    </Fragment>
  );
};

export default TableEplex;
