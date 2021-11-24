<script lang="ts">
    import { Router, Route } from "svelte-navigator";
    import Index from "./routes/Index.svelte";
    import Register from "./routes/Register.svelte";
    import Join from "./routes/Join.svelte";
    import Invites from "./routes/Invites.svelte";
    import Login from "./routes/Login.svelte"
</script>

<Router>

    <Route path='/'>
        <Index/>
    </Route>

    <Route path='/register'>
        <Register/>
    </Route>

    <Route path='/join'>
        <Join/>
    </Route>

    <Route path='/invites'>
        <Invites/>
    </Route>

    <Route path='/login'>
        <Login/>
    </Route>

</Router>


