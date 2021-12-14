import React from 'react'
import {
    Text,
    View,
    useWindowDimensions,
    Image,
    Animated,
    StatusBar,
    StatusBar
} from 'react-native'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'

const DATA = {
    id: 1,
    name: 'NIKE Air Force 1',
    price: '$187.00',
    description: `The radiance lives on in the Nike Air Force 1 '07, the b-ball OG that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.`,
    images: [
        require('../assets/images/AIR1.jpg'),
        require('../assets/images/AIR2.jpg'),
        require('../assets/images/AIR3.jpg'),
        require('../assets/images/AIR4.jpg'),
        require('../assets/images/AIR5.jpg')
    ]
}


export default function Details() {
    const { width, height } = useWindowDimensions()
    let IMAGE_WIDTH = width
    let IMAGE_HEIGHT = (height * .75) + StatusBar.currentHeight
    let DOT_SIZE = 10
    let DOT_SPACING = 10
    let DOT_INDICATOR_SIZE = DOT_SIZE * 2

    const scrollY = React.useRef(new Animated.Value(0)).current
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle='auto' translucent backgroundColor='transparent' />
            <View style={{
                height: IMAGE_HEIGHT,
                overflow: 'hidden'
            }}>
                <Animated.FlatList
                    data={DATA.images}
                    keyExtractor={(_, index) => `image ${index}`}
                    snapToInterval={IMAGE_HEIGHT}
                    decelerationRate={'fast'}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        {
                            useNativeDriver: true
                        }
                    )}
                    renderItem={({ item }) => {
                        return (
                            <Image
                                source={item}
                                style={{
                                    width: IMAGE_WIDTH,
                                    height: IMAGE_HEIGHT
                                }}
                                resizeMode='cover'
                            />
                        )
                    }}
                />
                <View style={{
                    position: 'absolute',
                    top: ((IMAGE_HEIGHT / 2) - ((DOT_SIZE * DATA.images.length) / 2)),
                    left: 20
                }}>
                    {
                        DATA.images.map((_, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        width: DOT_SIZE,
                                        height: DOT_SIZE,
                                        borderRadius: DOT_SIZE / 2,
                                        backgroundColor: '#FFF',
                                        marginBottom: DOT_SPACING
                                    }}
                                />
                            )
                        })
                    }
                    <Animated.View
                        style={{
                            width: DOT_INDICATOR_SIZE,
                            height: DOT_INDICATOR_SIZE,
                            borderRadius: DOT_INDICATOR_SIZE / 2,
                            borderWidth: 1,
                            position: 'absolute',
                            borderColor: '#FFF',
                            top: -DOT_SIZE / 2,
                            left: -DOT_SIZE / 2,
                            transform: [
                                {
                                    translateY: Animated.divide(scrollY, IMAGE_HEIGHT).interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, DOT_INDICATOR_SIZE]
                                    })
                                }
                            ]
                        }}
                    />
                </View>
            </View>
            <BottomSheet
                snapPoints={[(height - IMAGE_HEIGHT), height - 50]}
            >
                <BottomSheetScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 20, paddingVertical: 20
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 25,
                        textTransform: 'uppercase',
                        textAlign: 'center',
                    }}>{DATA.name}</Text>
                    <Text style={{
                        fontWeight: '700',
                        fontSize: 18,
                        textAlign: 'center',
                        marginTop: 20
                    }}>{DATA.price}</Text>
                    <Text style={{
                        marginVertical: 20,
                        fontSize: 16,
                        letterSpacing: 1,
                        lineHeight: 16 * 1.5
                    }}>{DATA.description}</Text>
                    <Text style={{
                        marginVertical: 20,
                        fontSize: 16,
                        letterSpacing: 1,
                        lineHeight: 16 * 1.5
                    }}>{DATA.description}</Text>
                    <Text style={{
                        marginVertical: 20,
                        fontSize: 16,
                        letterSpacing: 1,
                        lineHeight: 16 * 1.5
                    }}>{DATA.description}</Text>
                    <Text style={{
                        marginVertical: 20,
                        fontSize: 16,
                        letterSpacing: 1,
                        lineHeight: 16 * 1.5
                    }}>{DATA.description}</Text>
                    <Text style={{
                        marginVertical: 20,
                        fontSize: 16,
                        letterSpacing: 1,
                        lineHeight: 16 * 1.5
                    }}>{DATA.description}</Text>
                    <Text style={{
                        marginVertical: 20,
                        fontSize: 16,
                        letterSpacing: 1,
                        lineHeight: 16 * 1.5
                    }}>{DATA.description}</Text>
                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    )
}