import dynamic from 'next/dynamic'

const AccountWithoutSSR = dynamic(import('../components/Account'), {
  ssr: false,
})

function Me() {
  return (
    <div>
      <AccountWithoutSSR />
    </div>
  )
}

export default Me
