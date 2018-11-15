import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

class FilmList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            film: []
        }
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.films}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) =>
                    <FilmItem
                        film={item}
                        displayDetailForFilm={this._displayDetailForFilm}
                        isFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                    />
                    }
                onEndReached={() => {
                    if (!this.props.favoriteList && this.props.films.length > 0 && this.props.page < this.props.totalPages) {
                        this.props.loadFilms()
                    }
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmList)
