import prisma from "../../../config/database";

interface CreateUserArgs {
  email: string;
  password: string;
}

export default async (_parents: undefined, { email, password }: CreateUserArgs) => {
  if (!email && !password) {
    throw new Error("Missing email or password");
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      password,
    },
  });

  return newUser.id;
};
