import User, { UserTypesAtDatabase } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export default class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "pizzaria_cliente";

  public loginUser = async (email: string) => {
    const usersDB: UserTypesAtDatabase[] = await BaseDatabase.connections(
      UserDatabase.TABLE_USERS
    )
      .select()
      .where({ email });

    return usersDB[0];
  };
  public createUser = async (user: User) => {
    const newUser: UserTypesAtDatabase = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      whatsapp: user.getWhatsapp(),
      password: user.getPassword(),
      cep: user.getCep(),
      street: user.getStreet(),
      number: user.getNumber(),
      district: user.getDistrict(),
      reference: user.getReference(),
      role: user.getRole(),
    };
    await BaseDatabase.connections(UserDatabase.TABLE_USERS).insert(newUser);
  };
}
