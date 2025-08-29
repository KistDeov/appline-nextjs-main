import BlogItem from "@/components/Blog/BlogItem";
import { getPosts } from "@/sanity/sanity-utils";

const Blog = async () => {
  const posts = await getPosts();

  return (
    <section className="pt-[110px] pb-[60px]" id="blog">
      <div className="container">
        <div
          className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]"
          data-wow-delay=".2s"
        >
          <h2 className="mb-4 text-3xl font-bold text-black sm:text-4xl md:text-[44px] md:leading-tight dark:text-white">
            Latest News & Blogs
          </h2>
          <p className="text-body text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam
            ante in maximus.
          </p>
        </div>
      </div>

      <div className="container max-w-[1400px] pb-[60px]">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-5 lg:gap-8">
          {/* <!-- blog item --> */}
          {posts?.length ? (
            posts
              ?.slice(0, 3)
              .map((item) => <BlogItem blog={item} key={item.slug.current} />)
          ) : (
            <p>No posts found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
