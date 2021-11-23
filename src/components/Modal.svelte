<script lang="ts">
    
    // The toggle variable
    let shown = false;

    // Function to show the Modal
    export function show() {
        shown = true;
    }
    
    // Function to hide the Modal
    export function hide() {
        shown = false;
    }
    
</script>

{#if shown}

    <div class="modal-wrap">
        <div class="modal">
            <span class="close-btn" on:click={() => hide()}>&times;</span>
            <slot />
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
        padding: 0;
        margin: 0;
        border-radius: 10px;
        max-width: 69vw;
        width: 500px;
        max-height: 60vh;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .close-btn {
        font-size: 1.5rem;
        padding-right: 7px;
        align-self: flex-end;
        cursor: pointer;
    }

    .close-btn:hover {
        font-weight: bold;
    }

</style>
