export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      allowNull: false,
      unique: { args: true, msg: 'Role already exist' },
      type: DataTypes.STRING,
      validate: {
        notEmpty: { args: true, msg: 'Name cannot be empty' }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Role.hasMany(models.User, {
          foreignKey: 'roleId',
          as: 'users',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Role;
};
