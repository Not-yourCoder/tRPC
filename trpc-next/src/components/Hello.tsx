import { trpc } from '@/utils/trpc'
import React from 'react'

type Props = {}

const Hello = (props: Props) => {
const hello = trpc.greeting.useQuery()
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>{hello?.data}</div>
  )
}

export default Hello