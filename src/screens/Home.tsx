import * as React from 'react';
import {StatusBar, Image, Animated, Text, View, StyleSheet} from 'react-native';
import {faker} from '@faker-js/faker';

//Created By Bebba

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.string.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.arrayElement([
      'women',
      'men',
    ])}/${faker.number.int(60)}.jpg`,
    name: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    email: faker.internet.email(),
  };
});
const BG_IMAGE =
  'https://images.pexels.com/photos/7130549/pexels-photo-7130549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 2;
interface Props {}
const Home: React.FC<Props> = ({}) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Image
        source={{uri: BG_IMAGE}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={50}
      />
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        data={DATA}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 60,
        }}
        keyExtractor={item => item.key}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index * 2),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0.2],
          });
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0.5],
          });
          return (
            <Animated.View
              style={{
                flexDirection: 'row',
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                opacity,
                transform: [{scale}],
              }}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '700',
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    opacity: 0.7,
                  }}>
                  {item.jobTitle}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    opacity: 0.8,
                    color: '#0099cc',
                  }}>
                  {item.email}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
export default Home;
