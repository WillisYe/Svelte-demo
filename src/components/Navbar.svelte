<script>
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
</script>

<nav class="flex items-center justify-between flex-wrap">
  <div class="flex items-center flex-shrink-0 text-white sm:mr-12">
    <img src="favicon.svg" alt="logo" class="h-8 w-8 mr-2" />
    <span class="font-semibold text-sm tracking-tight">+</span>
    <svg
      class="fill-current h-8 w-8 mx-2"
      width="54"
      height="54"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45
        3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8
        0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8
        13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8
        7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45
        4.05z"
      />
    </svg>
    <span class="font-semibold text-sm tracking-tight mr-2">+</span>
    <span class="font-semibold text-xl tracking-tight">SPA</span>
  </div>
  <div class="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
    <div class="text-sm sm:flex-grow">
      <a
        href="/"
        class="block mt-4 sm:inline-block sm:mt-0 text-indigo-100 hover:text-white mr-4 nav-link"
        use:link
        use:active
      >
        Todo
      </a>
      {#if import.meta.env.DEV}
        <a
          href="/hello/"
          class="block mt-4 sm:inline-block sm:mt-0 text-indigo-100
        hover:text-white font-light mr-4 nav-link"
          use:link
          use:active={{ path: "/hello/*" }}
        >
          uniapp
        </a>
      {/if}

      <a
        href="/random"
        class="block mt-4 sm:inline-block sm:mt-0 text-indigo-100
        hover:text-white nav-link"
        use:link
        use:active
      >
        shape
      </a>
    </div>
  </div>
</nav>

<style>
  :global(a.active) {
    @apply text-white font-semibold;
  }

  nav {
    @apply bg-indigo-500 p-6;
  }

  .nav-link {
    @apply text-lg uppercase;
  }
</style>
