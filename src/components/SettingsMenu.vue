<template>
	<v-dialog
		v-model="settingsMenu"
		activator="parent"
		transition="dialog-bottom-transition"
		fullscreen
	>
		<v-card>
			<v-toolbar>
				<v-btn
					icon="mdi-close"
					@click="settingsMenu = false"
				/>

				<v-toolbar-title>Settings</v-toolbar-title>
			</v-toolbar>
			<v-card-text>
				<v-list class="d-flex flex-column ga-2">
					<v-list-subheader>
						{{ 'General'.toLocaleUpperCase() }}
					</v-list-subheader>
					<v-list-item
						title="Overview data"
						append-icon="mdi-chevron-right"
					>
						<OverviewData />
					</v-list-item>
					<v-divider class="my-2" />
					<v-list-item
						title="Manage libraries"
						append-icon="mdi-chevron-right"
					>
						<ManageLibraries />
					</v-list-item>
					<v-divider class="my-2" />
					<v-list-item title="Default library">
						<template v-slot:append>
							<v-select
								v-model="defaultLibrary"
								:items="libraries"
								variant="outlined"
								hide-details
								required
							/>
						</template>
					</v-list-item>
					<v-divider class="my-2" />
					<v-list-item title="Close modal after adding book">
						<template v-slot:append>
							<v-switch
								v-model="closeModalAfterAddingBook"
								color="primary"
								hide-details
								inset
							/>
						</template>
					</v-list-item>
					<v-divider class="my-2" />
					<v-list-item
						title="Delete books"
						class="text-red-darken-3"
						append-icon="mdi-chevron-right"
					>
						<DeleteBooks />
					</v-list-item>
				</v-list>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const store = useAppStore()

const libraries = computed(() => store.getLibraries)
const settingsMenu = ref(false)

const defaultLibrary = computed({
	get() {
		return store.getDefaultLibrary
	},
	set(value) {
		store.setDefaultLibrary(value)
	}
})

const closeModalAfterAddingBook = computed({
	get() {
		return store.getCloseModalAfterAddingBook
	},
	set(value) {
		store.setCloseModalAfterAddingBook(value)
	}
})
</script>
