<script lang="ts">

    // Transition
    import { fade } from "svelte/transition"

    // individual Product Modal
    import Product from "../components/Product.svelte"
    let productModal

    // Loading Modal
    import Loading from "../components/Loading.svelte"

    // Invite Modal
    import InviteModal from "../components/InviteModal.svelte"
    let inviteModal

    // the EditProfile component
    import EditProfile from "../components/EditProfile.svelte"
    let editProfile

    // the add product component
    import UploadProduct from "../components/UploadProduct.svelte"
    let uploadProduct

    // API URL and Profile Picture URL
    import { 
        api, 
        reactiveId,
        profileUrl,
        reactiveUserName,
        reactiveStoreName,
        reactiveTitle,
        reactiveWhatsapp,
        reactiveInstagram,
        productsArray
    } from "../stores.js"


    // Dashboard info
    let dashInfo: object

    // Fetch Dashboard Info
    async function fetchDash() {
        
        let response = await fetch(`${$api}/dashboard`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })

        // JSONify
        response = await response.json()
        
        // Check for response type
        if (response.success) {

            // Set the dashInfo object
            const data = response.success
            dashInfo = await data

            // Set the profile details to the store
            // Why? For reactivity
            $reactiveId = dashInfo.id
            $profileUrl = dashInfo.profile
            $reactiveUserName = dashInfo.userName
            $reactiveStoreName = dashInfo.storeName
            $reactiveTitle = dashInfo.title
            $reactiveWhatsapp = dashInfo.whatsapp
            $reactiveInstagram = dashInfo.instagram
            $productsArray = dashInfo.products.reverse()

        } else {

            // redirect to Login
            window.location.replace('/login')            

        }

    }

    // fetch the dashboard data
    fetchDash()

</script>

<svelte:head>
    <title>dashboard: welcome artist</title>
</svelte:head>

<body>

    {#if dashInfo === undefined}

    <div class="modal-wrap" transition:fade="{{ duration: 100 }}">
        <div class="modal" transition:fade="{{ duration: 100 }}">
            <h3>getting your stuff</h3>
            <Loading/>
        </div>
    </div>

    {:else}

    <main class="container">

    <div class="about">
        <a class="the-logo" href="/">aB</a>
        <h3>{$reactiveStoreName}</h3>
        <label for="check" class="check-label"></label>
        <input type="checkbox" id="check" class="check">
        <div class="drop">
	    <li><p on:click={() => editProfile.show()}>edit profile</p></li>
	    <li><p style="color: teal" on:click={() => inviteModal.show()}>send invite</p></li>
                <li><a href="/login">logout</a></li>
        </div>
    </div>
    <div class="info">
        <img class="img" src={$profileUrl} alt="user-profile">
            <div class="posts">
                <h3>{$productsArray.length}</h3>
                <span>products</span>
            </div>
            <div class="visits">
                <h3>{dashInfo.connections}</h3>
                <span>connects</span>
            </div>
    </div>
    <div class="contact">
        <div class="description">
            <h4>{$reactiveUserName}</h4>
            <p style="white-space: pre-line;">{$reactiveTitle}</p>
        </div>
        <div class="logo">
            <img class="wapp-logo" src="../static/whatsapp.svg" alt="whatsapp logo">
            <img class="insta-logo" src="../static/instagram.svg" alt="instagram logo">
        </div>
        <div class="details">
            <span class="whatsapp">{$reactiveWhatsapp}</span>
            <span class="instagram">{$reactiveInstagram}</span>
        </div>
    </div>

    <button class="btn" on:click={() => uploadProduct.show()}>click to add product</button>

    {#if $productsArray.length === 0}
        
        <div class="null">
            <h4>nothing added yet</h4>
        </div>

    {:else}

        <section class="photo-grid">
    
            {#each $productsArray as product}

                <img src={product.image} class="click" alt="a product" on:click={() => productModal.show(product.product_id)}>

            {/each}

        </section>

    {/if}

    <Product bind:this={productModal}>
    </Product>

    <EditProfile bind:this={editProfile}>
    </EditProfile>

    <InviteModal bind:this={inviteModal}>
    </InviteModal>

    <UploadProduct bind:this={uploadProduct}>
    </UploadProduct>

    </main>

    {/if}

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
        align-self: center;
    }

    .about {
        display: flex;
        width: 100%;
        background: white;
        padding: .5rem;
        border-radius: .75rem;
        margin-bottom: .25rem;
	position: relative;
    }

    .about h3 {
        text-align: center;
        margin-left: auto;
    }

    .info {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        background: white;
        border-radius: 1rem;
        padding: .5rem;
    }

    .img {
        width: 90px;
        height: 90px;
        object-fit: cover;
        grid-column: 1/3;
        border-radius: .5rem;
    }

    .posts {
        text-align: center;
        grid-column: 5/6;
        align-self: center;
    }

    .visits {
        text-align: center;
        grid-column: 7/9;
        align-self: center;
    }

    .contact {
        background: white;
        margin-top: .25rem;
        padding: .5rem;
        border-radius: .75rem;
    }

    .logo {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
    }

    .details {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
    }

    .whatsapp {
        grid-column: 1/4;
        justify-self: center;
        margin-top: 5px;
    }

    .instagram {
        grid-column: 5/9;
        justify-self: center;
        margin-top: 5px;
    }

    .insta-logo {
        grid-column: 5/9;
        justify-self: center;
        width: 20px;
        height: 20px;
    }

    .wapp-logo {
        grid-column: 1/4;
        justify-self: center;
        width: 20px;
        height: 20px;
    }

    .description {
        margin-bottom: 1rem;
        border: 1px solid black;
        border-radius: .5rem;
        padding: .5rem;
    }

    .description p {
        font-size: 95%;
    }
    
    .description h4 {
        font-size: 110%;
    } 

    .photo-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1px;
        column-gap: 1px;
        margin-top: .2rem;
        background: rgba(255, 255, 255, .8);
        padding: .05rem;
        border-radius: .25rem;
    }

    .photo-grid img {
        display: block;
        width: 100%;
        height: 125px;
        object-fit: cover;
        background: center / cover no-repeat;
        border-radius: .25rem;
    }


    @media screen and (min-width: 500px) {

        .container {
            max-width: 500px;
        }

    }

    .click {
        cursor: pointer;
    }

    .modal-wrap {
        position: fixed;
        display: grid;
        place-items: center;
        background-color: rgba(0, 0, 0, 0.6);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .modal {
        background-color: white;
        padding: 0;
        margin: 0;
        border-radius: 10px;
        max-width: 69vw;
        width: 500px;
        max-height: 60vh;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Share Tech Mono', monospace;
    }

    .check {
        display: none;
    }

    .check-label {
        width: 25px;
        background-repeat: no-repeat;
        background-image: url('../static/user.svg');
        margin-left: auto;
	cursor: pointer;
    }

    .check:checked ~ .drop {
        display: block;
    }

    .drop {
        display: none;
        position: absolute;
        right: 0;
	top: 2rem;
	background-color: white;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	border-radius: 1rem;
	padding: 1rem;
	list-style: none;
    }

    .drop li {
	padding: .5rem;
	border-radius: .5rem;
	cursor: pointer;
        user-select: none;
    }

    .drop a{
	    color: orangered;
	    text-decoration: none;
    }

    .drop li:hover {
	background-color: #ddd;
    }

    .btn {
        padding: .5rem;
        border-radius: .5rem;
        margin-top: .2rem;
        cursor: pointer;
        background-color: #2F2F2F;
        color: white;
        border: 1px solid #2F2F2F;
        transition: all 200ms;
        user-select: none;
    }

    .btn:hover, .btn:focus {
        background-color: white;
        color: #2F2F2F;
        border: 1px solid white;
    }

    .the-logo {
        font-family: 'Yuji Syuku', 'Share Tech Mono', monospace;
        font-weight: 600;
        line-height: 1rem;
        font-size: 30px;
        color: #2F2F2F;
        transition: all 200ms;
    }

    .the-logo:hover {
        color: purple;
    }

    .null {
        background: white;
        margin: .2rem 0;
        padding: 2rem;
        border-radius: .5rem;
        text-align: center;
    }


    /* if a change to flex-box is needed */
    /**/
    /* .info { */
    /*     display: flex; */
    /*     background: white; */
    /*     border-radius: 1rem; */
    /*     padding: .5rem; */
    /* } */
    /**/
    /* .img { */
    /*     width: 90px; */
    /*     height: 90px; */
    /*     object-fit: cover; */
    /*     border-radius: .5rem; */
    /* } */
    /**/
    /* .posts { */
    /*     text-align: center; */
    /*     align-self: center; */
    /*     margin-left: auto; */
    /* } */
    /**/
    /* .visits { */
    /*     text-align: center; */
    /*     align-self: center; */
    /*     margin-left: auto; */
    /* } */
    /**/

</style>
