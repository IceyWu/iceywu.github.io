<template>
  <div>
    <NavHeader />
    <main :class="$route.name === 'map' ? 'px-0 ' : 'px-7 pt-10 pb-18'">
      <slot />
    </main>
    <!-- <NavFooter /> -->
    <Bg />
  </div>
</template>
