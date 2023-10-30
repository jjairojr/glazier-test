'use client'

import { api } from '~/trpc/react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'

export default function Budget() {
  const { data: budgets1 } = api.budget.getAll.useQuery()

  return (
    <section className="h-screen bg-gray-800 p-5">
      <h1 className="text-center text-3xl font-semibold text-gray-500">
        Budgets
      </h1>
      <div className="mt-10">
        <Test />
      </div>
      <div className="relative mt-10 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Items
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {budgets1?.map((budget) => (
              <tr
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-900"
                key={budget.id}
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {budget?.supplier?.name}
                </th>
                <td className="px-6 py-4">{budget?.createdAt.toISOString()}</td>
                <td className="px-6 py-4">
                  <div
                    className={clsx('rounded-full text-center text-gray-900', {
                      'bg-red-200': budget.status === 'CANCELLED',
                      'bg-yellow-200': budget.status === 'CREATED',
                      'bg-green-200': budget.status === 'CONFIRMED',
                    })}
                  >
                    {budget.status === 'CREATED' ? 'PENDING' : budget.status}
                  </div>
                </td>
                <td className="px-6 py-4">{budget.items[0]?.productName}</td>
                <td className="px-6 py-4">{budget.total ?? 'NOT DEFINED'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

const Test = () => {
  const { mutateAsync } = api.budget.create.useMutation()
  const { register, handleSubmit } = useForm()

  async function requestBudget(data: {
    supplierName: string
    item: string
    quantity: number
  }) {
    await mutateAsync({
      supplierName: data.supplierName,
      item: data.item,
      quantity: Number(data.quantity),
    })
  }

  return (
    <form
      onSubmit={handleSubmit(requestBudget)}
      className="flex justify-center gap-4"
    >
      <input
        type="text"
        className="rounded-lg border-2 border-gray-300 p-2"
        placeholder="supplierName"
        {...register('supplierName')}
      />

      <input
        type="text"
        className="rounded-lg border-2 border-gray-300 p-2"
        placeholder="Item"
        {...register('item')}
      />
      <input
        type="number"
        className="rounded-lg border-2 border-gray-300 p-2"
        placeholder="Quantity"
        {...register('quantity')}
      />

      <button
        className="rounded bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-700"
        type="submit"
      >
        Request Budget
      </button>
    </form>
  )
}
