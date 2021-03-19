import React, { useContext, useState } from 'react'
import useApi from '../customHooks/useApi'
import { UserContext } from '../App'
import { useLocation } from "react-router-dom";
import Cards from 'react-credit-cards';

const Premium = () => {
    const [bilingInfo, setBillingInfo] = useState(
        {
            cvc: '',
            expiry: '',
            focus: 'number',
            name: '',
            number: '',
        }
    )
    const token = useContext(UserContext)
    const location = useLocation()
    const { name, price } = location.state
    console.log(token.token)
    const data = useApi({
        link: 'user/userData/',
        method: 'POST',
        body: {
            token: token.token
        }
    })

    if (data.isLoading) {
        return (
            <div>Is Loading</div>
        )
    } else {
        return (
            <>
                { data.fetchedData.isPremium ? (
                        <div>You already have this package</div>
                    ) : (
                        <div>
                            <Cards
                                cvc={bilingInfo.cvc}
                                expiry={bilingInfo.expiry}
                                focused={bilingInfo.focus}
                                name={bilingInfo.name}
                                number={bilingInfo.number}
                            />
                            <form>
                                <input
                                    type="tel"
                                    name="number"
                                    placeholder="Card Number"
                                />
                            </form>
                        </div>
                    )
                }   
            </>
        )
    }
}
export default Premium