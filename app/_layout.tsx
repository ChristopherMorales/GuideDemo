import { Amplify } from 'aws-amplify';
import { Stack } from "expo-router";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react-native";
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

export default function RootLayout() {
  const queryClient = new QueryClient()

  return (
    <ThemeProvider
      theme={{
        tokens: {
          colors: {
            primary: {
              10: '#3B0BEC',
              20: '#3B0BEC',
              40: '#3B0BEC',
              60: '#3B0BEC',
              80: '#3B0BEC',
              90: '#3B0BEC',
              100: '#3B0BEC',
            },
          },
        },
      }}
    >
    <Authenticator.Provider>
      <Authenticator>
        <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{
            headerShown: false
          }} />
            <Stack.Screen name="detail" options={{
            presentation: 'modal',
            headerShown: false
          }}/>
        </Stack>
        </QueryClientProvider>
      </Authenticator>
    </Authenticator.Provider>
    </ThemeProvider>
  );
}
