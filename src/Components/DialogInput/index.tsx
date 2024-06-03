// CustomDialogInput.js
import React, { useState } from 'react';
import Dialog from 'react-native-dialog';
import withTheme from '../HOC';

const CustomDialogInput = ({ isVisible, onCancel, onSubmit ,theme}) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Dialog.Container visible={isVisible}>
      <Dialog.Title style={{ color: theme.BACKGROUND }}>Enter Link URL</Dialog.Title>
      <Dialog.Input
        placeholder="Enter URL"
        placeholderTextColor={theme.TEXT1}
        style={{ color: theme.TEXT1 }}
        onChangeText={setInputValue}
        value={inputValue}
      />
      <Dialog.Button label="Cancel" onPress={onCancel} />
      <Dialog.Button
        label="OK"
        onPress={() => onSubmit(inputValue)}
      />
    </Dialog.Container>
  );
};

export default withTheme(CustomDialogInput);
