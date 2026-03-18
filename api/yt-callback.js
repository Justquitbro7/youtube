export default async function handler(req, res) {
    const { code } = req.query;

    if (!code) return res.status(400).send("Authorization failed: No code returned.");

    try {
        // Trade the secret code for a YouTube Access Token
        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code: code,
                client_id: process.env.YOUTUBE_CLIENT_ID,
                client_secret: process.env.YOUTUBE_CLIENT_SECRET,
                redirect_uri: process.env.YOUTUBE_REDIRECT_URI,
                grant_type: 'authorization_code'
            })
        });

        const data = await response.json();
        
        if (data.access_token) {
            // Send them back to the app with the secure token
            res.redirect(`/?yt_token=${data.access_token}`);
        } else {
            res.status(500).send("Failed to retrieve YouTube token.");
        }
    } catch (error) {
        res.status(500).send("Error during YouTube handshake.");
    }
}
