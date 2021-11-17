<script lang="ts">
    import { Router, Route } from "svelte-navigator";
    import Index from "./routes/Index.svelte";
    import Register from "./routes/Register.svelte";
</script>

<Router>

    <Route path='/'>
        <Index/>
    </Route>

    <Route path='/register'>
        <Register/>
    </Route>

</Router>


