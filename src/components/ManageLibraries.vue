<template>
	<v-dialog
		v-model="manageLibrariesDialog"
		activator="parent"
	>
		<v-card class="d-flex flex-column pa-6">
			<div class="w-100 d-flex ga-8 mb-3 align-center">
				<v-text-field
					v-model="newLibrary"
					label="New Library"
					variant="outlined"
					required
					hide-details
				/>
				<v-btn
					:disabled="!newLibrary?.length"
					variant="outlined"
					color="primary"
					icon="mdi-arrow-right-bold"
					@click="addLibrary"
				/>
			</div>
			<v-list>
				<v-list-item
					v-for="(library, index) in libraries"
					:key="index"
					:title="library.toUpperCase()"
				>
					<template v-slot:append>
						<v-icon :color="library.toLowerCase()">mdi-book</v-icon>
					</template>
				</v-list-item>
			</v-list>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const store = useAppStore()

const manageLibrariesDialog = ref(false)
const newLibrary = ref('')

const libraries = computed(() => store.getLibraries)

const addLibrary = () => {
	store.addLibrary(newLibrary.value)
	newLibrary.value = ''
}
</script>
