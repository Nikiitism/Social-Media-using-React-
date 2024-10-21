import { useContext, useEffect, useState } from "react";
import Post from "./Post"
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () =>{
    const {addInitialPosts, postList} = useContext(PostListData);
    const [fetching, setFetching] = useState(false);
    
    useEffect( () => {
        setFetching(true)
        const controller = new AbortController()
        const signal = controller.signal;

        fetch('https://dummyjson.com/posts', {signal})
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
            setFetching(false)
        })
        .catch(error => {
            if (error.name !== 'AbortError') {
                console.error('Error fetching posts:', error);
            }
        });

        return () =>{
            console.log(`Cleaning up useEffect.`);
            controller.abort();
        }
    }, []);
    
    return <>
     {fetching && <LoadingSpinner></LoadingSpinner>} 
    { !fetching && postList.length===0 && (<WelcomeMessage></WelcomeMessage>)}

    {postList.map((post) => (
        <Post key={post.id} post={post}/>
    ))}
    </>
}

export default PostList;