<script lang="ts">

    // the URL parameter
    export let id

    // The API URL
    import { api } from "../stores.js"

    // hold data please
    let details = {}

    // variables for links
    let whatsapp = ""
    let instagram = ""
    let storeLink = ""

    // API call to fetch the data
    const getDetails = async (id) => {

        const response = await fetch(`${$api}/product/${id}`, {
            method: 'GET',
            mode: 'cors'
        })

        const data = await response.json()

        details = await data

        // construct the links
        whatsapp = `https://wa.me/${data.success.storeDetails.whatsapp}/text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20one%20of%20your%20products%20on%20artBucket`
        instagram = `https://instagram.com/${data.success.storeDetails.instagram}`
        storeLink = `/store/${data.success.storeDetails.name}`

        return
    }

    // Make the call
    getDetails(id);


</script>

<svelte:head>
    <title>product: {id}</title>
</svelte:head>

<body>
    <main class="container">

        <div class="heading" style="background-color: #2F2F2F">
            <a style="color: white" href="/">art<span style="color: yellow">Bucket</span></a>
        </div>

        {#if details.success}
            <div class="product-details">
                <img src={details.success.image} alt="poto" class="image">
                <h3 class="name">{details.success.name}</h3>
                <p class="store-name">store: <a href={storeLink}>{details.success.storeDetails.name}</a></p>
                <p class="price">starts from: <span>{details.success.price}</span></p>
                <p class="description">{details.success.description}</p>
            </div>
            
            <span style="margin: 0 auto 0 .75rem">contact the seller on:</span>
            <div class="contact-container">
                <div class="contact">
                    <img class="logo" src="../static/whatsapp.svg" alt="whatsapp logo">
                    <a style="color: teal" href={whatsapp}>{details.success.storeDetails.whatsapp}</a>
                </div>
                <div class="contact">
                    <img class="logo" src="../static/instagram.svg" alt="instagram logo">
                    <a style="color: #E1306C" href={instagram}>{details.success.storeDetails.instagram}</a>
                </div>
            </div>
        {:else}
            <div class="product-details">
                <div class="image skeleton"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
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
        margin-bottom: 1rem;
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

    .product-details {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .image {
        min-width: 300px;
        max-width: 300px;
        min-height: 300px;
        max-height: 300px;
        margin: .25rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
    }

    .name {
        font-size: 120%;
        margin-top: .25rem;
    }

    .store-name {
        margin: 0 auto 0 .75rem;
    }

    .price {
        margin: .5rem auto .5rem .75rem;
        background: rgba(0, 0, 0, 0.6);
        color: white;
        padding: .25rem;
        border-radius: 6px;
    }

    .price span {
        color: gold;
    }

    .store-name a {
        cursor: pointer;
        color: purple;
        font-size: 20px;
        font-family: 'Yuji Syuku';
    }

    .description {
        margin: .5rem auto 1rem .75rem;
        font-style: italic;
        white-space: pre-line;
    }

    .contact-container {
        display: flex;
        width: 95%;
        justify-content: space-between;
        border: 1px solid black;
        padding: 1rem;
        margin: .1rem .5rem .75rem;
        border-radius: 6px;
    }

    .contact {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 2rem;
    }

    .logo {
        max-width: 20px;
        max-height: 20px;
        margin-bottom: .25rem;
    }

     .skeleton {
        animation: skeleton-loading 1s linear infinite alternate;
    }

    .skeleton-text {
        width: 300px;
        height: 1rem;
        margin: .5rem;
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

    @media screen and (min-width: 500px) {
        .container {
            max-width: 500px;
        }
    }


</style>
