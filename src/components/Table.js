import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Table extends Component {
  static defaultProps = {
    listData: [],
  };

  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
  }

  getStateFromProps(props) {
    // const state = this.state || {};
    const schema = "schema" in props ? props.schema : this.props.schema;
    const uiSchema = "uiSchema" in props ? props.uiSchema : this.props.uiSchema;
    const edit = typeof props.listData !== "undefined";
    // const { definitions } = schema;
    const listData = this.props.listData;

    return {
      schema,
      uiSchema,
      listData,
      edit,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state = this.getStateFromProps(nextProps);
  }

  renderList = listData => {
    let rows = [];
    for (let i = 0; i < listData.length; i++) {
      rows.push(
        <tr key={i}>
          <th scope="row">{i + 1}</th>
          <td>{listData[i].firstName}</td>
          <td>{listData[i].age}</td>
          <td>{listData[i].bio}</td>
        </tr>
      );
    }
    return <tbody>{rows}</tbody>;
  };
  renderListHead = schema => {
    let headers = [];
    for (let i = 0; i < Object.keys(schema.properties).length; i++) {
      headers.push(<th scope="col">{Object.keys(schema.properties)[i]}</th>);
    }
    return (
      <thead>
        <tr>
          <th scope="col">#</th>
          {headers}
        </tr>
      </thead>
    );
  };

  render() {
    const { listData, schema } = this.state;
    console.log(schema);

    return (
      <table className="table">
        {this.renderListHead(schema)}
        {this.renderList(listData)}
      </table>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  Table.propTypes = {
    listData: PropTypes.array,
    schema: PropTypes.object.isRequired,
  };
}
