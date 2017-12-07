module.exports = {
  schema:
    {
      title: "A registration List",
      description: "A simple list example.",
      type: "Table",
      listKey:'cData',
      properties: {
        firstName: {
          type: "string",
          title: "First name",
        },
        lastName: {
          type: "string",
          title: "Last name",
        },
        age: {
          type: "integer",
          title: "Age",
        },
        bio: {
          type: "string",
          title: "bio",
        },
      },
    },
  uiSchema: {
    firstName: {},
    age: {},
    bio: {},
    password: {},
    date: {},
    telephone: {},
  },
  listData: {
    listData: [{
      firstName: "louis",
      lastName: "weng",
      age: 30,
      bio: "u rock",
      password: "123",
    }, {
      firstName: "rex",
      lastName: "zhou",
      age: 12,
      bio: "pp kicking asses since ",
      password: "noneed",
    }, {
      firstName: "Mark",
      lastName: "Zhang",
      age: 33,
      bio: "Kicking your ass",
      password: "222",
    },],
    cData: [{
      firstName: "xxx",
      lastName: "666",
      age: 666,
      bio: "u rock",
      password: "666",
    }, {
      firstName: "555",
      lastName: "55",
      age: 12,
      bio: "pp 555 asses since ",
      password: "noneed",
    }, {
      firstName: "555",
      lastName: "77",
      age: 33,
      bio: "777 your ass",
      password: "777",
    },]
  },
};
