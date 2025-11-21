import { Stack } from 'expo-router'
import React, { Component } from 'react'

export class AuthLayout extends Component {
    render() {
        return (
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
            </Stack>
        )
    }
}

export default AuthLayout