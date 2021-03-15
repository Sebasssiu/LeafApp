import React from 'react'
import styles from '../styles/styles.module.css'
import SubscriptionCard from '../components/subscriptionCard'
import NavBar from '../components/NavBar'
import Button from "@material-ui/core/Button";

const data = [
  "Listen music",
  "Unlimited plays",
  "Unlimited searchs"
]

const Main = () =>{
  return(
    <React.Fragment>
      <NavBar/>
      <div className={styles.menu}>
        <h1 className={styles.title}>La música es el vino que llena la copa del silencio</h1>
        <button className={styles.signup}>
          Join us
        </button>
      </div>
      <div className={styles.container}>
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
      </div>
    </React.Fragment>
  )
}
export default Main