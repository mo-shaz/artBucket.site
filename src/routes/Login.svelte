<script lang="ts">

    // The url and api variables from the store
    import { api, checkSpaces } from "../stores.js"

    // Before anything, make a fetch request to API to invalidate the current session
    try {
        const response = fetch(`${$api}/logout`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
        .then((data) => data.json() )
        .then((data) => console.log(data)) 

        } catch (err) {
            console.error(err)
        }

    // The Modal component
    import Modal from '../components/Modal.svelte'
    let modal;
    let responseModal: string;      // to convey the server response in the Modal 
    let responseMessage: string;    // to convey the error message

    // Loading SVG
    import Loading from "../components/Loading.svelte"

    // the formvalue object
    let formValue = {
        email: "",
        password: ""
    }
    
    // the errors object
    let errors = {
        email: "",
        password: ""    
    }

    // border color for invalid fields
    let border = {
        email: "",
        password: ""
    }

    // the function that handles the form-submit
    async function handleSubmit(formValue: object) {
        // Reset the Modal message before submit
        responseModal = ""

        // check the length of the inputs
        for (let value in formValue) {

            // before every check reset the warnings
            errors[value] = ""
            border[value] = ""
            
            // check the lengths
            if (formValue[value].length < 4) errors[value] = "too short" 
            if (formValue[value].length > 32) errors[value] = "too long"
        }
        
        // password length should be atleast 8 characters
        if (formValue.password.length < 8) errors.password = "too short"
        if (!checkSpaces(formValue.password)) errors.password = "no spaces"

        // check if the response is a valid email
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const mailRegExp = new RegExp(pattern)
        
        if (!mailRegExp.test(formValue.email)) errors.email = "invalid format" 

        // Logic to make sure there are no errors before passing the data to server
        let noErrorFlag = 0

        // A loop that makes sure there are no errors
        for (let error in errors) {

            // Adding the border highlighter here :|
            if (errors[error].length !== 0) border[error] = "border-error"
            
            noErrorFlag += errors[error].length
        } 

        // Finally make the API call if everything checks out
        if (noErrorFlag === 0) {

            // Show the loading Modal
            modal.show()

            // Make the API call
            let response = await fetch(`${$api}/login`, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValue)
            })
            
            // JSONify
            response = await response.json()

            // If login succeeds, redirect
            if (response.success) setTimeout(() => { window.location.replace('/dashboard') }, 1000) 

            // If login fails, show warning
            if (response.error) setTimeout(() => { 
                responseMessage = response.error
                responseModal = "NOT" }, 1500) 
            
        }
        
    }

</script>

<svelte:head>
    <title>login: welcome back</title>
</svelte:head>

<body class="container">

        <div class="heading">
            <h2> welcome back</h2>
        </div>

        <form class="form-body" on:submit|preventDefault={ handleSubmit(formValue) }>

             <div class="input-body">
                <label for="email" class="label">email
                    <span class="error">{errors.email}</span>
                </label>
                <input type="text" class="text-field {border.email}" placeholder="email" bind:value={formValue.email}>
            </div>

            <div class="input-body">
                <label for="password" class="label">password
                    <span class="error">{errors.password}</span>
                </label>
                <input type="password" class="text-field {border.password}" placeholder="password" bind:value={formValue.password}>
            </div>

             <div class="input-body">
                <input type="submit" class="button" value="login">
            </div>


        </form>

        <Modal bind:this={modal}>
        {#if responseModal === "NOT"}

            <h2 class="modal-heading">uh-oh</h2>
            <span class="cross-mark">&times;</span>
            <p class="modal-message">{responseMessage}</p>

        {:else}

            <h2 class="modal-heading">hold up</h2>
            <Loading/>
            <p class="modal-message">making sure eveything's alright</p>

        {/if}
        </Modal>

</body>

<style>

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .form-body {
        border: 2px solid black;
        padding: 30px;
        border-radius: 10px;
        background-color: rgba(240, 240, 240, 0.5);
    }

    .input-body {
        margin-top: 7px;
    }

    .label {
        margin-left: 5px;
        margin-bottom: 2px;
        font-weight: bold;
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

    .text-field {
        border-radius: 10px;
        padding: 10px 9px 10px 9px;
        min-width: 250px;
        width: 100%;
    }

    .text-field:focus {
        outline: 2px solid black;
    }

    .button {
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        margin-top: 10px;
        cursor: pointer;
        color: white;
        background-color: black;
        transition: all 200ms;
    }

    .button:hover {
        background-color: yellow;
        color: black;
    }

    .heading, .label, .text-field, .button {
        font-family: 'Share Tech Mono', monospace;
    }

    .heading {
        text-align: center;
        padding: 1rem;
    }

    .modal-message, .modal-heading {
        font-family: 'Share Tech Mono', monospace;
        padding: 0;
        margin: 0px 10px;
        text-align: center;
    }

    .cross-mark {
        padding: 0;
        margin: 20px;
        transform: scale(2.5);
        color: orangered;
    }

</style>
