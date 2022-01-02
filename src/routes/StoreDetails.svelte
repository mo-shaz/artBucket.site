<script lang="ts">

    // the URL parameter
    export let name

    // the API URL
    import { api } from "../stores.js"

    // The 404 page
    import NotFound from "./NotFound.svelte"

    // data from the server
    let data = {}

    // for links
    let whatsapp = ""
    let instagram = ""

    // get the data from the server
    const getDetails = async () => {

        const response = await fetch(`${$api}/store/${name}`, {
            method: 'GET',
            mode: 'cors'
        })

        // JSONify and transfer the data to the variable
        data = await response.json()

        if (data.error) return console.log("Oopsies")

        // set the links
        whatsapp = `https://wa.me/${data.success.whatsapp}` 
        instagram = `https://instagram.com/${data.success.instagram}` 

        return
    }

    getDetails();

    // function that records the connections througth the site
    const getConnection = (storeName) => {

        // fetch the API
        fetch(`${$api}/connects/${storeName}`, {
            method: 'GET',
            mode: 'cors'
        })

        // the response is not needed
    }

    // funtion that redirects to the product details page
    const productClick = (id) => {
    
        window.location.assign(`/product/${id}`)
    }

</script>


<svelte:head>
    <title>store: {name}</title>
</svelte:head>

<body>
    <main class="container">

        <div class="heading" style="background-color: #2F2F2F">
            <a style="color: white" href="/">art<span style="color: yellow">Bucket</span></a>
        </div>

        {#if data.success}
            <h4 class="store-name">{data.success.storeName}</h4>
            <div class="store-card">
                <img class="image" src={data.success.profile} alt="profile">
                <div class="details">
                    <p class="user-name">{data.success.userName}</p>
                    <p class="title">{data.success.title}</p>
                </div>
            </div>
            <div class="contact-container">
                <div class="contact">
                    <img class="logo" src="../static/whatsapp.svg" alt="whatsapp logo">
                        <a style="color: teal;" href={whatsapp} on:click={() => getConnection(data.success.storeName)}>{data.success.whatsapp}</a>
                </div>
                <div class="contact">
                    <img class="logo" src="../static/instagram.svg" alt="instagram logo">
                    <a style="color: #E1306C;" href={instagram} on:click={() => getConnection(data.success.storeName)}>{data.success.instagram}</a>
                </div>
            </div>

            {#if data.success.products.length > 0}

                <div class="grid-container">
                    <section class="photo-grid">
                        {#each data.success.products as product}
                            <img src={product.image} alt="product" on:click={() => productClick(product.product_id)}>
                        {/each}
                    </section>
                </div>

            {:else}
                <div class="null-box">
                    <p>art is in the making</p>
                    <img class="null-logo" src="../static/blogging.svg" alt="null logo">
                </div>
            {/if}

        {:else if data.error}

            <NotFound/>

        {:else}

            <div class="skeleton skeleton-text"></div>
            <div class="store-card">
                <div class="skeleton image"></div>
                <div class="details">
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                </div>
            </div>
            <div class="contact-container">
                <div class="contact">
                    <div class="skeleton logo"></div>
                    <div class="skeleton skeleton-text"></div>
                </div>
                <div class="contact">
                    <div class="skeleton logo"></div>
                    <div class="skeleton skeleton-text"></div>
                </div>
            </div>

            <div class="grid-container">
                <section class="photo-grid">
                    {#each {length: 4} as _}
                        <div class="skeleton image-grid"></div>
                    {/each}
                </section>
            </div>

        {/if}

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

    .container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        font-family: 'Share Tech Mono', monospace;
        background: white;
        width: 100%;
        align-items: center;
        border-radius: 6px;
    }

    .heading {
        margin-bottom: .75rem;
        padding: .5rem;
        width: 100%;
        text-align: center;
        border-radius: 6px 6px 3px 3px;
    }

    .heading a {
        font-weight: 600;
        font-size: 20px;
        transition: all 200ms;
        text-decoration: none;
    }    

    .store-name {
        width :95%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
        padding: .5rem;
        text-align: center;
    }

    .user-name {
        font-family: 'Yuji Syuku';
    }

    .store-card {
        width: 95%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
        margin: .25rem 1rem;
        display: flex;
        justify-content: space-between;
    }

    .image {
        min-width: 125px;
        max-width: 125px;
        min-height: 125px;
        margin: .25rem;
    }

    .details {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: .5rem;
    }

    .title {
        font-style: italic;
        margin-top: .25rem;
        white-space: pre-line;
    }

    .contact-container {
        display: flex;
        width: 95%;
        justify-content: space-between;
        padding: 1rem;
        margin: .1rem .5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
    }

    .contact {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 2rem;
    }

    .logo {
        min-width: 20px;
        min-height: 20px;
        max-width: 20px;
        max-height: 20px;
        margin-bottom: .25rem;
    }

    .null-box {
        max-width: 95%;
        min-width: 95%;
        margin: .25rem 1rem .5rem 1rem;
        padding: .5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
        display: flex;
        flex-direction: column;
        align-items: center;
        color: gray;
    }

    .null-logo {
        max-width: 200px;
    }

    .grid-container {
        width: 95%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
        margin-bottom: 1rem;
    }

    .photo-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1px;
        column-gap: 1px;
        margin-top: .2rem;
        background: rgba(255, 255, 255, .8);
        padding: .05rem;
    }

    .photo-grid img {
        display: block;
        width: 100%;
        height: 125px;
        object-fit: cover;
        background: center / cover no-repeat;
        cursor: pointer;
    }

    .skeleton {
        animation: skeleton-loading 1s linear infinite alternate;
    }

    .skeleton-text {
        min-width: 95%;
        height: 1rem;
        margin: .5rem;
        border-radius: .125rem;
    }

    .image-grid {
        display: block;
        width: 100%;
        height: 125px;
        object-fit: cover;
        background: center / cover no-repeat;
        cursor: pointer;
    }

    @keyframes skeleton-loading {
        0% {
            background-color: hsl(200, 20%, 70%);
        }
        100% {
            background-color: hsl(200, 20%, 95%)
        }
    }

    @media screen and (min-width: 500px) {
        .container {
            max-width: 500px;
        }
    }

</style>
