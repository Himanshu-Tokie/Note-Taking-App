import { default as auth } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useHeaderHeight } from "@react-navigation/elements";
import * as htmlparser2 from "htmlparser2";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";
import ImageModal from "react-native-image-modal";
import {
  RichEditor,
  RichToolbar,
  actions,
  RichEditorProps,
} from "react-native-pell-rich-editor";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import DateTime from "../../Components/DateTime";
import CustomDialogInput from "../../Components/DialogInput";
import DropdownComponent from "../../Components/Dropdown/dropdown";
import withTheme from "../../Components/HOC";
import Header from "../../Components/Header";
import UserImage from "../../Components/Image";
import { STRINGS } from "../../Constants/Strings";
import { loadImage } from "../../Store/Image";
import { imageCompressor } from "../../Utils";
import { styles } from "./styles";
import { NoteScreenProps, imageState } from "./types";

const Note = ({ route, theme }:NoteScreenProps) => {
  const dispatch = useDispatch();
  const imageInitData = useSelector(
    (state: imageState) => state.image.imageUri
  );

  const user = auth().currentUser;
  let uid = user?.uid;
  let initialTitle = "";
  let noteId = "";
  let data = "";
  let lable = "Others";
  let imageInitialData: string[] = [];
  const reminder = useRef(false);
  const isNew = useRef(true);
  const isCompleteNew = useRef(false);
  const noteIdExist = useRef(false);
  const dateRef = useRef(new Date());

  if (route.params != undefined) {
    if (route.params?.labelData != undefined) {
      
      isCompleteNew.current = true;
    } else if (route.params?.note != undefined) {
      if (route.params.note.noteId == undefined) {
        lable = route.params.note.label;
      } else {
        data = route.params.note.data;
        initialTitle = route.params.note.title;
        noteId = route.params.note.noteId;
        lable = route.params.note.label;
        isNew.current = false;
        noteIdExist.current = true;
        if (imageInitData[noteId]) imageInitialData = imageInitData[noteId];
      }
      if (route.params.note.timestamp !== undefined) {
        const formatDate =
          route.params.note.timestamp.seconds * 1000 +
          Math.floor(route.params.note.timestamp.nanoseconds / 1000000);
        dateRef.current = new Date(formatDate);
        reminder.current = true;
        if (route.params.note.newReminder !== undefined) {
          isNew.current = true;
          dateRef.current = new Date();
        }
      }
    }
  }
  const [date, setDate] = useState(dateRef.current);

  const RichText = useRef<RichEditor>(null);
  const articleData = useRef(data);
  const [title, setTitle] = useState(initialTitle);
  const [label, setLable] = useState(lable);
  const labelRef = useRef(lable);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const titleRef = useRef(initialTitle);
  const [value, setValue] = useState(lable);
  useEffect(() => {
    labelRef.current = value;
  }, [value]);
  const [photo, setPhoto] = useState<string|null>(null);
  const [imageData, setImageData] = useState(imageInitialData);
  const img = useRef<string[]>([]);
  const noteNewId = useRef<string|null>();
  useEffect(() => {
    if (!photo || !uid) {
      return;
    }
    const processImage = async () => {
      try {
        const newUri = await imageCompressor(photo);
        setImageData((prevImageData) => [...prevImageData, newUri]);
        img.current = [...img.current, newUri];
      } catch (error) {
        // console.log("Error compressing image:", error);
      }
    };
    processImage();
  }, [photo, uid]);

  const createReminder = async () => {
    try {
      await firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(uid)
        .collection(STRINGS.FIREBASE.REMINDER)
        .add({
          title: titleRef.current,
          content: articleData.current,
          timeStamp: dateRef.current,
        })
        .then(() => {
          // console.log("new reminder added successfully");
        });
    } catch (e) {
      // console.log(e, STRINGS.FIREBASE.REMINDER);
    }
  };
  const updateReminder = async () => {
    try {
      await firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(uid)
        .collection(STRINGS.FIREBASE.REMINDER)
        .doc(noteId)
        .update({
          title: titleRef.current,
          content: articleData.current,
          timeStamp: dateRef.current,
        })
        .then(() => {
          // console.log("reminder updated successfully");
        });
    } catch (e) {
      // console.log(e, "reminderrrr");
    }
  };
  const updateData = async () => {
    try {
      await firestore()
        .collection(STRINGS.FIREBASE.USER)
        .doc(uid)
        .collection(STRINGS.FIREBASE.NOTES)
        .doc(noteId)
        .update({
          title: titleRef.current,
          content: articleData.current,
          time_stamp: firestore.FieldValue.serverTimestamp(),
        });
    } catch (e) {
      // console.log(e);
    }
  };
  const createN = async () => {
    await firestore()
      .collection(STRINGS.FIREBASE.USER)
      .doc(uid)
      .collection(STRINGS.FIREBASE.NOTES)
      .add({
        label: labelRef.current,
        title: titleRef.current,
        content: articleData.current,
        time_stamp: firestore.FieldValue.serverTimestamp(),
        url: [],
      })
      .then((data) => {
        noteNewId.current = data.id;
      });
  };
  const createNote = async () => {
    try {
      if (labelRef.current === null) {
        labelRef.current = label;
      }
      const regex = /^[\s\r\n]*$/;
      const dom = htmlparser2.parseDocument(articleData.current);
      if (
        !regex.test(articleData.current) ||
        !regex.test(titleRef.current) ||
        img.current.length
      ) {
        createN();
        const count = await firestore()
          .collection(STRINGS.FIREBASE.USER)
          .doc(uid)
          .collection(STRINGS.FIREBASE.LABELS)
          .doc(labelRef.current)
          .get();

        let updatedcount = count.data();
        if (updatedcount) updatedcount = updatedcount["count"] + 1;
        await firestore()
          .collection(STRINGS.FIREBASE.USER)
          .doc(uid)
          .collection(STRINGS.FIREBASE.LABELS)
          .doc(labelRef.current)
          .set(
            {
              count: updatedcount,
              time_stamp: firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setDate(dateRef.current);
  }, []);
  useEffect(() => {
    dateRef.current = date;
  }, [date]);


  useEffect(() => {
    const fetchData = async () => {
      if (!isNew.current) {
        if (reminder.current) {
          await updateReminder();
        } else {
          await updateData();
        }
      }
    } else {
      if (reminder.current) {
        await createReminder();
        // console.log("reminder created success");
      } else {
        await createNote();
        // console.log("note created success");
      }
    }
    if (noteIdExist.current) {
      dispatch(loadImage({ uid: uid, noteId: noteId, uri: img.current }));
    } 
    else if (noteNewId.current) {
      dispatch(
        loadImage({ uid: uid, noteId: noteNewId.current, uri: img.current })
      );
    }
  };
  useEffect(() => {
    return () => {
      fetchData();
    };
  }, []);
  // const scrollRef = useRef(null);
  // const onCursorPosition = (scrollY:number) => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTo({ y: scrollY - 30, animated: true });
  //   }
  // };
  const headerHeight = useHeaderHeight();
  const THEME = theme;
  const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVerticalOffset(heightPercentageToDP("5%"));
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVerticalOffset(0);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const handleInsertLink = () => {
    setIsDialogVisible(true);
  };
  const handleCancel = () => {
    setIsDialogVisible(false);
  };

  const handleSubmit = (link: string) => {
    RichText.current?.insertLink(link, link);
    setIsDialogVisible(false);
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: THEME.BACKGROUND,
        },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : keyboardOffset}
        style={styles.subContainer}
      >
        <View>
          <Header headerText={isCompleteNew.current ? value : label} />
        </View>
        {isCompleteNew.current && (
          <DropdownComponent
            data={route.params?.labelData}
            value={value}
            setValue={setValue}
          />
        )}
        {/* <ScrollView style={styles.container} ref={scrollRef}> */}
        <TextInput
          onChangeText={(text) => {
            titleRef.current = text;
            setTitle(text);
          }}
          placeholder="Title"
          placeholderTextColor={THEME.NOTETEXT}
          value={title}
          style={[
            styles.title,
            {
              color: THEME.NOTETEXT,
            },
          ]}
        />
        {/* {
            true && */}
        <View>
          <FlatList
            horizontal
            data={imageData}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ paddingHorizontal: widthPercentageToDP("0.5%") }}>
                <ImageModal
                  resizeMode="contain"
                  imageBackgroundColor={THEME.BACKGROUND}
                  style={{
                    height: heightPercentageToDP("20%%"),
                    width: heightPercentageToDP("20%"),
                  }}
                  source={{ uri: item }}
                />
              </View>
            )}
          ></FlatList>
        </View>

        {/* } */}
        {/* <ScrollView> */}
        <RichEditor
          disabled={false}
          containerStyle={styles.editor}
          ref={RichText}
          initialContentHTML={articleData.current}
          style={styles.rich}
          editorStyle={{
            backgroundColor: THEME.BACKGROUND,
            color: THEME.NOTETEXT,
            contentCSSText: `
            font-family: Nunito; 
            font-size: 14px;  
            display: flex; 
            flex-direction: column; 
            min-height: 200px; 
            position: absolute; 
            top: 0; right: 0; bottom: 0; left: 0;`,
          }}
          placeholder={"Start Writing Here"}
          onChange={(text) => {
            articleData.current = text;
          }}
          // onCursorPosition={onCursorPosition}
          useContainer
        />
        {/* </ScrollView> */}
        {reminder.current && (
          <DateTime date={date} setDate={setDate}></DateTime>
        )}
        {reminder.current ? (
          <RichToolbar
            style={[styles.richBar]}
            editor={RichText}
            disabled={false}
            iconTint={"white"}
            selectedIconTint={"black"}
            disabledIconTint={"white"}
            // onPressAddImage={onPressAddImage}
            iconSize={25}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.setStrikethrough,
              actions.setUnderline,
            ]}
            onInsertLink={handleInsertLink}
          />
        ) : (
          <RichToolbar
            style={[styles.richBar]}
            editor={RichText}
            disabled={false}
            iconTint={"white"}
            selectedIconTint={"black"}
            disabledIconTint={"white"}
            // onPressAddImage={onPressAddImage}
            iconSize={25}
            actions={[
              actions.insertImage,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.setStrikethrough,
              actions.setUnderline,
            ]}
            onInsertLink={handleInsertLink}
            iconMap={{
              [actions.insertImage]: () => (
                <UserImage photo={photo} setPhoto={setPhoto} />
              ),
            }}
          />
        )}
      </KeyboardAvoidingView>
      <CustomDialogInput
        isVisible={isDialogVisible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        // theme={THEME}
      />
    </SafeAreaView>
  );
};

export default withTheme(Note);
