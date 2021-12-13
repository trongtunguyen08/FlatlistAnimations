import React from 'react'
import { Text, View, useWindowDimensions, FlatList, Animated, Image, Platform, StatusBar } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const DATA = [
  {
    key: 1,
    name: `Nike Blazer Mid '77 Vintage`,
    price: '$100.00',
    backdrop: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/adc43e71-ff78-4d39-a95f-ba86aa88565f/blazer-mid-77-vintage-mens-shoes-nw30B2.png',
    image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/8bc7d689-de2c-4b49-986c-b42153895bc0/blazer-mid-77-vintage-mens-shoes-nw30B2.png',
    description: `In the ‘70s, Nike was the new shoe on the block. So new in fact, we were still breaking into the basketball scene and testing prototypes on the feet of our local team. Of course, the design improved over the years, but the name stuck. The Nike Blazer Mid ’77 Vintage—classic since the beginning.`
  },
  {
    key: 2,
    name: `Nike Air Vapormax 2021 FK`,
    price: '$200.00',
    backdrop: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/d328a8d4-912e-4ab0-bf8a-c28e21340f11/air-vapormax-2021-fk-mens-shoes-NpTfFz.png',
    image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/6f67629f-4299-47bc-9034-6de892a654e4/air-vapormax-2021-fk-mens-shoes-NpTfFz.png',
    description: `The Nike Air VaporMax 2021 FK is airy and easy to wear with superstretchy, recycled Flyknit fabric (plus a soft collar that sculpts your ankle). The stitched-on Swoosh and recycled TPU heel clip add a splash of intrigue as you float down the streets on incredibly soft VaporMax cushioning.`
  },
  {
    key: 3,
    name: `Nike Air Max 95`,
    price: '$170.00',
    backdrop: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/1a72ddb2-8bd2-4f9d-bbee-cedbb36c01bb/air-max-95-mens-shoes-95JNSF.png',
    image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/c96acde3-d4e5-4a2f-a662-5ff28106709a/air-max-95-mens-shoes-95JNSF.png',
    description: `Taking inspiration from the human body and '90s track aesthetics, the Nike Air Max 95 mixes unbelievable comfort with head-turning style. The iconic side panels represent strength and use a selection of colors. Visible Air in the heel and forefoot cushions every step.`
  },
  {
    key: 4,
    name: `Nike Air Force 1 '07`,
    price: '$90.00',
    backdrop: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/cb1fa13c-a1bf-4477-8b7c-78ac7bc16f80/air-force-1-07-womens-shoes-GCkPzr.png',
    image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/4906dd0a-96d2-46d3-b70c-cd7c0227deef/air-force-1-07-womens-shoes-GCkPzr.png',
    description: `The radiance lives on in the Nike Air Force 1 ’07, the b-ball OG that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.`
  },
  {
    key: 5,
    name: `Nike Air Huarache PRM QS`,
    price: '$130.00',
    backdrop: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/1c5691ac-6fa4-4e53-8f88-c145f5b33a8f/air-huarache-prm-qs-shoes-BjT07N.png',
    image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/623f69d4-1bbf-4239-aff1-f283fbbd6c55/air-huarache-prm-qs-shoes-BjT07N.png',
    description: `When it fits this good and looks this great, you know it's right for Kopites. Celebrate the unwavering Liverpool FC fanbase with shoes to match your team's kit. Checkered red-and-white graphics, interchangeable patches and the team crest let your feet do the bragging.`
  },
  {
    key: 6,
    name: `Air Jordan 1`,
    price: '$170.00',
    backdrop: 'https://static.nike.com/a/images/t_prod,f_auto/w_1920,c_limit/0a16316f-4334-4d6f-b335-ed1c4edf27bf/air-jordan-1-craft-dh3097-001-release-date.jpg',
    image: 'https://static.nike.com/a/images/t_prod_sc/w_640,c_limit,f_auto/bec2d62a-e9c2-4ee9-976e-e3e4198563b1/air-jordan-1-craft-dh3097-001-release-date.jpg',
    description: `Since MJ first slipped on a pair in 1985, the Air Jordan 1 has transcended the court to become a fashion mainstay. Dress it up or dress it down — either way, you’re going to look fresh all year round. Now, the Air Jordan 1 “Craft” is here to take that legacy to the next level, bringing an artisanal feel to the legendary model.`
  }
]

const DATA_ITEMS = [{ key: 'left-spacer' }, ...DATA, { key: 'right-spacer' }]

const Backdrop = ({ items, scrollX }) => {
  const { width, height } = useWindowDimensions()
  let BACKDROP_HEIGHT = height * .6
  let ITEM_SIZE = width * .72
  if (width >= 1024) {
    ITEM_SIZE = width * .45
  }
  return (
    <View style={{
      position: 'absolute',
      width,
      height: BACKDROP_HEIGHT
    }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.key + '-backdrop'}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        removeClippedSubviews={false}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE
          ]
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width, 0]
          })
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1]
          })
          if (!item.backdrop) {
            return null
          }
          return (
            <Animated.View
              style={{
                position: 'absolute',
                width,
                height: BACKDROP_HEIGHT,
                overflow: 'hidden',
                transform: [
                  {
                    translateX
                  }
                ]
              }}
            >
              <Image
                source={{ uri: item.backdrop }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT
                }}
                resizeMode='cover'
              />
            </Animated.View>
          )
        }}
      />
      <LinearGradient
        colors={['transparent', '#FFF']}
        style={{
          width,
          height: BACKDROP_HEIGHT,
          position: 'absolute',
          bottom: 0
        }}
      />
    </View>
  )
}

export default function App() {
  const { width, height } = useWindowDimensions()
  const scrollX = React.useRef(new Animated.Value(0)).current
  let ITEM_SIZE = width * .72
  if (width >= 1024) {
    ITEM_SIZE = width * .45
  }
  let SPACING = 10
  let POSTER_HEIGHT = height * .4
  if (width >= 720) {
    POSTER_HEIGHT = height * .6
  }
  let SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='auto' translucent backgroundColor='transparent' />
      <Backdrop items={DATA_ITEMS} scrollX={scrollX} />
      <Animated.FlatList
        data={DATA_ITEMS}
        keyExtractor={(_, index) => `item ${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        bounces={false}
        snapToAlignment='start'
        contentContainerStyle={{ alignItems: 'center' }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: true
          }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE
          ]
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -60, 0]
          })

          if (!item.name) {
            return <View style={{
              width: SPACER_ITEM_SIZE
            }} />
          }
          return (
            <View style={{
              width: ITEM_SIZE
            }}>
              <Animated.View style={{
                backgroundColor: '#FFF',
                padding: SPACING * 2,
                borderRadius: 34,
                marginHorizontal: SPACING,
                transform: [
                  {
                    translateY
                  }
                ]
              }}>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: '100%',
                    height: POSTER_HEIGHT,
                    borderRadius: 34
                  }}
                  resizeMode='stretch'
                />
                <Text numberOfLines={1} style={{
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  marginTop: 10
                }}>{item.name}</Text>
                <Text numberOfLines={1} style={{
                  textAlign: 'center',
                  fontWeight: '700',
                  marginVertical: 5
                }}>{item.price}</Text>
                <Text numberOfLines={4} style={{
                  textAlign: 'justify'
                }}>{item.description}</Text>
              </Animated.View>
            </View>
          )
        }}
      />
    </View>
  );
}
