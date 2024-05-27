import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';
import { RenderHTML } from 'react-native-render-html';
import { SCREEN_CONSTANTS } from '../../Constants';
import withTheme from '../HOC';
import { styles } from './style';
function ListTemplate({note, nav, maxHeight, label, theme}) {
  const source = {
    html: note.data,
  };
  const {width: contentWidth} = useWindowDimensions();
  const THEME = theme;
  const date = new Date(
    note.timestamp?.seconds * 1000 + note.timestamp?.nanoseconds / 1000000,
  );
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };
  const formattedDate = date.toLocaleString('en-US', options);
  return (
    <>
      {!label && (
        <TouchableOpacity
          onPress={() => nav.navigate(SCREEN_CONSTANTS.Note, {note})}
          style={[styles.touch, {maxHeight}]}>
          <View
            style={[
              styles.container,
              {
                backgroundColor: THEME.FOOTER,
                flexDirection: note.timestamp?'row':'column'
              },
            ]}>
            <View>
              {note.title && (
                <Text
                  style={[
                    styles.title,
                    {
                      color: THEME.TEXT1,
                    },
                  ]}>
                  {note.title}
                </Text>
              )}
            </View>
            {note.timestamp && (
              <View>
                <Text
                  style={[
                    styles.title,
                    {
                      color: THEME.TEXT1,
                    },
                  ]}>
                  {formattedDate}
                </Text>
              </View>
            )}
            {!note.timestamp &&
              <RenderHTML
              source={source}
              contentWidth={contentWidth}
              defaultTextProps={{
                style: {
                  color: THEME.TEXT1,
                },
              }}
            />}
          </View>
        </TouchableOpacity>
      )}
      {label && (
        <View
          style={[
            styles.container,
            {
              backgroundColor: THEME.FOOTER,
            },
          ]}>
          <Text
            style={[
              styles.title,
              {
                color: THEME.TEXT1,
              },
            ]}>
            {note.id}
          </Text>
        </View>
      )}
    </>
  );
}
export default withTheme(ListTemplate);
