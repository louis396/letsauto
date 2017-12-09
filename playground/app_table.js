import React, { Component } from "react";
import { render } from "react-dom";
import CodeMirror from "react-codemirror2";
import "codemirror/mode/javascript/javascript";

import { shouldRender } from "../src/utils";
import { samples } from "./listSamples";
import { Form, Table } from "../src";
import axios from "axios";

// Import a few CodeMirror themes; these are used to match alternative
// bootstrap ones.
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/mbo.css";
import "codemirror/theme/ttcn.css";
import "codemirror/theme/solarized.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/eclipse.css";

// const log = type => console.log.bind(console, type);
const fromJson = json => JSON.parse(json);
const toJson = val => JSON.stringify(val, null, 2);
const apiServerAddress = { type: "string", title: "API Load" };
const cmOptions = {
  theme: "default",
  height: "auto",
  viewportMargin: Infinity,
  mode: {
    name: "javascript",
    json: true,
    statementIndent: 2,
  },
  lineNumbers: true,
  lineWrapping: true,
  indentWithTabs: false,
  tabSize: 2,
  gutters: ["CodeMirror-linenumbers", "breakpoints"],
};

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: true, code: props.code };
  }

  componentWillReceiveProps(props) {
    this.setState({ valid: true, code: props.code });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  onCodeChange = (editor, metadata, code) => {
    this.setState({ valid: true, code });
    setImmediate(() => {
      try {
        this.props.onChange(fromJson(this.state.code));
      } catch (err) {
        this.setState({ valid: false, code });
      }
    });
  };

  onGutterClick = (cm, n) => {
    let info = cm.lineInfo(n);
    if (info.handle.stateAfter.lastType === "[") {
      let key = info.text.replace(/[^a-zA-Z0-9]/g, "");
      let userListData = fromJson(this.state.code);
      cm.setGutterMarker(
        n,
        "breakpoints",
        info.gutterMarkers ? null : this.makeMarker()
      );
      this.props.onListSelected(userListData[key]);
    }
  };

  makeMarker = () => {
    var marker = document.createElement("div");
    marker.style.color = "#822";
    marker.innerHTML = '<span class="valid glyphicon glyphicon-ok"></span>';
    return marker;
  };

  render() {
    const { title, theme } = this.props;
    const icon = this.state.valid ? "ok" : "remove";
    const cls = this.state.valid ? "valid" : "invalid";
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <span className={`${cls} glyphicon glyphicon-${icon}`} />
          {" " + title}
        </div>
        <CodeMirror
          onGutterClick={this.onGutterClick}
          value={this.state.code}
          onChange={this.onCodeChange}
          options={Object.assign({}, cmOptions, { theme })}
        />
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    // initialize state with Simple data sample
    const { schema, uiSchema, listData, validate } = samples.Simple;
    const userListData = listData;
    this.state = {
      form: false,
      schema,
      uiSchema,
      listData,
      validate,
      userListData,
      editor: "default",
      theme: "default",
      liveValidate: true,
      shareURL: null,
    };
  }

  componentDidMount() {
    const hash = document.location.hash.match(/#(.*)/);
    if (hash && typeof hash[1] === "string" && hash[1].length > 0) {
      try {
        this.load(JSON.parse(atob(hash[1])));
      } catch (err) {
        console.log(err);
        alert("Unable to load form setup data.");
      }
    } else {
      this.load(samples.Simple);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  load = data => {
    // Reset the ArrayFieldTemplate whenever you load new data
    const { ArrayFieldTemplate, ObjectFieldTemplate } = data;
    // force resetting form component instance
    this.setState({ form: false }, _ =>
      this.setState({
        ...data,
        form: true,
        ArrayFieldTemplate,
        ObjectFieldTemplate,
      })
    );
  };

  onSchemaEdited = schema => this.setState({ schema, shareURL: null });

  onUISchemaEdited = uiSchema => this.setState({ uiSchema, shareURL: null });

  onListDataEdited = listData => this.setState({ listData });

  onListSelected = listData => this.setState({ listData });

  loadServerData = ({ formData }) => {
    let self = this;
    axios
      .get(formData)
      .then(function(response) {
        self.setState({ userListData: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { schema, uiSchema, listData, editor, userListData } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <Editor
              title="JSONSchema"
              theme={editor}
              code={toJson(schema)}
              onChange={this.onSchemaEdited}
            />
          </div>
          <div className="col-sm-6">
            <Editor
              title="UISchema"
              theme={editor}
              code={toJson(uiSchema)}
              onChange={this.onUISchemaEdited}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <Table listData={listData} />
        </div>
        <div className="col-sm-6">
          <Form schema={apiServerAddress} onSubmit={this.loadServerData}>
            <div className="row">
              <div className="col-sm-6">
                <button className="btn btn-primary" type="submit">
                  load
                </button>
                <span>Please choose your list</span>
              </div>
            </div>
          </Form>
          <Editor
            title="listData"
            theme={editor}
            code={toJson(userListData)}
            onListSelected={this.onListSelected}
            onChange={this.onListDataEdited}
          />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
