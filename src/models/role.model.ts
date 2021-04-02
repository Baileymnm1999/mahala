import { DataTypes, Model, ModelAttributes } from "sequelize";

export interface RoleCreationAttributes {
  id: number;
  name: string;
}

export interface RoleAttributes extends RoleCreationAttributes {}

export enum ROLES {
  User = "user",
  Admin = "admin",
}

export default class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static getSchema(): ModelAttributes<Role> {
    return {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
    };
  }
}
