<script lang="ts">

    let shown = false;
    
    let preDetails = {
        name: "",
        image: "",
        desc: "",
        price: ""
    }

    export function show(postDetails) {
        // copy the contents of the passed object to the variables
        for (let keys in preDetails) {
            preDetails[keys] = postDetails[keys]
        }
        // show the modal
        shown = true; 
    }

    export function hide() {
        shown = false;
    }

</script>

{#if shown}

    <div class="modal-wrap">
        <div class="modal">
            <div class="productInfo">
                <h3 class="name">{preDetails.name}</h3>
    <img class="image" src='https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'>
    <h4 class="price" >starting from: <span>&#x20b9;{preDetails.price}/-</span></h4>
                <p>{preDetails.desc}</p>
            </div>
            <button class="btn" on:click= { () => hide() }>close</button>
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
        align-items: center;
    }

    .productInfo {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        max-width: 80vw;
        max-height: 90vh;
    }

    .productInfo p {
        font-size: 95%;
        font-style: italic;
        margin-top: 0;
    }

    .name {
        margin-bottom: 5px;
    }

    .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .price {
        margin-top: 5px;
        margin-bottom: 10px;
        font-weight: 400;
        background: rgba(0, 0, 0, 0.6);
        border-radius: .5rem;
        padding: .25rem;
        color: white;
    }

    .price span {
        color: gold;
    }

    .btn {
        border-radius: .25rem;
        width: 100%;
        color: black;
        background: rgba(0, 0, 0, 0.1);
        border: 1px solid black;
        cursor: pointer;
    }

    .btn:hover {
        color: white;
        background: black;
    }

    @media screen and (min-width: 500px) {
        .modal {
            max-width: 500px;
        }
    }

</style>
