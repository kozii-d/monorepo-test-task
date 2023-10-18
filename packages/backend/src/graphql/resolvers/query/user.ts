import prisma from "../../../config/database";

interface CreateUserArgs {
  id: number;
}

export default async (_parents: undefined, { id }: CreateUserArgs) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    email: user.email,
  };
};
