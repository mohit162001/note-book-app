import { gql } from "@apollo/client";

export const USER_REGISTRATION = gql`
mutation($username: String!,$password: String!,$email: String!){
  register(input:{
    username: $username,
    email: $email,
    password: $password,

  }){
    user{
      username,
      email,
    }
    jwt
  }
}
`

export const USER_LOGIN = gql`
mutation($identifier: String!,$password:String!){
  login(input:{
    identifier:$identifier,
    password:$password,
   
  }){
    user{
      username
    }
    jwt
  }
  
}`