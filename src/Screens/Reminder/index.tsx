import { default as auth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import withTheme from '../../Components/HOC';
import Search from '../../Components/Header';
import ListTemplate from '../../Components/ListTemplate/listTemplate';
import { STRINGS } from '../../Constants/Strings';
import { styles } from './style';

 function Extar2({theme,route}) {
  const user = auth().currentUser;
  let uid = user?.uid;
  const THEME = theme
  const [searchData, setSearchData] = useState([]);
  const [notesData, setNotesData] = useState([]);
  console.log('reminder Page');
  
  const search = e => {
    
    let text = e.toLowerCase();
    let filteredData = notesData.filter(item => {
      return (
        item.data.toLowerCase().match(text) ||
        item.title.toLowerCase().match(text)
      );
    });
    console.log(filteredData);
    setSearchData(filteredData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await firestore()
          .collection(STRINGS.FIREBASE.USER)
          .doc(uid)
          .collection(STRINGS.FIREBASE.REMINDER)
          .get();

        const newData = []; // Temporary array to accumulate data

        data.forEach(doc => {
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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch initial data

    // Set up listener for real-time updates
    const unsubscribe = firestore()
      .collection(STRINGS.FIREBASE.USER)
      .doc(uid)
      .collection(STRINGS.FIREBASE.REMINDER)
      .onSnapshot(querySnapshot => {
        const newData = []; // Temporary array to accumulate data
        querySnapshot.forEach(doc => {
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

    // Stop listening for updates when no longer required
    return () => unsubscribe();
  }, [uid]);
  // console.log(searchData,19191);

  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor:
              THEME.BACKGROUND,
          },
        ]}>
        <View>
          <Search
            onChangeText={search}
            setSearchData={setSearchData}
            notesData={notesData}
            headerText={'Reminder'}
          />
        </View>
        {searchData.length ? (
          <View style={styles.subContainer}>
            <FlatList
              data={searchData}
              style={styles.list}
              keyExtractor={item => item.noteId}
              // numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <ListTemplate
                  note={item}
                  nav={route.params.parentNavigation}
                  maxHeight={150}
                />
              )}></FlatList>
          </View>
        ) : (
          <View style={styles.noReminder}>
            <Text style={[styles.noReminderText,{color:THEME.TEXT1}]}>Add Reminder</Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

export default withTheme(Extar2)