import React, {Component} from "react";
import PropTypes from "prop-types";

export default class Table extends Component {
  static defaultProps = {
    listData: {}
  };

  constructor(props) {
    super(props);
    this.state = props.listData;
  }

  componentWillReceiveProps(nextProps) {
    this.state = nextProps.listData.listData;

  }


  renderList = (listData) => {
    let rows = [];
    listData.listData.map((oneData,index) => {
      rows.push(
        <tr key={index}>
          <th scope="row">1</th>
          <td>{oneData.firstName}</td>
          <td>{oneData.age}</td>
          <td>{oneData.bio}</td>
        </tr>);
    });
    return (
      <tbody>{rows}</tbody>
    );
  }


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
    listData: PropTypes.any,
  };
}