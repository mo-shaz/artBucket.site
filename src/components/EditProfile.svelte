<script lang="ts">

    // the Modal component to show loading
    import Modal from "./Modal.svelte"
    import Loading from "./Loading.svelte"

    // Uppy image uploader widget
    import ImageUpload from "./UploadImage.svelte"
    let imageUpload

    // to change the state of loading
    let modal

    // to show state of response
    let responseFromServer = {}

    // function to show and hide the modals
    let shown = false

    // object that holds the profile details
    let profileDetails: object

    // an object for the Uppy Image Uploader
    let uppyClient: object


    // function to hide and show the modals on click
    export function hide() {
        shown = false
    }

    export function show(dashInfo) {
        // copy the details
        profileDetails = {
            userName: dashInfo.userName,
            storeName: dashInfo.storeName,
            title: dashInfo.title,
            whatsapp: dashInfo.whatsapp,
            instagram: dashInfo.instagram,
            profile: dashInfo.profile
        }

        // show the Modal
        shown = true

        // set the value for the Uppy thing
        uppyClient = {
            profileId: dashInfo.id
        }
    }

    // variables that handle the input validation error warnings
    let errors = {
        userName: "",
        storeName: "",
        title: "",
        whatsapp: "",
        instagram: ""
    }

    let borderError = {
        userName: "",
        storeName: "",
        title: "",
        whatsapp: "",
        instagram: ""
    }

    // function that handles the submission of data
    async function handleSubmit(profileDetails) {

        // loop that checks the input errors
        for (let values in profileDetails) {

            // before every check, reset the warnings
            errors[values] = ""
            borderError[values] = ""

            // check the lengths of input
            if (profileDetails[values].length < 4) errors[values] = "too short"
            if (profileDetails[values].length > 32) errors[values] = "too long"
        }
        
        // the profile picture do not need to be checked and should not have error
        errors.profile = "" 

        // a variable to indicate if there are no errors at all
        let errorFlag = 0
        
        // now check if error exist and also show border error
        for (let values in errors) {
            if (errors[values].length !== 0) borderError[values] = "border-error"

            // also increment errorFlag
            errorFlag += errors[values].length
        }

        // make API call only if the errorFlag is zero
        if (errorFlag === 0) {
            console.log('YAY')
            window.alert('UPDATED')
        }        
    }

</script>

{#if shown}

    <div class="modal-wrap">
        <div class="modal">
            <div class="profile-view">
                <img class="profile-img" src={profileDetails.profile} alt="profile picture" on:click={() => imageUpload.show(uppyClient)}>
                <div class="inside-view"><p>click on the image to change your profile picture.</p></div>
            </div>
            <form class="form-body" on:submit|preventDefault={ handleSubmit(profileDetails) }>

                <label for="username">username
                    <span class="error">{errors.userName}</span>
                </label>
                <input type="text" class="input-box {borderError.userName}" bind:value={profileDetails.userName}>

                <label for="storename">storename
                    <span class="error">{errors.storeName}</span>
                </label>
                <input type="text" class="input-box {borderError.storeName}" bind:value={profileDetails.storeName}>

                <label for="title">title
                    <span class="error">{errors.title}</span>
                </label>
                <input type="text" class="input-box {borderError.title}" bind:value={profileDetails.title}>

                <label for="whatsapp">whatsapp
                    <span class="error">{errors.whatsapp}</span>
                </label>
                <input class="input-box {borderError.whatsapp}" type="text" bind:value={profileDetails.whatsapp}>

                <label for="instagram">instagram
                    <span class="error">{errors.instagram}</span>
                </label>
                <input class="input-box {borderError.instagram}" type="text" bind:value={profileDetails.instagram}>

                <div class="buttons">
                    <input class="btn" type="submit" value="update">
                    <input class="btn btn-cancel" type="button" value="cancel" on:click={() => hide()}>
                </div>

            </form>
        </div>
    </div>

    <ImageUpload bind:this={imageUpload} />

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

    .profile-view {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .inside-view {
        margin-left: 1rem;
        margin-top: 0;
        border-radius: .5rem;
        background: rgba(0, 0, 0, 0.3);
        text-align: center;
        height: 90px;
        font-size: 90%;
        color: white;
        padding: 0 .5rem;
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
        float: right;
        padding: 0px 7px 0px 7px;
        font-weight: 300;
        color: red;
    }

    .border-error {
        outline: 2px solid red;
    }

    .profile-img {
        width: 90px;
        height: 90px;
        object-fit: cover;
        grid-column: 1/3;
        border-radius: .5rem;
        margin-bottom: 1rem;
        cursor: pointer;
    }


    @media screen and (min-width: 500px) {
        .modal {
            max-width: 500px;
        }
    } 

</style>
