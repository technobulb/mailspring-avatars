// New implementation for fetching logos via Brandfetch API
async function getLogo(domain) {
    try {
        const res = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
            headers: {
                'Authorization': `Bearer ${process.env.BRANDFETCH_KEY}`
            }
        });

        const data = await res.json();
        const logo = data.logos?.[0]?.formats?.[0]?.src;
        if (logo) return logo;
    } catch (e) {
        console.error('Error fetching logo:', e);
    }
    return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
}

async getClearbitURL(email, size, cb, tryNext) {
    try {
        const domain = email.split('@')[1];
        const logo = await getLogo(domain);

        // Update the component state with the fetched logo URL
        cb(logo);
    } catch (error) {
        console.error('Failed to fetch Clearbit logo:', error);
        tryNext();
    }
}