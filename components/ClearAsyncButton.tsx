import React from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ClearAsyncButton() {
    const clearStorage = async () => {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage successfully cleared!');
        } catch (e) {
            console.error('Failed to clear AsyncStorage:', e);
        }
    };

    return (
        <View>
            <Button title="Clear Storage" onPress={clearStorage} />
        </View>
    );
};
