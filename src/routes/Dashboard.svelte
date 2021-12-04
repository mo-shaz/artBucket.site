<script lang="ts">
    import Product from "../components/Product.svelte"
    let product;
    const postDetails = {
        name: "a Blue Orange",
        price: "healthy kidney",
        desc: "nothing fancy, not tasty, diarrhea",
        image: "yay"
    }
</script>

<svelte:head>
    <title>dashboard: welcome artist</title>
</svelte:head>

<body>
    <main class="container">

    <div class="about">
        <h3>fury-store</h3>
    </div>
    <div class="info">
        <img class="img" src="https://images.unsplash.com/photo-1637047692446-7138e684849a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=395&q=80" alt="">
            <div class="posts">
                <h3>7</h3>
                <span>products</span>
            </div>
            <div class="visits">
                <h3>101</h3>
                <span>visits</span>
            </div>
    </div>
    <div class="contact">
        <div class="description">
            <h4>shax</h4>
            <p>frustrated, unemployed engineer</p>
        </div>
        <div class="logo">
            <img class="wapp-logo" src="../static/whatsapp.svg" alt="whatsapp logo">
            <img class="insta-logo" src="../static/instagram.svg" alt="instagram logo">
        </div>
        <div class="details">
            <span class="whatsapp">9995982023</span>
            <span class="instagram">shaz.exe</span>
        </div>
        <button class="btn">edit profile</button>
    </div>

    <section class="photo-grid">
    <img class="click" on:click={ product.show(postDetails) } src='https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'>
    <img class="click" on:click={ product.show(postDetails) } src='https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'>
    <img class="click" on:click={ product.show(postDetails) } src='https://images.unsplash.com/photo-1548032885-b5e38734688a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'>
    <img class="click" on:click={ product.show(postDetails) } src='https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'>
    <img class="click" on:click={ product.show(postDetails) } src='https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'>
    <img class="click" on:click={ product.show(postDetails) } src='https://images.unsplash.com/photo-1548032885-b5e38734688a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'>
    <img class="click" on:click={ product.show(postDetails) } src='https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'>
    <img class="click" on:click={ product.show(postDetails) } src='https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'>
    <img class="click" on:click={ product.show(postDetails) } src='https://images.unsplash.com/photo-1548032885-b5e38734688a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'>
    <img class="click" on:click={ product.show(postDetails) } src='https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'>
    <img class="click" on:click={ product.show(postDetails) } src='https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'>
    </section>

    <Product bind:this={product}>
    </Product>

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
        align-self: center;
    }

    .about {
        background: white;
        padding: .5rem;
        border-radius: .75rem;
        margin-bottom: .25rem;
        text-align: center;
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
        border-radius: 50%;
    }

    .posts {
        text-align: center;
        grid-column: 4/6;
        align-self: center;
    }

    .visits {
        text-align: center;
        grid-column: 6/9;
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

    .btn {
        width: 100%;
        border-radius: 1rem;
        padding: .25rem;
        margin-top: .25rem;
        cursor: pointer;
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
        margin-top: .3rem;
    }

    .photo-grid img {
        display: block;
        width: 100%;
        height: 125px;
        object-fit: cover;
        background: center / cover no-repeat;
    }


    @media screen and (min-width: 500px) {

        .container {
            max-width: 500px;
        }

    }

    .click {
        cursor: pointer;
    }

</style>
