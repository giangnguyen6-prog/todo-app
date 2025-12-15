<script setup lang="ts">
defineProps<{ todos: any[] }>();
const emit = defineEmits<{
	(e: 'toggle', todo: any): void;
	(e: 'remove', id: number): void;
	(e: 'update:title', payload: { id: number; title: string }): void;
}>();
</script>

<template>
	<UCard>
		<div class="space-y-2">
			<TodoItem
				v-for="t in todos"
				:key="t.id"
				:todo="t"
				@toggle="emit('toggle', t)"
				@update:title="emit('update:title', $event)"
				@remove="emit('remove', t.id)"
			/>
		</div>
	</UCard>
</template>
