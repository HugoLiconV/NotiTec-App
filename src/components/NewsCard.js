import React from 'react';
import {
  Card,
  Image,
  Subtitle,
  View,
  Button,
  Icon,
  Caption,
  ImageBackground,
  Divider,
  Tile,
  TouchableOpacity,
} from '@shoutem/ui';
import styled from 'styled-components';

const NewsCard = ({post, onItemPress}) => {
  return (
    <Container>
      <TouchableOpacity styleName="flexible" onPress={onItemPress}>
        <Cover>
          <FullImage
            source={{
              uri:
                'http://backgroundlabs.com/wp-content/uploads/2013/08/mint-green-facebook-cover-580.png',
            }}
          />
        </Cover>
        <Content>
          <Title>{post.title}</Title>
          {/* <PriceCaption>$ 2.99 each</PriceCaption> */}
        </Content>
      </TouchableOpacity>
    </Container>
  );
};

const Container = styled.View`
  background: #fff;
  height: 200px;
  width: 100%;
  border-radius: 14px;
  margin-top: 20px;
  /* box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15); */
`;

const Cover = styled.View`
  width: 100%;
  height: 120px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const FullImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const Content = styled.View`
  padding-top: 10px;
  flex-direction: column;
  align-items: center;
  height: 60px;
`;

const Title = styled.Text`
  color: #3c4560;
  font-size: 20px;
  font-weight: 600;
`;

const PriceCaption = styled.Text`
  color: #b8b3c3;
  font-size: 15px;
  font-weight: 600;
  margin-top: 4px;
`;

export default NewsCard;
