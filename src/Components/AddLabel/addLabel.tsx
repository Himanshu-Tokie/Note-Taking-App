import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import DialogInput from 'react-native-dialog-input';
import { STRINGS } from '../../Constants/Strings';
import withTheme from "../../Components/HOC";

function AddLabel({uid,show,setShow,theme}) {
  // const [show, setShow] = useState(false)
  const [newLabel, setNewLabel] = useState('');
  useEffect(() => {
    
    const addNewLabel = async () => {
      console.log('kario',22);
      console.log(newLabel,222222);
      
      try {
        if (newLabel !== '') {
          await firestore()
            .collection(STRINGS.FIREBASE.USER)
            .doc(uid)
            .collection(STRINGS.FIREBASE.LABELS)
            .doc(newLabel)
            .set({
              count: 0,
            })
            .then(() => setShow(false))
            .catch(e => console.log(e));
        }
      } catch (error) {
        console.error('Error adding new label:', error);
      }
    };
    addNewLabel();
  }, [newLabel]);
  // setShow(true)
  return (
    <>
    {/* <Button title="Add Label" onPress={() => setShow(true)} /> */}
      <DialogInput
        isDialogVisible={show}
        title={STRINGS.ADD_LABEL}
        hintInput={STRINGS.LABEL_NAME}
        hintTextColor={theme.TEXT1}
        // dialogStyle={{}}
        modalStyle={{}}
        submitInput={input => {          
          setNewLabel(input);
        }}
        closeDialog={() => {
          setShow(false);
        }}></DialogInput>
    </>
  );
}

export default withTheme(AddLabel)