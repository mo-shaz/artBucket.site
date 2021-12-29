<script lang="ts">

    import { Router, Route } from "svelte-navigator";
    import NotFound from "./routes/NotFound.svelte";
    import Index from "./routes/Index.svelte";
    import Register from "./routes/Register.svelte";
    import Join from "./routes/Join.svelte";
    import Invites from "./routes/Invites.svelte";
    import Login from "./routes/Login.svelte"
    import Dashboard from "./routes/Dashboard.svelte"
    import Market from "./routes/Market.svelte"
    import ProductDetails from "./routes/ProductDetails.svelte"

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

    <Route path='/dashboard'>
        <Dashboard/>
    </Route>

    <Route path='/marketplace'>
        <Market/>
    </Route>

    <Route path='/product/:id' let:params>
        <ProductDetails id={params.id} />
    </Route>

    <Route path='*'>
        <NotFound/>
    </Route>

</Router>


