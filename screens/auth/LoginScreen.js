import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	Platform,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	Dimensions,
} from "react-native";

const initialState = {
	email: "",
	password: "",
};

export default function App() {
	const [isShowKeyboard, setIsShowKeyboard] = useState(false);
	const [state, setstate] = useState(initialState);

	const [dimensions, setdimensions] = useState(Dimensions.get("window").width);

	console.log(state);

	useEffect(() => {
		const onChange = () => {
			const width = Dimensions.get("window").width;
			setdimensions(width);
		};
		const subscription = Dimensions.addEventListener("change", onChange);

		return () => subscription?.remove();
	}, []);

	const keyboardHide = () => {
		setIsShowKeyboard(false);
		Keyboard.dismiss();
	};

	const onSubmit = () => {
		setIsShowKeyboard(false);
		Keyboard.dismiss();
		setstate(initialState);
	};

	const onSubmitEditingText = () => {
		setIsShowKeyboard(false);
		Keyboard.dismiss();
	};

	return (
		<TouchableWithoutFeedback onPress={keyboardHide}>
			<View style={styles.container}>
				<ImageBackground
					style={styles.image}
					source={require("../../assets/images/Photo-BG.png")}
				>
					<KeyboardAvoidingView
						behavior={Platform.OS == "ios" ? "padding" : "height"}
					>
						<View
							style={{
								...styles.form,
								width: dimensions,
								paddingBottom: isShowKeyboard ? 0 : 144,
								marginBottom: isShowKeyboard ? -60 : 0,
							}}
						>
							<View style={styles.header}>
								<Text style={styles.headerTitle}>Войти</Text>
							</View>
							<View style={{ marginBottom: 16 }}>
								<TextInput
									placeholder='Адресc электронной почты'
									style={styles.input}
									textAlign={"left"}
									onFocus={() => setIsShowKeyboard(true)}
									value={state.email}
									onChangeText={(value) =>
										setstate((prevState) => ({ ...prevState, email: value }))
									}
									onSubmitEditing={onSubmitEditingText}
								/>
							</View>
							<View
								style={{
									marginBottom: 43,
								}}
							>
								<TextInput
									placeholder='Пароль'
									style={styles.input}
									textAlign={"left"}
									secureTextEntry={true}
									onFocus={() => setIsShowKeyboard(true)}
									value={state.password}
									onChangeText={(value) =>
										setstate((prevState) => ({ ...prevState, password: value }))
									}
									onSubmitEditing={onSubmitEditingText}
								/>
							</View>
							<TouchableOpacity
								activeOpacity={0.8}
								style={styles.btn}
								onPress={onSubmit}
							>
								<Text style={styles.btnTitle}>Войти</Text>
							</TouchableOpacity>
						</View>
					</KeyboardAvoidingView>
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	input: {
		padding: 16,
		backgroundColor: "#F6F6F6",
		borderWidth: 1,
		borderColor: "#E8E8E8",
		borderRadius: 8,
		color: "#212121",
	},

	form: {
		paddingTop: 32,
		paddingLeft: 16,
		paddingRight: 16,
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
	},

	btn: {
		padding: 16,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 20,
		backgroundColor: "#FF6C00",
		borderRadius: 100,
	},
	btnTitle: {
		color: "#FFFFFF",
		fontSize: 18,
		fontFamily: "Roboto-Regular",
	},
	header: {
		alignItems: "center",
		marginBottom: 33,
	},
	headerTitle: {
		fontSize: 30,
		color: "#212121",
		fontFamily: "Roboto-Medium",
	},
});
