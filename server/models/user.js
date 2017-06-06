import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Username already exist' },
      validate: {
        notEmpty: { args: true, msg: 'Username cannot be empty' },
        not: { args: ['\\s+'], msg: 'Username cannot contain spaces' }
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Please input your full name' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Email already exist' },
      validate: {
        isEmail: { args: true, msg: 'Use a valid email' },
        notEmpty: { args: true, msg: 'Email cannot be empty' },
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Document, {
          foreignKey: 'userId',
          as: 'documents',
          onDelete: 'CASCADE',
        });
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE',
        });
      }
    },
    instanceMethods: {
      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
      },
      comparePassword(passwordEntered) {
        return bcrypt.compareSync(passwordEntered, this.password);
      }
    },
    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },
      beforeUpdate(user) {
        if (user.password) {
          user.hashPassword();
        }
      }
    }
  });
  return User;
};
