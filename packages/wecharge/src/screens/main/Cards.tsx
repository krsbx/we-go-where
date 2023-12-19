import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { CardList, EmptyCard, Header } from '../../components/screens/main';
import CardDetail from '../../components/screens/main/CardDetail';
import { AUTH_STACK } from '../../constants/screens/auth';
import { LAUNCHER_STACK } from '../../constants/screens/launcher';
import {
  MAIN_STACK,
  MainStackScreenNavigation,
} from '../../constants/screens/main';
import { getCards } from '../../store/actions/card';
import useAuthStore from '../../store/state/auth';
import useCardStore from '../../store/state/card';
import { COLOR_PALETTE } from '../../utils/theme';

function ListSeparator() {
  return <View style={{ height: scale(10) }} />;
}

function Cards() {
  const cards = useCardStore((state) => state.cards);
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

  useEffect(() => {
    getCards();
  }, []);

  return (
    <React.Fragment>
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
        <FlatList
          data={cards}
          contentContainerStyle={style.listContainer}
          renderItem={({ item, index, separators }) => (
            <CardList item={item} index={index} separators={separators} />
          )}
          ItemSeparatorComponent={ListSeparator}
          ListEmptyComponent={EmptyCard}
        />
      </View>
      <CardDetail />
    </React.Fragment>
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
    padding: scale(20),
  },
});

export default Cards;
