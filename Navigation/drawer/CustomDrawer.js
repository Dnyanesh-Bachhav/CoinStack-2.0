import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../components/constants";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import user1 from "../../assets/user.jpg";
import * as Sharing from "expo-sharing";
import { Asset, useAssets } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { AuthContext } from "../../Contexts/AuthProviderContext";
import { useContext, useEffect, useState } from "react";
import { Paragraph, SizableText } from "tamagui";
import { Accordion } from "tamagui";
import { Square } from "tamagui";
import { ChevronDown } from "@tamagui/lucide-icons";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";

const Drawer = createDrawerNavigator();

function CustomDrawer(props) {
  const { user, setUser, firestoreUser, signOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleShare = async () => {
    const isAvailable = await Sharing.isAvailableAsync();

    if (isAvailable) {
      //  console.log("Sharing available...");
      //  const [asset,error] = useAssets(require("../../assets/logo.png"));
      //  console.log(asset);
      //  console.log("Sharing is available...");
      //  await Sharing.shareAsync({
      //      dialogTitle: "Download the app Now...!!!"
      //  })
      const asset = Asset.fromModule(require("../../assets/Promotion.png"));
      await asset.downloadAsync();
      const tmpFile = FileSystem.cacheDirectory + "Promotion.png";

      try {
        // sharing only works with `file://` urls on Android so we need to copy it out of assets
        await FileSystem.copyAsync({ from: asset.localUri, to: tmpFile });
        await Sharing.shareAsync(tmpFile, {
          dialogTitle: "Is it a snake or a hat?",
        });
      } catch (e) {
        console.error(e);
      }
      // await Sharing.shareAsync("../assets/banner1.png");
    } else {
      Alert.alert("Sharing is not available...");
    }
  };
  useEffect(() => {
    console.log("User on custome drawer:" + JSON.stringify(user));
  }, []);
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: COLORS.secondary }}
      >
        <View style={styles.userInfo}>
          <View
            style={{
              backgroundColor: COLORS.white,
              width: 100,
              height: 100,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
            }}
          >
            <Image
              source={user1}
              style={{ width: 80, height: 80, borderRadius: 40 }}
            />
          </View>
          <SizableText
            size={"$7"}
            fontWeight={"bold"}
            style={{ marginLeft: 0 }}
          >
            {firestoreUser?.name}
          </SizableText>
          <Collapse onToggle={(val)=>{
            setOpen(val);
          }} >
            <CollapseHeader
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
              onPress={() => {
                console.log("Cliked");
                setOpen(!open);
              }} 
            >
              <Paragraph size={"$5"} fontWeight={"600"}>
                {firestoreUser?.email}
              </Paragraph>
              <View>
                <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                  <ChevronDown size="$1" />
                </Square>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Paragraph>{firestoreUser?.phone || "9090909090"}</Paragraph>
            </CollapseBody>
          </Collapse>
        </View>

        <View style={styles.listContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => {
            handleShare();
          }}
        >
          <View style={styles.bottomListItem}>
            <Entypo name="share" size={24} color="black" />
            <Text style={{ marginLeft: 5 }}>Tell a friend</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
        >
          <View style={styles.bottomListItem}>
            <MaterialIcons name="logout" size={24} color="black" />
            <Text style={{ marginLeft: 5 }}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  userInfo: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    marginBottom: 5,
  },
  listContainer: {
    backgroundColor: COLORS.white,
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
    padding: 16,
  },
  bottomListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
});
export default CustomDrawer;
