import Image from "next/image"
import Nav from "../nav/nav"
import styles from './header.module.css';

const Header = () => {


  return (
    <header className={styles.header}>
      {/* <Image src='/vercel.svg' alt="logo" layout="fill"/> */}
      <Nav />
    </header>
  )
}

export default Header