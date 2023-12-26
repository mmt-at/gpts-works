import { getRecommendedRows, getTotalCount } from "../models/gpts";

import Brand from "@/app/components/Brand";
import Categories from "@/app/components/Categories";
import { Gpts } from "@/app/types/gpts";
import GptsList from "@/app/components/GptsList";
import ProductHunt from "@/app/components/ProductHunt";
import Search from "@/app/components/Search";
import Tips from "@/app/components/Tips";

async function getData(): Promise<Gpts[] | undefined> {
  const gpts_list = await getRecommendedRows(1, 100);

  return gpts_list;
}

export default async () => {
  const gpts_list = await getData();
  const gpts_count = await getTotalCount();

  return (
    <>
      <Brand count={gpts_count} />
      <ProductHunt />
      <Search />
      <Tips />
      <Categories activeSlug="featured" />
      {/* <Tab tabValue={tabValue} setTabValue={setTabValue} /> */}
      {gpts_list && <GptsList gpts={gpts_list} loading={false} />}
    </>
  );
};
