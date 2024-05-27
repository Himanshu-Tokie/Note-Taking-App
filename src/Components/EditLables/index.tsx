import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { ICONS } from "../../Constants/Icons";
import Icon from "../Icon";
import { styles } from "./style";

export default function EditLables({onChangeText}) {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.icon}>
                    <TouchableOpacity>
                        <Icon icon={ICONS.CROSS} height={24} width={24} color={'#B6B0D9'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.text}>
                    <TextInput placeholder="Create new label" onChangeText={onChangeText}/>
                </View>
                <View style={styles.icon}>
                    <TouchableOpacity>
                        <Icon icon={ICONS.TICK} height={30} width={30} color={'#B6B0D9'} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

