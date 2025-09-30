import moment from 'moment'

export const Columns = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: (data) => {
      return <span>{data.row.original.title}</span>
    },
  },

  {
    accessorKey: 'posted',
    header: 'Posted At',
    cell: (data) => {
      return (
        <span>
          {moment(data.row.original.createdAt).format(
            'YYYY-MM-DD [at] HH:mm A'
          )}
        </span>
      )
    },
  },
]
