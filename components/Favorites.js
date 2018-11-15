import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FilmList from './FilmList'
import Avatar from './Avatar'
import { connect } from 'react-redux'

class Favorites extends React.Component {

    render() {
        return(
            <View style={styles.mainContainer}>
                <View style={styles.avatarContainer}>
                    <Avatar />
                </View>
                <FilmList
                    films={this.props.favoritesFilm}
                    navigation={this.props.navigation}
                    favoriteList={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    avatarContainer: {
        alignItems: 'center'
    }
})

const mapStateToProps = state => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}

export default connect(mapStateToProps)(Favorites)
