import { default as auth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AddLabel from '../../Components/AddLabel/addLabel';
import withTheme from '../../Components/HOC';
import MyTabBar from '../../Components/TabBar';
import { SCREEN_CONSTANTS } from '../../Constants';
import { STRINGS } from '../../Constants/Strings';
import Extar1 from '../../Screens/AddLabels';
import Home from '../../Screens/Home';
import Note from '../../Screens/Note';
import Extar2 from '../../Screens/Reminder';
import Setting from '../../Screens/Setting';

 function HomeNavigation({theme}) {
  const parentNavigation = useNavigation();
  const Tab = createBottomTabNavigator();
  // const THEME = route.params.theme
  const [show, setShow] = useState(false);
  const [labelData, setLabelData] = useState([]);
  const user = auth().currentUser;
  let uid = user?.uid;
  useEffect(() => {
    const fetchLabelData = async () => {
      try {
        await firestore()
          .collection(STRINGS.FIREBASE.USER)
          .doc(uid)
          .collection(STRINGS.FIREBASE.LABELS)
          .orderBy('time_stamp', 'asc')
          .get()
          .then(labelData => setLabelData(labelData));
      } catch (e) {
        console.log(e, 12);
      }
    };
    fetchLabelData();
    const unsubscribe = firestore()
    .collection(STRINGS.FIREBASE.USER)
    .doc(uid)
    .collection(STRINGS.FIREBASE.LABELS)
    .orderBy('time_stamp', 'asc')
    .onSnapshot(querySnapshot => {
      setLabelData(querySnapshot)
    });
  
  // Stop listening for updates when no longer required
  return () => unsubscribe();
  }, [uid]);
  return (
    <>
      <Tab.Navigator
        initialRouteName={SCREEN_CONSTANTS.Home}
        tabBar={props => <MyTabBar {...props} parentNavigation={parentNavigation} setShow={setShow} labelData={labelData}/>}
        screenOptions={{headerShown: false}}>
        <Tab.Screen name={SCREEN_CONSTANTS.Home} component={Home} initialParams={{theme}}/>
        <Tab.Screen name={SCREEN_CONSTANTS.Extra1} component={Extar1} initialParams={{theme}}/>
        <Tab.Screen name={SCREEN_CONSTANTS.Note} component={Note} initialParams={{theme}}/>
        <Tab.Screen
          name={SCREEN_CONSTANTS.Extra2}
          component={Extar2}
          initialParams={{parentNavigation,theme}}
        />
        <Tab.Screen name={SCREEN_CONSTANTS.Setting} component={Setting} initialParams={{theme}}/>
      </Tab.Navigator>
      {show && <AddLabel uid={uid} setShow={setShow} show={show} />}
    </>
  );
}
export default withTheme(HomeNavigation)
