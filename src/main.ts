/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import { initializeApp } from 'firebase/app'

// Composables
import { createApp } from 'vue'
import { firebaseConfig } from './configs/firebase'

const app = createApp(App)

initializeApp(firebaseConfig)

registerPlugins(app)

app.mount('#app')
