"use client";

const Page = ({ params }: { params: { slug: string } }) => {
  return <p>Post: {params.slug}</p>;
};

export default Page;
