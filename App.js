import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import LoginScreen from "./screens/auth/LoginScreen";

const loadApplication = async () => {
	await Font.loadAsync({
		"Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
		"Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
		"Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
	});
};

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();
				await loadApplication();
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<View style={styles.container} onLayout={onLayoutRootView}>
			<StatusBar style='auto' />
			<LoginScreen />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
