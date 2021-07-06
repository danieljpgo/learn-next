import { parseISO, format } from 'date-fns'

type Props = {
  date: string
}

export default function Date({ date }: Props) {
  const formattedDate = parseISO(date)
  
  return (
    <time dateTime={date}>
      {format(formattedDate, 'LLLL d, yyyy')}
    </time>
  )
}