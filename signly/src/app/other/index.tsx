import { Button, Code, Layout, Link, Page, Text } from '@vercel/examples-ui'

import { signIn } from 'next-auth/react'
import { useAccount, useConnect } from 'wagmi'

function Home() {
  const [{ data: connectData }, connect] = useConnect()
  const [{ data: accountData }] = useAccount()
  const metamaskInstalled = connectData.connectors[0].name === 'MetaMask'

  const handleLogin = async () => {
    try {
      const callbackUrl = '/protected'
      if (accountData?.address) {
        signIn('credentials', { address: accountData.address, callbackUrl })
        return
      }
      const { data, error } = await connect(connectData.connectors[0])
      if (error) {
        throw error
      }
      signIn('credentials', { address: data?.account, callbackUrl })
    } catch (error) {
      window.alert(error)
    }
  }

  return (
    <Page>
      <section className="flex flex-col space-y-4 gap-6">
        <Text variant="h1">Web3 Sessions with NextAuth.js</Text>
        <Text>
          In a decentralized application, a user is often identified by a
          Cryptocurrency wallet such as{' '}
          <Link href="https://metamask.io/" target="_blank">
            Metamask
          </Link>
          . However, since Metamask works by injecting a script into the page,
          it is only available on the client, cutting off the ability to use{' '}
          <Code>getServerSideProps</Code> to fetch user data.
        </Text>
        <Text>
          We can solve this by pairing a{' '}
          <Link href="https://next-auth.js.org/" target="_blank">
            NextAuth.js
          </Link>{' '}
          session with a convenient hooks library called{' '}
          <Link href="https://github.com/tmm/wagmi" target="_blank">
            WAGMI
          </Link>
          . We will need to configure NextAuth.js with the{' '}
          <Code>CredentialsProvider</Code>:
        </Text>


        {metamaskInstalled ? (
          <>
            <Text>Try it by logging in!</Text>
            <Button onClick={handleLogin}>Login</Button>
          </>
        ) : (
          <>
            <Text>
              {' '}
              Please install{' '}
              <Link href="https://metamask.io/" target="_blank">
                Metamask
              </Link>{' '}
              to use this example.
            </Text>
          </>
        )}
      </section>

      <hr className="border-t border-accents-2 my-6" />
    </Page>
  )
}

Home.Layout = Layout

export default Home
