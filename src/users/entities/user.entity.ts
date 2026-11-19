export class User {
  id?: string; // <-- AÑADE ESTA LÍNEA (o id!: string;)
  firstname!: string;
  surname!: string;
  login!: string;
  password!: string;
  admin!: boolean;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  // Si tienes el método fromPrisma, asegúrate de mapear el id:
  static fromPrisma(prismaUser: any): User {
    return new User({
      id: prismaUser.id, // <-- Mapea el id aquí también
      firstname: prismaUser.firstname,
      surname: prismaUser.surname,
      login: prismaUser.login,
      password: prismaUser.password,
      admin: prismaUser.admin,
    });
  }
}