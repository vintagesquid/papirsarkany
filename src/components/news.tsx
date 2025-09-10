import { getAllNews } from "~/lib/cms";
import Heading from "./heading";

const News = async () => {
  const news = await getAllNews();

  if (news.length < 1) {
    return null;
  }

  return (
    <div className="space-y-2">
      {news.map((item) => {
        return (
          <div key={item._id}>
            <Heading as="h2" className="font-bold underline">
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              ) : (
                item.label
              )}
            </Heading>
          </div>
        );
      })}
    </div>
  );
};

export default News;
