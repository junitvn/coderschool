import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';

const ConversionTypeButton = props => {
    const fromFlag = props.from === 'usd' ? '🇺🇲' : '🇻🇳';
    const toFlag = props.to === 'usd' ? '🇺🇲' : '🇻🇳';
    return (
        <View>
            <Picker
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) => { }
                }>
                <Picker.Item label="🇺🇲" value="usd" />
                <Picker.Item label="🇻🇳" value="vnd" />
            </Picker>
        </View>
    );
};

const CurrencyConvert = () => {
    return <View>
        <Text>CurrencyConvert {'🇮🇷'}</Text>
        <ConversionTypeButton from="usd" />
    </View>
}

export default CurrencyConvert;