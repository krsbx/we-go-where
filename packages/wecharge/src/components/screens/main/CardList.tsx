import React, { useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { UserCard } from '.';
import { CardState } from '../../../store/state/card';
import useCommonStore from '../../../store/state/common';

function CardList({ index, item }: ListRenderItemInfo<CardState>) {
  const { setIsSelecting, setSelected } = useCommonStore((state) => ({
    setIsSelecting: state.setIsSelecting,
    setSelected: state.setSelected,
  }));

  const onPress = useCallback(() => {
    setIsSelecting(true);
    setSelected(item._id);
  }, [item, setIsSelecting, setSelected]);

  return <UserCard {...item} onPress={onPress} key={index} />;
}

export default CardList;
