<script lang="ts">

    // the API endppoint url
    import { api } from "../stores.js"

    // for loading Modal
    import Modal from "./Modal.svelte"
    import Loading from "./Loading.svelte"

    let modal

    // to show the reponse in the loading Modal
    let serverResponse = {}

    // for showing and hiding the Modal
    let shown = false

    // for changing the input-box border color when an invalid input is given
    let border = ""
    let errorMessage = ""

    // the data to be sent to the server
    let formValue = {
        inviteEmail: "",
        invitedBy: ""
    }

    // function that performs the necessary input validity checks
    async function handleSubmit(formValue) {

        // reset the border-color, modal-message and error-message
        border = ""
        errorMessage = ""
        serverResponse = {}

        // check the length of input
        if (formValue.inviteEmail.length < 4) {
            errorMessage = "too short"
        
        } else if (formValue.inviteEmail.length > 32) {
            errorMessage = "too long"

        } else {

        // Check if the input is a valid email address
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const mailRegExp = new RegExp(pattern)

        if (!mailRegExp.test(formValue.inviteEmail)) errorMessage = "invalid format"

        }

        // if there are errors, change the border color
        if (errorMessage.length !== 0) return border = "border-error"

        // Start Loading animation
        modal.show()

        // Make the POST request
        let response = await fetch(`${$api}/invite`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValue)
        })
        
        serverResponse = await response.json()        
    }

    // show and hide the Modal
    export function show(invitedBy: string) {
        shown = true

        // set the invited by field(to be sent to the server)
        formValue.invitedBy = invitedBy
    }

    export function hide() {
        shown = false
    }
    
</script>

{#if shown}

    <div class="modal-wrap">
        <div class="modal">
            <form class="form-body" on:submit|preventDefault={ handleSubmit(formValue) }>
                <label class="invite" for="invite">invite via e-mail:</label>
                <input type="text" placeholder="email" class="input-box {border}" bind:value={formValue.inviteEmail}>
                <span class="error">{errorMessage}</span>
                <div class="buttons">
                    <input class="btn" type="submit" value="invite">
                    <input class="btn btn-cancel" type="button" value="cancel" on:click={() => hide()}>
                </div>
            </form>
        </div>
    </div>

    <Modal bind:this={modal}>
        {#if serverResponse.success}
            <h2>woohoo!</h2>
            <p class="tick-mark">&check;</p>
            <p>invite sent successfully</p>
        {:else if serverResponse.error}
            <h2>oops</h2>
            <p class="cross-mark">&times;</p>
            <p>looks like {serverResponse.error}</p>
        {:else}
            <div class="loading-div">
                <h3>running some checks</h3>
                <Loading/>
            </div>
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
    
    .tick-mark {
        padding: 0;
        margin: 20px;
        transform: scale(2.5);
        color: green;
    }

    .cross-mark {
        padding: 0;
        margin: 20px;
        transform: scale(2.5);
        color: orangered;
    }

    h2, h3, p {
        padding: 0;
        margin: 0;
        text-align: center;
    }

    .loading-div {
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
        justify-content: center;
    }

</style>
