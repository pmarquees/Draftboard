import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  activeUserProcedure,
} from "~/server/api/trpc";
import { createPostSchema, updatePostSchema, paginationSchema } from "~/lib/validators";
import { sendPostNotifications } from "~/lib/webhooks";
import { extractUserMentions } from "~/lib/utils";

export const postRouter = createTRPCRouter({
  create: activeUserProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.create({
        data: {
          title: input.title,
          content: input.content,
          liveUrl: input.liveUrl,
          hideFromHome: input.hideFromHome,
          authorId: ctx.session.user.id,
          attachments: {
            create: input.attachments.map((att) => ({
              type: att.type,
              url: att.url,
              filename: att.filename,
              mimeType: att.mimeType,
              size: att.size,
              width: att.width,
              height: att.height,
              thumbnailUrl: att.thumbnailUrl,
              metadata: att.metadata,
              order: att.order,
            })),
          },
          projects: {
            create: input.projectIds.map((projectId) => ({
              projectId,
            })),
          },
        },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          attachments: {
            orderBy: { order: "asc" },
          },
          projects: {
            include: {
              project: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          _count: {
            select: {
              comments: true,
              reactions: true,
            },
          },
        },
      });

      // Create mention notifications
      const mentions = extractUserMentions(input.content);
      if (mentions.length > 0) {
        const mentionNotifications = mentions
          .filter((mention) => mention.userId !== ctx.session.user.id) // Don't notify self
          .map((mention) => ({
            type: "MENTION" as const,
            userId: mention.userId,
            actorId: ctx.session.user.id,
            postId: post.id,
          }));

        if (mentionNotifications.length > 0) {
          await ctx.db.notification.createMany({
            data: mentionNotifications,
          });
        }
      }

      // Send webhook notifications (fire and forget)
      const settings = await ctx.db.siteSettings.findUnique({
        where: { id: "default" },
      });

      if (settings?.discordWebhookUrl || settings?.slackWebhookUrl) {
        // Get the base URL from headers or use environment variable
        const host = ctx.headers.get("host") || "localhost:3000";
        const protocol = ctx.headers.get("x-forwarded-proto") || "http";
        const baseUrl = process.env.NEXTAUTH_URL || `${protocol}://${host}`;

        sendPostNotifications(
          {
            id: post.id,
            title: post.title,
            content: post.content,
            author: post.author,
            attachments: post.attachments,
            projects: post.projects,
          },
          settings,
          baseUrl
        );
      }

      return post;
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.id },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          attachments: {
            orderBy: { order: "asc" },
          },
          projects: {
            include: {
              project: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          reactions: {
            include: {
              user: {
                select: {
                  id: true,
                  displayName: true,
                },
              },
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      });

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return post;
    }),

  feed: protectedProcedure
    .input(paginationSchema)
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: {
          hideFromHome: false,
        },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          attachments: {
            where: { type: { in: ["IMAGE", "VIDEO"] } },
            orderBy: { order: "asc" },
          },
          projects: {
            include: {
              project: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          reactions: {
            select: {
              type: true,
              userId: true,
            },
          },
          _count: {
            select: {
              comments: true,
              reactions: true,
              attachments: true,
            },
          },
        },
      });

      let nextCursor: string | undefined;
      if (posts.length > input.limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem?.id;
      }

      return { posts, nextCursor };
    }),

  byUser: protectedProcedure
    .input(
      paginationSchema.extend({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: {
          authorId: input.userId,
        },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          attachments: {
            where: { type: { in: ["IMAGE", "VIDEO"] } },
            orderBy: { order: "asc" },
          },
          projects: {
            include: {
              project: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          reactions: {
            select: {
              type: true,
              userId: true,
            },
          },
          _count: {
            select: {
              comments: true,
              reactions: true,
              attachments: true,
            },
          },
        },
      });

      let nextCursor: string | undefined;
      if (posts.length > input.limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem?.id;
      }

      return { posts, nextCursor };
    }),

  byProject: protectedProcedure
    .input(
      paginationSchema.extend({
        projectId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: {
          projects: {
            some: {
              projectId: input.projectId,
            },
          },
        },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          attachments: {
            where: { type: { in: ["IMAGE", "VIDEO"] } },
            orderBy: { order: "asc" },
          },
          projects: {
            include: {
              project: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          reactions: {
            select: {
              type: true,
              userId: true,
            },
          },
          _count: {
            select: {
              comments: true,
              reactions: true,
              attachments: true,
            },
          },
        },
      });

      let nextCursor: string | undefined;
      if (posts.length > input.limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem?.id;
      }

      return { posts, nextCursor };
    }),

  update: activeUserProcedure
    .input(updatePostSchema)
    .mutation(async ({ ctx, input }) => {
      const existingPost = await ctx.db.post.findUnique({
        where: { id: input.id },
        select: { authorId: true },
      });

      if (!existingPost) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (existingPost.authorId !== ctx.session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      // Delete existing attachments and project links if updating
      if (input.attachments) {
        await ctx.db.attachment.deleteMany({
          where: { postId: input.id },
        });
      }

      if (input.projectIds) {
        await ctx.db.postProject.deleteMany({
          where: { postId: input.id },
        });
      }

      const post = await ctx.db.post.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
          liveUrl: input.liveUrl,
          hideFromHome: input.hideFromHome,
          attachments: input.attachments
            ? {
                create: input.attachments.map((att) => ({
                  type: att.type,
                  url: att.url,
                  filename: att.filename,
                  mimeType: att.mimeType,
                  size: att.size,
                  width: att.width,
                  height: att.height,
                  thumbnailUrl: att.thumbnailUrl,
                  metadata: att.metadata,
                  order: att.order,
                })),
              }
            : undefined,
          projects: input.projectIds
            ? {
                create: input.projectIds.map((projectId) => ({
                  projectId,
                })),
              }
            : undefined,
        },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          attachments: {
            orderBy: { order: "asc" },
          },
          projects: {
            include: {
              project: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      // Create mention notifications for new mentions in updated content
      if (input.content) {
        const mentions = extractUserMentions(input.content);
        if (mentions.length > 0) {
          // Get existing mention notifications for this post to avoid duplicates
          const existingMentionNotifications = await ctx.db.notification.findMany({
            where: {
              postId: post.id,
              type: "MENTION",
            },
            select: { userId: true },
          });
          const existingMentionedUserIds = new Set(
            existingMentionNotifications.map((n) => n.userId)
          );

          const newMentionNotifications = mentions
            .filter(
              (mention) =>
                mention.userId !== ctx.session.user.id && // Don't notify self
                !existingMentionedUserIds.has(mention.userId) // Don't duplicate
            )
            .map((mention) => ({
              type: "MENTION" as const,
              userId: mention.userId,
              actorId: ctx.session.user.id,
              postId: post.id,
            }));

          if (newMentionNotifications.length > 0) {
            await ctx.db.notification.createMany({
              data: newMentionNotifications,
            });
          }
        }
      }

      return post;
    }),

  delete: activeUserProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingPost = await ctx.db.post.findUnique({
        where: { id: input.id },
        select: { authorId: true },
      });

      if (!existingPost) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const isAdmin =
        ctx.session.user.role === "ADMIN" ||
        ctx.session.user.role === "OWNER";

      if (existingPost.authorId !== ctx.session.user.id && !isAdmin) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await ctx.db.post.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
