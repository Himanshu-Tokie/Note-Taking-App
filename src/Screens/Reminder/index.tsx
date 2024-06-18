import { default as auth } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import withTheme from "../../Components/HOC";
import Search from "../../Components/Header";
import ListTemplate from "../../Components/ListTemplate/listTemplate";
import { STRINGS, STRINGS_FIREBASE } from "../../Constants/Strings";
import { styles } from "./style";
import { ReminderProps, reminderFormate, reminderNotesDataType } from "./types";

function Extar2({ navigation, theme, route }: ReminderProps) {
  const user = auth().currentUser;
  let uid = user?.uid;
  const THEME = theme;
  const [searchData, setSearchData] = useState<reminderNotesDataType | null>();
  const [notesData, setNotesData] = useState<reminderNotesDataType | null>();
  const [noData, setNoData] = useState<boolean>(false);
  const search = (str: string) => {
    let text = str.toLowerCase();
    if (notesData) {
      let filteredData = notesData.filter((item: reminderFormate) => {
        return (
          item.data.toLowerCase().match(text) ||
          item.title.toLowerCase().match(text)
        );
      });
      if (!filteredData.length) setNoData(true);
      else setNoData(false);
      setSearchData(filteredData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (uid) {
          const data = await firestore()
            .collection(STRINGS.FIREBASE.USER)
            .doc(uid)
            .collection(STRINGS.FIREBASE.REMINDER)
            .get();

          const newData: reminderNotesDataType = []; // Temporary array to accumulate data

          data.forEach((doc) => {
            newData.push({
              title: doc.data().title,
              data: doc.data().content,
              noteId: doc.id,
              id: uid,
              timestamp: doc.data().timeStamp,
            });
          });

          setNotesData(newData);
          setSearchData(newData);
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch initial data

    // Set up listener for real-time updates
    if (uid) {
      const unsubscribe = firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(uid)
        .collection(STRINGS.FIREBASE.REMINDER)
        .orderBy(STRINGS_FIREBASE.DB_TIME_STAMP, STRINGS_FIREBASE.ORDER)
        .onSnapshot((querySnapshot) => {
          const newData: reminderNotesDataType = []; // Temporary array to accumulate data
          querySnapshot.forEach((doc) => {
            newData.push({
              title: doc.data().title,
              data: doc.data().content,
              noteId: doc.id,
              id: uid,
              timestamp: doc.data().timeStamp,
            });
          });
          setNotesData(newData);
          setSearchData(newData);
        });
      return () => unsubscribe();
    }
  }, [uid]);
  useEffect(() => {
    if (!searchData?.length) {
    }
  }, [searchData]);
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: THEME.BACKGROUND,
        },
      ]}
    >
      <View style={styles.subContainer}>
        <View>
          <Search
            onChangeText={search}
            handleSetInittialOnBlur={() => {
              setSearchData(notesData);
              setNoData(false);
            }}
            notesData={notesData}
            headerText={"Reminder"}
          />
        </View>
        {noData && (
          <View>
            <Text style={[styles.noReminderText, { color: THEME.TEXT1 }]}>
              {STRINGS.NO_REMINDER_EXIST}
            </Text>
          </View>
        )}
        {searchData?.length ? (
          <View style={styles.searchContainer}>
            <FlatList
              data={searchData}
              // style={styles.list}
              // keyExtractor={(item) => item.noteId}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ListTemplate
                  note={item}
                  nav={route.params.parentNavigation}
                  maxHeight={150}
                />
              )}
            ></FlatList>
          </View>
        ) : (
          <View style={styles.noReminder}>
            <Text style={[styles.noReminderText, { color: THEME.TEXT1 }]}>
              {STRINGS.ADD_REMINDER}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default withTheme(Extar2);
