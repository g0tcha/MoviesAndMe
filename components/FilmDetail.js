import React from 'react'
import { StyleSheet, View, Image, Text, ActivityIndicator, ScrollView, TouchableOpacity, Share, Alert, Platform } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect, mapDispatchToProps } from 'react-redux'
import EnlargeShrink from '../animations/EnlargeShrink'

class FilmDetail extends React.Component {
    static navigationOptions = ({navigation}) => {
        const { params } = navigation.state
        if(params.film != undefined && Platform.OS === 'ios') {
            return {
                headerRight:
                    <TouchableOpacity style={styles.shareTouchableHeaderRightButton} onPress={() => params.shareFilm()}>
                        <Image style={styles.shareImage} source={require('../images/ic_share.png')} />
                    </TouchableOpacity>
            }
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }
        this._shareFilm = this._shareFilm.bind(this)
    }

    componentDidMount() {
        const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navitation.state.params.idFilm)
        if(favoriteFilmIndex !== -1) {
            this.setState({
                film: this.props.favoritesFilm[favoriteFilmIndex]
            }, () => {
                this._updateNavigationParams()
            })
            return
        }

        this.setState({ isLoading: true })

        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            }, () => { this._updateNavigationParams() })
        })
    }

    componentDidUpdate() {
        console.log(this.props.favoritesFilm)
    }

    _updateNavigationParams() {
        this.props.navigation.setParams({
            shareFilm: this._shareFilm,
            film: this.state.film
        })
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _displayFloatingActionButton() {
        const { film } = this.state
        if(film != undefined && Platform.OS === 'android') {
            return (
                <TouchableOpacity
                    style={styles.shareTouchableFloatingActionButton}
                    onPress={() => this._shareFilm()}>
                    <Image style={shareImage} source={require('../images/ic_share.png')} />
                </TouchableOpacity>
            )
        }
    }

    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
    }

    _displayFavoriteImage() {
        var sourceImage = require('../images/favorite_off.png')
        var shouldEnlarge = false

        if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImage = require('../images/favorite_on.png')
            shouldEnlarge = true
        }

        return (
            <EnlargeShrink shouldEnlarge={shouldEnlarge}>
                <Image style={styles.favoriteImage} source={sourceImage} />
            </EnlargeShrink>
        )
    }

    _shareFilm() {
        const { film } = this.state
        Share.share({ title: film.title, message: film.overview })
        .then(
            Alert.alert(
                'Succès',
                'Film partagé',
                [
                    {text: 'OK', onPress: () => {}}
                ]
            )
        )
        .catch(err =>
            Alert.alert(
                'Echec',
                'Film non partagé',
                [
                    {text: 'OK', onPress: () => {}}
                ]
            )
        )
    }

    _displayFilm() {
        if (this.state.film != undefined) {
            const film = this.state.film
            return (
                <ScrollView style={styles.scrollViewContainer}>
                    <Image source={{uri: getImageFromApi(film.backdrop_path)}} style={styles.image} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{film.title}</Text>
                    </View>
                    <TouchableOpacity style={styles.favoriteContainer} onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description}>{film.overview}</Text>
                    <View style={styles.metaContainer}>
                        <Text>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    </View>
                    <View style={styles.metaContainer}>
                        <Text>Note : </Text>
                        <Text>{film.vote_average}</Text>
                    </View>
                    <View style={styles.metaContainer}>
                        <Text>Nombre de vote : </Text>
                        <Text>{film.vote_count}</Text>
                    </View>
                    <View style={styles.metaContainer}>
                        <Text>Budget : </Text>
                        <Text>{numeral(film.budget).format('0,0[.]00 $')}</Text>
                    </View>
                    <View style={styles.metaContainer}>
                        <Text>Genre(s) : </Text>
                        <Text>{film.genres.map(genre => genre.name).join(", ")}</Text>
                    </View>
                    <View style={styles.metaContainer}>
                        <Text>Compagnie(s) : </Text>
                        <Text>{film.production_companies.map(company => company.name).join(", ")}</Text>
                    </View>
                </ScrollView>
            )
        }
    }

    render() {
        console.log(this.props);
        return (
            <View style={styles.mainContainer}>
                {this._displayLoading()}
                {this._displayFilm()}
                {this._displayFloatingActionButton()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    image: {
        backgroundColor: 'gray',
        height: 150
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24
    },
    description: {
        fontSize: 12,
        fontStyle: 'italic',
        margin: 10,
        color: 'gray',
        textAlign: 'justify',
        lineHeight: 18
    },
    metaContainer: {
        flexDirection: 'row',
        marginLeft: 8,
        marginRight: 8,
        marginTop: 8
    },
    loadingContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    favoriteContainer: {
        alignItems: 'center'
    },
    favoriteImage: {
        flex: 1,
        width: null,
        height: null
    },
    shareTouchableFloatingActionButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    shareImage: {
        width: 30,
        height: 30
    },
    shareTouchableHeaderRightButton: {
        marginRight: 8
    }
})


export default connect(mapStateToProps)(FilmDetail)
