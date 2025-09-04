import { getAllNews } from "~/lib/cms";
import Heading from "./heading";

const News = async () => {
  const news = await getAllNews();

  return (
    <>
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
    </>
  );
};

export default News;
