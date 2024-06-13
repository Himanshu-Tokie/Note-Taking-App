import auth from '@react-native-firebase/auth';
import { Formik } from 'formik';
import { Alert, Keyboard, SafeAreaView, View } from 'react-native';
import * as Yup from 'yup';
import CustomButton from '../../Components/Button/customButton';
import FormikTemplate from '../../Components/FormikTemplate';
import { STRINGS } from '../../Constants/Strings';
import { styles } from '../LogIn/style';
 
const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please enter email')
});

function reset(email:string){
    auth().sendPasswordResetEmail(email).then(function (user) {
        Alert.alert('Please check your email...')
      }).catch(function (e) {
        console.log(e)
      })
}
export default function ResetPassword() {
  // const [user, setUser] = useState();
  // const [errorLogin, setErrorLogin] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.subContainer}>
            <Formik
              initialValues={{email: ''}}
              validationSchema={SignupSchema}
              onSubmit={values => {
                reset(values.email);
              }}>
              {({
                errors,
                touched,
                isValid,
                handleChange,
                values,
                setFieldTouched,
                handleSubmit,
              }) => (
                <View>
                  <FormikTemplate
                    placeholder={STRINGS.EMAIL}
                    values={values.email}
                    touched={touched.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => {setFieldTouched('email');
                    Keyboard.dismiss();}
                    }
                    error={errors.email}
                  />
                  <CustomButton
                    text={STRINGS.RESET_PASSWORD}
                    onPress={handleSubmit}
                    disabled={!isValid}
                    style={[styles.button]}
                  />
                </View>
              )}
            </Formik>
          </View>
          {/* <CustomButton text='Log In' onPress={logIn} /> */}
        </SafeAreaView>)

}
