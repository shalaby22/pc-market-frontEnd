import ImageSlider from "@/components/home/ImagesSlider";
import RecentlyReleased from "@/components/home/RecentlyReleased";
import StoreBenefits from "@/components/home/StoreBenefits";
import TopCategories from "@/components/home/TopCategories";
export default function Home() {
  return (
    <div className="h-min-96">
      <ImageSlider />
      <StoreBenefits />
      <TopCategories />
      <RecentlyReleased />
    </div>
  );
}
