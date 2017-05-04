import React from 'react';
import ReactDOM from 'react-dom';
var neo4j = require('neo4j-driver').v1;
var _ = require('lodash');

// Create a driver instance, for the user neo4j with password neo4j.
// It should be enough to have a single driver per database per application.
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "admin"));

// Register a callback to know if driver creation was successful:
driver.onCompleted = function () {
  // proceed with using the driver, it was successfully instantiated
};

// Register a callback to know if driver creation failed.
// This could happen due to wrong credentials or database unavailability:
driver.onError = function (error) {
  console.log('Driver instantiation failed', error);
};

/*var title = 'Avatar';
var id;
var url;
var img;
var tagline;
var poster;
var genre;
var release;
var vote;
var runtime;
var revenue;
var backdrop;*/

function getMovieID(title) {
  var session = driver.session();
  return session
    .run(
      "MATCH (movie:Movie {title:{title}}) \
      RETURN movie.imdbId AS id ", {title})
    .then(result => {
      session.close();

      if (_.isEmpty(result.records))
        return null;

      var record = result.records[0];
      return record.get('id');
    })
    .catch(error => {
      session.close();
      throw error;
    });
}

/*function getGraph() {
  var session = driver.session();
  return session.run(
    'MATCH (m:Movie)<-[:ACTED_IN]-(a:Person) \
    RETURN m.title AS movie, collect(a.name) AS cast \
    LIMIT {limit}', {limit: 100})
    .then(results => {
      session.close();
      var nodes = [], rels = [], i = 0;
      results.records.forEach(res => {
        nodes.push({title: res.get('movie'), label: 'movie'});
        var target = i;
        i++;

        res.get('cast').forEach(name => {
          var actor = {title: name, label: 'actor'};
          var source = _.findIndex(nodes, actor);
          if (source == -1) {
            nodes.push(actor);
            source = i;
            i++;
          }
          rels.push({source, target})
        })
      });

      return {nodes, links: rels};
    });
}*/


function getURL(id) {
    return "https://api.themoviedb.org/3/find/" + id + "?api_key=86b5c93c54401e237762af98e3aa8841&external_source=imdb_id";
}

//fetchApi(updateURL(getMovieID(title)));

/*class Test extends React.Component {
    constructor(props) {
        super(props);
        this.fetchApi.bind(this);
        this.getMovieFromDB.bind(this);
        this.state = {
            id : 'tt0499549',
            title : 'Avatar'
        };
    }

    getMovieFromDB(title) {
        var session = driver.session();
        return session
            .run(
            "MATCH (movie:Movie {title:{title}}) \
            RETURN movie.imdbId AS id", {title})
            .then(result => {
            session.close();

            if (!result.records)
                return null;

            var record = result.records[0];
            //console.log(record.get('id'));
            //return new MovieCast(record.get('title'), record.get('cast'));
            this.setState({id : record.get('id')});
            return 0;
            })
            .catch(error => {
            session.close();
            throw error;
            });
    }

    fetchApi(url) {
        fetch(url).then((res) => res.json()).then((data) => {
        // update state with API data
        this.setState({
            title: data.original_title,
            tagline: data.tagline,
            poster: data.poster_path,
            genre: data.genres,
            release: data.release_date,
            vote: data.vote_average,
            runtime: data.runtime,
            revenue: data.revenue,
            backdrop: data.backdrop_path
        });
        })
    }

    render() {
        console.log('here');
        //this.getMovieFromDB('Avatar');
        //this.fetchApi("https://api.themoviedb.org/3/find/" + this.state.id + "?api_key=86b5c93c54401e237762af98e3aa8841&external_source=imdb_id");
        var imgURL = "http://image.tmdb.org/t/p/original" + this.state.poster;
        //console.log(this.state.id);
        return <img src={imgURL} />;
    }
}

function callback(err, results) {
    if (err) throw err;
    var result = results[0];
    if (!result) {
        console.log('No movie found.');
    } else {
        var movie = result['movie'];
        console.log(movie);
    }
};*/

//console.log(updateURL(getMovieID(title)));
//console.log(vote);
//img = updateIMGURL();

//ReactDOM.render(<Test imgurl={img} />, document.getElementById('mount'));

// Close the driver when application exits.
// This closes all used network connections.
//driver.close();

exports.getMovieID = getMovieID;
exports.getURL = getURL;