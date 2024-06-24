import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../Components/Button/customButton";
import withTheme from "../../Components/HOC";
import Search from "../../Components/Header";
import StaggedLabel from "../../Components/Staggered";
import { SCREEN_CONSTANTS } from "../../Constants";
import { STRINGS, STRINGS_FIREBASE } from "../../Constants/Strings";
import { NativeModules } from 'react-native';
import { fetchLabelData } from "../../Firebase Utils";
import { styles } from "./style";
import { LabelProps, labelNotesDataType } from "./types";

function Label({ navigation, route, theme }:LabelProps) {
  const [searchData, setSearchData] = useState<labelNotesDataType >([]);
  const [notesData, setNotesData] = useState<labelNotesDataType>([]);
  
  const uid = route.params?.note?? '';
  const label = route.params?.text ?? '';
  const THEME = theme;
  const note = {
    uid,
    label,
  };

  const search = (e: string) => {
    let text = e.toLowerCase();
    if (notesData) {
      let filteredData = notesData.filter((item) => {
        return (
          item.data.toLowerCase().match(text) ||
          item.title.toLowerCase().match(text)
        );
      });
      // console.log(filteredData);
      setSearchData(filteredData);
    }
  };

  useEffect(() => {
    fetchLabelData(uid,label,setSearchData,setNotesData); 
    const unsubscribe = firestore()
      .collection(STRINGS.FIREBASE.USER)
      .doc(uid)
      .collection(STRINGS.FIREBASE.NOTES)

      .where(STRINGS_FIREBASE.LABEL, "==", label)
      .orderBy(STRINGS_FIREBASE.TIME_STAMP, STRINGS_FIREBASE.ORDER)
      .onSnapshot((querySnapshot) => {
        const newData: labelNotesDataType = [];
        querySnapshot.forEach((doc) => {
          newData.push({
            title: doc.data().title,
            data: doc.data().content,
            noteId: doc.id,
            ImageUrl: doc.data().url,
            id: uid,
            label: label,
          });
        });

        setNotesData(newData);
        setSearchData(newData);
      });
    return () => unsubscribe();
  }, [uid]);

const { AdInterstitialModule } = NativeModules;

// Function to load interstitial ad
const loadInterstitialAd = async (adUnitId:string) => {
  try {
    await AdInterstitialModule.loadInterstitialAd(adUnitId);
    console.log('Interstitial ad loaded successfully.');
  } catch (error) {
    console.error('Failed to load interstitial ad:', error);
  }
};

// Usage
loadInterstitialAd('ca-app-pub-3940256099942544/1033173712'); // Replace with your ad unit ID

  const addNewNote = () => {
    navigation.navigate(SCREEN_CONSTANTS.Note, { note });
  };
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: THEME.BACKGROUND }]}
    >
      <View>
        <Search
          onChangeText={search}
          handleSetInittialOnBlur={() => setSearchData(notesData)}
          notesData={notesData}
          headerText={label}
        />
      </View>
      <StaggedLabel data={searchData} />
      <View style={styles.addNotes}>
          <CustomButton
            text={STRINGS.ADD_NEW_NOTES}
            style={[styles.customButton]}
            onPress={addNewNote}
          />
        </View>
    </SafeAreaView>
  );
}

export default withTheme(Label);
