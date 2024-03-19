import React, { useEffect } from "react";
import "./home.css";
import bal from "../../assets/BAL.png";
import cdt from "../../assets/CDT.png";
import meetone from "../../assets/MEETONE.png";
import rsr from "../../assets/RSR.png";
import smart from "../../assets/SMART.png";
import tch from "../../assets/TCH.png";
import tnc from "../../assets/TNC.png";
import xbc from "../../assets/XBC.png";
// import code from "../../assets/code_home.png";
// import preview1 from "../../assets/preview_ai1.png";
// import preview2 from "../../assets/preview_ai2.png";
// import { Link } from "react-router-dom";
import NavLanDing from "components/NavLanding";
import Global from "components/Global";
import FootLanDing from "components/FootLanDing";

const Home: React.FC = () => {
  

  useEffect(() => {
    document.title = " Alvin AI";
  }, []);

  return (
    <div className="home">
      <NavLanDing />
      <div className="home_circle">
        <div className="home_title">
          <h1 className="home_title_h1">
          Discover Hidden 100x Cryptocurrencies with Alvin AI The best AI-driven crypto research application.
          </h1>

          <p className="home_title_p">
          Harness the power of artificial intelligence to unlock new investment opportunities. Gain an edge in the crypto market and make informed decisions for maximized potential.
          </p>
        </div>

        <div className="home_logo_icons">
          <img src={bal} alt="" className="home_logo_icons_imgs" />
          <img src={cdt} alt="" className="home_logo_icons_imgs" />
          <img src={meetone} alt="" className="home_logo_icons_imgs" />
          <img src={rsr} alt="" className="home_logo_icons_imgs" />
          <img src={smart} alt="" className="home_logo_icons_imgs" />
          <img src={tch} alt="" className="home_logo_icons_imgs" />
          <img src={tnc} alt="" className="home_logo_icons_imgs" />
          <img src={xbc} alt="" className="home_logo_icons_imgs" />
        </div>
        <div className="circle"></div>
      </div>

      {/* <main className="home_main">
        <h1 className="home_main_h1">
          <span>Train Crypto</span>
          <span>Chat AI</span>
          <span>Posts</span>
        </h1>

        <Link to="/login" className="home_developer_btn">
          <button className="home_developer_btn_get">
            <i className="bx bxs-chevrons-right"></i> Get started
          </button>
        </Link>

        <p className="home_main_p">
          Vercel combines the best developer experience with an obsessive focus
          on end-user performance. Their platform enables frontend teams to do
          their best work.
        </p>
      </main>

    

      <section id="develop">
        <h6>explore the vercel way</h6>
        <span className="path-line"></span>
        <span className="circled-number">1</span>
        <span className="gradient-word">Train Crypto</span>
      </section>

      <h2 className="home_title_names">Start With The Developer</h2>

      <div className="home_develop">
        <div className="home_develop_left">
          <p className="home_develop_left_p">
            Developers love Next.js, the open source React framework Vercel
            built together with Google and Facebook. Next.js powers the biggest
            websites like Airbnb and Twilio, for use cases in e-commerce,
            travel, news, and marketing.
          </p>

          <div className="home_develop_left_image">
            <img src={code} alt="" className="home_develop_left_imgs" />
          </div>
        </div>

        <div className="home_develop_right">
          <p className="home_develop_left_p">
            Developers love Next.js, the open source React framework Vercel
            built together with Google and Facebook. Next.js powers the biggest
            websites like Airbnb and Twilio, for use cases in e-commerce,
            travel, news, and marketing.
          </p>

          <div className="home_develop_right_box">
            <h4 className="home_develop_right_box_h4">Fast Refresh</h4>

            <p className="home_develop_left_p">
              Developers love Next.js, the open source React framework Vercel
              built together with Google and Facebook. Next.js powers the
              biggest websites like Airbnb and Twilio, for use cases in
              e-commerce, travel, news, and marketing.
            </p>
          </div>

          <div className="home_develop_right_box">
            <h4 className="home_develop_right_box_h4">Fast Refresh</h4>

            <p className="home_develop_left_p">
              Developers love Next.js, the open source React framework Vercel
              built together with Google and Facebook. Next.js powers the
              biggest websites like Airbnb and Twilio, for use cases in
              e-commerce, travel, news, and marketing.
            </p>
          </div>

          <div className="home_develop_right_box">
            <h4 className="home_develop_right_box_h4">Fast Refresh</h4>

            <p className="home_develop_left_p">
              Developers love Next.js, the open source React framework Vercel
              built together with Google and Facebook. Next.js powers the
              biggest websites like Airbnb and Twilio, for use cases in
              e-commerce, travel, news, and marketing.
            </p>
          </div>
        </div>
      </div>

      <section id="preview">
        <h6>Works With 30+ Jamstack Frameworks</h6>
        <span className="path-line"></span>
        <span className="circled-number">2</span>
        <span className="gradient-word">Chat AI</span>
      </section>

      <h2 className="home_title_names">Accelerate With Your Team</h2>

      <div className="home_preview">
        <p className="home_preview_p">
          Frontend development is not meant to be a solo activity. The Vercel
          platform makes it a collaborative experience with deploy previews for
          every code change, by seamlessly integrating with GitHub, GitLab, and
          Bitbucket.
        </p>

        <div className="home_preview_box">
          <div className="home_preview_box_left">
            <img src={preview1} alt="" className="home_preview_box_left_imgs" />
          </div>

          <div className="home_develop_right_box">
            <h4 className="home_develop_right_box_h4">Fast Refresh</h4>

            <p className="home_develop_left_p">
              Developers love Next.js, the open source React framework Vercel
              built together with Google and Facebook. Next.js powers the
              biggest websites like Airbnb and Twilio, for use cases in
              e-commerce, travel, news, and marketing.
            </p>
          </div>
        </div>

        <div className="home_preview_box">
          <div className="home_preview_box_left">
            <img src={preview2} alt="" className="home_preview_box_left_imgs" />
          </div>

          <div className="home_develop_right_box">
            <h4 className="home_develop_right_box_h4">Fast Refresh</h4>

            <p className="home_develop_left_p">
              Developers love Next.js, the open source React framework Vercel
              built together with Google and Facebook. Next.js powers the
              biggest websites like Airbnb and Twilio, for use cases in
              e-commerce, travel, news, and marketing.
            </p>
          </div>
        </div>
      </div>

      <section id="ship">
        <h6>And Finally</h6>
        <span className="path-line"></span>
        <span className="circled-number">3</span>
        <span className="gradient-word">Posts</span>
      </section>

      <h2 className="home_title_names">Delight Every Visitor</h2>
      */}

      {/* <div className="home_ship">
        <div className="home_ship_box">
          <p className="home_develop_left_p">
          Discover Hidden 100x Cryptocurrencies with AlvinAI The best AI-driven crypto research application.
          </p>

          <p className="home_develop_left_p">
          Harness the power of artificial intelligence to unlock new investment opportunities. Gain an edge in the crypto market and make informed decisions for maximized potential.
          </p>
        </div>

      </div>  */}

      <FootLanDing />
    </div>
  );
};

export default Home;
