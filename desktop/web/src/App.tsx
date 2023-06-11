import { Center, Heading, Text, Button } from '@chakra-ui/react';
import { useState } from 'preact/hooks';

// From Feather (because feather is an awesome icon library!)

function BackArrow() {
	return <svg style={{marginRight: 8}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
}

export function App() {
	const [screen, setScreen] = useState<string>("main");

	const ModsScreen = () => {
		return (
			<>
				<Button onClick={() => {setScreen("main")}} style={{marginTop: 8, marginLeft: 8}}><BackArrow />Back</Button>

				<Center style={{marginTop: 32}}>
					<Heading>Mods</Heading>
				</Center>

				<Center style={{marginTop: 32}}>
					<Button>Install</Button>
				</Center>
			</>
		)
	};

	const MainScreen = () => {
		return (
			<>
				<Center style={{marginTop: 32}}>
					<Heading>Gimhook</Heading>
				</Center>
	
				<Center style={{marginTop: 32}}>
					<Button onClick={() => {window.open("https://gimkit.com/join")}}>Join a game</Button>
				</Center>
	
				<Center style={{marginTop: 16}}>
					<Button onClick={() => {window.open("https://gimkit.com/me")}}>Dashboard</Button>
				</Center>
	
				<Center style={{marginTop: 16}}>
					<Button onClick={() => {setScreen("mods")}}>Mods</Button>
				</Center>
			</>
		)
	};

	const screens: any = {
		mods: ModsScreen,
		main: MainScreen
	}

	const ScreenComponent: any = screens[screen];

	return <ScreenComponent />;
}
