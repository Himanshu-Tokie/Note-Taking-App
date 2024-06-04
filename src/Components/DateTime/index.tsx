import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import withTheme from '../HOC';
import { styles } from './style';

function DateTime({date, setDate,theme,dateRef}) {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const THEME = theme

  return (
    <>
      <View style={[styles.container,{backgroundColor:THEME.SETTING_BOX}]}>
        <View style={styles.subContainer}>
          <View>
            <Text style={[styles.text,{color:THEME.TEXT1,fontWeight:'bold'}]}>Pick Date</Text>
          </View>
          <View>
            <TouchableOpacity onPress={showDatepicker}>
              <Text style={[styles.text,{color:THEME.TEXT1}]}>
                {date.toLocaleString().slice(0,9)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.subContainer]}>
          <View>
            <Text style={[styles.text,{color:THEME.TEXT1,fontWeight:'bold'}]}>Pick Time</Text>
          </View>
          <View>
            <TouchableOpacity onPress={showTimepicker}>
              <Text style={[styles.text,{color:THEME.TEXT1}]}>
                {date.toLocaleString().slice(10)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </>
  );
}

export default withTheme(DateTime)

