import { UsersDto } from "../DTOs/users.dto";
import { AppDataSource } from "../data-source";
import { Users } from "../entities/Users.entity";

export const getUsersList = async (): Promise<UsersDto[]> => {

  // The [] denotes that the function returns an array of UsersDto objects. Without it, Promise<UsersDto> would indicate that the promise resolves to a single UsersDto object, not an array of them.

  const usersRepository = AppDataSource.getRepository(Users);
  const users = await usersRepository.find({
    select: ["id", "f_name", "l_name", "u_name", "email", "phone", "last_login"]
  });

  return users.map(user => {
    const userDto = new UsersDto;
    userDto.userId = user.id;
    userDto.userFname = user.f_name;
    userDto.userLname = user.l_name;
    userDto.userName = user.u_name;
    userDto.userEmail = user.email;
    userDto.userPhone = user.phone;
    userDto.userLastLogin = user.last_login;
    return userDto;
  }) //Kept the DTO immutable by creating new instances inside the map function.

}


