<script lang="ts">  

    // The Modal to show data is being processed
    import Modal from '../components/Modal.svelte'
    let modal;

    // Loading SVG
    import Loading from "../components/Loading.svelte"

    // For showing response status in the modal
    let response: string;
    let responseMessage: string;
    
    // The stored invite variable 
    import { emailInvite } from '../stores.js'
    let email: string;
    email = $emailInvite;

    // The stores url and api variables
    import { api, checkSpaces } from "../stores.js"

    // The object that holds the form values
    let formValue = {
        email: email,
        userName: "",
        storeName: "",
        title: "",
        password: "",
        confirmPassword: ""
    }   

    // Text Field Error Handling //
    // Object that contains the error messages
    let errors = {
            email: "",
            userName: "",
            storeName: "",
            title: "",
            password: "",
            confirmPassword: ""
        }

    // Object for CSS error highlighting
    let border = {
            userName: "",
            storeName: "",
            title: "",
            password: "",
            confirmPassword: ""
        }

    
    // The API call function
    async function registerToApi(formValue) {

            // Make the request using the JavaScript fetch API
            const responseFromApi = await fetch(`${$api}/register`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValue)
            })

            // Return the response from API and parse it as JSON
            return responseFromApi.json()
        }

    
    // Function to set messages according to response
    async function handleResponse(data) {

            // If response contains errors
            if (data.error) {
                // Show message after a short animation delay
                responseMessage = data.error
                response = "NOT"

            } else if (data.success) {

                response = "OK" 

                    // Redirect to login
                setTimeout(() =>  window.location.replace('/login') , 1500)
            }

        }
    

    // Function that handles the submit
    async function handleSubmit(formValue: object) {
        
        // Reset the Modal state before every submit
        response = ""
        responseMessage = ""
        
        // Check the username length and show appropriate warnings
        for (let value in formValue) {
            
            // Before every check, reset the messages and borders
            errors[value] = ""
            border[value] = ""

            // Length Check
            if (formValue[value].trim().length < 4) errors[value] = "too short"
            if (formValue[value].length > 32) errors[value] = "too long"
        }
        
        // Additional length check for password
        if (formValue.password.length < 8) errors.password = "too short"

        // email length can be upto 64
        if (formValue.email.length > 32 && formValue.email.length < 64) errors.email = ""
        
        // Check if the password fields match
        if (formValue.password !== formValue.confirmPassword) errors.confirmPassword = "mismatch"

        // Additional check for spaces
        if (!checkSpaces(formValue.storeName)) errors.storeName = "no spaces"
        if (!checkSpaces(formValue.password)) errors.password = "no spaces"

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
            registerToApi(formValue)
            .then(data => { handleResponse(data) })
        }
        
    } 

</script>

<svelte:head>
    <title>register: create yourself</title>
</svelte:head>

<body>

    <main class="container">

    {#if email !== ""}

        <div class="heading">
            <h2>be a part of us</h2>
        </div>

        <form class="form-body" on:submit|preventDefault={ handleSubmit(formValue) }>

            <div class="input-body">
                <label class="label" for="email">email
                    <span class="error">{errors.email}</span>
                </label>
                <span class="email">{email}</span>
            </div>

            <div class="input-body">
                <label for="username" class="label">username
                    <span class="error">{errors.userName}</span>
                </label>
                <input type="text" class="text-field {border.userName}" placeholder="what do we call you" bind:value={formValue.userName}>
            </div>

            <div class="input-body">
                <label for="storename" class="label">storename
                    <span class="error">{errors.storeName}</span>
                </label>
                <input type="text" class="text-field {border.storeName}" placeholder="give us a unique name" bind:value={formValue.storeName}>
            </div>

            <div class="input-body">
                <label for="title" class="label">title
                    <span class="error">{errors.title}</span>
                </label>
                <input type="text" class="text-field {border.title}" placeholder="what do you do" bind:value={formValue.title}>
            </div>

            <div class="input-body">
                <label for="password" class="label">password
                    <span class="error">{errors.password}</span>
                </label>
                <input type="password" class="text-field {border.password}" placeholder="make a secret" bind:value={formValue.password}>
            </div>

            <div class="input-body">
                <label for="confirm-password" class="label">confirm password
                    <span class="error">{errors.confirmPassword}</span>
                </label>
                <input type="password" class="text-field {border.confirmPassword}" placeholder="keep it a secret" bind:value={formValue.confirmPassword}>
            </div>

            <div class="input-body">
                <input type="submit" class="button" value="register">
            </div>

        </form>

        <Modal bind:this={modal}>
    
            {#if response == 'OK'}

                <h2 class="heading" style="color: green">welcome artist</h2>
                <p class="modal-message">redirecting you to login page</p>

            {:else if response == 'NOT'}

                <h2 class="heading" style="color: orangered">uh-oh !</h2>
                <p class="modal-message">looks like {responseMessage}</p>

            {:else}

            <h2 class="modal-heading">hold up</h2>
            <Loading/>
            <p class="modal-message">making sure eveything's alright</p>

            {/if}

            </Modal>

    {:else}

        <div class="form-body">

            <h2 class="heading">oops</h2>
            <p class="oops-message">looks like you haven't been invited yet. Don't worry, you can always reach out to any of the existing creators out there if you know them.</p>
            <p class="oops-message">here is a list of creators currently on <span>artBucket.com<span></p>

            <a class="button" href="/creators">explore creators</a>

        </div>

    {/if}

    </main>


</body>


<style>

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10%;
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

    .email {
        font-family: 'Share Tech Mono', monospace;
        color: white;
        background-color: black;
        padding: 2px 9px 2px 9px;
        border-radius: 10px;
    }

    .modal-message, .modal-heading {
        font-family: 'Share Tech Mono', monospace;
        padding: 0;
        margin: 0px 10px;
        text-align: center;
    }

    .oops-message {
        font-family: 'Share Tech Mono', monospace;
        margin-bottom: 20px;
    }

    .oops-message span {
        color: purple;
        font-family: 'Yuji Syuku', 'Share Tech Mono', monospace;
        font-weight: bold;
    }

</style>
