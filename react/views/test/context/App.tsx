import Heading from "./Heading.js";
import Section from "./Section.js";

function RecentPosts() {
  return (
    <Section>
      <Heading>----最近的帖子---</Heading>
      <Post title="里斯本的味道" body="...那些蛋挞！" />
      <Post title="探戈节奏中的布宜诺斯艾利斯" body="我爱它！" />
    </Section>
  );
}

function AllPosts() {
  return (
    <Section>
      <Heading>---帖子---</Heading>
      <RecentPosts />
    </Section>
  );
}

function Post({ title, body }: { title: string; body: string }) {
  return (
    <Section isFancy={true}>
      <Heading>{title}</Heading>
      <p>
        <pre>{body}</pre>
      </p>
    </Section>
  );
}

export default function ProfilePage() {
  return (
    <Section>
      <Heading>My Profile</Heading>
      <Post title="旅行者，你好！" body="来看看我的冒险。" />
      <AllPosts />
    </Section>
  );
}
