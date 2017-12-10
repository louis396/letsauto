const path = require("path");
const express = require("express");
const webpack = require("webpack");

const server = process.env.RJSF_DEV_SERVER || "localhost:8080";
const splitServer = server.split(":");
const host = splitServer[0];
const port = splitServer[1];
const env = "dev";

const webpackConfig = require("./webpack.config." + env);
const compiler = webpack(webpackConfig);
const app = express();

app.use(require("webpack-dev-middleware")(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get("/favicon.ico", function (req, res) {
  res.status(204).end();
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "playground", "index.html"));
});


app.get("/list", function (req, res) {
  var listData = {
    listData: [{
      firstName: "louis",
      lastName: "weng",
      age: 30,
      bio: "u rock",
      password: "123",
      dataTime: '20170909'
    }, {
      firstName: "rex",
      lastName: "zhou",
      age: 12,
      bio: "pp kicking asses since ",
      password: "noneed",
      dataTime: '20171009'
    }, {
      firstName: "Mark",
      lastName: "Zhang",
      age: 33,
      bio: "Kicking your ass",
      password: "222",
      dataTime: '20161009'
    }],
    cData: [{
      firstName: "xxx",
      lastName: "666",
      age: 666,
      bio: "u rock",
      password: "666",
      dataTime: '20181009'
    }, {
      firstName: "555",
      lastName: "55",
      age: 12,
      bio: "pp 555 asses since ",
      password: "noneed",
      dataTime: '20181119'
    }, {
      firstName: "555",
      lastName: "77",
      age: 33,
      bio: "777 your ass",
      password: "777",
      dataTime: '20180119'
    }, {
      firstName: "888",
      lastName: "88",
      age: 33,
      bio: "88 your ass",
      password: "777",
      dataTime: '20170919'
    }, {
      firstName: "999",
      lastName: "1288",
      age: 12,
      bio: "777 your ass",
      password: "019",
      dataTime: '20171019'
    }]
  };
  res.send(listData);
});

app.listen(port, host, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://${server}`);
});
