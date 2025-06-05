<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 font-sans p-4">
    <nav class="mb-6">
      <NuxtLink to="/" class="mr-4 text-blue-600 hover:underline">Home</NuxtLink>
      <NuxtLink to="/tasks" class="text-blue-600 hover:underline">Tasks</NuxtLink>
    </nav>
    <NuxtPage />
  </div>
</template>
