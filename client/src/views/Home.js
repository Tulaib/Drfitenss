/* eslint-disable*/
import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardImg,
  CardText,
  Button,
  Nav, NavItem, TabContent, TabPane, Row, Breadcrumb,
} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { Link, NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { scroller } from 'react-scroll';
import Headroom from 'react-headroom';
import GlideComponent from 'components/carousel/GlideComponent';
import { buyUrl, adminRoot } from 'constants/defaultValues';
import homeimg from '../assets/img/landing-page/features/main2.png';
import homemobimg from '../assets/img/landing-page/features/main5.png'
import img1 from '../assets/img/landing-page/features/14.png';
import img2 from '../assets/img/landing-page/features/bmi1.png';
import img3 from '../assets/img/landing-page/features/live-consult1.png';
import img4 from '../assets/img/landing-page/features/diet-plan2.png';
import profileimg1 from '../assets/img/profiles/l-12.jpg';
import profileimg2 from '../assets/img/profiles/tulaibs.PNG';
import profileimg3 from '../assets/img/profiles/Mehmaam1.jpg';
import profileimg4 from '../assets/img/profiles/shahzaib.PNG';
import logo from '../assets/logos/logoMuqqa1.png'
import opsimg from '../assets/img/landing-page/lockdown2.png'
import lckmobimg from '../assets/img/landing-page/lockdown1.png'
import WebsiteVisitsChartCard from 'containers/dashboards/WebsiteVisitsChartCard';
import ConversionRatesChartCard from 'containers/dashboards/ConversionRatesChartCard';
import exercise from 'assets/img/landing-page/applications/exercise.PNG'
import chat from 'assets/img/landing-page/applications/chat.PNG'
import doc from 'assets/img/landing-page/applications/doctor.PNG'

const slideSettings = {
  type: 'carousel',
  gap: 30,
  perView: 4,
  hideNav: true,
  peek: { before: 10, after: 10 },
  breakpoints: {
    600: { perView: 1 },
    992: { perView: 2 },
    1200: { perView: 3 },
  },
};

const slideItems = [
  {
    icon: 'iconsminds-dumbbell',
    title: 'Gain Weight Program',
    detail:
      'Try Out 30 Days Weight Gain Exercises and Gain Some Muscle!',
  },
  {
    icon: 'iconsminds-aerobics',
    title: 'Lean Weight Program',
    detail:
      'Try Out 30 Days Weight Lean Exercises and Lean Some Muscle!',
  },
  {
    icon: 'iconsminds-weight-lift',
    title: 'Full Body 7x4 Challenge',
    detail:
      'Try Out 30 Days Exercises and Be ready to Get Fit!',
  },
  {
    icon: 'iconsminds-gymnastics',
    title: 'Yoga Training',
    detail:
      'Try Yoga that builds strength and awareness and brings together your mind and body.',
  },
  {
    icon: 'iconsminds-trekking',
    title: 'Belly Fat Reduce',
    detail:
      'Reduce your belly Fat and Get a Smart Look Men / Women !',
  },
  {
    icon: 'iconsminds-dumbbell',
    title: 'Basic, Intermediate Muscle Course',
    detail:
      'Course for Muscle Gain and Lean For every person. Be ready to Get Fit!',
  },
  {
    icon: 'iconsminds-weight-lift',
    title: 'Expert Muscle Course',
    detail:
      'Course for Muscle Gain and Lean For Membership Person. Become a Member to Get this Feature Now!',
  },
  {
    icon: 'iconsminds-apple-bite',
    title: 'Diet Plan',
    detail:
      'A 30 Days Meal Plan for Lean / Gain  Weight. Be ready to Get Fit!',
  },
];

const features = [
  {
    title: 'BODY MASS INDEX',
    img: img1,
    detail:
      'User can know their weight through BMI whether they are under-weight or over-weight and suggest their exercises and diet plan according to their weight. <br /><br /> Calculate you BMI, If you are Underweight/Overweight Our App will Sugges you to Gain / Lean Weight. <br /><br />We kept user experience principles always at the heart of the design process.',
  },
  {
    title: 'POSE COUNTER',
    img: img2,
    detail:
      'When you Open any Exercise in our App, click on Angle Checker Our App will use your camera then will count only correct reps of that Application.<br><br>Membership users have the facility to use an angle checker which detects user body with webcam and tells how many positions are correct and incorrect.',
  },
  {
    title: 'LIVE CONSULTANCY',
    img: img3,
    detail:
      'Consult with Doctor for any query, Injury and other physical problem. And with Trainer For Exercise PLan. <br /><br />Membership users can arrange a meeting and connect live on a video call with doctors, Therapists, or Personal Trainers for consultancy. <br /><br />The energy that comes from a group of people together, in a room, collaborating is infectious.',
  },
  {
    title: 'EXCERCISES AND DIET',
    img: img4,
    detail:
      'Our App provide Exercises for Weight Gain And Lean, Full Body Maintainance and Much More. Healthy Diet Plan for Weight Gain and Lean is Also provided. <br /><br />We created lots of different layouts for different jobs.<br /><br />Eating smart and being active have similar effects on our health. Reduce the risk of chronic diseases, such as diabetes, heart disease, high blood pressure, stroke, and some cancers and associated disabilities. Prevent weight gain and/or promote weight loss.',
  }
];

const trainers = [
  {
    img: profileimg1,
    title: 'Abdul Wahaj Shera',
    subtitle: 'Executive Director',
    detail: 'We are Self taught Engineer, Developers and Designer.',
    icon: 'simple-icon-social-facebook',
    icon1: 'simple-icon-social-twitter',
    icon2: 'simple-icon-social-instagram',
    icon3: 'simple-icon-social-linkedin'
  },
  {
    img: profileimg2,
    title: 'Tulaib Ahmed',
    subtitle: 'Executive Director',
    detail: 'We are Self taught Engineer, Developers and Designer.',
    icon: 'simple-icon-social-facebook',
    icon1: 'simple-icon-social-twitter',
    icon2: 'simple-icon-social-instagram',
    icon3: 'simple-icon-social-linkedin'
  },
  {
    img: profileimg3,
    title: 'Muhammad Mehmaam',
    subtitle: 'Executive Director',
    detail: 'We are Self taught Engineer, Developers and Designer.',
    icon: 'simple-icon-social-facebook',
    icon1: 'simple-icon-social-twitter',
    icon2: 'simple-icon-social-instagram',
    icon3: 'simple-icon-social-linkedin'
  },
  {
    img: profileimg4,
    title: 'Shahzaib Qadir',
    subtitle: 'Executive Director',
    detail: 'We are Self taught Engineer, Developers and Designer.',
    icon: 'simple-icon-social-facebook',
    icon1: 'simple-icon-social-twitter',
    icon2: 'simple-icon-social-instagram',
    icon3: 'simple-icon-social-linkedin'
  }
];

const layouts = [
  {
    title: 'Menu Default',
    img: '/assets/img/landing-page/layouts/menu-default.jpg',
  },
  {
    title: 'Menu Subhidden',
    img: '/assets/img/landing-page/layouts/menu-subhidden.jpg',
  },
  {
    title: 'Menu Hidden',
    img: '/assets/img/landing-page/layouts/menu-hidden.jpg',
  },
  {
    title: 'Image List',
    img: '/assets/img/landing-page/layouts/image-list.jpg',
  },
  {
    title: 'Thumb List',
    img: '/assets/img/landing-page/layouts/thumb-list.jpg',
  },
  { title: 'Data List', img: '/assets/img/landing-page/layouts/data-list.jpg' },
  { title: 'Details', img: '/assets/img/landing-page/layouts/details.jpg' },
  {
    title: 'Authentication',
    img: '/assets/img/landing-page/layouts/authentication.jpg',
  },
  {
    title: 'Search Results',
    img: '/assets/img/landing-page/layouts/search-result.jpg',
  },
  {
    title: 'Single Page Application',
    img: '/assets/img/landing-page/layouts/spa.jpg',
  },
  {
    title: 'Data List App Menu Hidden',
    img: '/assets/img/landing-page/layouts/data-list-app-menu-hidden.jpg',
  },
  { title: 'Tabs', img: '/assets/img/landing-page/layouts/tabs.jpg' },
];

const applications = [
  {
    title: 'Chat',
    path: `${adminRoot}/applications/chat`,
    img: chat,
  },
  {
    title: 'Exercises',
    path: `${adminRoot}/applications/survey`,
    img:exercise,
  },
  {
    title: 'Consultant',
    path: `${adminRoot}/applications/todo`,
    img: doc,
  },
];

const themes = [
  { title: 'Navy Blue', class: 'bluenavy' },
  { title: 'Olympic Blue', class: 'blueolympic' },
  { title: 'Yale Blue', class: 'blueyale' },
  { title: 'Moss Green', class: 'greenmoss' },
  { title: 'Lime Green', class: 'greenlime' },
  { title: 'Carrot Orange', class: 'carrotorange' },
  { title: 'Ruby Red', class: 'rubyred' },
  { title: 'Monster Purple', class: 'monsterpurple' },
  { title: 'Steel Grey', class: 'steelgrey' },
  { title: 'Granola Yellow', class: 'granolayellow' },
];

const Home = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const refRowHome = useRef(null);
  const refSectionHome = useRef(null);
  const refSectionFooter = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const onWindowResize = (event) => {
    const homeRect = refRowHome.current.getBoundingClientRect();

    const homeSection = refSectionHome.current;
    homeSection.style.backgroundPositionX = `${homeRect.x - 580}px`;

    const footerSection = refSectionFooter.current;
    footerSection.style.backgroundPositionX = `${event.target.innerWidth - homeRect.x - 2000
      }px`;

    if (event.target.innerWidth >= 992) {
      setShowMobileMenu(false);
    }
  };

  const onWindowClick = () => {
    setShowMobileMenu(false);
  };

  const onWindowScroll = () => {
    setShowMobileMenu(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', onWindowScroll);
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('click', onWindowClick);

    document.body.classList.add('no-footer');
    return () => {
      window.removeEventListener('scroll', onWindowScroll);
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('click', onWindowClick);
      document.body.classList.remove('no-footer');
    };
  }, []);

  const scrollTo = (event, target) => {
    event.preventDefault();
    scroller.scrollTo(target, {
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -100,
    });
    return false;
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div
      className={classnames('landing-page', {
        'show-mobile-menu': showMobileMenu,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="mobile-menu" onClick={(event) => event.stopPropagation()}>
        <a
          className="logo-mobile c-pointer"
          href="#scroll"
          onClick={(event) => scrollTo(event, 'home')}
        >
          <span />
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, 'home')}
            >
              HOME
            </a>
          </li>
          <li className="nav-item">
            <a
              className="c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, 'features')}
            >
              FEATURES
            </a>
          </li>
          <li className="nav-item">
            <a
              className="c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, 'components')}
            >
              OUR TEAM
            </a>
          </li>
          <li className="nav-item">
            <a
              className="c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, 'apps')}
            >
              APPLICATIONS
            </a>
          </li>
          <li className="nav-item">
            <a
              className="c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, 'layouts')}
            >
              ANALYTICS
            </a>
          </li>
          <li className="nav-item">
            <div className="separator" />
          </li>
          <li className="nav-item text-center">
            <a
              className="btn btn-outline-primary btn-sm mobile-menu-cta"
              target="_blank"
              rel="noopener noreferrer"
              href={buyUrl}
            >
              SIGN UP
            </a>
          </li>
        </ul>
      </div>

      <div className="main-container">
        <Headroom className="landing-page-nav">
          <nav>
            <div className="container d-flex align-items-center justify-content-between">
              <a
                className="navbar-logo pull-left c-pointer"
                href="#scroll"
                onClick={(event) => scrollTo(event, 'home')}
              >
                {/* <span className="white" />
                <span className="dark" />  */}
                <span><img src={logo} /></span>
              </a>
              <ul className="navbar-nav d-none d-lg-flex flex-row">
                <li className="nav-item">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'home')}
                  >
                    HOME
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'features')}
                  >
                    FEATURES
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'components')}
                  >
                    OUR TEAM
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'apps')}
                  >
                    APPLICATIONS
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'layouts')}
                  >
                    ANALYTICS
                  </a>
                </li>
                <li className="nav-item pl-4">
                  <a
                    className="btn btn-outline-semi-light btn-sm pr-4 pl-4"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={buyUrl}
                  >
                    SIGN UP
                  </a>
                </li>
              </ul>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <span
                className="mobile-menu-button"
                onClick={(event) => {
                  setShowMobileMenu(!showMobileMenu);
                  event.stopPropagation();
                }}
              >
                <i className="simple-icon-menu" />
              </span>
            </div>
          </nav>
        </Headroom>
        <div className="content-container" id="home">
          <div className="section home" ref={refSectionHome}>
            <div className="container">
              <div className="row home-row" ref={refRowHome}>
                <div className="col-12 d-block d-md-none">
                  <NavLink to="/">
                    <img
                      alt="mobile hero"
                      className="mobile-hero"
                      src={homemobimg}
                    />
                  </NavLink>
                </div>

                <div className="col-12 col-xl-4 col-lg-5 col-md-6">
                  <div className="home-text">
                    <div className="display-1">
                      <b>
                      WORK HARDER <br />
                      GET STRONGER
                      </b>
                    </div>
                    <p className="white mb-5">
                      Perfect app for starting your Fitness journey
                      or taking your fitness to the next level!
                      {/* Dr. Fitness provide health care, as it is necessary for our lives. */}
                      {/* Gogo is the combination of good design, quality code and
                      attention for details. */}
                      <br />
                      <br />
                      This application is related to fitness which covers all perspectives
                      include training, diet plan, weight gain, weight loss.
                      {/* We used same design language for components, layouts, apps
                      and other parts of the template. */}
                      <br />
                      <br />
                      Hope you enjoy it!
                    </p>
                    {/* eslint-disable-next-line react/jsx-no-target-blank */}
                    <Link
                      className="btn btn-light btn-xl mr-2 mb-2"
                      // outline
                      // href={adminRoot}
                      // target="_blank"
                      to="/login"
                    >
                      Get started as Consumer <i className="simple-icon-arrow-right" />
                    </Link>
                    <a
                      className="btn btn-light btn-xl mr-2 mb-2"
                      // href={adminRoot}
                      // target="_blank"
                      href='https://drfitnessconsultant.netlify.app/'
                    >
                      Get started as Consultant, Trainer <i className="simple-icon-arrow-right" />
                    </a>
                  </div>
                </div>
                <div className="col-12 col-xl-7 offset-xl-1 col-lg-7 col-md-6  d-none d-md-block">
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                  <a href={adminRoot} target="_blank">
                    <img
                      alt="hero"
                      src={homeimg}
                    />
                  </a>
                </div>
              </div>

              <div className="row">
                <div className="col-12 p-0">
                  <div className="home-carousel">
                    <GlideComponent settings={slideSettings}>
                      {slideItems.map((f, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={`slide_${index}`} className="card">
                          <div className="card-body text-center">
                            <div>
                              <i className={`${f.icon} large-icon`} />
                              <h5 className="mb-3 font-weight-semibold">
                                {f.title}
                              </h5>
                            </div>
                            <div>
                              <p className="detail-text">{f.detail}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </GlideComponent>
                  </div>
                </div>
              </div>

              <div className="row">
                <a
                  className="btn btn-circle btn-outline-semi-light hero-circle-button"
                  href="#scroll"
                  onClick={(event) => scrollTo(event, 'features')}
                >
                  <i className="simple-icon-arrow-down" />
                </a>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="container" id="features">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>Features At a Glance</h1>
                  <p>
                    We tried to create an admin theme that we would like to use
                    ourselves so we listed our priorities. We would like to have
                    a theme that is not over complicated to use, does the job
                    well, contains must have omponents and looks really nice.
                  </p>
                </div>
              </div>
              {features.map((feature, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={`feature_${i}`}>
                  {i % 2 === 0 && (
                    <div className="row feature-row mb-5 mt-5">
                      <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center">
                        <div className="feature-text-container">
                          <h2>{feature.title}</h2>
                          <div
                            dangerouslySetInnerHTML={{ __html: feature.detail }}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6 offset-lg-1 offset-md-0 position-relative">
                        <img
                          alt={feature.title}
                          src={feature.img}
                          className="feature-image-right feature-image-charts position-relative"
                        />
                      </div>
                    </div>
                  )}
                  {i % 2 === 1 && (
                    <div className="row feature-row mb-5 mt-5">
                      <div className="col-12 col-md-6 col-lg-6 order-2 order-md-1">
                        <img
                          alt={feature.title}
                          src={feature.img}
                          className="feature-image-left feature-image-charts position-relative"
                        />
                      </div>
                      <div className="col-12 col-md-6 offset-md-0 col-lg-5 offset-lg-1 d-flex align-items-center order-1 order-md-2">
                        <div className="feature-text-container">
                          <h2>{feature.title}</h2>
                          <div
                            dangerouslySetInnerHTML={{ __html: feature.detail }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="section background">
            <div className="container" id="lockdown">
              <div className="row mb-5">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  {/* <h1>Components</h1> */}
                  <h1>Lockdowns leading to lost Consultations?</h1>
                  <p>
                    With increasing covid cases, Online Consultation is the safest option for Doctors and
                    Patients for consultations and follow ups. Don't miss out on your
                    consultations due to lockdowns. Create a Virtual Clinic now.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 d-block d-md-none">
              <img
                alt="mobile hero"
                className="mobile-hero"
                src={lckmobimg}
              />
            </div>
            <div className='d-none d-md-block'>
              <img
                className="components-image mb-5 pb-5"
                alt="Components"
                src={opsimg}
              />
            </div>

            {/* <p>sdsafjhasjkfhasjkfhasjkfhasjkfhasjkfhasjkfhasj</p> */}
          </div>

          <div className="section mb-0">
            <div className="container" id="layouts">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>ANALYTICS</h1>
                  <p>
                 Calculated Revenue Generated by Consultant
                  </p>
                </div>
              </div>

              <Row>
                <Colxx xxs="12">
                  <Breadcrumb heading="menu.analytics" />
                  <Separator className="mb-5" />
                </Colxx>
              </Row>
              <Row>
                <Colxx sm="12" md="6" className="mb-4">
                  <WebsiteVisitsChartCard />
                </Colxx>
                <Colxx sm="12" md="6" className="mb-4">
                  <ConversionRatesChartCard />
                </Colxx>
              </Row>


              {/* <div className="row pt-5">
                {layouts.map((l, index) => (
                  <div
                    key={`layout_${index}`}
                    className="col-12 col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-5"
                  >
                    <img
                      className="img-fluid border-radius depth-2 mb-3 semi-rounded"
                      alt={l.title}
                      src={l.img}
                    />
                    <h4 className="text-center">{l.title}</h4>
                  </div>
                ))}
              </div> */}
            </div>
          </div>



          <div className="section background">
            <div className="container" id="apps">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center mb-4">
                  <h1>Applications</h1>
                  <p className="section-text">
                    With the help of this Application you can access.
                  </p>
                </div>
              </div>
              <div className="row screenshots">
                <div className="col-12 text-center mb-4">
                  <Nav tabs className="justify-content-center">
                    {applications.map((app, index) => (
                      <NavItem key={`app_nav_${index}`}>
                        <a
                          href="#tab"
                          className={classnames({
                            'nav-link': true,
                            active: activeTab === index,
                          })}
                          onClick={(event) => {
                            event.preventDefault();
                            toggle(index);
                          }}
                        >
                          {app.title}
                        </a>
                      </NavItem>
                    ))}
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    {applications.map((app, index) => (
                      <TabPane key={`app_tab_${index}`} tabId={index}>
                        <NavLink to={app.path}>
                          <img
                            alt={app.title}
                            src={app.img}
                            className="app-image"
                          />
                        </NavLink>
                      </TabPane>
                    ))}
                  </TabContent>
                </div>
              </div>
            </div>
          </div>

          <div className="section mb-0">
            <div className="container" id="components">
              <div className="row mb-5">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  {/* <h1>Components</h1> */}
                  <h1>Team Dr Fitness</h1>
                  {/* <p>
                    We used most popular and well managed open source components
                    with bootstrap components. Combined them into even more
                    useful ones. Themed them with same design principles and
                    created a design harmony between components and layouts.
                    <br />
                    <br />
                    From carousels to charts, switches to list we tried to
                    provide components that we like to use on our development
                    processes.
                  </p> */}
                  <p>
                    We have Team of Experts for Development of this Application
                    Technology NodeJS, Firebase, Machine Learning, Redux and More. We used most popular and
                    well managed open source components with bootstrap components. Combined them into
                    even more useful ones.
                    <br />
                   
                  </p>
                </div>
              </div>
            </div>
            {/* <img
              className="components-image mb-5 pb-5"
              alt="Components"
              src="/assets/img/landing-page/components.jpg"
            /> */}

            <div className='row px-4'>
              {trainers.map((trainer, i) => (
                <div className="col-lg-3 col-md-6 col-sm-12" key={`trainer_${i}`}>
                  <Card className="mb-4">
                    <CardBody>
                      <div className="text-center">
                        <CardImg
                          top
                          src={trainer.img}
                          alt="Card image cap"
                          className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail"
                        />
                        <NavLink to={`${adminRoot}/cards`}>
                          <CardSubtitle className="text-medium mb-1">{trainer.title}</CardSubtitle>
                        </NavLink>
                        <CardSubtitle className='text-muted text-small mb-1'>{trainer.subtitle}</CardSubtitle>
                        <CardText className="text-muted text-small mb-3">
                          {trainer.detail} <br />

                        </CardText>
                        <div className='d-flex flex-row justify-content-center mb-3'>
                          <i className={`${trainer.icon} medium-icon mr-4`} />
                          <i className={`${trainer.icon1} medium-icon mr-4`} />
                          <i className={`${trainer.icon2} medium-icon mr-4`} />
                          <i className={`${trainer.icon3} medium-icon`} />
                        </div>
                        <Button outline size="md" color="primary">
                          Details
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </div>


          {/* <div className="section mb-0">
            <div className="container" id="themes">
              <div className="row mb-5">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>Themes</h1>
                  <p>
                    We carefully choosed colors and created 10 different themes
                    with dark and light versions. You may also create your own
                    themes easily since all the theme related styling is managed
                    by Sass variables.
                  </p>
                </div>
              </div>
              {themes.map((t, index) => (
                <div key={`theme_${index}`} className="row mb-5">
                  <div className="col-12 text-center mb-3">
                    <h4 className="text-center">{t.title}</h4>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 offset-lg-2 mb-3">
                    <div className="depth-2 color-container">
                      {['left', 'center', 'right'].map((align, i) => (
                        <div
                          key={`light_${index}_${i}`}
                          className={`${t.class}-light-${i + 1} color-${align}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <div className="depth-2 color-container">
                      {['left', 'center', 'right'].map((align, i) => (
                        <div
                          key={`dark_${index}_${i}`}
                          className={`${t.class}-dark-${i + 1} color-${align}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          <div className="section background background-no-bottom mb-0 pb-0">
            <div className="container">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>Ready to Try Dr. Fitness Workout?</h1>
                  <p>
                    Fitness is not just a Goal, It's a Lifestyle!
                  </p>
                </div>
                <div className="col-12 offset-0 col-lg-6 offset-lg-3 newsletter-input-container">
                  <div className="text-center mb-3">
                    <Button
                    // onClick={buyUrl}
                    >
                      <Link to={buyUrl}
                      style={{color:'white'}}>
                      Become Our Member Now
                      </Link>
                      </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section footer mb-0" ref={refSectionFooter}>
            <div className="container">
              <div className="row footer-row">
                <div className="col-12 text-right">
                  <a
                    className="btn btn-circle btn-outline-semi-light footer-circle-button c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'home')}
                  >
                    <i className="simple-icon-arrow-up" />
                  </a>
                </div>
                <div className="col-12 text-center footer-content">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'home')}
                  >
                    <img
                      className="footer-logo"
                      alt="footer logo"
                      src={logo}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="container copyright pt-5 pb-5">
              <div className="row">
                <div className="col-12" />
                <div className="col-12 text-center">
                  <p className="mb-0"> 2021 © Dr. FitnessStrategies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;