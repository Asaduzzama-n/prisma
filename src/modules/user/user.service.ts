import { PrismaClient, Profile, User } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({ data });
  return result;
};

const insertOrUpdateProfile = async (data: Profile): Promise<Profile> => {
  const isExist = await prisma.profile.findUnique({
    where: {
      userId: data.userId,
    },
  });

  if (isExist) {
    const result = await prisma.profile.update({
      where: {
        userId: data.userId,
      },
      data: {
        bio: data.bio,
      },
    });
    return result;
  }

  const result = await prisma.profile.create({ data });

  return result;
};

const getAllUser = async (): Promise<Partial<User>[]> => {
  const result = await prisma.user.findMany({
    // select: { name: true, email: true },
    include: {
      profile: true,
    },
  });
  return result;
};

const getSingleUser = async (id: number): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
  return result;
};

export const userService = {
  insertIntoDB,
  insertOrUpdateProfile,
  getAllUser,
  getSingleUser,
};
