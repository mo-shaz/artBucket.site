<script lang="ts">

    // For animation
    import { tweened } from 'svelte/motion'

    // Animate the count from 0 to the value
    let creatorCount = tweened(0, { duration: 1000 });
    let productCount = tweened(0, { duration: 1000 });
    
    function changeCount(newCount) {

        creatorCount.set(newCount.creatorCount)
        productCount.set(newCount.productCount)
    }

    // Function to fetch the user count from the API
    const getApi = async () => {

        try {

            const response = await fetch('http://localhost:8080/', {
                method: 'GET',
                mode: 'cors',
            })
    
            if (response.ok) {

                // Make sure the response is a success
                const data = await response.json()
                const responseCount = await data.success
                changeCount(responseCount)

            } else {
                console.log({ error: 'no response' })
            }


        } catch (err) {

            // Catch some magic errors
            console.error(err.message)
        }
    }

    getApi()

</script>

<svelte:head>
    <title>artBucket.com: artists around you</title>
</svelte:head>

<body>
    <main class="container">
        <div id="heading">
            <h1>artBucket</h1>
            <h4>an open-source, community-driven and collabarative database of talented artists and craft-creators around you</h4>
        </div>
        <div class="marketplace" id="stats">
            <p>currently home to <strong>{$creatorCount.toFixed(0)}</strong> artists and <strong>{$productCount.toFixed(0)}</strong> products</p>
            <a href="/marketplace" class="button">explore the marketplace</a>
        </div>
        <div class="link-container">
            <p class="invite">want to be a part of us?</p>
            <a href="/join" class="button">join artBucket</a>
            <a href="/dashboard" class="button">login</a>
        </div>
    </main>
</body>

<style>

    @font-face {
        font-family: 'Yuji Syuku';
        src: url(../static/fonts/YujiSyuku-Regular.ttf);
    }

    @font-face {
        font-family: 'Share Tech Mono';
        src: url(../static/fonts/ShareTechMono-Regular.ttf);
    }

    :global(body) {
        background-color: black;
        background-image: url(../static/purple.svg);
        background-attachment: fixed;
    }

    * {
        padding: 0px;
        margin: 0px;
        box-sizing: border-box;
    }
    
    main {
        height: 100%;
        min-height: 100vh;
    }

    h1, h4 {
        text-align: center;
        margin-bottom: 15px;
    }

    h1 {
        color: yellow;
        font-family: 'Yuji Syuku', sans-serif;
    }

    h4 {
        color: white;
        font-family: 'Share Tech Mono', monospace;
    }
    

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }

    .link-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 5vh;
        margin-top: 10vh;
    }
    
    .button {
        align-items: center;
        border: 1px solid yellow;
        border-radius: .25rem;
        box-sizing: border-box;
        color: black;
        background-color: yellow;
        font-family: 'Share Tech Mono', monospace;
        cursor: pointer;
        display: inline-flex;
        font-size: 16px;
        justify-content: center;
        line-height: 1.25;
        margin-top: 8px;
        padding: calc(.5rem - 1px) calc(1.5rem - 1px);
        position: relative;
        text-decoration: none;
        transition: all 200ms;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: baseline;
        width: auto;
    }

    .button:hover, .button:focus {
        color: yellow;
        border-color: black;
        background-color: black;
        transform: translateY(-1px);
    }

    .marketplace {
        display: flex;
        flex-direction: column;
        margin: 13px 10% 13px 10%;
    }

    .marketplace p {
        text-align: center;
    }

    .invite {
        color: white;
        font-family: 'Share Tech Mono', monospace;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 10px;
        border-radius: 10px;
    }

    #heading {
        border: 2px solid beige;
        padding: 13px;
        margin: 13px 10% 13px 10%;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
    }

    #stats p {
        font-family: 'Share Tech Mono', monospace;
        font-weight: bold;
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 10px;
        border-radius: 10px;
    }

    #stats strong {
        color: yellow;
    }

    @media (min-width: 800px) {
        :global(body) {
            background-size: cover;
        }
    }

    @media (max-width: 500px) {
        #heading {
            margin-left: 5%;
            margin-right: 5%;
        }
    }

</style>


