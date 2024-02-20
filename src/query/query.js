import { gql } from "@apollo/client";

export const USER_REGISTRATION = gql`
  mutation ($username: String!, $password: String!, $email: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      user {
        username
        email
      }
      jwt
    }
  }
`;

export const USER_LOGIN = gql`
  mutation ($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      user {
        username
        id
      }
      jwt
    }
  }
`;

export const CREATE_NOTE = gql`
  mutation ($title: String!, $content: String!, $date: String!, $id: ID!) {
    createNote(
      data: {
        title: $title
        content: $content
        date: $date
        users_permissions_user: $id
      }
    ) {
      data {
        attributes {
          title
        }
      }
    }
  }
`;
