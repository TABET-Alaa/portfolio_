import { getPosts } from '@/app/utils/utils';
import { Grid } from '@/once-ui/components';
import Post from './Post';

interface PostsProps {
    range?: [number] | [number, number];
    columns?: '1' | '2' | '3';
    thumbnail?: boolean;
    direction?: 'row' | 'column';
    postsPath?: string[]; // e.g. ['src','app','blog','posts']
    basePath?: string; // e.g. '/blog' or '/blogexample'
}

export function Posts({
    range,
    columns = '1',
    thumbnail = false,
    direction,
    postsPath = ['src', 'app', 'blog', 'posts'],
    basePath = '/blog'
}: PostsProps) {
    let allBlogs = getPosts(postsPath);

    const sortedBlogs = allBlogs.sort((a, b) => {
        return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    const displayedBlogs = range
        ? sortedBlogs.slice(
              range[0] - 1,
              range.length === 2 ? range[1] : sortedBlogs.length 
          )
        : sortedBlogs;

    return (
        <>
            {displayedBlogs.length > 0 && (
                <Grid
                    columns={columns} mobileColumns="1"
                    fillWidth marginBottom="40" gap="12">
                    {displayedBlogs.map((post) => (
                        <Post
                            key={post.slug}
                            post={post}
                            thumbnail={thumbnail}
                            direction={direction}
                            basePath={basePath}
                        />
                    ))}
                </Grid>
            )}
        </>
    );
}