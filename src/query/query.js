import { gql } from "@apollo/client";

export const USER_REGISTRATION = gql`
  mutation ($username: String!, $password: String!, $email: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      user {
        id
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
        email
      }
      jwt
    }
  }
`;

export const CREATE_NOTE = gql`
  mutation ($title: String!, $content: String!, $date: String!, $id: ID!, $deleted_Status: Boolean!) {
    createNote(
      data: {
        title: $title
        content: $content
        date: $date
        users_permissions_user: $id
        deleted_Status: $deleted_Status
      }
    ) {
      data {
        attributes {
          title
          deleted_Status
          users_permissions_user {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
                       
export const GET_NOTES = gql`
  query ($id: ID!) {
    notes(filters: {
       users_permissions_user: 
       { id: 
       { eq:
        $id
         }
          },
          deleted_Status: {eq: false}
            }) {
      data {
        id
        attributes {
          title
          date
          content
        }
      }
    }
  }
`;
export const GET_NOTE = gql`
  query ($id: ID!) {
    note(id: $id) {
      data {
        id
        attributes {
          title
          content
        }
      }
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation ($id: ID!, $deleted_Status: Boolean!,$title: String!) {
    updateNote(id: $id,data:{ deleted_Status: $deleted_Status,title: $title}) {
      data {
        id
        attributes {
          title
          deleted_Status
        }
      }
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation (
    $title: String!
    $content: String!
    $date: String!
    $id: ID!
    $noteId: ID!
    $deleted_Status: Boolean!
  ) {
    updateNote(
      id: $noteId
      data: {
        title: $title
        content: $content
        users_permissions_user: $id
        date: $date
        deleted_Status: $deleted_Status
      }
    ) {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`;
