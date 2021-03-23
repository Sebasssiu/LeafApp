import React, { useContext, useState, useEffect } from 'react'
import useApi from '../customHooks/useApi'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import '../styles/premium.css'

const Premium = () => {
    const history = useHistory()
    const [missing, setMissing] = useState(true)
    const [link, setLink] = useState('')
    const [bilingInfo, setBillingInfo] = useState(
        {
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
        }
    )
    const token = useContext(UserContext)
    const location = useLocation()
    const { name, price } = location.state
    const data = useApi({
        link: 'user/userData/',
        method: 'POST',
        body: {
            token: token.token
        }
    })

    const handleInputChange = (e) => {
		setBillingInfo({
			...bilingInfo,
			[e.target.name]: e.target.value,
            focus: e.target.name
		})
	}

    const payment = useApi({
        link: link,
        method: 'POST',
        body: {
            token: token.token
        }
    })
    useEffect(() => {
        if (payment.fetchedData.response) history.push('/')
    }, [payment])
    const payClick = () => {
        if (bilingInfo.cvc !== '' && bilingInfo.expiry !== '' && bilingInfo.focus !== '' && bilingInfo.name !== '' && bilingInfo.number !== '') {
            setLink('premium/premiumPay/')
        } else {
            setMissing(false)
        }
    }

    if (data.isLoading) {
        return (
            <div className="billingInfo">
                <div className="loading"/>
            </div>
        )
    } else {
        return (
            <div className="billingInfo">
                { data.fetchedData.isPremium || name==='Free' ? (
                        <>
                            <img src="/bitfinex-leaf.svg" alt="logo" className="logo" />
                            {name==='Free' ? (
                                <h1 className="billingTitle">
                                    You already have this package!
                                </h1>
                            ) : (
                                <h1 className="billingTitle">
                                    You already have this package, go ahead and listen to unlimited music!
                                </h1>
                            )}
                        </>
                    ) : (
                        <div className="billingInfo">
                            <Cards
                                cvc={bilingInfo.cvc}
                                expiry={bilingInfo.expiry}
                                focused={bilingInfo.focus}
                                name={bilingInfo.name}
                                number={bilingInfo.number}
                            />
                            <form action="">
                                <input
                                    type="number"
                                    name="cvc"
                                    placeholder="CVC"
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="date"
                                    name="expiry"
                                    placeholder="Expire Date"
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="number"
                                    name="number"
                                    placeholder="Card Number"
                                    onChange={handleInputChange}
                                />
                            </form>
                            <button onClick={payClick}>Pay ${price}</button>
                            {!missing ? <h1 className='missingData'>Por favor llenar todos los campos.</h1> : (null) }
                        </div>
                    )
                }   
            </div>
        )
    }
}
export default Premium