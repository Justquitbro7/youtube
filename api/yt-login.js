export default function handler(req, res) {
    const clientId = process.env.YOUTUBE_CLIENT_ID;
    const redirectUri = process.env.YOUTUBE_REDIRECT_URI;
    
    // We are asking Google for permission to read their YouTube account (Read Only)
    const scope = encodeURIComponent('https://www.googleapis.com/auth/youtube.readonly');
    
    // Build the official Google pop-up window link
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    
    // Send the user to the pop-up
    res.redirect(authUrl);
}
