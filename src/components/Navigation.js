import Navbar from 'react-bootstrap/Navbar'

import { ReactComponent as Logo } from '../logo.svg'

const Navigation = () => {
  return (
    <Navbar>
      <Logo alt="logo" className="d-inline-block align-top mx-3" />
      <Navbar.Brand href="#">Jan ICO Crowdsale</Navbar.Brand>
    </Navbar>
  )
}

export default Navigation
