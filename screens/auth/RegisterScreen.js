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
	Button,
} from "react-native";

const initialState = {
	email: "",
	password: "",
	name: "",
};

export default function RegisterScreen() {
	const [isShowKeyboard, setIsShowKeyboard] = useState(false);
	const [state, setstate] = useState(initialState);

	const [dimensions, setdimensions] = useState(Dimensions.get("window").width);

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
		console.log(state);
		setstate(initialState);
	};

	const onSubmitEditingText = () => {
		setIsShowKeyboard(false);
		Keyboard.dismiss();
	};

	const options = {
		title: "Select Image",
		type: "library",
		options: {
			maxHeight: 200,
			maxWidth: 200,
			selectionLimit: 1,
			mediaType: "photo",
			includeBase64: false,
		},
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
								paddingBottom: isShowKeyboard ? 0 : 78,
								marginBottom: isShowKeyboard ? -92 : 0,
							}}
						>
							<View style={styles.photoContainer}>
								<View style={styles.photo}></View>
							</View>

							{/* <Button title={"img"} onPress={openGallery} /> */}

							<View style={styles.header}>
								<Text style={styles.headerTitle}>Регистрация</Text>
							</View>

							<View style={{ marginBottom: 16 }}>
								<TextInput
									placeholder='Логин'
									style={styles.input}
									textAlign={"left"}
									onFocus={() => setIsShowKeyboard(true)}
									value={state.name}
									onChangeText={(value) =>
										setstate((prevState) => ({ ...prevState, name: value }))
									}
									onSubmitEditing={onSubmitEditingText}
								/>
							</View>

							<View style={{ marginBottom: 16 }}>
								<TextInput
									placeholder='Адресc электронной почты'
									keyboardType='email-address'
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
								<Text style={styles.btnTitle}>Зарегистрироваться</Text>
							</TouchableOpacity>
							<View style={styles.link}>
								<Text style={styles.linkText}>Уже есть аккаунт? Войти</Text>
							</View>
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
	photoContainer: {
		alignItems: "center",
		position: "absolute",
		width: "100%",
		marginHorizontal: 16,
		top: -60,
	},
	photo: {
		alignContent: "center",
		width: 120,
		height: 120,
		backgroundColor: "#F6F6F6",
		borderRadius: 16,
	},
	input: {
		padding: 16,
		backgroundColor: "#F6F6F6",
		borderWidth: 1,
		borderColor: "#E8E8E8",
		borderRadius: 8,
		color: "#212121",
		fontSize: 16,
		lineHeight: 19,
	},

	form: {
		position: "relative",
		paddingTop: 92,
		paddingLeft: 16,
		paddingRight: 16,
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
	},

	btn: {
		padding: 16,
		marginBottom: 16,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 20,
		backgroundColor: "#FF6C00",
		borderRadius: 100,
	},
	btnTitle: {
		color: "#FFFFFF",
		fontSize: 18,
		lineHeight: 19,
		fontFamily: "Roboto-Regular",
	},
	header: {
		alignItems: "center",
		marginBottom: 33,
	},
	headerTitle: {
		fontSize: 30,
		lineHeight: 35,
		color: "#212121",
		fontFamily: "Roboto-Medium",
	},
	link: {
		alignItems: "center",
	},

	linkText: {
		color: "#1B4371",
		fontSize: 16,
		lineHeight: 19,
	},
});
