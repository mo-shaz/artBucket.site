<script lang="ts">

    // Transition
    import { fade, fly } from "svelte/transition"

    // The api and reactive product image store variables
    import { api, addProductImage, reactiveId, productsArray } from "../stores.js"

    // The loading Modal
    import Modal from "./Modal.svelte"
    import Loading from "./Loading.svelte"
    let modal

    // the Uppy widget
    import ProductImage from "./ProductImage.svelte"
    let productImage

    // The Modal toggle variable
    let shown = false

    // an object to be sent to the server
    let uppyClient: object

    // funtions that toggle the Modal
    export function show() {

        // set the data to be sent to the server for image filename
        uppyClient = {
            productId: `${$reactiveId}_${$productsArray.length}`
        }

        shown = true
    }

    // the object that holds the form values
    let productDetails = {
        image: "",
        name: "",
        description: "",
        price: "",
    }

    // Objects for input errors
    let errors = {
        image: "",
        name: "",
        description: "",
        price: ""
    }

    let borderError = {
        image: "",
        name: "",
        description: "",
        price: ""
    }

    // an object to hold the server-response
    let serverResponse: object

    // a function to check if a given string is number
    function isNumber(str) {
        return !isNaN(str)
    }

    // fucntion that calls the API
    async function addThisProduct(productDetails) {

        // fetch server please
        let response = await fetch(`${$api}/product`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productDetails)
        })

        // JSONify
        const data = await response.json()
        return data
    }

    // the submit handler
    async function handleSubmit(productDetails) {

        // add the image url seperately, idk it don't work
        productDetails.image = $addProductImage


        // validate the input
        for (let values in productDetails) {

            // before every check, reset the errors
            errors[values] = ""
            borderError[values] = ""
            
            // check the input length for no values and long values
            if (productDetails[values].trim().length < 4) {

                // set the error message
                errors[values] = "too short"

                // set the border coolor
                borderError[values] = "border-error"

            }

            if (productDetails[values].trim().length > 32) {

                // set the error message and border color
                errors[values] = "too long"
                borderError[values] = "border-error"
            }
        }


        // why is this here? the image string can be longer than 32 characters
        errors.image = ""

        // the image link needs special check
        if (productDetails.image.trim().length === 0) errors.image = "an image is necessary"

        // and the description needs to be longer
        if (productDetails.description.trim().length > 32 && productDetails.description.trim().length < 64) {
            
            errors.description = ""
            borderError.description = ""
        }

        // and the price check too
        if (isNumber(productDetails.price) && productDetails.price.trim().length !== 0) {

            // if it is a number, then no error
            errors.price = ""
            borderError.price = ""

            // check if value exceeds limit
            if (Number(productDetails.price) > 32767) {

                errors.price = "too expensive"
                borderError.price = "border-error"
            }

        } else {

            errors.price = "should be a number"
            borderError.price = "border-error"
        }


        // before the post request, make sure there are no errors
        let errorFlag = ""

        for (let values in errors) {

            errorFlag += errors[values]

        }

        if (errorFlag.length === 0) {

            // show the loading Modal
            modal.show()

            // hi APi
            serverResponse = await addThisProduct(productDetails)

            // if the response is success, add the product to the array and hide the modal
            if (serverResponse.success) {

                // append the product to the array
                $productsArray.unshift(serverResponse.success)

                // this is for svelte :p
                $productsArray = $productsArray

                // hide the Modal
                return hide()
            }

            console.log("Hello Dev")
            return console.log(serverResponse) 
        }

    }


    // the hide modal function
    export function hide() {
        shown = false

        // reset the image variable
        $addProductImage = ""

        // also reset the inputs
        for (let values in productDetails) {

            productDetails[values] = ""
            errors[values] = ""
            borderError[values] = ""

        }
    }



</script>

{#if shown}

    <div class="modal-wrap" transition:fade="{{ duration: 100 }}">
        <div class="modal" transition:fly="{{ y: 100, duration: 200 }}">

            <div class="image-container">
                {#if $addProductImage}
                    <img src={$addProductImage} alt="productImage" class="image" on:click={() => productImage.show(uppyClient)}> 
                {:else}
                    <img src="../static/add-image.png" alt="addImage" class="image" on:click={() => productImage.show(uppyClient)}>
                    <span>click to add image</span>
                    <span class="error">{errors.image}</span>
                {/if}
            </div>

            <form class="form-body" on:submit|preventDefault={ handleSubmit(productDetails) }>

                <label for="name">name
                    <span class="error">{errors.name}</span>
                </label>
                <input type="text" class="input-box {borderError.name}" bind:value={productDetails.name}>

                <label for="description">description
                    <span class="error">{errors.description}</span>
                </label>
                <input type="text" class="input-box {borderError.description}" bind:value={productDetails.description}>

                <label for="price">price
                    <span class="error">{errors.price}</span>
                </label>
                <input type="text" class="input-box {borderError.price}" bind:value={productDetails.price}>

                <div class="buttons">
                    <input class="btn" type="submit" value="add">
                    <input class="btn btn-cancel" type="button" value="cancel" on:click={() => hide()}>
                </div>

            </form>

        </div>
    </div>

    <ProductImage bind:this={productImage} />
    
    <Modal bind:this={modal}>
        {#if serverResponse}
            {#if serverResponse.error}
                <h3>oops!</h3>
                <span class="cross-mark">&times;</span>
                <h4>something bad happened</h4>
            {/if}
        {:else}
            <Loading/>
        {/if}
    </Modal>

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
        width: 100%;
    }

    .form-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .input-box {
        border-radius: 10px;
        margin-top: .25rem;
        margin-bottom: 2px;
        width: 100%;
    }

    .input-box:focus {
        outline: 2px solid black;
    }
    
    .error {
        float: right;
        padding: 0px 7px 0px 7px;
        font-weight: 300;
        color: red;
    }

    .border-error {
        outline: 2px solid red;
    }

    .buttons {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-top: .25rem;
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

    .image-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1rem 0;
    }

    .image {
        max-width: 125px;
        max-height: 125px;
        object-fit: cover;
    }

    .cross-mark {
        transform: scale(2.5);
        color: orangered;
    }


    @media screen and (min-width: 500px) {
        .modal {
            max-width: 500px;
        }
    }

</style>
