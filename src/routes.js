import Home from './components/Home.vue'
import Edit from './components/Edit.vue'
import ViewCharacter from './components/ViewCharacter.vue'
import CharacterForm from './components/CharacterForm.vue'
import { createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: Home},
  { path: '/edit', name: 'edit', component: Edit},
  { path: '/create', name: 'create', component: CharacterForm},
  { path: '/view', name: 'view', component: ViewCharacter}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router