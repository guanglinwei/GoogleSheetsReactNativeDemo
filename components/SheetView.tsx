import { Text, ScrollView, View, Button, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import TextModal from './TextModal';

export default function SheetView() {
    const [data, setData] = useState([['']]);
    const [maxRowLen, setMaxRowLen] = useState(1);
    const [page, setPage] = useState(0);
    // const [modalVisible, setModalVisible] = useState(false);
    const [modalTargetCell, setModalTargetCell] = useState([-1, -1]);
    const [isLoading, setIsLoading] = useState(false);

    const getSheetData = () => {
        if (isLoading) return;
        setIsLoading(true);
        axios.get('http://10.0.2.2:5000/api/data/' + page, {
            data: undefined
        }).then((res) => {
            const d = res?.data || undefined;
            setData(d);
            setMaxRowLen(Math.max(d?.reduce((a: number, c: string[]) => Math.max(a, c.length), 0) || 0, maxRowLen));

        }).catch((error: AxiosError) => {
            console.log(error.message);
            setData([[]]);
        }).finally(() => {
            // setIsLoading(false);
        });
    };

    const coordsArrToCell = (rc: number[]) => {
        return coordsToCell(rc[0], rc[1]);
    };
    const coordsToCell = (r: number, c: number) => {
        if (r < 0 || c < 0) return '';
        return ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'[c]) + (page * 30 + 1 + r);
    };

    const openModal = (r: number, c: number) => {
        if (isLoading) return;
        setModalTargetCell([r, c]);
    };

    const onCloseModal = (v: string) => {
        setCellData(coordsToCell(modalTargetCell[0], modalTargetCell[1]), v);
        setModalTargetCell([-1, -1]);
    };

    const setCellData = (cell: string, str: string) => {
        if (isLoading) return;
        // const cell = coordsToCell(r, c);
        setIsLoading(true);
        axios.post('http://10.0.2.2:5000/api/edit', {
            cell: cell,
            data: str
        }).then(() => {
            getSheetData();
        }).catch((error: AxiosError) => {
            console.log(error);
        }).finally(() => {
            // setIsLoading(false);
        });
    };

    const changePage = (newPage: number) => {
        if (isLoading) return;
        setPage(Math.max(newPage, 0));
    };

    useEffect(() => {
        getSheetData();
    }, [page]);

    useEffect(() => {
        setIsLoading(false);
    }, [data]);

    const padArray = <T,>(array: T[], len: number, fill: ([] | undefined) = undefined): (T | undefined)[] => {
        if (array === undefined) return Array(len).fill(fill);
        if (len <= array.length) return array;
        return array.concat(Array(len - array.length).fill(fill));
    };

    return (
        <>
            {coordsArrToCell(modalTargetCell) === '' ? undefined :
                <TextModal 
                    visible={coordsArrToCell(modalTargetCell) !== ''}
                    onClose={onCloseModal}
                    value={data[modalTargetCell[0]][modalTargetCell[1]]}
                    title={`Editing cell ${coordsArrToCell(modalTargetCell)}`}></TextModal>
            }
            <ScrollView className='flex-grow'>
                <ScrollView horizontal className='border-2 m-1 rounded-md'>
                    <View className='flex flex-col max-w-full'>
                        {padArray(data, 30, []).map((row, i) => (
                            <View key={i} className='flex flex-row'>
                                {padArray(row || [], maxRowLen).map((value, j) => (
                                    <TouchableOpacity key={j} className={`flex-1 min-h-[20px] max-h-fit min-w-[100px] max-w-[100px] px-2 border-b-2 border-b-slate-300 overflow-x-auto ${j === maxRowLen - 1 ? '' : 'border-r-2 border-r-slate-300'}`} onPress={() => { openModal(i, j) }}>
                                        <Text className={''}>{value || ''}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                        ))}</View>
                </ScrollView>
            </ScrollView>
            <View>
                <Text className='mx-auto'>Currently showing rows {page * 30 + 1} to {(page + 1) * 30}</Text>
            </View>
            <View className='flex flex-row w-fit mx-auto'>
                <Button onPress={() => changePage(0)} title='<<' />
                <Text> </Text>
                <Button onPress={() => changePage(page - 1)} title='Prev Page' />
                <Text> </Text>
                <Button onPress={() => changePage(page + 1)} title='Next Page' />
                {/* <Button onPress={() => setCellData(0, 0, 'just a test')} title='test edit' /> */}
            </View>
        </>
    )
};