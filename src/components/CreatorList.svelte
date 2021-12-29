<script lang="ts">

    // The API URL
    import { api } from "../stores.js"

    // data to be fetched from the server
    let data = {}

    // fetch data from the server
    const fetchData = async () => {

        const response = await fetch(`${$api}/creators`, {
            method: 'GET',
            mode: 'cors'
        })

        // JSONify
        const serverResponse = await response.json()

        // Transfer the data
        data = await serverResponse
    }

    // call the server
    fetchData()

    const clickHandler = (id) => {

        // go to their page
        window.location.assign(`/creator/${id}`)
    }


</script>


{#if !data.success}

    {#each {length: 4} as _}
        <div class="card-container">
            <div class="image skeleton"></div>
            <div class="line-container">
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
            </div>
        </div>
    {/each}

{:else}

    {#each data.success as creator}
        <div class="card-container" on:click={() => clickHandler(creator.id)}>
            <img src={creator.profile} class="image" alt="creator">
            <div class="line-container">
                <h3>{creator.store_name}</h3>
                <h5 class="name">({creator.user_name})</h5>
                <p class="description">{creator.title}</p>
            </div>
        </div>
    {/each}

{/if}


<style>

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .card-container {
        display: flex;
        width: 97%;
        justify-content: space-between;
        margin: .5rem .25rem;
        padding: .25rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
        cursor: pointer;
    }

    .image {
        min-width: 125px;
        min-height: 125px;
        max-width: 125px;
        max-height: 125px;
        object-fit: cover;
    }

    .name {
        margin-bottom: .25rem;
    }

    .description {
        font-size: 95%;
        font-weight: 500;
    }

    .line-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-left: .125rem;
        padding: 0 .25rem;
        position: relative;
    }

    .skeleton {
        animation: skeleton-loading 1s linear infinite alternate;
    }

    .skeleton-text {
        width: 100%;
        height: .5rem;
        margin-bottom: .25rem;
        border-radius: .125rem;
    }

    @keyframes skeleton-loading {
        0% {
            background-color: hsl(200, 20%, 70%);
        }

        100% {
            background-color: hsl(200, 20%, 95%)
        }
    }

</style>
