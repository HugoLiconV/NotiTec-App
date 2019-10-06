import React, {useState} from 'react';
import styled from 'styled-components';
import {ACCENT_4} from '../constants';

const Categories = ({items, selectedIndex, onSelectedItem}) => {
  const [selectCategory, setSelectCategory] = useState(selectedIndex);

  function onCategorySelected(index) {
    setSelectCategory(index);
    onSelectedItem(items[index]);
  }

  return (
    <CategoriesScrollView horizontal={true}>
      {items.map((item, index) => (
        <Name
          selected={selectCategory === index}
          key={index}
          onPress={() => {
            onCategorySelected(index);
          }}>
          {item.name}
        </Name>
      ))}
    </CategoriesScrollView>
  );
};

export default Categories;

const Name = styled.Text`
  font-size: 32px;
  font-weight: 600;
  margin-left: 15px;
  color: ${props => (props.selected ? ACCENT_4 : '#bcbece')};
`;

const CategoriesScrollView = styled.ScrollView`
  flex-direction: row;
  padding-top: 15px;
  padding-bottom: 15px;
`;
