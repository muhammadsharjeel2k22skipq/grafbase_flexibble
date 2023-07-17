
export const getUserQuery = `
    query GetUser($email: String!) {
        user(by: {email: $email }) {
        id
        name
        email
        avatarUrl
        description
        githubUrl
        linkedInUrl

       } 
   }
`

export const createUserMutation = `
    mutation CreateUser($input: UserCreateInput!) {
        userCreate(input: $input) {
            user {
            name
            email
            avatarUrl
            description
            githubUrl
            linkedInUrl
            }
        }
    }
`

export const createProjectMutation = `
  mutation CreateProject($input: ProjectCreateInput!) {
    projectCreate(input: $input) {
        project {
            id
            title
            description
            createdBy {
              name
              email
            }
        }
    }
}
`


export const projectsQuery = `
  query getProjects($category: String | null, $endcursor: String | null) {
    projectSearch(first: 8, after: $endcursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          description
          liveSiteUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

export const getProjectByIdQuery = `
  query GetProjectById($id: ID!) {
    project(
      by: {
        id: $id
      }
    ) {
      title
      description
      image
      liveSiteUrl
      githubUrl
      category
      id
      createdBy {
        name
        email
        avatarUrl
        id
      }
    }
  }
`

export const getProjectsOfUserQuery = `
query GetProjectsOfUser($id: ID!, $last: Int = 4) {
  user(
    by: {
      id: $id
    }
  ) {
    name
    email
    id
    avatarUrl
    description
    githubUrl
    linkedInUrl
    projects(last: $last) {
      edges {
        node {
          title
          description
          image
          id
        }
      }
    }
  }
}
`

export const deleteProjectMutation = `
mutation ProjectDelete($id: ID!) {
  projectDelete(
    by: {
      id: $id
    }
  ) {
    deletedId
  }
}

`


export const updateProjectMuttion = `
  mutation ProjectUpdate($id: ID!, $input:ProjectUpdateInput!) {
    projectUpdate(
      input: $input
      by: {
        id: $id
      }
    ) {
      project {
        id
        title
        description
        image
        category
      }
    }
  }
`

