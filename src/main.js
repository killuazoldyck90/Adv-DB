var api = require('./neo4j.js');
var React = require('react');
var ReactDOM = require('react-dom');

var movieURL;

$(function () {
    api
        .getMovieID('Avatar')
        .then(id => {
            movieURL = api.getURL(id);
        })
    ReactDOM.render(<Test url={movieURL} />, document.getElementById('mount'));
});

class Test extends React.Component (props) {
    constructor(props) {
        super(props);
        this.state = {
            title: props.original_title,
            tagline: props.tagline,
            poster: props.poster,
            genre: props.genre,
            release: props.release,
            vote: props.vote_average,
            runtime: props.runtime,
            revenue: props.revenue,
            backdrop: props.backdrop_path,
            url: props.url,
            imgurl: props.imgurl
        };
    }

    componentWillMount() {
        this.updateStates(this.props.url);
        console.log('mounted! with: ' + this.state.poster);
    }

    updateIMGURL() {
        this.setState({imgurl: "http://image.tmdb.org/t/p/original" + this.state.poster});
    }

    updateStates(url) {
        fetch(url).then((res) => res.json()).then((data) => {
        // update state with API data
        this.setState({title: data.original_title});
        this.setState({tagline: data.tagline});
        this.setState({poster: data.poster_path});
        this.setState({genre: data.genres});
        this.setState({release: data.release_date});
        this.setState({vote: data.vote_average});
        this.setState({runtime: data.runtime});
        this.setState({revenue: data.revenue});
        this.setState({backdrop: data.backdrop_path});
        this.updateIMGURL();
        })
    }

    render() {
        return <img src={this.state.imgurl} />;
    }
}

Test.defaultProps = {
    title : 'Avatar'
};

Test.propTypes = {
    url : Proptypes.string.isRequired
};