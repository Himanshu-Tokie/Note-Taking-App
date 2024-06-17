// CustomDialogInput.js
import React, { useState } from 'react';
import Dialog from 'react-native-dialog';
import withTheme from '../HOC';
import { customDialogInputProps } from './types';

const CustomDialogInput = ({ isVisible, onCancel, onSubmit ,theme}:customDialogInputProps) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Dialog.Container visible={isVisible}>
      <Dialog.Title style={{ color: theme.BACKGROUND }}>Enter Link URL</Dialog.Title>
      <Dialog.Input
        placeholder="Enter URL"
        placeholderTextColor={theme.TEXT1}
        style={{ color: '#000000' }}
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
