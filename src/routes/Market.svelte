<script lang="ts">

    // ProductList and CreatorList components
    import ProductList from "../components/ProductList.svelte"
    import CreatorList from "../components/CreatorList.svelte"

    // Tab toggle logic
    let toggle = 0
    let pToggle = "toggle"
    let cToggle = ""

    function toProducts() {
        cToggle = ""
        pToggle = "toggle"
        toggle = 0
    }

    function toCreators() {
        pToggle = ""
        cToggle = "toggle"
        toggle = 1
    }

</script>

<svelte:head>
    <title>marketplace: find art and craft</title>
</svelte:head>

<body>
    <main class="container">

        <div class="heading">

            <h3 style="margin-bottom: .25rem;">marketplace</h3>
            <p>explore art and craft</p>

            <div class="nav-container">
                <span class="generic {pToggle}" on:click={() => toProducts()}>products</span>
                <span class="generic {cToggle}" on:click={() => toCreators()}>creators</span>
            </div>

        </div>

        <div class="body">

            {#if toggle === 0}
                <ProductList />
            {:else}
                <CreatorList />
            {/if}

        </div>


    </main>
</body>

<style>

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }

    span {
        transition: all 300ms ease-in-out;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        font-family: 'Share Tech Mono', monospace;
        align-self: center;
        width: 100%;
    }

    .heading {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        background: white;
        padding: 1rem;
        border-radius: .5rem;
        margin: .25rem 0;
    }

    .heading p {
        text-align: center;
        margin-bottom: .5rem;
    }

    .nav-container {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        border-radius: .5rem;
        border: 1px solid black;
    }

    .generic {
        width: 100%;
        text-align: center;
        cursor: pointer;
        padding: .2rem;
    }

    .toggle {
        background: black;
        border-radius: .5rem;
        color: white;
    }

    .body {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        background: white;
        border-radius: .5rem;
    }

    @media screen and (min-width: 500px) {

        .container {
            max-width: 500px;
        }

    }

</style>
