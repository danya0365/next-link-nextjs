import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว | Next Link",
  description: "นโยบายความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคล",
};

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  นโยบายความเป็นส่วนตัว
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  อัปเดตล่าสุด: 16 มกราคม 2024
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="prose dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  1. ข้อมูลที่เราเก็บรวบรวม
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  เราเก็บรวบรวมข้อมูลประเภทต่อไปนี้เมื่อคุณใช้บริการของเรา:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>ข้อมูลส่วนตัว เช่น ชื่อ อีเมล รูปโปรไฟล์</li>
                  <li>ข้อมูลการใช้งาน เช่น โพสต์ ความคิดเห็น การกดไลค์</li>
                  <li>ข้อมูลอุปกรณ์ เช่น ประเภทเบราว์เซอร์ IP Address</li>
                  <li>คุกกี้และเทคโนโลยีติดตามอื่นๆ</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. การใช้ข้อมูลของคุณ
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  เราใช้ข้อมูลของคุณเพื่อ:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>ให้บริการและปรับปรุงประสบการณ์การใช้งาน</li>
                  <li>แสดงเนื้อหาที่เหมาะสมกับคุณ</li>
                  <li>ติดต่อสื่อสารเกี่ยวกับบริการและข้อเสนอพิเศษ</li>
                  <li>รักษาความปลอดภัยและป้องกันการใช้งานที่ไม่เหมาะสม</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. การแชร์ข้อมูล
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  เราจะไม่แชร์ข้อมูลส่วนบุคคลของคุณกับบุคคลที่สาม
                  ยกเว้นในกรณีต่อไปนี้:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>เมื่อได้รับความยินยอมจากคุณ</li>
                  <li>เพื่อปฏิบัติตามกฎหมายหรือคำสั่งศาล</li>
                  <li>เพื่อคุ้มครองสิทธิและความปลอดภัยของผู้ใช้งาน</li>
                  <li>กับผู้ให้บริการที่ช่วยดำเนินการบริการของเรา</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. ความปลอดภัยของข้อมูล
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลของคุณ
                  รวมถึงการเข้ารหัสข้อมูล การควบคุมการเข้าถึง
                  และการตรวจสอบความปลอดภัยเป็นประจำ
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. สิทธิของคุณ
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  คุณมีสิทธิ์ในการ:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>เข้าถึงและขอสำเนาข้อมูลส่วนบุคคลของคุณ</li>
                  <li>แก้ไขหรืออัปเดตข้อมูลของคุณ</li>
                  <li>ลบบัญชีและข้อมูลของคุณ</li>
                  <li>คัดค้านการใช้ข้อมูลในกรณีบางอย่าง</li>
                  <li>ถอนความยินยอมที่ให้ไว้</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. คุกกี้
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานของคุณ
                  คุณสามารถปิดการใช้งานคุกกี้ได้ในการตั้งค่าเบราว์เซอร์
                  แต่บางฟีเจอร์อาจไม่ทำงานอย่างสมบูรณ์
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. การเปลี่ยนแปลงนโยบาย
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว
                  เราจะแจ้งให้คุณทราบเกี่ยวกับการเปลี่ยนแปลงที่สำคัญผ่านทางเว็บไซต์หรืออีเมล
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. ติดต่อเรา
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ กรุณาติดต่อเราที่:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    อีเมล:{" "}
                    <a
                      href="mailto:privacy@nextlink.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      privacy@nextlink.com
                    </a>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    เบอร์โทร: 02-123-4567
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
