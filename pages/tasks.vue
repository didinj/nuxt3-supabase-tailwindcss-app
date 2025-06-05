<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">📋 Tasks</h1>

    <!-- Add Task Form -->
    <form @submit.prevent="addTask" class="flex mb-6 space-x-2">
      <input
        v-model="newTask"
        type="text"
        placeholder="New task"
        class="flex-1 border rounded px-3 py-2"
        required
      />
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add
      </button>
    </form>

    <!-- Loading or Task List -->
    <div v-if="message" class="mb-4 p-3 rounded bg-green-100 text-green-700">
      {{ message }} 
    </div>
    <div v-if="loading" class="text-gray-500">Loading tasks...</div>
    <div v-else-if="tasks.length === 0" class="text-gray-400 italic">
        No tasks yet. Add one above!
    </div>
    <ul v-else class="space-y-2">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="p-4 bg-white rounded shadow flex justify-between items-center transition hover:shadow-md"
        >
        <div class="flex items-center space-x-3">
            <input
            type="checkbox"
            v-model="task.is_done"
            @change="toggleDone(task)"
            class="h-4 w-4"
            />
            <span :class="{ 'line-through text-gray-400': task.is_done }">
            {{ task.title }}
            </span>
        </div>

        <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500">
            {{ new Date(task.created_at).toLocaleDateString() }}
            </span>
            <button
            @click="deleteTask(task.id)"
            class="text-red-500 hover:text-red-700 text-sm"
            title="Delete"
            >
            🗑️
            </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/composables/useSupabase'

const tasks = ref<any[]>([])
const loading = ref(true)

const fetchTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching tasks:', error)
  } else {
    tasks.value = data
  }

  loading.value = false
}

onMounted(fetchTasks)

const newTask = ref('')

const addTask = async () => {
  if (!newTask.value.trim()) return

  const { data, error } = await supabase
    .from('tasks')
    .insert([{ title: newTask.value, is_done: false }])
    .select()

  if (error) {
    console.error('Error adding task:', error)
    return
  }

  tasks.value.unshift(...data)
  newTask.value = ''

  showMessage('Task added!')
}

const toggleDone = async (task: any) => {
  const { error } = await supabase
    .from('tasks')
    .update({ is_done: task.is_done })
    .eq('id', task.id)

  if (error) {
    console.error('Error updating task:', error)
  }
}

const deleteTask = async (id: string) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting task:', error)
    return
  }

  tasks.value = tasks.value.filter(task => task.id !== id)

  showMessage('Task deleted')
}

const message = ref('')

const showMessage = (text: string) => {
  message.value = text
  setTimeout(() => (message.value = ''), 3000)
}

</script>
