import axios from "axios";
import { useEffect, useState } from "react";
import PostFeedDisplay from "../Components/PostFeedDisplay";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Components/Loader/Loader";
import AddPost from "../Components/AddPost";
import { Post } from "../types";
import Divider from "@mui/material/Divider";

const Forum = () => {
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Post[]>(
        `http://localhost:3000/api/posts?limit=${limit}`,
        { withCredentials: true }
      );
      if (response.data.length < limit) {
        setHasMore(false);
      }
      setPostsData((prevPosts) => {
        const newPosts = response.data.filter(
          (post) =>
            !prevPosts.some((existingPost) => existingPost._id === post._id)
        );
        return [...prevPosts, ...newPosts];
      });
    } catch (error) {
      console.error(`Error during fetching API:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [limit]);

  const fetchMoreData = () => {
    setLimit((prevLimit) => prevLimit + 3);
  };

  const handlePostAdded = (newPost: Post) => {
    setPostsData((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="m-8 mt-[4em] flex flex-col items-center justify-center text-white">
      <InfiniteScroll
        dataLength={postsData.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={
          <h1 className="text-gray-600 text-s" style={{ textAlign: "center" }}>
            <b>..אין עוד פוסטים להציג כרגע</b>
          </h1>
        }
      >
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            הפורום הבטוח
          </h1>
          <h1
            className="text-gray-600 text-s mb-6"
            style={{ textAlign: "center" }}
          >
            .מקום פתוח, בטוח, אנונימי וכנה לשיתוף והכלה
          </h1>
          <AddPost onPostAdded={handlePostAdded} />
        </div>
        <Divider />
        {postsData
          .slice()
          .reverse()
          .map((post) => (
            <PostFeedDisplay key={post._id} post={post} />
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default Forum;
