import Kv from "../components/kv";
import Layout from "../components/layout";
import ParkSection1 from "../components/pages/park/section1";
import Map from "../components/pages/park/map";
import content from '../jsons/park.content.json';


export default function Park() {
  return  <Layout>
            <Kv content={content.kv} />
            <ParkSection1 content={content.sections[0]} />
            <Map content={content.sections[1]} />
            <div className={`h-[53px] desktop:h-[77px]`} />
          </Layout>
}

