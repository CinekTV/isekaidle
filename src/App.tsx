import { useEffect, useState } from "react";

const CLIENT_ID = "f445ae0a1557916009468081d36fd0ff"; // Replace with your MyAnimeList Client ID

interface Anime {
    id: number;
    title: string;
    synopsis: string;
    main_picture: { medium: string; large: string };
}

const App = () => {
    const [anime, setAnime] = useState<Anime | null>(null);
    const [loading, setLoading] = useState(true);
    const animeId = '5114'; // Example anime ID (Fullmetal Alchemist: Brotherhood)

    useEffect(() => {
        const fetchAnimeDetails = async () => {
            try {
                const response = await fetch(
                    `https://api.myanimelist.net/v2/anime/${animeId}`,
                    {
                        headers: {
                            "X-MAL-CLIENT-ID": CLIENT_ID, // API Key Header
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setAnime(data);
            } catch (error) {
                console.error("Failed to fetch anime details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeDetails();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!anime) return <p>Anime not found.</p>;

    return (
        <div className="anime-card" style={{ textAlign: "center", padding: "20px" }}>
            <h1>{anime.title}</h1>
            <img src={anime.main_picture.large} alt={anime.title} style={{ width: "200px", borderRadius: "10px" }} />
            <p>{anime.synopsis}</p>
        </div>
    );
};

export default App;
