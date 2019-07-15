import React from 'react'

export default function Search(props) {
    return (
        <div className="container">
            <div className="row">
                <section className="col s4 offset-s4">
                    <form action="" onSubmit={props.handleSubmit}>
                        <div className="input-field">
                            <input placeholder="search movies and shows" type="text" onChange={props.handleChange} />
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}
