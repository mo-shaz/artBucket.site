<script lang="ts">

    // The API URL
    import { api, productsArray } from "../stores.js"

    // Transition
    import { fade, fly } from "svelte/transition"

    // Delete product component
    import DeleteProduct from "./DeleteProduct.svelte"
    let deleteProduct

    let shown = false;
    
    // an object to hold the details
    let preDetails = {
        name: "",
        image: "",
        description: "",
        price: ""
    }

    // for deleting the product
    let deleteId: number

    // an object for the server response
    let serverResponse: object

    // function that gets the details
    const getProductDetails = async (productId) => {

        let response = await fetch(`${$api}/product/${productId}`, {
            method: 'GET',
            mode: 'cors'
        })

        // JSONify
        const data = await response.json()
        return data
    }

    
    // show the modal
    export async function show(productId) {

        // show the modal
        shown = true; 

        // this is for the delete button
        deleteId = productId

        // make the fetch request
        const data = await getProductDetails(productId)

        // check the reponse
        if (data.error) return serverResponse = "error"
    
        // if success
        serverResponse = data.success

        // fill out them fields
        preDetails.name = serverResponse.name
        preDetails.description = serverResponse.description
        preDetails.image = serverResponse.image
        preDetails.price = serverResponse.price
        
    }

    export function hide() {
        shown = false;
    }

</script>

{#if shown}

    <div class="modal-wrap" transition:fade="{{ duration: 100 }}">
        <div class="modal" transition:fly="{{ y: 100, duration: 200 }}">
            <div class="productInfo">
                <img class="image" src={preDetails.image} alt="product image">
                <h3 class="name">{preDetails.name}</h3>
                <p class="description">{preDetails.description}</p>
                <h4 class="price">starting from: <span>&#x20b9;{preDetails.price}/-</span></h4>
                <button class="btn btn-delete" on:click={ () => deleteProduct.show(deleteId) }>delete</button>
            </div>
            <button class="btn" on:click= { () => hide() }>close</button>
        </div>
    </div>

    <DeleteProduct bind:this={deleteProduct} />

{/if}


<style>

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
        padding: 1rem;
        margin: 0;
        max-width: 80vw;
        max-height: 90vh;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    .productInfo {
        background: #FFF;
        padding: 10px;
        border-radius: 6px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
        margin: .5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 90%;
    }

    .description {
        font-size: 95%;
        font-style: italic;
        margin-top: 0;
        margin-bottom: 0;
        margin-right: auto;
    }

    .name {
        margin: 10px;
        text-decoration: underline;
    }

    .image {
        height: 100%;
        width: 100%;
        max-width: 300px;
        max-height: 300px;
        object-fit: cover;
        border-radius: 6px;
        margin: 0 .5rem;
    }

    .price {
        margin-top: 5px;
        margin-bottom: 5px;
        font-weight: 400;
        background: rgba(0, 0, 0, 0.6);
        border-radius: .5rem;
        padding: .25rem;
        color: white;
        align-self: flex-start;
    }

    .price span {
        color: gold;
    }

    .btn {
        border-radius: .25rem;
        width: 95%;
        color: white;
        background: #2F2F2F;
        border: 1px solid black;
        cursor: pointer;
        transition: all 200ms;
        margin: .5rem;
    }

    .btn:hover {
        color: black;
        background: white;
    }

    .btn-delete {
        background-color: tomato;
        border: 1px solid tomato;
        width: 100%;
    }

    .btn-delete:hover {
        color: tomato;
    }

    @media screen and (min-width: 500px) {
        .modal {
            max-width: 400px;
        }
    }

</style>
