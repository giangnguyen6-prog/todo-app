import { GET_TODOS } from '@/graphql/queries/todos';
import { CREATE_TODO, UPDATE_TODO, DELETE_TODO } from '@/graphql/mutations/todos';

export const useTodos = () => {
	const todos = ref<any[]>([]);
	const loading = ref(false);

	const { resolveClient } = useApolloClient();
	const client = resolveClient();

	const loadTodos = async () => {
		loading.value = true;
		const { data } = await client.query({
			query: GET_TODOS,
			fetchPolicy: 'no-cache',
		});
		todos.value = data.todos;
		loading.value = false;
	};

	const addTodo = async (title: string) => {
		const { data } = await client.mutate({
			mutation: CREATE_TODO,
			variables: { title },
		});
		todos.value.unshift(data.createTodo.todo);
	};

const toggleTodo = async (todo: any) => {
  await client.mutate({
    mutation: UPDATE_TODO,
    variables: {
      id: todo.id,
      input: {
        completed: !todo.completed,
      },
    },
  });

  // optimistic update
  todo.completed = !todo.completed;
};


	const updateTodo = async (id: number, input: { title?: string; completed?: boolean }) => {
		await client.mutate({
			mutation: UPDATE_TODO,
			variables: { id, input },
		});

		await loadTodos();
	};

	const removeTodo = async (id: string) => {
		await client.mutate({
			mutation: DELETE_TODO,
			variables: { id },
		});
		todos.value = todos.value.filter((t) => t.id !== id);
	};

	return {
		todos,
		loading,
		loadTodos,
		addTodo,
		toggleTodo,
		updateTodo,
		removeTodo,
	};
};
