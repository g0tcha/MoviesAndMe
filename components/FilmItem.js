import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import FadeIn from '../animations/FadeIn'

class FilmItem extends React.Component {

    _displayFavoriteImage() {
        if(this.props.isFavorite) {
            var sourceImage = require('../images/favorite_on.png')
            return (
                <Image
                    source={sourceImage}
                    style={styles.favoriteImage}
                />
            )
        }
    }

    render() {
        const { film, displayDetailForFilm } = this.props
        return (
            <FadeIn>
                <TouchableOpacity style={styles.mainContainer} onPress={() => displayDetailForFilm(film.id)}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.poster_path)}}
                    />
                    <View style={styles.contentContainer}>
                        <View style={styles.headerContainer}>
                            {this._displayFavoriteImage()}
                            <Text style={styles.titleText}>{film.title}</Text>
                            <Text style={styles.voteText}>{film.vote_average}</Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionText} numberOfLines={6}>{film.overview}</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateText}>Sorti le {film.release_date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5
    },
    contentContainer: {
        flex: 1,
        margin: 5
    },
    headerContainer: {
        flex: 3,
        flexDirection: 'row'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    voteText: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    descriptionContainer: {
        flex: 7
    },
    descriptionText: {
        fontStyle: 'italic',
        color: '#666666'
    },
    dateText: {
        textAlign: 'right',
        fontSize: 14
    },
    favoriteImage: {
        width: 25,
        height: 25,
        marginRight: 5
    }
})

export default FilmItem
