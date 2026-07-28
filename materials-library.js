(function () {
  "use strict";

  var categories = {
    all: { label: "جميع المواد", color: "#006B69" },
    belief: { label: "البطاقات الإيمانية", color: "#2D7A4B" },
    worksheets: { label: "أوراق العمل", color: "#1B4D7E" },
    unit: { label: "صور الوحدة والتنفيذ", color: "#D8662A" },
    corners: { label: "الأركان التطبيقية", color: "#7EA348" },
    fitness: { label: "اللياقة البدنية", color: "#8660A8" },
    media: { label: "الصوتيات والفيديو", color: "#6B3F22" }
  };

  var materials = [
    {
      title: "اعتقادنا في القرآن",
      category: "belief",
      type: "image",
      src: "assets/gq_kitabi_belief_quran_card.webp",
      desc: "بطاقة الاعتقاد المعتمدة في لقاءات كتابي المنير."
    },
    {
      title: "التسجيل الصوتي لبطاقة اعتقادنا في القرآن",
      category: "belief",
      type: "audio",
      src: "assets/gq_belief_quran_audio.m4a",
      desc: "تسجيل تستعين به المعلمة في ضبط قراءة البطاقة."
    },
    {
      title: "اعتقاد أهل السنة في النبي ﷺ",
      category: "belief",
      type: "image",
      src: "assets/image_044_9d9b205426479f9f.webp",
      desc: "بطاقة الاعتقاد المرتبطة بلقاء قال رسولي."
    },
    {
      title: "حديث: ما أصبح بي من نعمة",
      category: "belief",
      type: "image",
      src: "assets/gq_qal_rasuli_hadith_nima_card.webp",
      desc: "بطاقة حديث مصممة للعرض والاستذكار."
    },
    {
      title: "حديث آداب المساء",
      category: "belief",
      type: "image",
      src: "assets/gq_adab_iqtida_evening_hadith_card.webp",
      desc: "بطاقة الحديث المعتمدة في لقاء أدب واقتداء."
    },
    {
      title: "آيات سورة الفجر ١٥–١٦",
      category: "belief",
      type: "image",
      src: "assets/image_015_dd2a0972bcf65ffd.webp",
      desc: "بطاقة الآيات المقررة في اليوم الأول."
    },
    {
      title: "آيات سورة الفجر ١٧–٢٠",
      category: "belief",
      type: "image",
      src: "assets/image_027_5b2bd3b4108e63ad.webp",
      desc: "بطاقة الآيات المقررة في اليوم الثاني."
    },
    {
      title: "آيات سورة الفجر ٢١–٢٦",
      category: "belief",
      type: "image",
      src: "assets/image_038_8d405e8e2151b456.webp",
      desc: "بطاقة الآيات المقررة في اليوم الثالث."
    },
    {
      title: "آيات سورة الفجر ٢٧–٣٠",
      category: "belief",
      type: "image",
      src: "assets/image_053_9c36ff0c219a9f42.webp",
      desc: "بطاقة الآيات المقررة في اليوم الرابع."
    },
    {
      title: "سورة الفجر كاملة للمراجعة",
      category: "belief",
      type: "image",
      src: "assets/image_058_6bfdd94930163d91.webp",
      desc: "بطاقة السورة الكاملة للتثبيت والمراجعة."
    },
    {
      title: "بطاقة: سراجًا وهاجًا",
      category: "belief",
      type: "photo",
      src: "assets/image_030_9b66bf82b1b6e569.jpg",
      desc: "بطاقة استرشادية لمعنى الشمس في القرآن."
    },

    {
      title: "حرف الضاد بالحركات",
      category: "worksheets",
      type: "pdf",
      src: "assets/gq_center_lang_dad_harakat.pdf",
      preview: "assets/worksheet_previews/gq_preview_lang_dad.webp",
      desc: "ورقة عمل قابلة للفتح والطباعة."
    },
    {
      title: "حرف الحاء بالحركات",
      category: "worksheets",
      type: "pdf",
      src: "assets/gq_center_lang_ha_harakat.pdf",
      preview: "assets/worksheet_previews/gq_preview_lang_ha.webp",
      desc: "ورقة عمل قابلة للفتح والطباعة."
    },
    {
      title: "إدراكي: التهيئة للتهجئة",
      category: "worksheets",
      type: "pdf",
      src: "assets/gq_center_lang_idraki_tahjiya.pdf",
      preview: "assets/worksheet_previews/gq_preview_lang_idraki.webp",
      desc: "نشاط إدراك بصري وسمعي للمقاطع قبل التهجئة."
    },
    {
      title: "بطاقات التهجئة",
      category: "worksheets",
      type: "pdf",
      src: "assets/gq_center_lang_tahjiya_cards.pdf",
      preview: "assets/worksheet_previews/gq_preview_lang_tahjiya_cards.webp",
      desc: "بطاقات لقراءة الكلمات القصيرة وتحليلها."
    },
    {
      title: "مركز رياضيات العدد ١٠",
      category: "worksheets",
      type: "pdf",
      src: "assets/gq_center_math_10.pdf",
      preview: "assets/worksheet_previews/gq_preview_math10.webp",
      desc: "عدّ ومطابقة العدد بالمعدود."
    },
    {
      title: "حرف الهمزة بالحركات",
      category: "worksheets",
      type: "doc",
      src: "assets/gq_center_lang_hamza_harakat.docx",
      desc: "ملف Word قابل للتحميل والتعديل."
    },
    {
      title: "حرف الزاي بالحركات",
      category: "worksheets",
      type: "doc",
      src: "assets/gq_center_lang_zay_harakat.docx",
      desc: "ملف Word قابل للتحميل والتعديل."
    },
    {
      title: "حرف الطاء بالحركات",
      category: "worksheets",
      type: "doc",
      src: "assets/gq_center_lang_ta_harakat.docx",
      desc: "ملف Word قابل للتحميل والتعديل."
    },

    {
      title: "الليل والنهار: صورة مقارنة",
      category: "unit",
      type: "photo",
      src: "assets/gq_day_night_sun_moon.jpg",
      desc: "صورة مقارنة بين الليل بالقمر والنهار بالشمس."
    },
    {
      title: "الشمس في السماء نهارًا",
      category: "unit",
      type: "image",
      src: "assets/gq_day_night_sun.webp",
      desc: "وسيلة بصرية لدرس الشمس."
    },
    {
      title: "القمر في السماء ليلًا",
      category: "unit",
      type: "image",
      src: "assets/gq_day_night_moon.webp",
      desc: "وسيلة بصرية لدرس القمر."
    },
    {
      title: "بيت الحركات على اللوحة",
      category: "unit",
      type: "photo",
      src: "assets/image_025_a0998f583d3f2adf.jpg",
      desc: "صورة تنفيذية لنشاط الحركات."
    },
    {
      title: "لوحة أعمال النهار",
      category: "unit",
      type: "photo",
      src: "assets/image_040_8fb0fb3979dc3988.jpg",
      desc: "مثال تطبيقي على اللوحة الصفية."
    },
    {
      title: "وسيلة أعمال النهار قبل اكتمال التصنيف",
      category: "unit",
      type: "photo",
      src: "assets/image_041_986ab63a30dd462e.jpg",
      desc: "مرجع بصري لخطوات تنفيذ نشاط التصنيف."
    },
    {
      title: "وسيلة أعمال النهار بعد ترتيب البطاقات",
      category: "unit",
      type: "photo",
      src: "assets/image_042_96e86b95a9493113.jpg",
      desc: "صورة النتيجة النهائية للنشاط."
    },
    {
      title: "عرض الحديث وعناصره على اللوحة",
      category: "unit",
      type: "photo",
      src: "assets/image_047_c13cb85b83c700a7.jpg",
      desc: "تطبيق بصري لحديث النعمة."
    },
    {
      title: "الحقائب الملونة لمعاني الحديث",
      category: "unit",
      type: "photo",
      src: "assets/image_048_f3acf4b593cabcff.jpg",
      desc: "وسيلة لفرز معاني الحديث."
    },
    {
      title: "تمييز ألفاظ الحديث",
      category: "unit",
      type: "photo",
      src: "assets/image_049_ba525295eb905bf6.jpg",
      desc: "صورة تنفيذية لتثبيت ألفاظ الحديث."
    },
    {
      title: "بطاقات النعم المصورة",
      category: "unit",
      type: "photo",
      src: "assets/image_050_e84cbbab9c413f13.jpg",
      desc: "بطاقات محسوسة لتطبيق معنى النعمة."
    },
    {
      title: "نشاط أرضي بالأرقام",
      category: "unit",
      type: "photo",
      src: "assets/image_055_72ca42091f318400.jpg",
      desc: "نشاط حركي تطبيقي في مركز الرياضيات."
    },
    {
      title: "بطاقات منازل القمر على اللوحة",
      category: "unit",
      type: "photo",
      src: "assets/image_056_813cdd280c809a02.jpg",
      desc: "صورة استرشادية لدرس القمر."
    },
    {
      title: "ترتيب منازل القمر رقميًا",
      category: "unit",
      type: "photo",
      src: "assets/image_057_2b330e52e46d7913.jpg",
      desc: "تطبيق تسلسلي لمنازل القمر."
    },
    {
      title: "تصنيف أعمال اليوم بين الليل والنهار",
      category: "unit",
      type: "photo",
      src: "assets/image_059_d5340b0ee961c2c1.jpg",
      desc: "مثال للوحة التصنيف بعد توزيع الأعمال."
    },
    {
      title: "تثبيت مصباح آداب المساء",
      category: "unit",
      type: "photo",
      src: "assets/image_062_9ad8dfee6c129c17.jpg",
      desc: "صورة تنفيذية لنشاط مصابيح الآداب."
    },
    {
      title: "مصابيح الآداب قبل العرض",
      category: "unit",
      type: "photo",
      src: "assets/image_063_4da4c9ced4f13a41.jpg",
      desc: "تجهيز الوسيلة قبل تعليقها."
    },
    {
      title: "مصابيح الآداب بعد التعليق",
      category: "unit",
      type: "photo",
      src: "assets/image_064_47a3a61a8ae1fd12.jpg",
      desc: "صورة النتيجة النهائية على اللوحة."
    },

    {
      title: "قوانين ركن أدرك وأستمتع",
      category: "corners",
      type: "image",
      src: "assets/gq_corner_rules_play.webp",
      desc: "بطاقة القوانين الجاهزة للطباعة."
    },
    {
      title: "قوانين ركن أقرأ لأتعلم",
      category: "corners",
      type: "image",
      src: "assets/gq_corner_rules_read.webp",
      desc: "بطاقة القوانين الجاهزة للطباعة."
    },
    {
      title: "قوانين ركن أكتشف ما حولي",
      category: "corners",
      type: "image",
      src: "assets/gq_corner_rules_discover.webp",
      desc: "بطاقة القوانين الجاهزة للطباعة."
    },
    {
      title: "قوانين ركن الدكان",
      category: "corners",
      type: "image",
      src: "assets/gq_corner_rules_shop.webp",
      desc: "بطاقة القوانين الجاهزة للطباعة."
    },
    {
      title: "قوانين ركن المسكن",
      category: "corners",
      type: "image",
      src: "assets/gq_corner_rules_home.webp",
      desc: "بطاقة القوانين الجاهزة للطباعة."
    },
    {
      title: "قوانين ركن فنوني الجميلة",
      category: "corners",
      type: "image",
      src: "assets/gq_corner_rules_art.webp",
      desc: "بطاقة القوانين الجاهزة للطباعة."
    },
    {
      title: "قوانين ركن ساحة البناء",
      category: "corners",
      type: "image",
      src: "assets/gq_corner_rules_build.webp",
      desc: "بطاقة القوانين الجاهزة للطباعة."
    },
    {
      title: "قوانين ساحة الرمل",
      category: "corners",
      type: "image",
      src: "assets/gq_corner_rules_sand.webp",
      desc: "بطاقة القوانين الجاهزة للطباعة."
    },
    {
      title: "أدوات ركن أدرك وأستمتع: المطابقة",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_play_matching.jpg",
      desc: "أدوات واقعية تساعد المعلمة على تصور النشاط."
    },
    {
      title: "أدوات ركن أدرك وأستمتع: التمرير والربط",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_play_lacing.jpg",
      desc: "أدوات واقعية لنشاط المهارة الدقيقة."
    },
    {
      title: "أدوات العد والقياس",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_play_count_measure.jpg",
      desc: "وسائل محسوسة للعد والمطابقة."
    },
    {
      title: "زاوية القصص في ركن أقرأ لأتعلم",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_read_story_shelf.jpg",
      desc: "تصور واقعي لتنظيم الكتب والبطاقات."
    },
    {
      title: "زاوية القرآن في ركن أقرأ لأتعلم",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_read_quran_corner.jpg",
      desc: "تصور واقعي لزاوية التثبيت الهادئ."
    },
    {
      title: "كتب ركن أقرأ لأتعلم",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_read_corner_books.jpg",
      desc: "مرجع بصري لاختيار أدوات الركن."
    },
    {
      title: "التلوين في ركن فنوني الجميلة",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_art_coloring_cards.jpg",
      desc: "خامات وبطاقات لأنشطة الفن."
    },
    {
      title: "خامات التزيين",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_art_decor_supplies.jpg",
      desc: "مرجع بصري لتجهيز الخامات."
    },
    {
      title: "لوحة يومي الفنية",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_art_my_day_board.jpg",
      desc: "تصور لأداة نشاط أعمال اليوم."
    },
    {
      title: "أدوات فنية آمنة",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_art_safe_tools.jpg",
      desc: "خامات مناسبة لأنشطة التمهيدي."
    },
    {
      title: "مكعبات ساحة البناء",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_build_blocks.jpg",
      desc: "أدوات بناء محسوسة للأنشطة التطبيقية."
    },
    {
      title: "أنماط البناء والتسلسل",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_build_patterns.jpg",
      desc: "وسيلة لأنشطة الترتيب والنمط."
    },
    {
      title: "أدوات استكشاف الضوء",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_discover_light_torches.jpg",
      desc: "أدوات الركن بوصفها وسائل مساندة لا بديلًا عن التفكر في الشمس."
    },
    {
      title: "مطابقة أطوار القمر",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_discover_moon_phases.jpg",
      desc: "أدوات محسوسة لملاحظة أطوار القمر."
    },
    {
      title: "وسائل النظام الشمسي",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_discover_solar_system.jpg",
      desc: "مرجع بصري لأدوات ركن أكتشف ما حولي."
    },
    {
      title: "تنظيف المسكن وترتيبه",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_home_cleaning.jpg",
      desc: "أدوات تمثيل عملي في ركن المسكن."
    },
    {
      title: "إعداد الطعام في المسكن",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_home_food_prep.jpg",
      desc: "تصور واقعي لأدوات الركن."
    },
    {
      title: "الضيافة في ركن المسكن",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_home_hospitality.jpg",
      desc: "أدوات نشاط الإكرام والضيافة."
    },
    {
      title: "المسكن والحي",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_home_neighborhood.jpg",
      desc: "وسائل لعب تمثيلي مرتبطة بالمسكن."
    },
    {
      title: "جلسة ركن المسكن",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_home_sitting.jpg",
      desc: "تصور لتنظيم مساحة الركن."
    },
    {
      title: "سلال ركن الدكان",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_shop_baskets.jpg",
      desc: "أدوات عملية للشراء والاختيار."
    },
    {
      title: "منضدة المحاسبة في الدكان",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_shop_cashier.jpg",
      desc: "مرجع بصري لأدوات اللعب التمثيلي."
    },
    {
      title: "أدوات ركن الدكان",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_shop_general.jpg",
      desc: "تصور عام لتنظيم الركن."
    },
    {
      title: "ساحة الرمل",
      category: "corners",
      type: "photo",
      src: "assets/gq_lib_sand_area.jpg",
      desc: "مرجع بصري لتجهيز أنشطة الرمل."
    },

    {
      title: "لعبة القاطرتين والحواجز",
      category: "fitness",
      type: "image",
      src: "assets/fitness_obstacle_relay.webp",
      desc: "بطاقة مرجعية للمعلمة مع مراعاة السلامة والمساحة."
    },
    {
      title: "تمرين الركلات",
      category: "fitness",
      type: "image",
      src: "assets/fitness_kicks.webp",
      desc: "وضعية التمرين وخطواته بصورة واضحة."
    },
    {
      title: "تمرين الزحف",
      category: "fitness",
      type: "image",
      src: "assets/fitness_crawl.webp",
      desc: "بطاقة مرجعية لوضعية الزحف."
    },
    {
      title: "سباق الزحف",
      category: "fitness",
      type: "image",
      src: "assets/fitness_crawl_race.webp",
      desc: "تنظيم مسابقة الزحف داخل القاعة."
    },
    {
      title: "تمرين القرفصاء",
      category: "fitness",
      type: "image",
      src: "assets/fitness_squat.webp",
      desc: "بطاقة مرجعية للحركة الصحيحة."
    },
    {
      title: "تمرين المعدة",
      category: "fitness",
      type: "image",
      src: "assets/fitness_abs.webp",
      desc: "بطاقة مرجعية للمعلمة."
    },
    {
      title: "قفز فتح وإغلاق",
      category: "fitness",
      type: "image",
      src: "assets/fitness_star_jump.webp",
      desc: "بطاقة مرجعية للنشاط الحركي."
    },

    {
      title: "أنشودة: تهطل الأمطار",
      category: "media",
      type: "video",
      src: "assets/video_002_cfd19c4ef405a80b.mp4",
      desc: "لعبة أصابع وانتقال حركي قصير."
    },
    {
      title: "أنشودة: عصفورتي",
      category: "media",
      type: "video",
      src: "assets/video_003_4236b9ef43dbf67f.mp4",
      desc: "نشيد حركي رقيق للتمثيل الإيهامي."
    },
    {
      title: "أنشودة: حلّقت الطيور",
      category: "media",
      type: "video",
      src: "assets/video_004_7a3a0a820714e4f1.mp4",
      desc: "انتقال حركي يساعد على العودة للهدوء."
    },
    {
      title: "أنشودة: ورقة التوت",
      category: "media",
      type: "video",
      src: "assets/video_005_657836c2ea5b14a9.mp4",
      desc: "نشيد أصابع مناسب قبل النشاط اليدوي."
    },
    {
      title: "أنشودة: يدان يدان",
      category: "media",
      type: "video",
      src: "assets/video_006_61b742e6906dc87f.mp4",
      desc: "تنشيط لليدين والعضلات الصغيرة."
    },
    {
      title: "أنشودة الطقس بالحركات",
      category: "media",
      type: "video",
      src: "assets/video_007_fad2d0d2cd60a387.mp4",
      desc: "تهيئة اليوم وربط ملاحظة الطقس بالحركة."
    },
    {
      title: "منظومة الوحدة: نشيد التفكر",
      category: "media",
      type: "video",
      src: "assets/video_008_cfcf4810def7d59f.mp4",
      desc: "مرجع للمعلمة للاستماع وضبط الأداء."
    },
    {
      title: "إشارة بدء لقاء كتابي المنير",
      category: "media",
      type: "video",
      src: "assets/video_013_9f80e8e0f229034b.mp4",
      desc: "مرجع لضبط نغمة إشارة بدء اللقاء."
    },
    {
      title: "ترديد سورة الفجر ١٥–١٦",
      category: "media",
      type: "video",
      src: "assets/video_016_c06ed71d24b83b07.mp4",
      desc: "مقطع الترديد المقرر في اليوم الأول."
    },
    {
      title: "إشارة بدء لقاء علّمني ربي",
      category: "media",
      type: "video",
      src: "assets/video_020_8881286748f78d38.mp4",
      desc: "مرجع لضبط نغمة إشارة بدء اللقاء."
    },
    {
      title: "ترديد سورة الفجر ١٧–٢٠",
      category: "media",
      type: "video",
      src: "assets/video_028_0a0a54cabbf89e49.mp4",
      desc: "مقطع الترديد المقرر في اليوم الثاني."
    },
    {
      title: "شروق الشمس وغروبها",
      category: "media",
      type: "video",
      src: "assets/video_029_01f3e74fd57efd7e.mp4",
      desc: "مقطع واقعي هادئ بلا نشيد أو مؤثرات."
    },
    {
      title: "إشارة بدء لقاء مهاراتي",
      category: "media",
      type: "video",
      src: "assets/video_033_b6b8486b75ca59fc.mp4",
      desc: "مرجع لضبط نغمة إشارة بدء اللقاء."
    },
    {
      title: "ترديد سورة الفجر ٢١–٢٦",
      category: "media",
      type: "video",
      src: "assets/video_039_ad37867104c88637.mp4",
      desc: "مقطع الترديد المقرر في اليوم الثالث."
    },
    {
      title: "إشارة بدء لقاء قال رسولي",
      category: "media",
      type: "video",
      src: "assets/video_043_5f4b8f92b1807dc6.mp4",
      desc: "مرجع لضبط نغمة إشارة بدء اللقاء."
    },
    {
      title: "ترديد سورة الفجر ٢٧–٣٠",
      category: "media",
      type: "video",
      src: "assets/video_054_4b9e8b2b6eb94aaa.mp4",
      desc: "مقطع الترديد المقرر في اليوم الرابع."
    },
    {
      title: "إشارة بدء لقاء أدب واقتداء",
      category: "media",
      type: "video",
      src: "assets/video_061_bc0a9fe5474f71f2.mp4",
      desc: "مرجع لضبط نغمة إشارة بدء اللقاء."
    },
    {
      title: "تعاقب الليل والنهار",
      category: "media",
      type: "video",
      src: "assets/gq_day_night_cycle_video.mp4",
      desc: "فيديو المشاهدة والتأمل في تعاقب الليل والنهار."
    }
  ];

  var typeLabels = {
    image: "بطاقة",
    photo: "صورة",
    pdf: "PDF",
    doc: "Word",
    audio: "صوت",
    video: "فيديو"
  };

  function normalize(value) {
    return (value || "")
      .toLowerCase()
      .replace(/[\u064B-\u065F\u0670]/g, "")
      .replace(/[أإآ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function previewMarkup(item) {
    var title = escapeHtml(item.title);
    var src = escapeHtml(item.src);
    var badge =
      '<span class="gq-material-type">' +
      escapeHtml(typeLabels[item.type] || "مادة") +
      "</span>";

    if (item.type === "image" || item.type === "photo") {
      return (
        '<div class="gq-material-preview ' +
        (item.type === "photo" ? "is-photo" : "") +
        '">' +
        badge +
        '<img src="' +
        src +
        '" alt="' +
        title +
        '" loading="lazy"></div>'
      );
    }

    if ((item.type === "pdf" || item.type === "doc") && item.preview) {
      return (
        '<div class="gq-material-preview">' +
        badge +
        '<img src="' +
        escapeHtml(item.preview) +
        '" alt="معاينة ' +
        title +
        '" loading="lazy"></div>'
      );
    }

    if (item.type === "video") {
      return (
        '<div class="gq-material-preview">' +
        badge +
        '<video controls preload="metadata" playsinline aria-label="' +
        title +
        '"><source src="' +
        src +
        '" type="video/mp4">المتصفح لا يدعم تشغيل الفيديو.</video></div>'
      );
    }

    if (item.type === "audio") {
      return (
        '<div class="gq-material-preview">' +
        badge +
        '<audio class="gq-material-audio" controls preload="metadata" aria-label="' +
        title +
        '"><source src="' +
        src +
        '" type="audio/mp4">المتصفح لا يدعم تشغيل الصوت.</audio></div>'
      );
    }

    return (
      '<div class="gq-material-preview">' +
      badge +
      '<div class="gq-material-docmark">' +
      escapeHtml(typeLabels[item.type] || "ملف") +
      "</div></div>"
    );
  }

  function cardMarkup(item) {
    var meta = categories[item.category] || categories.unit;
    return (
      '<article class="gq-material-card" data-category="' +
      escapeHtml(item.category) +
      '" data-search="' +
      escapeHtml(normalize(item.title + " " + item.desc + " " + meta.label)) +
      '" style="--card-color:' +
      meta.color +
      '">' +
      previewMarkup(item) +
      '<div class="gq-material-body">' +
      '<div class="gq-material-category">' +
      escapeHtml(meta.label) +
      "</div>" +
      '<h3 class="gq-material-title">' +
      escapeHtml(item.title) +
      "</h3>" +
      '<p class="gq-material-desc">' +
      escapeHtml(item.desc) +
      "</p>" +
      '<div class="gq-material-actions"><a class="gq-material-open" href="' +
      escapeHtml(item.src) +
      '" target="_blank" rel="noopener">فتح المادة</a></div>' +
      "</div></article>"
    );
  }

  function init() {
    var root = document.getElementById("gq-materials-root");
    if (!root || root.dataset.ready === "1") return;
    root.dataset.ready = "1";

    var counts = materials.reduce(function (result, item) {
      result[item.category] = (result[item.category] || 0) + 1;
      return result;
    }, {});

    var filters = Object.keys(categories)
      .map(function (key) {
        var count = key === "all" ? materials.length : counts[key] || 0;
        return (
          '<button type="button" class="gq-materials-filter" data-filter="' +
          key +
          '" aria-pressed="' +
          (key === "all" ? "true" : "false") +
          '">' +
          escapeHtml(categories[key].label) +
          "<small>" +
          count.toLocaleString("ar-EG") +
          "</small></button>"
        );
      })
      .join("");

    root.innerHTML =
      '<div class="gq-materials-shell">' +
      '<section class="gq-materials-hero">' +
      "<div>" +
      '<div class="gq-materials-kicker">مرجع واحد بدل البحث بين الدروس</div>' +
      "<h2>مكتبة مواد وحدة الليل والنهار</h2>" +
      "<p>البطاقات، وأوراق العمل، والصور، والصوتيات، والفيديوهات، ومواد الأركان في مكان واحد. افتحي المادة من بطاقتها، أو ابحثي باسم الدرس أو نوع الوسيلة.</p>" +
      "</div>" +
      '<div class="gq-materials-total"><strong>' +
      materials.length.toLocaleString("ar-EG") +
      "</strong><span>مادة مصنفة وجاهزة</span></div>" +
      "</section>" +
      '<div class="gq-materials-note">تنبيه: مقاطع الإشارات والأناشيد مرجع للمعلمة لتتعلم الأداء وتنفذه بنفسها، ويُتبع في عرض كل وسيط للأطفال ما نص عليه الدرس.</div>' +
      '<section class="gq-materials-controls" aria-label="البحث وتصفية المواد">' +
      '<label class="gq-materials-search"><span class="sr-only">ابحثي في مكتبة المواد</span><input id="gq-materials-search" type="search" placeholder="ابحثي: اعتقاد، القمر، العدد ١٠، ركن المسكن…"></label>' +
      '<div class="gq-materials-filters" role="group" aria-label="تصنيف المواد">' +
      filters +
      "</div></section>" +
      '<div class="gq-materials-status"><span id="gq-materials-count"></span><span>اضغطي «فتح المادة» للعرض بالحجم الكامل أو الطباعة.</span></div>' +
      '<div class="gq-materials-grid" id="gq-materials-grid">' +
      materials.map(cardMarkup).join("") +
      "</div>" +
      '<div class="gq-material-empty" id="gq-materials-empty">لا توجد مادة مطابقة. جرّبي كلمة أقصر أو اختاري «جميع المواد».</div>' +
      "</div>";

    var selected = "all";
    var search = root.querySelector("#gq-materials-search");
    var cards = Array.prototype.slice.call(
      root.querySelectorAll(".gq-material-card")
    );
    var countBox = root.querySelector("#gq-materials-count");
    var empty = root.querySelector("#gq-materials-empty");

    function refresh() {
      var term = normalize(search.value);
      var visible = 0;
      cards.forEach(function (card) {
        var categoryMatch =
          selected === "all" || card.dataset.category === selected;
        var searchMatch =
          !term || (card.dataset.search || "").indexOf(term) !== -1;
        var show = categoryMatch && searchMatch;
        card.hidden = !show;
        if (show) visible += 1;
        if (!show) {
          card.querySelectorAll("video,audio").forEach(function (media) {
            try {
              media.pause();
            } catch {}
          });
        }
      });
      countBox.textContent =
        "يظهر الآن " +
        visible.toLocaleString("ar-EG") +
        " من " +
        materials.length.toLocaleString("ar-EG") +
        " مادة";
      empty.classList.toggle("show", visible === 0);
    }

    root.addEventListener("click", function (event) {
      var button = event.target.closest("[data-filter]");
      if (!button) return;
      selected = button.dataset.filter || "all";
      root.querySelectorAll("[data-filter]").forEach(function (candidate) {
        candidate.setAttribute(
          "aria-pressed",
          candidate === button ? "true" : "false"
        );
      });
      refresh();
    });

    search.addEventListener("input", refresh);

    root.querySelectorAll("img,video,audio").forEach(function (media) {
      media.addEventListener(
        "error",
        function () {
          var preview = media.closest(".gq-material-preview");
          if (!preview || preview.querySelector(".gq-material-docmark")) return;
          media.remove();
          preview.insertAdjacentHTML(
            "beforeend",
            '<div class="gq-material-docmark">تعذر العرض</div>'
          );
        },
        { once: true }
      );
    });

    refresh();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
