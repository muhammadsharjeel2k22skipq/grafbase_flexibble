import { GraphQLClient } from 'graphql-request';
export { gql } from 'graphql-request';

import { createProjectMutation, createUserMutation, deleteProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery, updateProjectMuttion } from '@/graphql';
import { ProjectForm } from '@/common.types';


const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_ENDPOINT as string : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY as string : 'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL as string : 'http://localhost:3000';

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAFBASE_API_ENDPOINT as string,{
    headers: {
        'x-api-key': process.env.NEXT_PUBLIC_GRAFBASE_API_KEY as string
    }
});

const makeGraphQLRequest = async (query:string, variables:{}) => {

    try {
        //Make connection with database i.e client.request
        return await client.request(query,variables);

    }
    catch(error) {
        throw error;
    }
};

export const getUser = (email: string) => {
    // client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getUserQuery, {email});
};

export const createUser = (name:string, email:string, avatarUrl:string) => {
    const variables = {
        input: {
            name,
            email,
            avatarUrl
        },
    };
    // client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(createUserMutation, variables);
};

export const uploadImage = async (filePath:string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`,{
            method: 'POST',
            body: JSON.stringify({ path: filePath })
        });

        return response.json();
    }
    catch(error) {
        throw error;
    }
}

export const createProject = async (form:ProjectForm, creatorId:string, token:string) => {

    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      client.setHeader("Authorization", `Bearer ${token}`);
  
      const variables = {
        input: { 
          ...form, 
          image: imageUrl.url, 
          createdBy: { 
            link: creatorId 
          }
        }
      };
  
      return makeGraphQLRequest(createProjectMutation, variables);
    }
};

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`,{
            method: 'GET'
        });
        return response.json();
    }
    catch(error:any) {
        throw new Error('Error in fetching token',error);
    }
};


export const fetchAllProjects = async (category?: string, endcursor?: string) => {
    // client.setHeader("x-api-key", process.env.NEXT_PUBLIC_GRAFBASE_API_KEY as string);
    
    return makeGraphQLRequest(projectsQuery,{category,endcursor});
};


export const getProjectDetails = async (id: string) => {
    // client.setHeader("x-api-key", apiKey);
    
    return makeGraphQLRequest(getProjectByIdQuery,{id});
};

export const getUserProjects = async (id:string, last?:number) => {
    // client.setHeader("x-api-key", apiKey);

    return makeGraphQLRequest(getProjectsOfUserQuery,{ id,last });
};

export const deleteProject = async (id:string, token:string) => {
    client.setHeader("Authorization", `Bearer ${token}`);

    return makeGraphQLRequest(deleteProjectMutation,{ id });  
};

export const updateProject = async (form:ProjectForm, projectId: string, token:string) => {
    const imageUrl = await uploadImage(form.image); 

    if(imageUrl.url) {
        client.setHeader("Authorization", `Bearer ${token}`);
        const variables = {
            input: {
                ...form,
                image: imageUrl.url,
            },
            id: projectId
        };

        return makeGraphQLRequest(updateProjectMuttion,variables);
    }
};

