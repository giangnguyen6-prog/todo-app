<script setup lang="ts">
const { todos, loadTodos, addTodo, toggleTodo, removeTodo, updateTodo } = useTodos();

onMounted(loadTodos);
</script>

<template>
	<UContainer class="py-10 max-w-xl space-y-4">
		<h1 class="text-2xl font-bold">Todo App</h1>

		<TodoInput @add="addTodo" />

		<TodoList :todos="todos" @toggle="toggleTodo" @remove="removeTodo" @update:title="({ id, title }) => updateTodo(id, { title })" />
	</UContainer>
</template>
