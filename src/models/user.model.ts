import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManySetAssociationsMixin,
  Model,
  ModelAttributes,
} from "sequelize";
import Role from "./role.model";

export interface UserCreationAttributes {
  username: string;
  email: string;
  password: string;
}

export interface UserAttributes extends UserCreationAttributes {
  id: number;
}

export default class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getRoles!: HasManyGetAssociationsMixin<Role>; // Note the null assertions!
  public addRole!: HasManyAddAssociationMixin<Role, number>;
  public setRoles!: HasManySetAssociationsMixin<Role, number>;
  public hasRole!: HasManyHasAssociationMixin<Role, number>;
  public countRole!: HasManyCountAssociationsMixin;

  public static getSchema(): ModelAttributes<User> {
    return {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: new DataTypes.STRING(32),
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(64),
        allowNull: false,
      },
    };
  }
}
