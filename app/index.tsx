import { Text, View, StyleSheet } from "react-native";
import Tasklist from "./tasklist";
import Task from "./task";

export default function Index() {
  return (
    <View style={styles.layout}>
      <Tasklist/>
      <Text style={styles.buttonWrapper}>
        <View style={{backgroundColor: "#6482AD"}}><Text>Temp button 1</Text></View>
        <View style={{backgroundColor: "#6482AD"}}><Text>Temp button 2</Text></View>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  layout:{
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5EDED"
  },
  buttonWrapper:{
    flex: 0.3,
    backgroundColor: "#E2DAD6",
    width: "100%",
  }
});