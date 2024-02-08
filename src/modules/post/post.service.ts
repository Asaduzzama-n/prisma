import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createPost = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data,
    include: {
      category: true,
      author: true,
    },
  });

  return result;
};

const getAllPost = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, limit, page } = options;

  const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0;
  const take = parseInt(limit) || 10;

  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
      skip,
      take,
      include: {
        category: true,
        author: true,
      },
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : {
              createdAt: "desc",
            },

      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            author: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });

    const total = await tx.post.count();

    return {
      data: result,
      total,
    };
  });
};

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post> => {
  const result = await prisma.post.update({ where: { id }, data: payload });
  return result;
};

const getSinglePost = async (id: number): Promise<Post | null> => {
  const result = await prisma.post.findUnique({
    where: { id },
    include: {
      category: true,
      author: true,
    },
  });

  return result;
};

const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({ where: { id } });
  return result;
};

const aggregationAndGroup = async () => {
  //   const result = await prisma.post.aggregate({
  //     _count: {
  //       title: true,
  //       authorId: true,
  //     },
  //     _avg: {
  //       authorId: true,
  //       categoryId: true,
  //     },
  //     _sum: {
  //       authorId: true,
  //     },
  //   });

  const result = await prisma.post.groupBy({
    by: ["title"],
    _count: {
      title: true,
    },
  });

  return result;
};

export const postService = {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
  aggregationAndGroup,
};
