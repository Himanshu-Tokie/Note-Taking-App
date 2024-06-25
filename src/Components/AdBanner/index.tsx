import React from 'react';
import { requireNativeComponent, ViewStyle, StyleSheet, View } from 'react-native';

interface AdBannerComponentProps {
    adUnitId: string;
    style?: ViewStyle;
}

const BannerAdView = requireNativeComponent<AdBannerComponentProps>('BannerAdView');

const AdBannerComponent: React.FC<AdBannerComponentProps> = ({ adUnitId, style }) => {
    return (
        <View style={[styles.container, style]}>
            <BannerAdView style={styles.banner} adUnitId={adUnitId} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    banner: {
        width: '100%',
        height: 100, // Adjust based on your ad size
    },
});

export default AdBannerComponent;
