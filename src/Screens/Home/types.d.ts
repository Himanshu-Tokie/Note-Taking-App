export type newDataType = {'id':string,'count':number}[]

export interface HomeProps extends NativeStackScreenProps<RootTabParamList, 'home'> {
    theme: themeType;
  }