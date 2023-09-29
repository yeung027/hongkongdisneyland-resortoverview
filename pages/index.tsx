import Kv from "../components/kv";
import Layout from "../components/layout";
import LandingSection1 from "../components/pages/landing/section1";
import LandingSwiperSection from "../components/pages/landing/swiper-section";
import content from '../jsons/index.content.json';


export default function Home() {
  return  <Layout>
            <Kv content={content.kv} />
            <LandingSection1 content={content.sections[0]} />
            <LandingSwiperSection content={content.sections[1]} style={`gold`} name={`landing-section-2`} />
            <LandingSwiperSection content={content.sections[2]} name={`landing-section-3`} />
            <div className={`h-[21px] desktop:h-[55px]`} />
          </Layout>
}

