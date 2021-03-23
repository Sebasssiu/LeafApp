import React, { useContext } from 'react'
import styles from '../styles/styles.module.css'
import SubscriptionCard from '../components/subscriptionCard'
import NavBar from '../components/NavBar'
import { UserContext } from '../App'
import { useHistory } from 'react-router-dom'
import '../styles/globalStyles.css'
import '../styles/aboutUs.css'

const data = [
  "Listen music",
  "Unlimited plays",
  "Unlimited searchs"
]

const Main = () =>{
  const token = useContext(UserContext)
  const history = useHistory()
  return(
    <>
      <NavBar token={token}/>
      <section id="home" className={styles.menu}>
        <h1 className={styles.title}>La música es el vino que llena la copa del silencio</h1>
        {!token.token ? (
          <button className={styles.signup} onClick={() => history.push('/signup')}>
            Join us
          </button>
        ) : (
          <button className={styles.signup} onClick={() => history.push('/search')}>
            Listen now
          </button>
        )
        }
      </section>
      <section id="premium" className={styles.container}>
        <SubscriptionCard 
          name={"Free"}
          topBackground={"rgb(185, 182, 0)"} 
          background={"rgb(255, 254, 190)"}
          subsInfo={data}
          price={"0.00"}
        />
        <SubscriptionCard 
          name={"Premium"} 
          topBackground={"rgb(0, 139, 46)"} 
          background={"rgb(197, 243, 208)"}
          subsInfo={data}
          price={"10.99"}
        />
      </section>
      <section id="aboutUs" className={styles.container}>
        <div className='container' >
          <h1 className='title'>Meet the Leaf Music team</h1>
          <div className='container2'>
            <h2>Donaldo Sebastian Garcia J.</h2>
            <div>
              <h3>Carnet: 19683</h3>
              <a rel="Github" href='https://github.com/Sebasssiu' target='_blank' >Github: Sebasssiu</a>
            </div>
            <h2>Raul Angel Jimenez H.</h2>
            <div>
              <h3>Carnet: 19017</h3>
              <a rel="Github" href='https://github.com/Raulangel51' target='_blank' >Github: Raulangel51</a>
            </div>
            <h2>Oscar Rene Saravia D.</h2>
            <div>
              <h3>Carnet: 19322</h3>
              <a rel="Github" href='https://github.com/oscarsaravia' target='_blank' >Github: oscarsaravia</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Main