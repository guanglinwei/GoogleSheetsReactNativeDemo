import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import SheetView from './components/SheetView';

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View className='h-full'>
            <StatusBar />
            <Text className='font-bold text-center text-lg bg-slate-300 m-2 py-1 rounded-md'>Google Sheets View Demo</Text>
            <SheetView />
        </View>
    );
}

export default App;
