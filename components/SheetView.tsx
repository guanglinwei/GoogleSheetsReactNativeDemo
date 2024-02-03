import { Text, ScrollView, View, FlatList, Button } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

export default function SheetView() {
    const [data, setData] = useState([['']]);
    const [maxRowLen, setMaxRowLen] = useState(1);

    const spreadsheetId = '1e_xmilg7qiOQ_U_vhQLnsbIph-6lu6UjiIO3aH5jqlY';
    const apiKey = 'AIzaSyC6ERCiAwGzycHcfXWTzt7NNYExMVpoN_o';

    const getSheetData = () => {
        axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1?valueRenderOption=FORMATTED_VALUE&key=${apiKey}`, {
            params: {
                valueRenderOption: 'FORMATTED_VALUE',
                key: apiKey
            }
        })
            .then((result) => {
                setData(result.data.values);
                setMaxRowLen(result.data.values.reduce((a: number, c: string[]) => Math.max(a, c.length), 0))
            }).catch((error: AxiosError) => {
                console.log(error.message)
            });
    };

    const addRow = () => {
        axios.post(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1:append`,
            {
                'values': ['test']
            },
            {
                params: {
                    key: apiKey,
                    insertDataOption: 'INSERT_ROWS',
                }
            }).then(() => {
                getSheetData();
            }).catch((error: AxiosError) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                  } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
                  console.log(error.config);
            })
    };

    useEffect(() => {
        getSheetData();
    }, []);

    const padArray = useCallback(<T,>(array: T[]): (T | undefined)[] => {
        if (maxRowLen <= array.length) return array;
        return array.concat(Array(maxRowLen - array.length).fill(undefined));
    }, [maxRowLen]);

    return (
        <>
            <ScrollView horizontal className='border-2 m-1 rounded-md flex-grow'>
                <View className='flex flex-col max-w-full'>
                    {data.map((row, i) => (
                        <View key={i} className='flex flex-row'>
                            {padArray(row).map((value, j) => (
                                <Text key={j} className={`flex-1 px-2 border-b-2 border-b-slate-300 min-w-[100px] max-w-[100px] overflow-x-auto ${j === maxRowLen - 1 ? '' : 'border-r-2 border-r-slate-300'}`}>{value || ''}</Text>
                            ))}
                        </View>

                    ))}</View>
            </ScrollView>
            <View>
                <Button onPress={addRow} title='Hello' />
            </View>
        </>
    )
};