<template>
  <div class="q-pa-md row">
    <div class="menu" :class="{ show: isMenuOpen, hide: !isMenuOpen }">
      Mes listes :
      <div v-if="!listData.length">
        <p>Vous n'avez pas encore de liste</p>
      </div>
      <div v-else>
        <div v-for="list in listData" :key="list.id">
          <q-btn outlined class="q-my-sm q-mx-sm q-py-sm q-px-sm" color="primary" >{{ list.title }}</q-btn>
          <span label="Delete" @click="deleteList(list._id)"><q-icon name="delete" color="red" /></span>
        </div>
      </div>
    </div>
    <div class="main-content col">
      <h1>
        Hello 👋
      </h1>
      <button @click="isMenuOpen = !isMenuOpen">ToDo</button>
      <div v-if="connected">
        <p>
          You are connected as {{ userData.user.email }}
        </p>
      </div>
      <!-- <p class="text-h2 text-center">Voici la dernière liste ajoutée</p>
      <q-card class="q-mt-md q-ml-md flex-center" v-for="list in lastList" :key="list._id" style="width:50%">
        <q-card-section class="q-py-none q-px-none top-rounded">
          <p class="text-bold q-py-sm q-px-sm top-rounded" style="background-color:rgba(77, 50, 141, 0.61); color:white">{{ list.title }}</p>
          <div v-if="!taskData.length" class="q-py-sm q-px-sm">
            <p>Vous n'avez pas encore de tache</p>
            <q-btn label="Voir ma liste"></q-btn>
          </div>
        </q-card-section>
      </q-card> -->
      <div class="row">
        <div class="col" style="width:25%">
          <q-card class="q-mt-md q-ml-md">
            <q-card-section>
              <h2>Ajouter une liste</h2>
              <q-input label="Titre" type="text" outlined class="q-my-md" v-model="listForm.title" />
              <q-input label="Description" type="text" outlined class="q-mb-md" v-model="listForm.description" />
              <q-btn label="Créer" class="full-width" color="primary" @click="createList"/>
            </q-card-section>
          </q-card>
        </div>
        <div class="col" style="width:25%">
          <q-card class="q-mt-md q-ml-md">
            <q-card-section>
              <h2>Ajouter des taches</h2>
              <q-input label="Titre" type="text" outlined class="q-my-md" v-model="taskForm.activityName" />
              <q-input label="Type d'activité" type="text" outlined class="q-mb-md" v-model="taskForm.activityType" />
              <q-select label="Liste" outlined rounded class="q-mb-md" v-model="taskForm.list" emit-value map-options  :options="listData" option-label="title" option-value="_id" />
              <q-btn label="Créer" class="full-width" color="primary" @click="createTask"/>
            </q-card-section>
          </q-card>
        </div>
        <div class="row" style="width:50%">
        <div class="col">
          <q-card class="q-mt-md q-ml-md">
            <q-card-section>
              <h2>Mes taches</h2>
              <div v-if="!taskData.length">
                <p>Vous n'avez pas encore de tache</p>
              </div>
              <div v-else>
                <div v-for="task in taskData" :key="task.id">
                  <q-btn outlined class="q-my-sm q-mx-sm q-py-sm q-px-sm" color="primary" >{{ task.activityName }}</q-btn>
                  <span label="Done" @click="deleteTask(task._id)">
                    <span v-if="task.activityDone">
                      <q-checkbox color="green" @click="handleUnvalid(task._id)" />
                    </span>
                    <span v-else>
                      <q-checkbox color="red" @click="handleValidate(task._id)" />
                    </span>
                  </span>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<style>
.main-content {
  margin-left: 0;
}

.menu.show + .main-content {
  margin-left: 200px;
}

.top-rounded {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: -200px;
  bottom: 25px;
  width: 200px;
  background-color: rgba(77, 50, 141, 0.61);
  color: #fff;
  transition: left 0.3s ease;
  padding: 15px 0 0 10px;
}
.menu.show {
  left: 0;
  margin-top: 50px;
}
.menu.hide {
  display: none;
}

</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from 'src/stores/user-store'
import { useTaskStore } from 'src/stores/task-store'
import { useListStore } from 'src/stores/list-store'
import { Notify } from 'quasar'

const taskStore = useTaskStore()
const userStore = useUserStore()
const listStore = useListStore()
const isMenuOpen = ref(false)
const connected = computed(() => userStore.isConnected)
const userData = computed(() => userStore.user)
const taskData = computed(() => taskStore.tasks)
const listData = computed(() => listStore.list)
// const lastList = computed(() => listStore.lastList)

// const getTasksData = async () => {
//   console.log(taskData)
// }

const taskForm = ref({
  activityType: '',
  activityName: '',
  activityDescription: 'Default description',
  activityDone: false,
  list: ''
})

const listForm = ref({
  title: '',
  description: ''
})

const createTask = async () => {
  try {
    await taskStore.createTask(taskForm.value)
    Notify.create('Tâche créée')
  } catch (err) {
    console.log(err)
  }
}

const createList = async () => {
  try {
    await listStore.createList(listForm.value)
    Notify.create('Liste créée')
  } catch (err) {
    console.log(err)
  }
}

const deleteList = async (id) => {
  try {
    await listStore.deleteList(id)
    listStore.getLists()
    Notify.create('Liste supprimée')
  } catch (err) {
    console.log(err)
  }
}

const handleValidate = async (id) => {
  try {
    await taskStore.validateTask(id, { activityDone: true })
    taskStore.getTasks()
    Notify.create('Tâche validée')
  } catch (err) {
    console.log(err)
  }
}

const handleUnvalid = async (id) => {
  try {
    await taskStore.validateTask(id, { activityDone: false })
    taskStore.getTasks()
    Notify.create('Tâche non validée')
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await userStore.loadUser()
  await userStore.checkToken()
  await listStore.getLists()
  await taskStore.getTasks()
})

</script>
