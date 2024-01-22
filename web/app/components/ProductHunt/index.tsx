import Ads from "../Ads";

export default () => {
  return (
    <div className="my-2 md:my-6 mx-auto text-center flex">
      <div className="mx-auto flex items-center">
        <a
          href="https://www.producthunt.com/posts/gpts-works?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-gpts&#0045;works"
          target="_blank"
          className="mx-2"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=424950&theme=light"
            alt="GPTs&#0032;Works - GPTs&#0032;third&#0045;party&#0032;store&#0044;&#0032;website&#0044;&#0032;browser&#0032;extension | Product Hunt"
            width="250"
            height="54"
            className="mx-auto"
          />
        </a>

        {/* <Ads /> */}
      </div>
    </div>
  );
};
