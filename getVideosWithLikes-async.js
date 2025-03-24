async function getMergedVideos() {
    try {
        const videosPromise = getVideos(); // Essential, must succeed
        const likesPromise = getVideosWithLikes().catch(() => null); // Non-essential, can fail

        const [videos, likes] = await Promise.all([videosPromise, likesPromise]);

        if (!videos) throw new Error("Failed to fetch videos");

        if (likes) {
            // Merge likes into videos by matching video id
            const likesMap = new Map(likes.map(like => [like.videoId, like.likes]));
            return videos.map(video => ({
                ...video,
                likes: likesMap.get(video.id) || 0
            }));
        }

        return videos; // If likes failed, return videos without likes
    } catch (error) {
        console.error("Error fetching videos:", error.message);
        throw error; // Re-throw to let caller handle it
    }
}

// Usage
getMergedVideos()
    .then(console.log)
    .catch(() => console.log("Could not fetch videos"));
