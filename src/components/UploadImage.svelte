<script lang="ts">

    import Uppy from '@uppy/core'
    import { DashboardModal } from '@uppy/svelte'
    import Instagram from '@uppy/instagram'
    import XHR from '@uppy/xhr-upload'

    // API End-point and Profile Pic URL
    import { api, profileUrl } from "../stores.js"

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

    // add extra data for server process
    uppy.on('file-added', (file) => {
        uppy.setFileMeta(file.id, uppyToServer)
    })

    // get the response url of the image
    uppy.on('upload-success', (file, response) => {
        const httpBody = response.body

        // set the Profile Pic Global Variable
        $profileUrl = httpBody.success
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

    /* @import url('../../public/static/styles/uppy/core.min.css'); */
    /* @import url('../../public/static/styles/uppy/dashboard.min.css'); */

</style>
