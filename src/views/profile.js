import React, { useContext } from 'react'
import '../styles/inputPages.css'
import { UserContext } from '../App'
import useApi from '../customHooks/useApi'
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import { green } from '@material-ui/core/colors';

const Profile = () => {
    const token = useContext(UserContext)
    const data = useApi({
        link: 'user/userData/',
        method: 'POST',
        body: {
            token: token.token
        }
    })

    if (data.isLoading) {
        return (
            <div className="container">
                Is Loading
            </div>
        )
    } else {
        return (
            <div className="container">
                <img src="/bitfinex-leaf.svg" alt="logo" className="logo" />
                <div>
                    <PersonIcon style={{ color: green[500], fontSize: 30}}/>
                    <input 
                        type="text"
                        value = {data.fetchedData.username}
                        readonly
                    />
                </div>
                <div>
                    <h3 className="h3">Is Premium</h3>
                    <input 
                        type="checkbox"
                        checked = {data.fetchedData.isPremium}
                    />
                </div>
                <div>
                    <h3 className="h3">Is Artist</h3>
                    <input 
                        type="checkbox"
                        checked = {data.fetchedData.isArtist}
                    />
                </div>
            </div>
        )
    }
}
export default Profile