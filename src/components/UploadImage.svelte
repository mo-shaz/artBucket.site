<script lang="ts">

    import Uppy from '@uppy/core'
    import { DashboardModal } from '@uppy/svelte'
    import Instagram from '@uppy/instagram'
    import XHR from '@uppy/xhr-upload'

    // API End-point
    import { api } from "../stores.js"

    // an object for server-side process
    let uppyToServer: object;

    const createUppy = () => {
        return new Uppy({
            restrictions: {
                maxNumberOfFiles: 1,
                allowedFileTypes: ['image/*']
            }
        })
        .use(Instagram, {
            companionUrl: 'https://companion.uppy.io'
        })
        .use(XHR, {
            endpoint: `${$api}/image`,
            method: 'post',
            formData: true,
            fieldName: 'file',
            withCredentials: true,
        })
    }

    let uppy = createUppy() 
    let open = false;

    uppy.on('file-added', (file) => {
        uppy.setFileMeta(file.id, uppyToServer)
    })


    export function show(propDetails) {
        open = true
        uppyToServer = propDetails
    }

</script>

<main>

    <div>
        <DashboardModal 
            uppy={uppy} 
            open={open} 
            props={{
                onRequestCloseModal: () => open = false,
                plugins: ['Instagram']
            }} 
        />
    </div>

</main>

<style global>

    @import "@uppy/core/dist/style.min.css";
    @import "@uppy/dashboard/dist/style.min.css";
    @import "@uppy/drag-drop/dist/style.min.css";
    @import "@uppy/progress-bar/dist/style.min.css";

</style>
