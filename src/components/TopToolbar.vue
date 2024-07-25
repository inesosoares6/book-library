<template>
	<v-app-bar
		app
		fixed
	>
		<v-toolbar-title>
			<div class="d-flex ga-3 align-center">
				<v-img
					src="../../assets/icon.png"
					max-width="34px"
          style="border-radius: 100%;"
				></v-img>
				Book Library
			</div>
		</v-toolbar-title>
		<v-btn icon>
			<v-icon>mdi-cog</v-icon>
			<SettingsMenu />
		</v-btn>
	</v-app-bar>
</template>

<script setup lang="ts"></script>
