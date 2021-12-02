const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  // checkPassword(loginPw) {
  //   return bcrypt.compareSync(loginPw, this.password);
  // }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    // hooks: {
    //   async beforeCreate(newUserData) { // The async keyword is used as a prefix to the function that contains the asynchronous function
    //       // await can be used to prefix the async function, which will then gracefully assign the value from the response to the newUserData's password property
    //       newUserData.password = await bcrypt.hash(newUserData.password, 10);
    //       return newUserData; // newUserData is then returned to the application with the hashed password
    //     },
    //     // set up beforeUpdate lifecycle "hook" functionality
    //     async beforeUpdate(updatedUserData) {
    //       updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
    //       return updatedUserData;
    //     }
    // },
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'users'
  }
);

module.exports = User;