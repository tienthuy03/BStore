import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Block from '../components/Block';
import Text from '../components/Text';
import Button from '../components/Button';
import Icon_next from '../icons/Next';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setLanguageItem } from '../Language';
import { Color } from '../colors/color';

const Item_MBHRRG = () => {
  const navigation = useNavigation();
  const state = useSelector(state => state);
  let dataMenuMBHRRGs = [];
  let language;
  try {
    dataMenuMBHRRGs = state.menuReducer.data.data.menu;
    language = state.loginReducers.data.data.user_language;
  } catch (error) { }

  const [dataMenuMBHRRG, setDataMenuMBHRRG] = useState([]);

  useEffect(() => {
    let dataMenuMRREss = [];
    try {
      dataMenuMBHRRGs.map(item => {
        if (
          item.p_pk ===
          dataMenuMBHRRGs.filter(i => i.menu_cd === 'MBHRRG')[0].pk
        ) {
          dataMenuMRREss.push(item);
        }
        setDataMenuMBHRRG(dataMenuMRREss);
      });
    } catch (error) { }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const renderItem = ({ item, index }) => {
    return (
      <Block>
        <Button
          nextScreen={() => navigation.navigate(item.menu_cd)}
          shadow
          justifyContent={'space-between'}
          alignCenter
          marginLeft={20}
          marginRight={20}
          marginBottom={10}
          radius={8}
          padding={6}
          row
          backgroundColor={Color.tabColor}>
          <Block
            marginLeft={10}
            height={40}
            width={40}
            radius={6}
            alignCenter
            justifyCenter>
            <Icon name={item.icon} color={Color.titleColor} size={24} />
          </Block>
          <Text
            flex
            paddingLeft={10}
            size={16}
            color={Color.titleColor}
            fontFamily={'Roboto-Regular'}>
            {setLanguageItem(item, language)}
          </Text>
          <Icon_next color={Color.titleColor} style={{ marginRight: 10 }} />
        </Button>
      </Block>
    );
  };

  return (
    <Block flex paddingTop={10}>
      <FlatList
        data={dataMenuMBHRRG}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </Block>
  );
};

export default Item_MBHRRG;
