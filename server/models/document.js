export default (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Title already exist' },
      validate: { notEmpty: { args: true, msg: 'Title cannot be empty' } }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: { args: true, msg: 'Content cannot be empty' } }
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'public',
      validate: { notEmpty: { msg: 'Access field cannot be empty' },
        isIn: { args: [['public', 'private', 'role']],
          msg: 'Select an option' } }
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Document.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Document;
};
