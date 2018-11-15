import React from 'react'
import { StyleSheet, View, Animated, Easing, PanResponder, Dimensions } from 'react-native'

class Test extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            topPosition: 0,
            leftPosition: 0
        }

        var { height, width } = Dimensions.get('window');

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                let touches = evt.nativeEvent.touches;
                if(touches.length == 1) {
                    this.setState({
                        topPosition: touches[0].pageY - height/2,
                        leftPosition: touches[0].pageX - width/2
                    })
                }
            }
        })
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View
                    {...this.panResponder.panHandlers}
                    style={[styles.animationView, { top: this.state.topPosition, left: this.state.leftPosition }]}>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animationView: {
        backgroundColor: 'red',
        width: 100,
        height: 100
    }
})

export default Test
