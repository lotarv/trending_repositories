import './Header.css'
import SyncButton from '../SyncButton/SyncButton';
function Header(){
    return <div className = "header">
        <h1>Github trending repositories</h1>
        <SyncButton></SyncButton>

    </div>
}

export default Header;