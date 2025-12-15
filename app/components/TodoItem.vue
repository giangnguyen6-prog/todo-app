<script setup lang="ts">
const props = defineProps<{
	todo: {
		id: number;
		title: string;
		completed: boolean;
	};
}>();

const emit = defineEmits<{
	(e: 'toggle'): void;
	(e: 'remove'): void;
	(e: 'update:title', payload: { id: number; title: string }): void;
}>();

const isEditing = ref(false);
const draftTitle = ref('');

function startEdit() {
	isEditing.value = true;
	draftTitle.value = props.todo.title;
}

function submit() {
	if (draftTitle.value.trim() && draftTitle.value !== props.todo.title) {
		emit('update:title', {
			id: props.todo.id,
			title: draftTitle.value,
		});
	}
	isEditing.value = false;
}

function cancel() {
	isEditing.value = false;
}
</script>

<template>
	<div class="flex items-center justify-between gap-2">
		<div class="flex items-center gap-2">
			<UCheckbox :model-value="todo.completed" @click.stop="emit('toggle')" />

			<!-- VIEW MODE -->
			<span v-if="!isEditing" :class="{ 'line-through text-gray-400': todo.completed }">
				{{ todo.title }}
			</span>

			<!-- EDIT MODE -->
			<UInput v-else v-model="draftTitle" size="xs" autofocus @keyup.enter="submit" @keyup.esc="cancel" @blur="submit" />
		</div>

		<div class="flex gap-1">
			<UButton icon="i-heroicons-pencil" variant="ghost" size="xs" @click.stop="startEdit" />

			<UButton icon="i-heroicons-trash" color="red" variant="ghost" size="xs" @click="emit('remove')" />
		</div>
	</div>
</template>
