<script lang="ts">

    // The invite email string
    let code: string;

    // The stored url and stored api
    import { url, api } from "../stores.js"

    // The stored variable
    import { emailInvite } from "../stores.js"
    $emailInvite = ""

    // The Modal to show loading
    import Modal from "../components/Modal.svelte"
    let modal;

    // Loading SVG
    import Loading from "../components/Loading.svelte"
    
    // For Modal status
    let responseModal: string;

    // For border color to show input error
    let border = ""

    // Function that handles the submit
    async function handleSubmit(code) {

            // Reset the border color and Modal response content
            border = ""
            responseModal = ""
            
            // Input lenght check 
            if (code === undefined || code.length < 4 || code.length > 32) return border = "error" 
    
            modal.show()

            // Send the code to the server and get the email as response
            let response = await fetch(`${$api}/invite`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailInvite: code})
            })
            
            // JSONify the response
            response = await response.json()

            // Check the response 
            if (response.emailInvite) {

                // Check if the response is a valid email
                let pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                const mailRegExp = new RegExp(pattern)

                // If invalid, set the Modal to show message
                if (!mailRegExp.test(response.emailInvite)) return setTimeout(() => { responseModal = "NOT" }, 1500)
                
                
                // Set the code as the session-storage variable for the register page to access
                $emailInvite = response.emailInvite 
    
                setTimeout(() => {
                    // Set the modal message accordingly
                    responseModal = "OK"

                    // Redirect to the register page
                    setTimeout(() => window.location.replace(`${$url}/register`), 2000)
                    
                    }, 1500)
                

            } else {
                
                // Alert the user if some other error occurs
                responseModal = "ERROR"
            }
        }

</script>

<svelte:head>
    <title>invite: join artBucket</title>
</svelte:head>

<body class="container">

        <div class="heading">
            
        <h2>join artBucket</h2>
        <br>
        <p>currently we are only able to on-board new creators via invite. We hope to make changes to this in the near future.</p>
        <br>
        <a href="/invites">how to get an invite?</a>

        </div>
        <div class="input">
            <span>enter your invite code:</span>
            <div class="submit">
                <input type="text" for="invite" class="input-box {border}" bind:value={code}>
                <button class="btn" on:click={ handleSubmit(code) }>join</button>
            </div>
        </div>

        <Modal bind:this={modal}>

            {#if responseModal === "OK"}

                <h2 class="modal-heading">perfect</h2>
                <span class="tick-mark">&check;</span>
                <p class="modal-message">redirecting you to the register page</p>

            {:else if responseModal === "NOT"}
    
                <h2 class="modal-heading">oops</h2>
                <span class="cross-mark">&times;</span>
                <p class="modal-message">seems like invalid code</p>

            {:else if responseModal === "ERROR"}

                <h2 class="modal-heading">oops, sorry about that</h2>
                <span class="error-mark">&#9888;</span>
                <p class="modal-message">our servers messed up, please try again</p>

            {:else}

            <h2 class="modal-heading">hold up</h2>
            <Loading/>
            <p class="modal-message">checking the code</p>

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

    .heading {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        padding: 1rem;
        color: white;
    }

    .heading h2 {
        color: yellow;
    }

    .heading a {
        color: skyblue;
    }

    .heading, .input {
        text-align: center;
        font-family: 'Share Tech Mono', monospace;
        margin: 1rem;
    }

    .submit {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin :0.5rem;
        width: 60vw;
        max-width: 400px;
    }

    .input span {
        font-weight: 600;
    }

    .btn {
        cursor: pointer;
        background-color: black;
        color: white;
        padding: 7px;
        margin: .5rem;
        border-radius: 10px;
        border-color: black;
        transition: all 200ms;
    }
    
    .btn:hover {
        background-color: white;
        color: black;
        border-color: white;
    }

    .input-box {
        padding: 7px;
        border-radius: 10px;
        text-align: center;
    }

    .input-box:focus {
        outline: 2px solid black;
    }

    .modal-heading, .modal-message {
        font-family: 'Share Tech Mono', monospace;
        padding: 0;
        margin: 0px 10px;
        text-align: center; 
    }

    .error {
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

    .error-mark {
        padding: 0;
        margin: 20px;
        transform: scale(2);
        color: red;
    }

</style>
