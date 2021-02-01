<script>
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import Navbar from "./components/Navbar.svelte";
</script>

<Navbar />
<main>
  <Router {routes} />
</main>

<style>
  main {
    @apply m-2;
  }  
</style>