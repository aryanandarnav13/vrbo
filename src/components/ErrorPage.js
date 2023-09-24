const Error = ({error}) => {
    return(
        <div>
            <h4>{error.name}</h4>
            <p>{error.message}</p>
        </div>
    )
}

export default Error;