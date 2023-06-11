import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { render } from 'preact';
import { App } from './App.tsx';

const config = {
	initialColorMode: "dark",
	useSystemColorMode: false
};

const theme = extendTheme({ config });

function GimhookRoot() {
	return (
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	);
}

render(<GimhookRoot />, document.getElementById("app") as HTMLElement);
