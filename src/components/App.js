import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { ethers } from 'ethers'

// Components
import Navigation from './Navigation'
import Info from './Info'

// ABIs
import TOKEN_ABI from '../abis/Token.json'
import CROWDSALE_ABI from '../abis/Crowdsale.json'

import config from '../config.json'

function App() {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)

  const [isLoading, setIsLoading] = useState(true)

  const loadBlockchainData = async () => {
    // Initiate provider
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    // Initiate contracts
    const token = new ethers.Contract(
      config['1337'].token.address,
      TOKEN_ABI,
      provider
    )
    console.log(token.address)

    // Set account
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account)

    setIsLoading(false)
  }

  useEffect(() => {
    if (isLoading) {
      loadBlockchainData()
    }
  }, [isLoading])

  return (
    <Container>
      <Navigation />
      <hr />
      {account && <Info account={account} />}
    </Container>
  )
}

export default App
