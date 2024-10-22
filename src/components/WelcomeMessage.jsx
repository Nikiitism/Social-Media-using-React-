const WelcomeMessage = ({onGEtPostsClick}) => {
    return (
    <center className="welcome-message" >
        <h1>There are no posts.</h1>
        <button type="button" onClick={onGEtPostsClick} className="btn btn-primary">Fetch Posts</button>
    </center>)
}

export default WelcomeMessage;