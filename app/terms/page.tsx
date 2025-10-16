import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import { FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ข้อกำหนดและเงื่อนไข | Next Link",
  description: "ข้อกำหนดและเงื่อนไขการใช้บริการ Next Link",
};

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  ข้อกำหนดและเงื่อนไข
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
                  1. การยอมรับข้อกำหนด
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  การเข้าใช้งานเว็บไซต์ Next Link
                  ถือว่าคุณได้อ่านและยอมรับข้อกำหนดและเงื่อนไขทั้งหมดนี้แล้ว
                  หากคุณไม่ยอมรับข้อกำหนดเหล่านี้ กรุณาหยุดการใช้งานทันที
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. การสมัครสมาชิกและบัญชีผู้ใช้
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  เพื่อใช้บริการบางอย่าง คุณต้องสมัครสมาชิกและสร้างบัญชีผู้ใช้ คุณตกลงที่จะ:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>ให้ข้อมูลที่ถูกต้องและเป็นปัจจุบัน</li>
                  <li>รักษาความปลอดภัยของรหัสผ่านของคุณ</li>
                  <li>รับผิดชอบการใช้งานทั้งหมดภายใต้บัญชีของคุณ</li>
                  <li>แจ้งเราทันทีหากมีการใช้งานบัญชีโดยไม่ได้รับอนุญาต</li>
                  <li>คุณต้องมีอายุอย่างน้อย 13 ปี</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. การใช้งานที่ยอมรับได้
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  คุณตกลงที่จะไม่:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>โพสต์เนื้อหาที่ผิดกฎหมาย หมิ่นประมาท หรือขัดต่อศีลธรรม</li>
                  <li>ใช้บริการเพื่อกระทำการที่ละเมิดกฎหมาย</li>
                  <li>แอบอ้างเป็นบุคคลหรือองค์กรอื่น</li>
                  <li>รบกวนหรือขัดขวางการทำงานของระบบ</li>
                  <li>เผยแพร่ไวรัส มัลแวร์ หรือโค้ดที่เป็นอันตราย</li>
                  <li>ละเมิดทรัพย์สินทางปัญญาของผู้อื่น</li>
                  <li>ใช้บริการเพื่อส่งสแปมหรือโฆษณาที่ไม่พึงประสงค์</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. เนื้อหาของผู้ใช้
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  คุณยังคงเป็นเจ้าของเนื้อหาที่คุณโพสต์
                  แต่คุณให้สิทธิ์เราในการใช้งาน คัดลอก แสดง
                  และเผยแพร่เนื้อหาดังกล่าวบนแพลตฟอร์มของเรา
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  เราขอสงวนสิทธิ์ในการลบเนื้อหาที่ละเมิดข้อกำหนดนี้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. ทรัพย์สินทางปัญญา
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  เนื้อหาทั้งหมดบนเว็บไซต์นี้ รวมถึงแต่ไม่จำกัดเพียง ข้อความ
                  รูปภาพ โลโก้ และซอฟต์แวร์ เป็นทรัพย์สินของ Next Link
                  หรือผู้ให้อนุญาต
                  และได้รับความคุ้มครองตามกฎหมายทรัพย์สินทางปัญญา
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. การยกเลิกบริการ
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  เราขอสงวนสิทธิ์ในการ:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>ระงับหรือยกเลิกบัญชีของคุณหากละเมิดข้อกำหนด</li>
                  <li>ปรับเปลี่ยนหรือยกเลิกบริการใดๆ โดยไม่ต้องแจ้งล่วงหน้า</li>
                  <li>ปฏิเสธการให้บริการแก่บุคคลใดก็ได้</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. การจำกัดความรับผิด
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  บริการนี้ให้บริการ &quot;ตามสภาพที่เป็นอยู่&quot; และ &quot;ตามที่มีอยู่&quot;
                  เราไม่รับประกันว่าบริการจะไม่มีข้อผิดพลาดหรือไม่หยุดชะงัก
                  เราจะไม่รับผิดชอบต่อความเสียหายใดๆ
                  ที่เกิดจากการใช้หรือไม่สามารถใช้บริการ
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. การชดใช้ค่าเสียหาย
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  คุณตกลงที่จะชดใช้ค่าเสียหายและปกป้อง Next Link
                  จากการเรียกร้องใดๆ ที่เกิดจากการละเมิดข้อกำหนดนี้
                  หรือการใช้บริการของคุณ
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  9. กฎหมายที่ใช้บังคับ
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  ข้อกำหนดนี้อยู่ภายใต้กฎหมายของประเทศไทย
                  ข้อพิพาทใดๆ จะอยู่ในเขตอำนาจของศาลไทย
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10. การเปลี่ยนแปลงข้อกำหนด
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  เราอาจเปลี่ยนแปลงข้อกำหนดนี้เป็นครั้งคราว
                  การใช้บริการต่อไปหลังจากมีการเปลี่ยนแปลงถือว่าคุณยอมรับการเปลี่ยนแปลงนั้น
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11. ติดต่อเรา
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  หากคุณมีคำถามเกี่ยวกับข้อกำหนดนี้ กรุณาติดต่อเราที่:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    อีเมล:{" "}
                    <a
                      href="mailto:legal@nextlink.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      legal@nextlink.com
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
