import React, { Fragment, Component } from "react";
import Model from "../../components/Model/index";
import "./index.css";

export default class Demo extends Component {
  render() {
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
    return (
      <Fragment>
        <div className="component">
          <Model
            config={{
              title: "选择生效条件 button",
              data: options,
              type: "button",
              callback: (ev) => {
                callback(ev);
              },
            }}
          />
          <br />
          <br />
          <Model
            config={{
              title: "选择生效条件 type",
              data: options,
              type: "type",
              callback: (ev) => {
                callback(ev);
              },
            }}
          />
        </div>
      </Fragment>
    );
  }
}
