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
  Spinner,
} from '@shoutem/ui';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const NewsCard = ({announcement, onItemPress}) => {
  return (
    <Container>
      <TouchableOpacity styleName="flexible" onPress={onItemPress}>
        <Cover>
          <FullImage
            loadingIndicatorSource={<Spinner />}
            source={{
              uri: announcement.image,
            }}
          />
        </Cover>
        <Content>
          <Title>{announcement.title}</Title>
          <DateCaption>{dayjs(announcement.createdAt).fromNow()}</DateCaption>
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
  padding: 16px;
  flex-direction: column;
  /* align-items: center; */
  height: 60px;
`;

const Title = styled.Text`
  color: #3c4560;
  font-size: 20px;
  font-weight: 600;
`;

const DateCaption = styled.Text`
  color: #b8b3c3;
  font-size: 15px;
  text-align: left;
  font-weight: 600;
  margin-top: 4px;
`;

export default NewsCard;
