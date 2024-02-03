import { useEffect, useRef, useState } from "react";
import { Button, Modal, Text, TextInput, View } from "react-native";

interface TextModalInterface {
    visible: boolean;
    value: string;
    onClose: (v: string) => void;
    title?: string;
}

export default function TextModal({ visible, value, onClose, title }: TextModalInterface) {
    const [text, setText] = useState(value);
    const originalValue = value;

    const closeModal = (save: boolean) => {
        onClose(save ? text : originalValue);
    };

    return (
        <View className='mx-auto w-full flex-1 justify-center align-middle items-center h-screen'>
            <Modal
                className=''
                animationType="slide"
                transparent
                visible={visible}
                onRequestClose={() => closeModal(false)}
            >
                <View className='bg-slate-100 m-auto w-5/6 border-2 border-slate-600 rounded-md'>
                    {title && <Text className='font-bold mx-2'>{title}</Text>}
                    <TextInput className='border-2 rounded-md border-slate-300' onChangeText={setText} value={text} placeholder="Empty cell" />
                    <View className='flex flex-row w-full mx-auto'>
                        <Button title='Cancel' color='red' onPress={() => closeModal(false)} />
                        <Button title='Done' onPress={() => closeModal(true)} />
                    </View>
                </View>
            </Modal>
        </View>
    )
};