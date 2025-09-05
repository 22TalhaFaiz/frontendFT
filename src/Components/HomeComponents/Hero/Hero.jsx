import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  useEffect(() => {
    // ✅ Background image using jQuery (based on data-setbg)
    window.$('.set-bg').each(function () {
      const bg = window.$(this).data('setbg');
      window.$(this).css('background-image', 'url(' + bg + ')');
    });

    // ✅ Initialize Owl Carousel
    window.$('.hs-slider').owlCarousel({
      items: 1,
      autoplay: true,
      loop: true,
      nav: true,
      dots: false,
      smartSpeed: 1200,
    });
  }, []);

  return (
    <div>
      <div className="hs-slider owl-carousel">
        <div className="hs-item set-bg" data-setbg="/assets/img/hero/hero-1.jpg">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-6">
                <div className="hi-text">
                  <span>Shape your body</span>
                  <h1>
                    Be <strong>strong</strong> training hard
                  </h1>
               <Link to="/r" className="primary-btn">
                    Get info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hs-item set-bg" data-setbg="/assets/img/hero/hero-2.jpg">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-6">
                <div className="hi-text">
                  <span>Shape your body</span>
                  <h1>
                    Be <strong>strong</strong> training hard
                  </h1>
                  <Link to="/r" className="primary-btn">
                    Get info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
