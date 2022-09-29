import { gql } from '@apollo/client';

export const CREATE_FUNDRAISER = gql`
    mutation ($fundraiserName: String!, $requestAmount: String!, $startDate: String!, $endDate: String!) {
        createFundraiser(
            createFundraiserInput: {
                fundraiserName: $fundraiserName
                requestAmount: $requestAmount
                startDate: $startDate
                endDate: $endDate
            }
        ) {
            fundraiserName
            startDate
            endDate
        }
    }
`;

export const CREATE_USER = gql`
    mutation ($companyName: String!, $email: String!, $name: String!, $username: String!, $phone: Float!, $userType: UserType!) {
        createUser(
            userInput: { companyName: $companyName, email: $email, name: $name, phone: $phone, username: $username, userType: $userType }
        ) {
            id
            companyName
            email
            name
            phone
            username
            userType
        }
    }
`;

export const UPDATE_USER = gql`
    mutation ($_id: ID!, $companyName: String!, $email: String!, $name: String!, $username: String!, $phone: Float!, $userType: UserType!) {
        updateUser(
            updateUserInput: {
                _id: $_id
                companyName: $companyName
                email: $email
                name: $name
                phone: $phone
                username: $username
                userType: $userType
            }
        ) {
            companyName
            email
            name
            phone
            username
            userType
        }
    }
`;

export const UPDATE_PROJECT = gql`
    mutation ($_id: String!, $projectName: String!, $description: String!, $startDate: DateTime!, $endDate: DateTime!, $users: [ID!]!) {
        updateProject(
            updateProjectInput: {
                _id: $_id
                projectName: $projectName
                description: $description
                startDate: $startDate
                endDate: $endDate
                users: $users
            }
        ) {
            projectName
            description
            startDate
            endDate
            users
        }
    }
`;
export const UPDATE_FUNDRAISER = gql`
    mutation ($_id: String!, $fundraiserName: String!, $requestAmount: String!, $startDate: String!, $endDate: String!) {
        updateFundraiser(
            updateFundraiserInput: {
                fundraiserName: $fundraiserName
                requestAmount: $requestAmount
                startDate: $startDate
                endDate: $endDate
                _id: $_id
            }
        ) {
            _id
            endDate
            fundraiserName
            requestAmount
            startDate
        }
    }
`;
