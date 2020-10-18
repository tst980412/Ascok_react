import React, { Fragment, useState, useEffect, useRef } from "react";
import { Modal, Button, Input, Checkbox, Tag } from "antd";
import "./index.css";

export default (props) => {
  const { title, data, callback, type } = props.config;
  const [visible, setVisible] = useState(false);
  const [newdata, setNewdata] = useState([]);
  const [newtag, setNewtag] = useState([]);
  const [newFilter, setNewFilter] = useState([]);
  const [search, setSearch] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const inputref = useRef();

  useEffect(() => {
    newdata.length === data.length ? setAllChecked(true) : setAllChecked(false);
  }, [newdata.length, data.length]);

  const handleOk = () => {
    const cb = data.filter((ev) => {
      return newdata.indexOf(ev.value) !== -1;
    });
    setVisible(false);
    setNewdata([]);
    setNewtag([]);
    inputref.current.state.value = "";
    setSearch(false);
    callback(cb);
  };
  const handleCancel = () => {
    setVisible(false);
    setNewdata([]);
    setNewtag([]);
    inputref.current.state.value = "";
    setSearch(false);
  };
  const handleOnClick = () => {
    setVisible(true);
  };
  const handleChangeValue = (value) => {
    if (value) {
      const filterValue = data.filter((items) => {
        return items.value.indexOf(value) !== -1;
      });
      setSearch(true);
      setNewFilter(filterValue);
    } else {
      setSearch(false);
      setNewFilter([]);
    }
  };
  const handleAllChange = (prop) => {
    if (allChecked) {
      setNewdata([]);
      setNewtag([]);
    } else {
      const allData = [];
      data.map((items) => {
        allData.push(items.value);
        return true;
      });
      setNewdata(allData);
      setNewtag(allData);
    }
  };

  const handleOnChange = (checkvalue, prop) => {
    console.log(checkvalue, prop);
    if (newdata.includes(checkvalue)) {
      const deleteData = newdata.filter((item) => {
        return item !== checkvalue;
      });
      setNewdata(deleteData);
      setNewtag(deleteData);
    } else {
      setNewdata([...newdata, checkvalue]);
      setNewtag([...newtag, checkvalue]);
    }
  };
  const onHandleClose = (e) => {
    console.log(e);
    const closeArr = newtag.filter((item) => {
      return item !== e;
    });
    setNewtag(closeArr);
    setNewdata(closeArr);
  };

  return (
    <Fragment>
      {type && type === "button" ? (
        <Button
          type="primary"
          onClick={() => {
            handleOnClick();
          }}
        >
          {"选择生效条件"}
        </Button>
      ) : (
        <div
          onClick={() => {
            handleOnClick();
          }}
        >
          {"选择生效条件"}
        </div>
      )}
      <Modal
        className="tableBottomPop"
        title={title}
        visible={visible}
        cancelText="取消"
        okText="确定"
        onOk={() => {
          handleOk();
        }}
        onCancel={() => {
          handleCancel();
        }}
      >
        <div className="all-modal">
          <div>
            <div className="left-modal">
              <div>已选条件:</div>
              <div className="tag">
                {Array.isArray(newtag) &&
                  newtag.length > 0 &&
                  newtag.map((item) => {
                    return (
                      <div className="tag-list" key={item}>
                        <Tag
                          color="blue"
                          onClose={() => {
                            onHandleClose(item);
                          }}
                          closable
                        >
                          {item}
                        </Tag>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="right-modal">
              <div className="filter-input">
                <div>搜索生效条件：</div>
                <Input
                  placeholder="请输入生效名称"
                  ref={inputref}
                  onChange={(e) => {
                    handleChangeValue(e.target.value);
                  }}
                ></Input>
              </div>
              <div>
                <div className="chackbox-all">选择生效条件：</div>
                {search ? (
                  <div className="chackbox">
                    {Array.isArray(newFilter) &&
                      newFilter.length > 0 &&
                      newFilter.map((items) => {
                        return (
                          <div key={items.label}>
                            <Checkbox
                              onChange={(e) => {
                                handleOnChange(items.value, e.target.checked);
                              }}
                              checked={newdata.includes(items.value)}
                            >
                              {items.value}
                            </Checkbox>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div>
                    <Checkbox
                      onChange={(e) => {
                        handleAllChange(e.target.checked);
                      }}
                      checked={allChecked}
                    >
                      全选
                    </Checkbox>
                    <div className="chackbox">
                      {Array.isArray(data) &&
                        data.length > 0 &&
                        data.map((items) => {
                          return (
                            <div key={items.label}>
                              <Checkbox
                                onChange={(e) => {
                                  handleOnChange(items.value, e.target.checked);
                                }}
                                checked={newdata.includes(items.value)}
                              >
                                {items.value}
                              </Checkbox>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
