import axios from "axios";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogId: number }>;
}) {
  const blog = (await params).blogId;

  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${blog}`
  );

  const data = res.data;

  return (
    <div>
      blog page {blog}
      <br />
      title - {data.title}
    </div>
  );
}
