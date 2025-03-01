import { useState } from "react";
import "./SearchRepo.css"
function SearchRepo(){
    const [value, setValue] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const API_URL = "http://localhost:3000";
    function handleChange(e) {
        setValue(e.target.value);
    }

    async function handleClick() {
        if (value == '') return;
        try {
            const response = await fetch(`${API_URL}/repositories/${value}`);
            if (!response.ok) {
                setResult(null);
                throw new Error("Error while getting data")
            }
            const result = await response.json();
            console.log(result);
            setResult(result);
        }
        catch(err) {
            console.error(err);
            setError("Repository not found")
        }
        finally { 
            document.querySelector(".result").style.display = "block";
        }
    }

    return <div className="searchRepo">
        <h3>There u can search for a repository</h3>
        <input type="text" placeholder="Enter name or id..." value={value} onChange={(e) => handleChange(e)}/>
        <button onClick={() => handleClick()}>find</button>
        <div className="result">
            {
                result? <div>
                    <p>id: {result.id}</p>
                    <p>name: {result.name}</p>
                    <p>stars: {result.stars}</p>
                    <p>url: <a href={result.url}>{result.url}</a></p>
                </div>: null
            }

            {
                error?
                <p>{error}</p>: null
            }
        </div>
    </div>
}

export default SearchRepo;