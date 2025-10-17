import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import {
  FileText,
  HelpCircle,
  Mail,
  MessageCircle,
  Search,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ศูนย์ช่วยเหลือ | Next Link",
  description: "ศูนย์ช่วยเหลือและคำถามที่พบบ่อย Next Link",
};

export default function HelpPage() {
  const faqs = [
    {
      category: "บัญชีและโปรไฟล์",
      icon: <Users className="w-6 h-6" />,
      questions: [
        {
          q: "จะสมัครสมาชิกได้อย่างไร?",
          a: 'คลิกปุ่ม "สมัครสมาชิก" ที่มุมบนขวา กรอกข้อมูลที่จำเป็น และยืนยันอีเมล',
        },
        {
          q: "ลืมรหัสผ่านควรทำอย่างไร?",
          a: 'คลิก "ลืมรหัสผ่าน" ที่หน้าเข้าสู่ระบบ และทำตามขั้นตอนการรีเซ็ตรหัสผ่าน',
        },
        {
          q: "จะแก้ไขข้อมูลโปรไฟล์ได้อย่างไร?",
          a: 'ไปที่โปรไฟล์ของคุณ แล้วคลิกปุ่ม "แก้ไขโปรไฟล์" เพื่อปรับเปลี่ยนข้อมูล',
        },
        {
          q: "จะลบบัญชีได้อย่างไร?",
          a: 'ไปที่ "ตั้งค่า" > "บัญชี" > "ลบบัญชี" และทำตามขั้นตอน',
        },
      ],
    },
    {
      category: "ความเป็นส่วนตัวและความปลอดภัย",
      icon: <Shield className="w-6 h-6" />,
      questions: [
        {
          q: "จะควบคุมความเป็นส่วนตัวได้อย่างไร?",
          a: 'ไปที่ "ตั้งค่า" > "ความเป็นส่วนตัว" เพื่อปรับแต่งการมองเห็นโพสต์ของคุณ',
        },
        {
          q: "จะรายงานเนื้อหาที่ไม่เหมาะสมได้อย่างไร?",
          a: 'คลิกไอคอน "..." บนโพสต์ แล้วเลือก "รายงานโพสต์"',
        },
        {
          q: "จะบล็อกผู้ใช้ได้อย่างไร?",
          a: 'ไปที่โปรไฟล์ของผู้ใช้ คลิก "..." แล้วเลือก "บล็อก"',
        },
        {
          q: "ข้อมูลของฉันปลอดภัยหรือไม่?",
          a: "เราใช้การเข้ารหัสและมาตรการรักษาความปลอดภัยระดับสูงเพื่อปกป้องข้อมูลของคุณ",
        },
      ],
    },
    {
      category: "การโพสต์และแชร์",
      icon: <FileText className="w-6 h-6" />,
      questions: [
        {
          q: "จะโพสต์รูปภาพและวิดีโอได้อย่างไร?",
          a: 'คลิก "สร้างโพสต์" แล้วเลือกไอคอนรูปภาพหรือวิดีโอเพื่ออัปโหลด',
        },
        {
          q: "จะแก้ไขหรือลบโพสต์ได้อย่างไร?",
          a: 'คลิกไอคอน "..." บนโพสต์ของคุณ แล้วเลือก "แก้ไข" หรือ "ลบ"',
        },
        {
          q: "จะแท็กเพื่อนในโพสต์ได้อย่างไร?",
          a: 'พิมพ์ "@" ตามด้วยชื่อเพื่อนที่ต้องการแท็ก',
        },
        {
          q: "จะแชร์โพสต์ได้อย่างไร?",
          a: 'คลิกปุ่ม "แชร์" ใต้โพสต์ แล้วเลือกว่าจะแชร์ที่ไหน',
        },
      ],
    },
    {
      category: "การตั้งค่า",
      icon: <Settings className="w-6 h-6" />,
      questions: [
        {
          q: "จะเปิด/ปิดการแจ้งเตือนได้อย่างไร?",
          a: 'ไปที่ "ตั้งค่า" > "การแจ้งเตือน" เพื่อปรับแต่งการแจ้งเตือน',
        },
        {
          q: "จะเปลี่ยนภาษาได้อย่างไร?",
          a: 'ไปที่ "ตั้งค่า" > "ภาษา" แล้วเลือกภาษาที่ต้องการ',
        },
        {
          q: "จะเปิด Dark Mode ได้อย่างไร?",
          a: "คลิกไอคอนดวงจันทร์/ดวงอาทิตย์ที่มุมบนขวาเพื่อสลับโหมด",
        },
        {
          q: "จะเชื่อมต่อบัญชี Social Media อื่นได้อย่างไร?",
          a: 'ไปที่ "ตั้งค่า" > "บัญชีที่เชื่อมต่อ" แล้วเลือกเชื่อมต่อ',
        },
      ],
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
              <HelpCircle className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              ศูนย์ช่วยเหลือ
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              ค้นหาคำตอบสำหรับคำถามที่พบบ่อย
              หรือติดต่อทีมสนับสนุนของเราเพื่อขอความช่วยเหลือ
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหาคำถามหรือหัวข้อ..."
                className="w-full pl-14 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              />
            </div>
          </div>

          {/* FAQs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {faqs.map((category, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.category}
                  </h2>
                </div>
                <div className="space-y-6">
                  {category.questions.map((faq, qIdx) => (
                    <div key={qIdx}>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {faq.q}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
            <MessageCircle className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              ยังหาคำตอบที่ต้องการไม่เจอ?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              ทีมสนับสนุนของเรายินดีให้ความช่วยเหลือคุณตลอด 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:support@nextlink.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>ส่งอีเมลถึงเรา</span>
              </Link>
              <Link
                href="/messages"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>แชทกับเรา</span>
              </Link>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/privacy"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <Shield className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                นโยบายความเป็นส่วนตัว
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                เรียนรู้เกี่ยวกับการเก็บรักษาและใช้ข้อมูลของคุณ
              </p>
            </Link>

            <Link
              href="/terms"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <FileText className="w-10 h-10 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                ข้อกำหนดและเงื่อนไข
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                อ่านข้อกำหนดการใช้บริการของเรา
              </p>
            </Link>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
              <Users className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                ชุมชน
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                เข้าร่วมชุมชนและแลกเปลี่ยนประสบการณ์
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
