"use client"

import { Provider } from 'react-redux'
import { store } from '../app/store/store'

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}