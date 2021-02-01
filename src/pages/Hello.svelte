<script>
  	import { fade } from 'svelte/transition';
  export let params = {};
  let name = "user";
</script>

<div in:fade="{{duration:500}}">
  <h1>Hello {params.name || name}!</h1>
  <p>Change the url to change the name!</p>
</div>