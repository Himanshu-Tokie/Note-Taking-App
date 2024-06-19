import { Platform, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { PLATEFORM } from '../../Constants/Strings';

export const styles = StyleSheet.create({
  headerContainer: {
    padding: 20, // Add desired padding here
    backgroundColor: 'white', // Optional: background color for the header
    alignItems: 'center', // Optional: align items in the center
  },
  container: {
    flex: 1,
    paddingHorizontal: widthPercentageToDP('4%'),
    paddingBottom: heightPercentageToDP('8.5%'),
    // paddingBottom:100
  },
  subcontainer: {
    paddingTop: heightPercentageToDP('4.5%'),
    marginBottom: heightPercentageToDP('10%'),
    // flex:1
  },
  welcome: {
    fontFamily: 'Nunito',
    paddingBottom: heightPercentageToDP('0.25%'),
    fontWeight:'600'
  },
  NoteTaking: {
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    fontSize: heightPercentageToDP('3%'),
  },
  header: {
    paddingHorizontal: Platform.OS == PLATEFORM.IOS? heightPercentageToDP('2%'):heightPercentageToDP('0%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom:heightPercentageToDP('1.5%')
  },
  innerHeader: {
    flexDirection: 'row',
  },
  labels: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Nunito',
    fontSize: heightPercentageToDP('2.4%'),
    fontWeight: '800',
    color:'#FFFFFF'
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP('91.3%'),
    height: heightPercentageToDP('19%'),
  },
  imageContainer: {
    alignItems:'center',
    paddingHorizontal: Platform.OS == PLATEFORM.IOS? widthPercentageToDP('4.1%'):widthPercentageToDP('0%'),
    paddingTop: heightPercentageToDP('3.5%'),
    paddingBottom:heightPercentageToDP('3%')
  },
  size: {
    fontSize: heightPercentageToDP('1.5%'),
    fontWeight: 'bold',
  },
  imageInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: heightPercentageToDP('3.5%'),
  },
});
