import Kv from "../components/kv";
import Layout from "../components/layout";
import ResortHotelsSection1 from "../components/pages/resort-hotels/section1";
import ResortHotelsSection2 from "../components/pages/resort-hotels/section2";
import ResortHotelsSection3 from "../components/pages/resort-hotels/section3";
import content from '../jsons/resort-hotels.content.json';


export default function ResortHotels() {
  return  <Layout>
            <Kv content={content.kv} />
            <ResortHotelsSection1 content={content.sections[0]} />
            <ResortHotelsSection2 content={content.sections[1]} />
            <ResortHotelsSection3 content={content.sections[2]} />
            <div className={`h-[61px] desktop:h-[77px]`} />
          </Layout>
}