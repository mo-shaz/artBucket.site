<script lang="ts">

    // Transition
    import { fade } from "svelte/transition"

    // The API URL and the reactive products array
    import { api, productsArray } from "../stores.js"

    // for the server
    let productId: number

    // function that handles the delete request
    const deleteProduct = async (productId) => {

        let response = await fetch(`${$api}/product/${productId}`, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include'
        })

        // JSONify
        const data = await response.json()

        // check response status
        if (data.error) return console.log('Oops! something went wrong.')

        /*
         *      TO: Future Me
         *
         *      FIND A MORE REACTIVE WAY PLEASE
         *
         *      Thanks
         *                                          */
            
        // else, reload the window.
        return window.location.reload()

    }

    // toggle the modal
    let shown = false

    export function show(deleteId) {

        // set the id variable
        productId = deleteId

        shown = true
    }

    function hide() {
        shown = false
    }

</script>

{#if shown}

    <div class="modal-wrap" transition:fade="{{ duration: 100 }}">
        <div class="modal" transtion:fade="{{ duration: 100 }}">
            <h4>confirm to delete the product</h4>
            <div class="buttons">
                <button class="btn" on:click={() => deleteProduct(productId)}>yes</button>
                <button class="btn btn-cancel" on:click={() => hide()}>no</button>
            </div>
        </div>
    </div>

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
    }

    .buttons {
        display: flex;
        justify-content: space-evenly;
    }

    .btn {
        width: 48%;
        color: white;
        background-color: teal;
        border: 1px solid teal;
        border-radius: .5rem;
        transition: all 200ms;
    }
    
    .btn-cancel {
        background-color: tomato;
        border: 1px solid tomato;
    }

    .btn:hover {
        color: black;
        background-color: white;
        border: 1px solid white;
    }

</style>
