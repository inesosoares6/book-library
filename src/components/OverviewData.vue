<template>
	<v-dialog
		v-model="overviewDataDialog"
		activator="parent"
	>
		<v-card class="d-flex flex-column pa-6">
			<v-list>
				<v-list-item
					v-for="(item, key) in overviewData"
					:key="key"
					:title="key.toUpperCase()"
					:class="{ 'mb-2': isLastItem(key) }"
				>
					<template v-slot:append>
						<div
							v-for="(detail, index) in Object.keys(item)"
							:key="index"
							class="d-flex flex-column ml-4 text-center align-center ga-1"
						>
							<v-avatar
								:color="colorMapper(detail[0].toUpperCase())"
								class="font-weight-bold"
							>
								<!-- @vue-ignore -->
								{{ item[detail] }}
							</v-avatar>
							<span class="text-grey">{{ detail }}</span>
						</div>
					</template>
				</v-list-item>
			</v-list>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { colorMapper } from '@/helpers/mappers'
import { OverviewData } from '@/types/AppTypes'

const store = useAppStore()

const overviewDataDialog = ref(false)

const overviewData: ComputedRef<Record<string, OverviewData>> = computed(
	() => store.getOverviewData
)

const isLastItem = (key: string) => {
	const keys = Object.keys(overviewData.value)
	return key !== keys[keys.length - 1]
}
</script>
