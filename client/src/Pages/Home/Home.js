import LandingAnimation from "./Components/LandingAnimation/LandingAnimation";
import SearchBar from "./Components/SearchBar/SearchBar";

import Featured from "../../Components/Featured/Featured";
import useGetFeaturedArticles from "../../Components/Featured/Hooks/useGetFeaturedArticles";
import "./Home.css";

export default function Home() {
  const { articles, isLoading } = useGetFeaturedArticles();
  console.log(articles);

  return (
    <section className="hero-container">
      <div className="hero-content">
        <h1 className="landing-h1">Level up your web development skills</h1>
        <p className="landing-p">Share and learn from fellow developers on Web Dev Notes.</p>
        <div className="landing-cta">
          <SearchBar />
        </div>
      </div>
      <LandingAnimation />
      <Featured articles={articles} isLoading={isLoading} />
    </section>
  );
}
