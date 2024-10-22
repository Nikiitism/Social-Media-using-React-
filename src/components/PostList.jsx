import { useContext } from "react";
import Post from "./Post"
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";

const PostList = () =>{
    const {addInitialPosts, postList} = useContext(PostListData);

    const handleGetPostsClick = () => {
        fetch('https://dummyjson.com/posts')
        .then(res => res.json())
        .then(data => {
            const transformedPosts = data.posts.map(post => ({
                id: post.id,
                title: post.title,
                body: post.body,
                tags: post.tags,
                reactions: post.reactions.likes + post.reactions.dislikes,
                userId: post.userId
            }));
            addInitialPosts(transformedPosts);
        })
        .catch(error => {
            if (error.name !== 'AbortError') {
                console.error('Error fetching posts:', error);
            }
        });
    }
    
    return <>
    {postList.length===0 && (<WelcomeMessage onGEtPostsClick={(handleGetPostsClick)}></WelcomeMessage>)}

    {postList.map((post) => (
        <Post key={post.id} post={post}/>
    ))}
    </>
}

export default PostList;




