<script lang="ts">  

    let email = 'impostor@amongus.com';

    // The object that holds the form values
    let formValue = {
        userName: "",
        storeName: "",
        title: "",
        password: "",
        confirmPassword: ""
    }   

    // Text Field Error Handling //
    // Object that contains the error messages
    let errors = {
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

    // Function that handles the submit
    function handleSubmit(formValue) {
        
        // Check the username length and show appropriate warnings
        for (let value in formValue) {
            
            // Before every check, reset the messages and borders
            errors[value] = ""
            border[value] = ""

            // Length Check
            if (formValue[value].length < 4) errors[value] = "too short"
            if (formValue[value].length > 32) errors[value] = "too long"
        }
        
        // Additional length check for password
        if (formValue.password.length < 8) errors.password = "too short"
        
        // Check if the password fields match
        if (formValue.password !== formValue.confirmPassword) errors.confirmPassword = "mismatch"
    
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
            window.alert('Less goo!')
        }
        
    } 

</script>

<body>

    <main class="container">

    {#if email}

        <div class="heading">
            <h2>be a part of us</h2>
        </div>

        <form class="form-body" on:submit|preventDefault={ handleSubmit(formValue) }>

            <div class="input-body">
                <label class="label" for="email">email</label>
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

    /* body { */
    /*     min-height: 100vh; */
    /*     height: 100%; */
    /* } */

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10%;
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
