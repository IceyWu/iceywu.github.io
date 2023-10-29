<template>
  <div>
    <NuxtLoadingIndicator
      :height="1"
      color="repeating-linear-gradient(to right,rgba(192,132,252,1) 0%,rgba(248,113,113,1) 50%,rgba(45,212,191,1) 100%)"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
