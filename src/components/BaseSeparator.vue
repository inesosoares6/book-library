<template>
	<div class="d-flex align-center w-100 ga-4">
		<hr
			class="flex-grow-1 my-0"
			style="height: 1px; background-color: #dce0e3"
		/>

		<!-- Text -->
		<span
			class="shrink px-xs d-flex align-center font-weight-bold"
			:style="{ color: '#6D758A', fontSize: '16px', lineHeight: '14px' }"
		>
			{{ text }}
		</span>

		<hr
			class="flex-grow-1 my-0"
			style="height: 1px; background-color: #dce0e3"
		/>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	text: string
}>()
</script>
