import "./SyncButton.css"
function SyncButton() {
    const API_URL = "http://localhost:3000";
    async function handleClick() {
        try {
            const response = await fetch(`${API_URL}/sync`, {
                method: "POST",
                header: {
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                throw new Error("Synchronization failed!")
            }

            alert("Synchronization successfull!")
            window.location.reload();
        }
        catch (err) {
            console.assert(err.message);
        }
    }

    return <button className="syncButton" onClick={handleClick}>Sync with Github</button>
}

export default SyncButton;