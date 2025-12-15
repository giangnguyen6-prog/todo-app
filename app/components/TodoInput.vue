<script setup lang="ts">
const title = ref('');
const emit = defineEmits<{ add: [string] }>();

const submit = () => {
	if (!title.value.trim()) return;
	emit('add', title.value);
	title.value = '';
};
</script>

<template>
	<div class="flex gap-2 items-center">
		<UInput v-model="title" placeholder="New todo" size="md" class="flex-1" @keyup.enter="submit" />

		<UButton color="primary" size="md" @click="submit"> Add </UButton>
	</div>
</template>
