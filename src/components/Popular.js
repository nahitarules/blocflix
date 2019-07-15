import React from 'react'
import TopMovies from './TopMovies';


export default function Popular(props) {
    
    return (
        
        <div className="container">
            <div className="row">
                <div className="col s12">
                    {
                        props.topMovies.map((movie, i) => {
                            return (
                                <TopMovies key={i} viewMovieInfo={props.viewMovieInfo} movieId={movie.id} image={movie.poster_path} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    
    )
}
