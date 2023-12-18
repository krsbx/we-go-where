import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { UserCard } from '.';
import { CardState } from '../../../store/state/card';

function CardList({ index, item }: ListRenderItemInfo<CardState>) {
  return <UserCard {...item} key={index} />;
}

export default CardList;
