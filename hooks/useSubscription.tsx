import { useEffect, useState } from 'react'
import { Subscription } from '@stripe/firestore-stripe-payments'
import payments from '../lib/stripe'

function useSubscription(user: User | null) {
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  useEffect(() => {
    if (!user) return
    onCurrentSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        snapshot.subscriptions.filter(
          (subscription) =>
            subscription.status === 'active' ||
            subscription.status === 'trailing'
        )[0]
      )
    })
  }, [user])

  return <div>useSubscription</div>
}

export default useSubscription
