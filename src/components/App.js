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
  const [provider, setProvider] = useState(null)
  const [crowdsale, setCrowdsale] = useState(null)

  const [account, setAccount] = useState(null)
  const [accountBalance, setAccountBalance] = useState(0)

  const [price, setPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [tokensSold, setTokensSold] = useState(0)

  const [isLoading, setIsLoading] = useState(true)

  const loadBlockchainData = async () => {
    // Initiate provider
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    // Initiate contracts
    const token = new ethers.Contract(
      config[1337].token.address,
      TOKEN_ABI,
      provider
    )
    const crowdsale = new ethers.Contract(
      config[1337].crowdsale.address,
      CROWDSALE_ABI,
      provider
    )
    setCrowdsale(crowdsale)

    // Fetch account
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account)

    // Fetch account balance
    const accountBalance = ethers.utils.formatUnits(
      await token.balanceOf(account),
      18
    )
    setAccountBalance(accountBalance)

    // Fetch max tokens
    const price = ethers.utils.formatUnits(await crowdsale.price(), 18)
    setPrice(price)

    // Fetch max tokens
    const maxTokens = ethers.utils.formatUnits(await crowdsale.maxTokens(), 18)
    setMaxPrice(maxTokens)

    // Fetch tokens sold
    const tokensSold = ethers.utils.formatUnits(
      await crowdsale.tokensSold(),
      18
    )
    setTokensSold(tokensSold)

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

      {isLoading ? (
        <p className="text-center">loading...</p>
      ) : (
        <p className="text-center">
          <strong>Current Price:</strong> {price} ETH
        </p>
      )}

      <hr />

      {account && <Info account={account} accountBalance={accountBalance} />}
    </Container>
  )
}

export default App
