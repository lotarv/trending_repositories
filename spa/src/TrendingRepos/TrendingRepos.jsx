import { useEffect, useState } from "react";
import {FaStar} from "react-icons/fa"
import "./TrendingRepos.css"
function TrendingRepos(){
    const [repos, setRepos] = useState([]);
    const [showCount, setShowCount] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const API_URL = "http://localhost:3000"
    useEffect(() => {
        async function fetchRepos() {
            try {
                const response = await fetch(`${API_URL}/repositories`);
                if (!response.ok) {
                    throw new Error(`Error while fetching data: ${response.status}`)
                }
                const data = await response.json();
                setRepos(data);
                setLoading(false);
            }
            catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchRepos();
        console.log(repos);
    }, [])

    if (loading) {
        return <div>Loading data...</div>
    }

    if (error) {
        return <div>An error occured: {error.message}</div>
    }
    return <div className="trending">
        <h3>The most starred repositories on github:</h3>
        <ol className = "topList">
            {
                repos.slice(0,showCount).map(repo => (<li key = {repo.id}>{repo.name}: <FaStar className="star-icon" /> {repo.stars}</li>))
            }
        </ol>
        <button className="showMoreButn" onClick={() => setShowCount(s => s + 10)}>Show more</button>
    </div>
}

export default TrendingRepos;