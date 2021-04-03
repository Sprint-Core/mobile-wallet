import React, {useEffect, memo} from "react";
import {StyleSheet, View, LayoutAnimation, Platform, Image, Linking} from "react-native";
import {systemWeights} from "react-native-typography";
import XButton from "./XButton";
import { Text } from "../styles/components";

const updates = [
	"Upgraded to the latest version of React Native.",
	"Upgraded several dependencies.",
	"Fixed a bug that would prevent the transaction list from updating it's exchange rate value when toggling fiat currencies in the Settings menu.",
	`Fixed a bug that would prevent the qrcode from updating on the "Receive Transaction" view after specifying an amount.`,
	`The input amount text field will now display the correct fiat unit/symbol in the "Send Transaction" view.`
];

const _Welcome = ({ onClose = () => null, children = <View /> } = {}) => {

	if (Platform.OS === "ios") useEffect(() => LayoutAnimation.easeInEaseOut());
	return (
		<View style={styles.container}>
			<Image
				style={styles.icon}
				source={require("../assets/logo/main_icon.png")}
			/>
			<Text style={styles.header}>Welcome!</Text>
			<View style={{ width: "85%" }}>
				{children}
				<Text style={[styles.subHeader, { textAlign: "center" }]}>Updates in this build include:</Text>
				{updates.map((update, i) => <Text key={update} style={styles.text}><Text style={styles.semiBoldText}>{i+1}. </Text>{update}</Text>)}

				<Text style={styles.subHeader}>Questions?</Text>

				<Text style={styles.text}>Never hesitate to reach out:</Text>
				<Text
					onPress={() => Linking.openURL("mailto:support@sprintpay.net?subject=Requesting Some Help").catch((e) => console.log(e))}
					style={[styles.text, { marginTop: 5 }]}
				>
					<Text style={styles.semiBoldText}>Email: </Text>support@sprintpay.net
				</Text>
				<Text
					onPress={() => Linking.openURL("https://twitter.com/moonshinewallet").catch((e) => console.log(e))}
					style={[styles.text, { marginTop: 5 }]}
				>
					<Text style={styles.semiBoldText}>Twitter: </Text>@coin_sprint
				</Text>
			</View>
			<XButton style={{marginVertical: 30}} onPress={onClose} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		marginVertical: 10,
		paddingBottom: 20
	},
	icon: {
		width: 80, height: 80, marginBottom: 20
	},
	header: {
		...systemWeights.semibold,
		textAlign: "center",
		fontSize: 24
	},
	text: {
		...systemWeights.regular,
		fontSize: 18,
		alignSelf: "flex-start",
		textAlign: "left",
		marginTop: 10
	},
	semiBoldText: {
		...systemWeights.semibold,
		fontSize: 18,
		alignSelf: "flex-start",
		textAlign: "left",
		marginTop: 10
	},
	subHeader: {
		...systemWeights.light,
		fontSize: 18,
		alignSelf: "flex-start",
		textAlign: "left",
		marginTop: 20,
		...systemWeights.semibold
	}
});

//ComponentShouldNotUpdate
const Welcome = memo(
	_Welcome,
	(prevProps, nextProps) => {
		if (!prevProps || !nextProps) return true;
		return prevProps === nextProps;
	}
);

export default Welcome;
