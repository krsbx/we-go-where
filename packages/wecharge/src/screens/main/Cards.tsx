import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { CardList, EmptyCard, Header } from '../../components/screens/main';
import { AUTH_STACK } from '../../constants/screens/auth';
import { LAUNCHER_STACK } from '../../constants/screens/launcher';
import {
  MAIN_STACK,
  MainStackScreenNavigation,
} from '../../constants/screens/main';
import useAuthStore from '../../store/state/auth';
import { CardState } from '../../store/state/card';
import { COLOR_PALETTE } from '../../utils/theme';

const dummyData = [
  {
    _id: '1',
    cardHolder: 'John Doe',
    expiryDate: '12/24',
    cardType: 'Visa',
    userId: '1',
    lastFour: '1234',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '1',
    cardHolder: 'Jane Doe',
    expiryDate: '12/24',
    cardType: 'Visa',
    userId: '1',
    lastFour: '1234',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function ListSeparator() {
  return <View style={{ height: scale(10) }} />;
}

function Cards() {
  const navigation =
    useNavigation<MainStackScreenNavigation<typeof MAIN_STACK.CARDS>>();
  const resetAuth = useAuthStore((state) => state.resetAuth);

  const onBack = useCallback(() => {
    resetAuth();

    navigation.dispatch(
      StackActions.replace(LAUNCHER_STACK.AUTH, {
        screens: AUTH_STACK.SIGN_IN,
      })
    );
  }, [navigation, resetAuth]);

  const onAddCard = useCallback(() => {
    navigation.push(MAIN_STACK.ADD_CARD);
  }, [navigation]);

  return (
    <View style={style.mainContainer}>
      <Header
        title="Cards"
        withBack
        onBack={onBack}
        rightIcon={
          <TouchableOpacity onPress={onAddCard}>
            <EntypoIcon
              name="plus"
              size={scale(20)}
              color={COLOR_PALETTE.NEUTRAL_90}
            />
          </TouchableOpacity>
        }
      />
      <FlatList<CardState>
        data={dummyData}
        contentContainerStyle={style.listContainer}
        renderItem={CardList}
        ItemSeparatorComponent={ListSeparator}
        ListEmptyComponent={EmptyCard}
      />
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLOR_PALETTE.WHITE,
    height: '100%',
    width: '100%',
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
    paddingTop: scale(20),
    paddingHorizontal: scale(20),
  },
});

export default Cards;
