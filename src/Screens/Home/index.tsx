import { default as auth } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import DeviceInfo from "react-native-device-info";
import ImageModal from "react-native-image-modal";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-virtualized-view";
import { useSelector } from "react-redux";
import withTheme from "../../Components/HOC";
import LabelTemplate from "../../Components/LabelTemplate/LabelTemplate";
import { ICONS } from "../../Constants/Icons";
import { IMAGES } from "../../Constants/Images";
import { STRINGS, STRINGS_FIREBASE } from "../../Constants/Strings";
import { colorSchemeState } from "../MainScreen/type";
import { styles } from "./style";
import { HomeProps, newDataType } from "./types";

function Home({ theme }: HomeProps) {
  const THEME = theme;
  const user = auth().currentUser;
  const colorScheme = useSelector(
    (state: colorSchemeState) => state.theme.theme
  );
  const defaultImage = IMAGES.DEFAULTUSER;
  const photoURL = user?.photoURL
    ? { uri: { uri: user.photoURL } }
    : { uri: defaultImage };

  const [label, setLabel] = useState<newDataType | null>();

  useEffect(() => {
    getLabel();
    if (user) {
      const unsubscribe = firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(user.uid)
        .collection(STRINGS.FIREBASE.LABELS)
        .orderBy(STRINGS_FIREBASE.TIME_STAMP, STRINGS_FIREBASE.ORDER)
        .onSnapshot((querySnapshot) => {
          const newData: newDataType = [];
          querySnapshot.forEach((doc) => {
            newData.push({ id: doc.id, count: doc.data().count });
          });
          setLabel(newData);
        });
      return () => {
        unsubscribe();
      };
    }
  }, []);
  const getAllData = async () => {
    try {
      await firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(user?.uid)
        // .orderBy(STRINGS_FIREBASE.TIME_STAMP, STRINGS_FIREBASE.ORDER)
        .get();
    } catch (e) {
      // console.log(e, 91);
    }
  };
  const getLabel = async () => {
    try {
      if (user) {
        getAllData();

        const snapShot = await firestore()
          .collection(STRINGS.FIREBASE.USER)
          .doc(user.uid)
          .collection(STRINGS.FIREBASE.LABELS)
          .orderBy(STRINGS_FIREBASE.TIME_STAMP, STRINGS_FIREBASE.ORDER)
          .get();
        const labelData: newDataType = [];
        snapShot.forEach((doc) => {
          labelData.push({ id: doc.id, count: doc.data().count });
        });
        setLabel(labelData);
        // console.log(label, 70);}
      }
    } catch (error) {
      // console.error("Error retrieving notes:", error);
    }
  };
  // const bytesToGB = (bytes)=>{
  //   return (bytes/(1024*1024*1024))%100
  // }
  const [usedSpace, setUsedSpace] = useState(0);
  const [freeSpace, setFreeSpace] = useState(0);
  // DeviceInfo.getFreeDiskStorage().then((freeDiskStorage) => {
  //   // console.log(freeDiskStorage,'free');
  //   setFreeSpace(freeDiskStorage)
  // });
  // DeviceInfo.getUsedMemory().then((usedMemory) => {
  //   setUsedSpace(usedMemory)
  // });

  // setInterval(fetchStorageInfo,10000)
  const fetchStorageInfo = useCallback(async () => {
    // let isActive = true;
    try {
      console.log(1888);
      const freeDiskStorage = await DeviceInfo.getTotalDiskCapacity();
      const usedMemory = await DeviceInfo.getUsedMemory();
      // if (isActive) {
        setFreeSpace(freeDiskStorage);
        setUsedSpace(usedMemory);
      
    } catch (error) {
      // console.error("Error fetching storage info:", error);
    }
    // return () => {
    //   isActive = false;
    // };
  }, []);

  useFocusEffect(
    
    useCallback(() => {
      fetchStorageInfo();
    }, [fetchStorageInfo])
  );
  const [parentLayout, setParentLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const bytesToGB = (bytes: number) =>(bytes / (1024 * 1024 * 1024)).toFixed(2);
  if (user) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: THEME.BACKGROUND }]}
      >
        <View style={styles.subcontainer}>
          <View style={styles.header}>
            <View>
              <Text style={[styles.welcome, { color: THEME.TEXT3 }]}>
                {"Welcome" + ", " + user?.displayName + "!"}
              </Text>
              <Text style={[styles.NoteTaking, { color: THEME.TEXT1 }]}>
                {STRINGS.NOTE}
              </Text>
            </View>
            <View style={styles.innerHeader}>
              <ImageModal
              // modalImageStyle={{height:50,width:50}}
              resizeMode="contain"
              imageBackgroundColor={THEME.BACKGROUND}
              style={{
                borderRadius: 50,
                height: heightPercentageToDP("6.8%"),
                width: heightPercentageToDP("6.8%"),
              }}
              source={photoURL.uri}
              />
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={
                  colorScheme === "light" ? IMAGES.HOME : IMAGES.HOME_DARK
                }
                // resizeMode="cover"
                style={styles.image}
              >
                <View style={styles.imageInner}>
                  {colorScheme === "light"
                    ? ICONS.PIECHART(
                        heightPercentageToDP("8.2%"),
                        heightPercentageToDP("8.2%"),
                        "none"
                      )
                    : ICONS.PIECHART_BLACK(
                        heightPercentageToDP("8.2%"),
                        heightPercentageToDP("8.2%"),
                        "none"
                      )}
                  <View style={{ paddingLeft: widthPercentageToDP("7%") }}>
                    <Text style={[styles.text]}>{STRINGS.AVAILABLE_SPACE}</Text>
                    <Text style={[styles.size, { color: THEME.HOMESIZE }]}>
                      {bytesToGB(usedSpace)} GB of {bytesToGB(freeSpace)} GB Used
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
            {!label && <ActivityIndicator size="large" />}
            {label && (
              <View style={styles.labels}>
                <FlatList
                  data={label}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  renderItem={({ item }) => (
                    <LabelTemplate
                      icon={
                        colorScheme === "light"
                          ? ICONS.OTHERS
                          : ICONS.INTEL_BLACK
                      }
                      text={item.id}
                      files={item.count}
                      note={user.uid}
                      // theme={THEME}
                    />
                  )}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  } else {
    return <></>;
  }
}
export default withTheme(Home);
