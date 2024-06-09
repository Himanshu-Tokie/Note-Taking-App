import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import DialogInput from 'react-native-dialog-input';
import withTheme from "../../Components/HOC";
import { STRINGS } from '../../Constants/Strings';

function AddLabel({uid,show,setShow,theme}) {
  // const [show, setShow] = useState(false)
  const [newLabel, setNewLabel] = useState('');
  useEffect(() => {
    const addNewLabel = async () => {     
      try {
        if (newLabel) {        
          await firestore()
            .collection(STRINGS.FIREBASE.USER)
            .doc(uid)
            .collection(STRINGS.FIREBASE.LABELS)
            .doc(newLabel)
            .set({
              count: 0,
              time_stamp: firestore.FieldValue.serverTimestamp(),
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
      <DialogInput
        isDialogVisible={show}
        title={STRINGS.ADD_LABEL}
        hintInput={STRINGS.LABEL_NAME}
        hintTextColor={theme.TEXT1}
        dialogStyle={{}}
        modalStyle={{}}
        submitInput={input => {          
          setNewLabel(input);
        }}
        closeDialog={() => {
          setShow(false);
        }}></DialogInput>
  );
}

export default withTheme(AddLabel)