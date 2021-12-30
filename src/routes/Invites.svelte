<svelte:head>
    <title>invites: how to get in</title>
</svelte:head>

<body class="container">

    <div class="content">
        <h2>getting invites</h2>

        <p>invites can be given out by creators who are already registered in <a href="/">artBucket</a>. If you need an invite, try contacting them for referrals.</p>

        <a href="/creators" class="btn" style="color: black;">explore creators</a>

        <p>if you are unable to get referrals, don't worry. You can contact us directly at <a href="mailto:artistsaroundyou@gmail.com">artistsaroundyou@gmail.com</a> with an attached link to the profile or page of your business that is on any of the social platforms you're on.</p>
    </div>

</body>

<style>

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center; 
        font-family: 'Share Tech Mono', monospace;
        text-align: left;
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 1rem;
        border-radius: 10px;
        margin: 2rem;
    }

    .content h2 {
        text-align: center;
        color: violet;
        margin: 1rem;
    }

    .content p {
        margin: 1rem;
    }

    .content a {
        color: yellow;
    }

    .btn {
        padding: 10px;
        border-radius: 10px;
        margin: 1rem;
        cursor: pointer;
        background-color: yellow;
        transition: all 200ms;
    }

    .btn:hover {
        background-color: violet;
    }

</style>
