import React from 'react'
import Note from '../components/Note'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_NOTE } from '../query/query'

function NotePage() {
  const param = useParams()
  const id = param.id
  console.log(param.id)
  const {data,loading,error} = useQuery(GET_NOTE,{
    variables:{
      id: id
    }
  })

  console.log(data)
  return (
    <Note data={id && data}/>
  )
}

export default NotePage