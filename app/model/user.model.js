export default (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    uid: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: 'UID already in use!'
      },
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'The UID is required.'
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'The Email is required.'
        },
        len: {
          args: [6, 128],
          msg: "Email address must be between 6 and 128 characters in length"
        },
        isEmail: {
          msg: "Email address must be valid"
        }
      },
    },
    password_digest: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'The Password is required.'
        },
        len: {
          args: [8, 142],
          msg: "The password length should be between 8 and 42 characters."
        },
      },
    },
    eth_addr: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'The ETH address is required.'
        }
      }
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'The Role is required.'
        },
        isIn: {
          args: [['ADMIN', 'INVESTOR']],
          msg: "Role should be one of ADMIN, INVESTOR"
        }
      }
    }, 
  }, {
    // freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false,
    underscored: true
  })

  return User;
}