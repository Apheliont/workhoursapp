<script lang="ts">
  import { onMount } from "svelte";
  import Navigation from "./components/Navigation.svelte";
  import Db from "./services/Db";
  import routes from "./routes";
  import Router from "svelte-spa-router";

  onMount(Db.init);
</script>

<main>
  <Navigation />
  <Router {routes} />
</main>