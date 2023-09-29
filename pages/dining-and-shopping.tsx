import Kv from "../components/kv";
import Layout from "../components/layout";
import DiningAndShoppingSection1 from "../components/pages/dining-and-shopping/section1";
import DiningAndShoppingSection2 from "../components/pages/dining-and-shopping/section2";
import content from '../jsons/dining-and-shopping.content.json';


export default function Park() {
  return  <Layout>
            <Kv content={content.kv} />
            <DiningAndShoppingSection1 content={content.sections[0]} />
            <DiningAndShoppingSection2 content={content.sections[1]} />
            <div className={`h-[61px] desktop:h-[77px]`} />
          </Layout>
}