import { gql } from 'graphql-tag';

export const CREATE_TODO = gql`
	mutation ($title: String!) {
		createTodo(title: $title) {
			todo {
				id
				title
				completed
				createdAt
			}
		}
	}
`;

export const UPDATE_TODO = gql`
	mutation UpdateTodo($id: ID!, $input: UpdateTodoInput!) {
		updateTodo(id: $id, input: $input) {
			todo {
				id
				title
				completed
			}
		}
	}
`;

export const DELETE_TODO = gql`
	mutation ($id: ID!) {
		deleteTodo(id: $id) {
			ok
		}
	}
`;
