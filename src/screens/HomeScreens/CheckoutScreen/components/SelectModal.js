import React from 'react';
import { Modal, TouchableOpacity, View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../../../../colors/colortv';

const SelectModal = ({ visible, title, data, selected, onSelect, onClose }) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <TouchableOpacity style={{
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'flex-end',
    }} activeOpacity={1} onPress={onClose}>
      <View style={{
        backgroundColor: Color.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '60%',
      }}>
        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, marginBottom: 16, color: '#222' }}>{title}</Text>
        <FlatList
          data={data}
          keyExtractor={item => item.code_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#eee' }}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text style={{ flex: 1, fontSize: 16 }}>{item.code_nm}</Text>
              {/* {selected && selected.code_id === item.code_id && (
                <Icon name="check-circle" size={20} color={Color.mainColor} />
              )} */}
            </TouchableOpacity>
          )}
        />
      </View>
    </TouchableOpacity>
  </Modal>
);

export default SelectModal; 