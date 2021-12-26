<script lang="ts">

    // the API and reactive userName
    import { api, reactiveStoreName } from "../stores.js"

    // Transition
    import { fade } from "svelte/transition"

    // for Toggling the component
    let shown = false

    export function show() {

        shown = true
    }


    // the confirmation storeName variable
    let storeName: string

    // input error variables
    let errorMessage = ""
    let border = ""


    // function that makes the api call
    const goodBye = async () => {

        let response = await fetch(`${$api}/profile`, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include'
        })

        // JSONify
        const data = await response.json()

        return data
    }


    // the function that handles the submit
    const handleSubmit = async (storeName) => {

        // reset errors
        errorMessage = ""
        border = ""

        // check if the user input matches the storeName
        if (storeName !== $reactiveStoreName) {
            
            // show error and return 
            errorMessage = "incorrect"
            border = "border-error"
            return        
        }

        // else make an api call
        const serverResponse = await goodBye()
        
        // If server error occurs
        if (serverResponse.error) return console.log('Oops! My bad')

        // if successful, let him/her go 
        return window.location.replace('/')
    }


    // the hide modal function
    function hide() {

        shown = false

        // reset the field
        storeName = ""
        errorMessage = ""
        border = ""
    }

</script>


{#if shown}

    <div class="modal-wrap" transition:fade="{{ duration: 100 }}">
        <div class="modal" transition:fade="{{ duration: 100 }}">
            <form class="form-body" on:submit|preventDefault={ handleSubmit(storeName) }>
                <h4>do you really want to delete your account?</h4>
                <label class="invite" for="invite">enter store-name to confirm:</label>
                <input type="text" placeholder="store-name" class="input-box {border}" bind:value={storeName}>
                <span class="error">{errorMessage}</span>
                <div class="buttons">
                    <input class="btn" type="submit" value="delete">
                    <input class="btn btn-cancel" type="button" value="cancel" on:click={() => hide()}>
                </div>
            </form>
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

    .form-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
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
        background-color: tomato;
        border: 1px solid tomato;
        border-radius: .5rem;
        transition: all 200ms;
    }
    
    .btn-cancel {
        background-color: #2F2F2F;
        border: 1px solid #2F2F2F;
    }

    .btn:hover {
        color: black;
        background-color: white;
        border: 1px solid white;
    }

    .input-box {
        border-radius: 10px;
        margin-top: .25rem;
        margin-bottom: 2px;
    }

    .input-box:focus {
        outline: 2px solid black;
    }

    .error {
        color: red;
        margin-left: auto;
    }

    .border-error {
        outline: 2px solid red;
    }

</style>
