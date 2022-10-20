import { useMoralis } from 'react-moralis'
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, deactivateWeb3, account, isWeb3Enabled, Moralis } = useMoralis()
    // some button that connects us and changes connected to be true

    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    })

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found.")
            }
        })
    })

    return (<div>
        {
            account ? (
                <div>Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}</div>
            ) : (
                <button onClick={async () => {
                    await enableWeb3()
                    if (typeof window !== "undefined") {
                        window.localStorage.setItem("connected", "injected")
                    }
                }}>
                    Connect
                </button>
            )
        }
    </div>)
}