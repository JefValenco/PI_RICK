const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "rickandmorthy",
    {
      //The database model should have the following entities:
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      origin: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "../images/rick-and-morty-icon-21.jpeg",
      },

      createdInDb: {
        type: DataTypes.BOOLEAN, // Llama los datos que están en forma de BOOLEAN.
        allowNull: false, // No permite que esté vacío (ya que es obligatoria).
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
