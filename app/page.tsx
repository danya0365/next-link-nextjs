import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { LandingView } from "@/src/presentation/components/landing/LandingView";

export default function Home() {
  return (
    <MainLayout>
      <LandingView />
    </MainLayout>
  );
}
