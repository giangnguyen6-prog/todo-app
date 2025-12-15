import { gql } from 'graphql-tag'

export const GET_TODOS = gql`
  query {
    todos {
      id
      title
      completed
      createdAt
    }
  }
`
