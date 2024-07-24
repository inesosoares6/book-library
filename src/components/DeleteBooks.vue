<template>
	<v-dialog
		v-model="deleteBooksDialog"
		activator="parent"
	>
		<v-card class="pa-6">
			<BooksList purpose="delete"/>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
const deleteBooksDialog = ref(false)
</script>
