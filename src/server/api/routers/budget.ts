import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const budgetRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        supplierName: z.string(),
        item: z.string(),
        quantity: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const supplier = await ctx.db.supplier.findFirst({
        where: {
          name: input.supplierName,
        },
      })

      if (!supplier)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Supplier not found',
        })

      return ctx.db.budget.create({
        data: {
          supplierId: supplier.id,
          items: {
            create: {
              productName: input.item,
              quantity: input.quantity,
            },
          },
        },
      })
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.budget.findMany({
      include: {
        items: true,
        supplier: true,
      },
    })
  }),
})
