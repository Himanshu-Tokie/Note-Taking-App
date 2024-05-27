import { default as auth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Home from '../../Screens/Home';
import Note from '../../Screens/Note';
import Setting from '../../Screens/Setting';
import Extar1 from '../../Screens/AddLabels';
import Extar2 from '../../Screens/Reminder';
import AddLabel from '../../Components/AddLabel/addLabel';
import withTheme from '../../Components/HOC';
import Icon from '../../Components/Icon';
import Plus from '../../Components/Plus/Plus';
import { SCREEN_CONSTANTS } from '../../Constants';
import { ICONS } from '../../Constants/Icons';
import { STRINGS } from '../../Constants/Strings';
import { styles } from './style';
import MyTabBar from '../../Components/TabBar';

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
