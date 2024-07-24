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
					<v-list-item title="Check overview data">
						<template v-slot:append>
							<v-icon>mdi-chevron-right</v-icon>
						</template>
					</v-list-item>
					<v-divider class="my-2" />
					<v-list-item title="Manage libraries">
						<template v-slot:append>
							<v-icon>mdi-chevron-right</v-icon>
						</template>
					</v-list-item>
					<v-divider class="my-2" />
					<v-list-item title="Choose default library">
						<template v-slot:append>
							<v-icon>mdi-chevron-right</v-icon>
						</template>
					</v-list-item>
					<v-divider class="my-2" />
					<v-list-item
						title="Delete books"
						class="text-red-darken-3"
					>
						<template v-slot:append>
							<v-icon>mdi-chevron-right</v-icon>
						</template>
					</v-list-item>
				</v-list>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
const settingsMenu = ref(false)
</script>
