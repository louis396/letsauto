import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Table extends Component {
  static defaultProps = {
    listData: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      listData: props.listData,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state = nextProps.listData;
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

  render() {
    var listData = this.state;
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Username</th>
          </tr>
        </thead>
        {this.renderList(listData)}
      </table>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  Table.propTypes = {
    listData: PropTypes.array,
  };
}
