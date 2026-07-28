(function () {
  "use strict";

  var SUBJECTS = {
    kitabi: {
      color: "#2D7A4B",
      soft: "#EAF5EE",
      icon: "brand/material-kitabi.png",
    },
    allamni: {
      color: "#006B69",
      soft: "#E6F4F3",
      icon: "brand/material-allamni.png",
    },
    uhibbuka: {
      color: "#8660A8",
      soft: "#F3ECF8",
      icon: "brand/material-uhibbuka.png",
    },
    rasuli: {
      color: "#6B3F22",
      soft: "#F7EFE5",
      icon: "brand/material-rasuli.png",
    },
    adab: {
      color: "#7EA348",
      soft: "#F1F7E8",
      icon: "brand/material-adab.png",
    },
    lisani: {
      color: "#003E45",
      soft: "#EAF4F5",
      icon: "brand/material-lisani.png",
    },
    maharati: {
      color: "#D8662A",
      soft: "#FFF1E8",
      icon: "brand/material-maharati.png",
    },
  };

  var CORNERS = {
    discover: {
      name: "ركن أكتشف ما حولي",
      icon: "brand/corner-discover.png",
    },
    read: {
      name: "ركن أقرأ لأتعلم",
      icon: "brand/corner-read.png",
    },
    play: {
      name: "ركن أدرك وأستمتع",
      icon: "brand/corner-play.png",
    },
    home: {
      name: "ركن المسكن",
      icon: "brand/corner-home.png",
    },
    shop: {
      name: "ركن الدكان",
      icon: "brand/corner-shop.png",
    },
    build: {
      name: "ركن ساحة البناء",
      icon: "brand/corner-build.png",
    },
    sand: {
      name: "ساحة الرمل",
      icon: "brand/corner-sand.png",
    },
    art: {
      name: "ركن فنوني الجميلة",
      icon: "brand/corner-art.png",
    },
  };

  var ICONS = {
    objectives: "brand/compass.webp",
    values: "brand/lavender.webp",
    learning: "brand/shapes.webp",
    means: "brand/blocks.webp",
    assessment: "brand/waqf-seal.webp",
    vocabulary: "brand/material-lisani.png",
    preparation: "brand/crescent.webp",
    stimulus: "brand/material-allamni.png",
    thinking: "brand/compass.webp",
    methods: "brand/read.png",
    activity: "brand/seedling.webp",
  };

  var LESSONS = [
    {
      test: /كتابي المنير ١/,
      subject: "kitabi",
      vocabulary: ["ابتلاء", "أكرمه", "نعّمه", "قَدَر عليه رزقه", "الشكر", "الصبر"],
      preparation:
        "تعرض المعلمة موقفين مصورين: طفل أنعم الله عليه بهدية، وطفل لم يحصل على ما أراد؛ ثم تترك الأطفال يصفون شعور كل واحد قبل توجيه الإجابات.",
      stimulus:
        "هل كل عطاء يعني أن صاحبه أفضل من غيره؟ وماذا يطلب الله منا عند النعمة وعند ما لا نحبه؟",
      learning: ["التلقي المعظِّم للآية", "تصنيف المواقف", "التعلّم بالمثال واللامثال", "التطبيق السلوكي"],
      thinking: ["المقارنة", "التصنيف", "تصحيح الفهم", "اختيار الاستجابة المناسبة"],
      methods: ["التلاوة الموجّهة", "الحوار القصير", "القصة الموقفية", "النمذجة السلوكية"],
      activity: {
        name: "أشكر وأصبر",
        corner: "play",
        meaning:
          "النعمة والضيق كلاهما ابتلاء من الله؛ فيعبد الطفل ربَّه بالشكر عند النعمة والصبر عند ما لا يحب.",
        strategy: "التعلّم بالمواقف والتصنيف مع لعب دور قصير منضبط",
        tools: ["بطاقات مواقف واقعية", "بطاقتا: أشكر / أصبر", "سلتان صغيرتان"],
        steps: [
          "تقرأ المعلمة موقفًا مناسبًا لعمر الأطفال.",
          "يختار الطفل بطاقة «أشكر» أو «أصبر» ويذكر سبب اختياره.",
          "يمثل الطفل عبارة صحيحة: «الحمد لله» أو «أصبر وأطلب العون من الله».",
          "تختم المعلمة بربط الاستجابة بمعنى الآيتين دون استخدام نص القرآن أداةً للعب.",
        ],
        safeguard:
          "تُعرض الآيات على مصحف أو بطاقة مكرّمة مرتفعة، ولا توضع نصوصها داخل سلال التصنيف أو على الأرض.",
      },
    },
    {
      test: /علّمني ربي ١/,
      subject: "allamni",
      vocabulary: ["الليل", "النهار", "يتعاقبان", "الشروق", "الغروب", "السكون", "آية"],
      preparation:
        "ينظر الأطفال من النافذة إلى حال الوقت، ثم تعرض المعلمة صورتين حقيقيتين للمكان نفسه نهارًا وليلًا.",
      stimulus:
        "ما الذي تغيّر بين الصورتين؟ ومن الذي خلق الليل والنهار وجعلهما يتعاقبان بهذا النظام؟",
      learning: ["الملاحظة المتأملة", "المقارنة البصرية", "الترتيب الزمني", "الحوار الموجّه"],
      thinking: ["الملاحظة", "المقارنة", "التسلسل", "الاستدلال من الآية إلى عظمة الخالق"],
      methods: ["المشاهدة المباشرة", "الصور الواقعية", "السؤال والجواب", "التكرار اللفظي الهادف"],
      activity: {
        name: "دلائل الليل والنهار",
        corner: "discover",
        meaning:
          "الليل والنهار آيتان عظيمتان خلقهما الله، ويتعاقبان بأمره وحكمته لينتفع العباد.",
        strategy: "الملاحظة والتصنيف والترتيب التعاوني",
        tools: ["صور واقعية لليل والنهار", "بطاقات دلائل الوقت", "شريط تعاقب دائري"],
        steps: [
          "يفحص الطفل الصورة ويذكر دليلًا يراه فيها.",
          "يضعها في جهة الليل أو النهار.",
          "يرتب مع مجموعته أربع بطاقات تبين تعاقب الوقت.",
          "يعبّر بجملة: «الله خلق الليل والنهار» ثم يذكر نعمة ينتفع بها.",
        ],
        safeguard:
          "لا تُشخّص الشمس أو القمر ولا تُنسب الحركة إلى الطبيعة أو المصادفة؛ بل يثبت أن الجميع مخلوق مسخّر بأمر الله.",
      },
    },
    {
      test: /الوهاب.*الغني.*الشافي/,
      subject: "uhibbuka",
      vocabulary: ["الوهاب", "الغني", "الشافي", "الهبة", "النعمة", "الافتقار", "الشفاء"],
      preparation:
        "تضع المعلمة في سلة صورًا لنعم مألوفة: أسرة، ماء، طعام، عافية؛ ويتحدث الأطفال عمن أنعم بها.",
      stimulus:
        "من الذي يهبنا النعم؟ ومن الغني عن جميع خلقه؟ ومن الذي يقدّر الشفاء حين نأخذ بالأسباب؟",
      learning: ["ربط الاسم بأثره التعبدي", "الحوار العقدي الموجّه", "المواقف الحياتية", "الاسترجاع"],
      thinking: ["الربط", "التمييز بين الخالق والسبب", "الاستدلال", "تطبيق المعنى"],
      methods: ["القصة القصيرة", "السؤال المتدرّج", "النمذجة اللفظية", "بطاقات المواقف"],
      activity: {
        name: "نِعَم في بيتي",
        corner: "home",
        meaning:
          "الله هو الوهاب الغني الشافي؛ ننسب النعم إليه، ونفتقر إليه، ونأخذ بالأسباب والشفاء من الله وحده.",
        strategy: "التعلّم بالموقف والربط بين الاسم والعبادة",
        tools: ["صور نعم منزلية", "حقيبة إسعاف لعب", "بطاقات مواقف للمعلمة"],
        steps: [
          "يختار الطفل صورة نعمة ويذكرها.",
          "تسأله المعلمة: من وهبها لنا؟ وكيف نشكره عليها؟",
          "في موقف المرض يختار سببًا مشروعًا: دواء أو طبيب، ثم يقرر أن الشفاء من الله.",
          "يضع الصورة في لوحة «نعم أنعم الله بها علينا».",
        ],
        safeguard:
          "لا تُعامل أسماء الله كبطاقات لعب أو مطابقة أرضية، ولا يوهم النشاط أن الطبيب أو الدواء يشفيان استقلالًا.",
      },
    },
    {
      test: /اللقاء الأول.*الحركات الثلاثة/,
      subject: "lisani",
      vocabulary: ["الحركة", "الفتحة", "الكسرة", "الضمة", "صوت قصير", "الحرف المتحرك"],
      preparation:
        "تعرض المعلمة حرفًا واحدًا بلا حركة، ثم تضع عليه الحركات تباعًا وينصت الأطفال إلى تغيّر صوته.",
      stimulus:
        "كيف تغيّر صوت الحرف مع أن شكل الحرف نفسه لم يتغيّر؟",
      learning: ["التمييز السمعي", "التعلّم متعدد الحواس", "المحاكاة الصوتية", "التجريب اللغوي"],
      thinking: ["المقارنة", "تمييز الأنماط", "الربط بين الرمز والصوت", "التعميم"],
      methods: ["النمذجة الصوتية", "التكرار المتباعد", "المناولة الحسية", "الممارسة الفردية"],
      activity: {
        name: "بيت الحركات",
        corner: "read",
        meaning:
          "الحركة تغيّر صوت الحرف، وإتقان العربية يعين الطفل على قراءة كلام الله قراءة صحيحة.",
        strategy: "التعلّم متعدد الحواس والفرز السمعي",
        tools: ["بيت الحركات", "بطاقات حروف", "حركات منفصلة", "صلصال"],
        steps: [
          "يسمع الطفل الحرف بالحركات الثلاث.",
          "يختار الحركة التي سمعها ويضعها في موضعها الصحيح.",
          "يشكّل الحركة بالصلصال ثم ينطق الحرف.",
          "يفرز ثلاثة أحرف في بيوت الفتحة والكسرة والضمة.",
        ],
        safeguard:
          "تُستخدم كلمات سليمة المعنى، ولا توضع آيات القرآن أو ألفاظ الجلالة على مواد قابلة للامتهان.",
      },
    },
    {
      test: /كتابي المنير ٢/,
      subject: "kitabi",
      vocabulary: ["اليتيم", "المسكين", "تَحاضّون", "التراث", "حبًّا جمًّا", "الإحسان", "الشكر"],
      preparation:
        "تعرض المعلمة صورتين لمائدة: إحداهما يشارك أصحابها الطعام، والأخرى فيها إسراف ومنع؛ ثم تسأل عن الفرق.",
      stimulus:
        "كيف يظهر شكر نعمة الطعام والمال في معاملتنا للضعيف والمحتاج؟",
      learning: ["الربط بين الآية والسلوك", "التعلّم الخدمي المصغّر", "لعب الدور", "اتخاذ القرار"],
      thinking: ["المقارنة", "تقويم السلوك", "الربط بين السبب والأثر", "اختيار فعل الإحسان"],
      methods: ["التلاوة الموجّهة", "قصة موقفية", "الحوار", "التطبيق العملي"],
      activity: {
        name: "سلة الإحسان",
        corner: "shop",
        meaning:
          "من شكر نعم الله الإحسان إلى المحتاج وإكرام الضعيف وعدم الإسراف أو البخل.",
        strategy: "التعلّم بالموقف ولعب الدور التعاوني",
        tools: ["أطعمة لعب", "سلال", "بطاقات: حاجة / إسراف / مشاركة", "أكياس ورقية"],
        steps: [
          "يختار الطفل من الدكان حاجات مناسبة لسلة الإحسان.",
          "يميز بين الحاجة والكثرة التي لا فائدة منها.",
          "يقدّم السلة بعبارة لطيفة دون منّ أو تفاخر.",
          "تربط المعلمة الفعل بمعنى الآيات وبشكر الله على النعمة.",
        ],
        safeguard:
          "لا تعرض صورة المحتاج بصورة جارحة، ولا يُمثَّل نص القرآن نفسه؛ إنما يطبَّق المعنى السلوكي المستفاد منه.",
      },
    },
    {
      test: /علّمني ربي ٢.*الشمس/,
      subject: "allamni",
      vocabulary: ["الشمس", "آية", "التسخير", "سراجًا وهاجًا", "الضياء", "الحرارة", "التفكّر"],
      preparation:
        "تخرج المعلمة مع الأطفال إلى موضع آمن أو تقف بهم قرب نافذة؛ يلاحظون أثر ضوء الشمس ودفئها دون النظر المباشر إليها.",
      stimulus:
        "هذه الشمس العظيمة تجري بنظام لا نملكه؛ فمن خلقها وسخّرها وجعل فيها هذه المنافع؟",
      learning: ["الملاحظة المتأملة", "محطات الاستكشاف", "التعلّم بالصور الواقعية", "الحوار الإيماني"],
      thinking: ["الملاحظة", "الاستدلال", "ربط المنفعة بالمنعم", "التمييز بين الخالق والمخلوق"],
      methods: ["المشاهدة الآمنة", "الصور العلمية الواقعية", "السؤال المتدرّج", "التلخيص اللفظي"],
      activity: {
        name: "محطات التفكّر في الشمس",
        corner: "discover",
        meaning:
          "الشمس آية عظيمة من آيات الله ومخلوق عظيم مسخّر بأمره؛ ومنافعها نعم يهبها الله لعباده.",
        strategy: "محطات ملاحظة واستدلال قائمة على الصور والآثار الحقيقية",
        tools: ["صور حقيقية عالية الجودة للشمس", "بطاقات منافع", "لوحة «آية مسخّرة»", "قبعات للانتقال الخارجي"],
        steps: [
          "يلاحظ الطفل أثر الضوء والدفء في موضع آمن دون النظر إلى قرص الشمس.",
          "يتفحص صورة حقيقية ويصف ما يراه.",
          "يصل بطاقة منفعة بجملة: «أنعم الله علينا بـ…».",
          "يختار جملة ختامية: «سبحان الله» أو «الحمد لله» ويذكر سببها.",
        ],
        safeguard:
          "يُمنع تمثيل الشمس بمصباح أو كشاف أو كرة صغيرة، أو جعل تجربة الضوء والظل بديلًا عن التفكّر في الآية العظيمة نفسها.",
      },
    },
    {
      test: /اللقاء الثاني.*الفتحة/,
      subject: "lisani",
      vocabulary: ["الفتحة", "مفتوح", "صوت الفتحة", "المقطع", "التهجئة", "الكلمة"],
      preparation:
        "تفتح المعلمة كفها قليلًا عند نطق صوت الفتحة، ثم تنطق حرفين أحدهما مفتوح والآخر مكسور ليختار الأطفال الصوت المستهدف.",
      stimulus:
        "أين نضع الفتحة؟ وكيف أعرفها من صوت الحرف قبل أن أراها؟",
      learning: ["الوعي الصوتي", "البناء بالمكعبات", "المحاكاة", "الممارسة المتدرجة"],
      thinking: ["التمييز السمعي", "التحليل إلى مقاطع", "التركيب", "اكتشاف الخطأ وتصحيحه"],
      methods: ["النمذجة", "الترديد الفردي والجماعي", "المناولة", "التغذية الراجعة الفورية"],
      activity: {
        name: "أركّب كلمات بالفتحة",
        corner: "build",
        meaning:
          "الفتحة تكون فوق الحرف ولها صوت قصير، والانتباه إليها يعين على القراءة العربية الصحيحة.",
        strategy: "التعلّم البنائي بالمكعبات والتحليل الصوتي",
        tools: ["مكعبات حروف مفتوحة", "بطاقات صور", "بطاقات فتحة", "لوح تركيب"],
        steps: [
          "يسمي الطفل الصورة ويسمع الكلمة من المعلمة.",
          "يختار الحروف اللازمة ويبني الكلمة.",
          "يضع الفتحة فوق كل حرف مستهدف.",
          "يقرأ الكلمة ببطء ثم قراءة متصلة ويصححها بمعونة المعلمة.",
        ],
        safeguard:
          "تُختار كلمات مباحة واضحة، ولا تستخدم ألفاظ شرعية مكرّمة في مكعبات توضع على الأرض.",
      },
    },
    {
      test: /مهاراتي.*10.*12/,
      subject: "maharati",
      vocabulary: ["عشرة", "أحد عشر", "اثنا عشر", "العدد", "المعدود", "الكمية", "يزيد واحدًا"],
      preparation:
        "تعرض المعلمة سلة فيها عشرة مكعبات، ثم تضيف مكعبًا فآخر؛ ويعد الأطفال مع تثبيت المطابقة واحدًا لواحد.",
      stimulus:
        "كيف نتأكد أن الكمية عشرة أو أحد عشر أو اثنا عشر من غير تخمين؟",
      learning: ["التعلّم بالمحسوس", "الاكتشاف الموجّه", "المطابقة", "البناء والعد"],
      thinking: ["العد المنظم", "المقارنة", "التسلسل", "حل المشكلة", "التحقق"],
      methods: ["العرض العملي", "المناولة", "الممارسة الفردية", "التغذية الراجعة"],
      activity: {
        name: "أبني العدد وأزيد واحدًا",
        corner: "build",
        meaning:
          "العدد يدل على كمية محددة؛ والعد الصحيح يحتاج ترتيبًا وانتباهًا، وقد وهبنا الله العقل لنتعلم ونحسن العمل.",
        strategy: "التعلّم بالمحسوس والاكتشاف الموجّه",
        tools: ["مكعبات بناء", "بطاقات 10 و11 و12", "أطباق عد", "معدودات آمنة"],
        steps: [
          "يبني الطفل صفًا من عشرة مكعبات ويطابقه ببطاقة 10.",
          "يضيف واحدًا ويسمي العدد الجديد، ثم يكرر حتى 12.",
          "يطابق كل بطاقة بكمية مستقلة.",
          "يعيد العد للتحقق ويشرح كيف عرف العدد.",
        ],
        safeguard:
          "لا يُنسب النجاح لقدرة الطفل استقلالًا؛ تشجعه المعلمة بقول: «وفّقك الله، وأحسنت استعمال ما وهبك من عقل».",
      },
    },
    {
      test: /كتابي المنير ٣/,
      subject: "kitabi",
      vocabulary: ["دُكَّت", "صفًّا صفًّا", "يومئذ", "يتذكّر", "الندم", "قدّمت لحياتي", "اليوم الآخر"],
      preparation:
        "تعرض المعلمة بطاقة سلوك يحتاج إصلاحًا وبطاقة ساعة؛ وتسأل: متى أصلح الخطأ: الآن أم بعد أن يفوت الوقت؟",
      stimulus:
        "ما العمل الذي أستطيع أن أقدمه اليوم لحياتي الحقيقية عند الله؟",
      learning: ["استشراف العاقبة", "حل الموقف", "الربط بين الآية والعمل", "الاختيار المسؤول"],
      thinking: ["التوقع", "السبب والنتيجة", "اتخاذ القرار", "المراجعة الذاتية"],
      methods: ["التلاوة المعظِّمة", "القصة الهادئة", "الأسئلة التأملية", "الموقف التطبيقي"],
      activity: {
        name: "لا أؤخر الإصلاح",
        corner: "play",
        meaning:
          "الدنيا وقت العمل والتوبة، والمؤمن يبادر إلى إصلاح خطئه قبل أن يأتي يوم لا ينفع فيه الندم.",
        strategy: "حل المواقف واتخاذ القرار",
        tools: ["بطاقات مواقف", "سهم: الآن / أؤجل", "لوحة خطوات الإصلاح"],
        steps: [
          "تقرأ المعلمة موقف خطأ بسيطًا.",
          "يختار الطفل المبادرة الآن بدل التأجيل.",
          "يرتب خطوات الإصلاح: أتوقف، أستغفر الله، أصلح الأثر، أعتذر عند الحاجة.",
          "يذكر عملًا صالحًا يقدمه اليوم راجيًا ثواب الله.",
        ],
        safeguard:
          "يُشرح اليوم الآخر بوقار وطمأنينة تناسب العمر، دون مشاهد تمثيلية مخيفة أو تجسيد لأهواله.",
      },
    },
    {
      test: /علّمني ربي ٣/,
      subject: "allamni",
      vocabulary: ["معاشًا", "نشورًا", "العمل الصالح", "طلب العلم", "الرزق", "أطراف النهار", "الطاعة"],
      preparation:
        "يرتب الأطفال ثلاث صور من روتين الصباح: استيقاظ، ذكر، استعداد للتعلم؛ ثم يذكرون أعمال النهار النافعة.",
      stimulus:
        "كيف أشكر الله على نعمة النهار بالفعل، لا بالكلام وحده؟",
      learning: ["التصنيف الوظيفي", "التخطيط اليومي", "التعلّم بالموقف", "المشاركة"],
      thinking: ["التصنيف", "الأولوية", "التخطيط", "تقويم المنفعة"],
      methods: ["الحوار", "الصور المتسلسلة", "النمذجة", "لعب الدور"],
      activity: {
        name: "نهاري نافع",
        corner: "home",
        meaning:
          "جعل الله النهار معاشًا، ومن شكره أن نملأه بالتعلم والعبادة والعمل النافع.",
        strategy: "التعلّم بالروتين والتصنيف",
        tools: ["بطاقات أعمال النهار", "شريط يومي", "سلتان: نافع / يحتاج تعديلًا"],
        steps: [
          "يسحب الطفل بطاقة عمل.",
          "يصف متى يفعله وكيف يكون نافعًا.",
          "يضعه في موضعه من شريط النهار.",
          "يختار عملًا سيحرص عليه مستعينًا بالله.",
        ],
        safeguard:
          "تُنسب النعمة والتوفيق والرزق إلى الله، وتُعرض الأسباب بوصفها أسبابًا سخّرها الله لا مصادر مستقلة للنتيجة.",
      },
    },
    {
      test: /اللقاء الثالث.*الكسرة/,
      subject: "lisani",
      vocabulary: ["الكسرة", "مكسور", "تحت الحرف", "المقطع", "التهجئة", "التمييز السمعي"],
      preparation:
        "تنطق المعلمة صوتين قصيرين، أحدهما بالكسرة، ويشير الطفل إلى بطاقة الكسرة حين يسمع صوتها.",
      stimulus:
        "لماذا جاءت الكسرة تحت الحرف؟ وكيف يختلف صوتها عن الفتحة؟",
      learning: ["التمييز السمعي", "البحث الموجّه", "التركيب", "التصحيح الذاتي"],
      thinking: ["المقارنة", "البحث عن النمط", "التحليل والتركيب", "اكتشاف الخطأ"],
      methods: ["النمذجة الصوتية", "التكرار", "البطاقات", "الممارسة الفردية"],
      activity: {
        name: "أبحث عن الكسرة وأبني كلمة",
        corner: "read",
        meaning:
          "الكسرة توضع تحت الحرف ولها صوت قصير مميز، وضبط الحركة من أمانة القراءة.",
        strategy: "البحث البصري والتمييز السمعي",
        tools: ["بطاقات حروف", "عدسات لعب", "بطاقات كسرة", "مكعبات كلمة «عَمِلَ»"],
        steps: [
          "يستمع الطفل إلى كلمة تنطقها المعلمة.",
          "يبحث عن الحرف المكسور في البطاقة.",
          "يضع الكسرة تحته ثم يعيد النطق.",
          "يبني كلمة قصيرة ويقرأها مع التحقق من موضع الكسرة.",
        ],
        safeguard:
          "تُحفظ الكلمات الشرعية المكرّمة من الامتهان، وتكون مواد البحث على طاولة مرتفعة.",
      },
    },
    {
      test: /قال رسولي.*ما أصبح بي من نعمة/,
      subject: "rasuli",
      vocabulary: ["أصبح", "نعمة", "منك وحدك", "لا شريك لك", "الحمد", "الشكر", "ذكر الصباح"],
      preparation:
        "تكشف المعلمة صور ثلاث نعم من صباح الطفل، وتطلب منه تسميتها قبل سماع الذكر.",
      stimulus:
        "إذا رأيت نعمة في صباحي، فلمن أنسبها؟ وكيف أشكر الله عليها؟",
      learning: ["الاقتداء", "الترديد المتدرّج", "ربط الذكر بالموقف", "الاسترجاع المتباعد"],
      thinking: ["الربط", "نسبة النعمة إلى المنعم", "التطبيق", "استدعاء النص في موضعه"],
      methods: ["النمذجة النبوية", "الاستماع والترديد", "السؤال والجواب", "التطبيق اليومي"],
      activity: {
        name: "أبدأ يومي بالذكر",
        corner: "read",
        meaning:
          "كل نعمة أصبحت بالعبد فمن الله وحده؛ فيحمده ويشكره بقلبه ولسانه وعمله.",
        strategy: "التعلّم بالموقف والترديد المتدرّج",
        tools: ["بطاقة الحديث للمعلمة", "صور نعم", "شريط ترتيب بصري بلا تقطيع للنص"],
        steps: [
          "تعرض المعلمة نعمة ويسميها الطفل.",
          "تقرأ الذكر كاملًا من بطاقته المكرّمة.",
          "يردد الأطفال مقاطع قصيرة ثم الذكر كاملًا.",
          "يختار الطفل فعل شكر يناسب نعمة واحدة.",
        ],
        safeguard:
          "لا يجزّأ نص الحديث إلى بطاقات أرضية ولا يُحوّل إلى سباق؛ وتُنسب النعم كلها إلى الله وحده.",
      },
    },
    {
      test: /كتابي المنير ٤/,
      subject: "kitabi",
      vocabulary: ["النفس المطمئنة", "ارجعي", "راضية", "مرضية", "عبادي", "جنتي", "الطمأنينة"],
      preparation:
        "تعرض المعلمة موقفين: طفل يهدأ ويذكر الله ويطيع، وطفل يسترسل في السلوك المؤذي؛ ثم تسأل عن طريق الطمأنينة.",
      stimulus:
        "بماذا يطمئن القلب طمأنينة حقيقية ترضي الله؟",
      learning: ["التأمل في المعنى", "المقارنة السلوكية", "الاختيار", "المراقبة الذاتية"],
      thinking: ["المقارنة", "الاستنباط", "تقويم السلوك", "التعبير عن السبب"],
      methods: ["التلاوة الهادئة", "الحوار الوجداني", "النمذجة", "التطبيق الموقفي"],
      activity: {
        name: "طريق طمأنينة القلب",
        corner: "play",
        meaning:
          "القلب يطمئن بالإيمان بربه وذكره وطاعته، ويدخل المؤمن الجنة برحمة الله.",
        strategy: "التعلّم بالموقف والاختيار المبرر",
        tools: ["بطاقات سلوك", "مسار هادئ", "بطاقة تذكير: ذكر / طاعة / استغفار"],
        steps: [
          "يختار الطفل بطاقة موقف.",
          "يحدد السلوك الذي يقربه من الطمأنينة.",
          "يمر في المسار ويطبق استجابة هادئة مناسبة.",
          "يشرح بكلمات بسيطة: «أطمئن حين أذكر الله وأطيعه».",
        ],
        safeguard:
          "لا يُوهم الطفل أن العمل وحده يوجب الجنة؛ بل نعمل صالحًا ونرجو رحمة الله.",
      },
    },
    {
      test: /علّمني ربي ٤.*القمر/,
      subject: "allamni",
      vocabulary: ["القمر", "المنازل", "الهلال", "البدر", "التقدير", "الشهر القمري", "التسخير"],
      preparation:
        "تعرض المعلمة صورتين حقيقيتين للقمر: هلالًا وبدرًا، ويصف الأطفال ما ثبت وما تغير.",
      stimulus:
        "لماذا نرى القمر بأشكال متغيرة؟ ومن الذي قدّره منازل بهذا النظام؟",
      learning: ["الملاحظة العلمية الموجّهة", "الترتيب", "السجل البصري", "الربط بالآية"],
      thinking: ["المقارنة", "التسلسل", "اكتشاف النمط", "الاستدلال"],
      methods: ["الصور الواقعية", "الحوار", "النمذجة بالتسلسل المصور", "التسجيل"],
      activity: {
        name: "سجل منازل القمر",
        corner: "discover",
        meaning:
          "القمر آية عظيمة خلقها الله وقدّر لها منازل، وبها ينتفع الناس في معرفة الشهور والأوقات.",
        strategy: "الملاحظة والترتيب وبناء السجل",
        tools: ["صور حقيقية لمنازل القمر", "سجل متابعة", "تقويم قمري", "شريط ترتيب"],
        steps: [
          "يقارن الطفل بين صورتين حقيقيتين للقمر.",
          "يرتب مجموعة مبسطة من صور المنازل.",
          "يثبت صورة اليوم في سجل القمر.",
          "يقول: «سبحان الله الذي قدّر القمر منازل».",
        ],
        safeguard:
          "لا يُشخّص القمر ولا يُجعل مصدرًا مستقلًا للتأثير، ويُذكر أنه مخلوق مسخّر لا يملك نفعًا ولا ضرًا.",
      },
    },
    {
      test: /الغفور.*العزيز/,
      subject: "uhibbuka",
      vocabulary: ["الغفور", "العزيز", "المغفرة", "العزة", "الطاعة", "الاستغفار", "الكِبر"],
      preparation:
        "تقدم المعلمة موقف خطأ يحتاج استغفارًا، وموقف قوة استعملت في نفع الآخرين؛ ثم تسأل عن الاسم المناسب للمعنى.",
      stimulus:
        "إلى من نلجأ إذا أخطأنا؟ ومنه سبحانه العزة الحقيقية؟ وكيف تختلف العزة عن الكبر؟",
      learning: ["ربط الاسم بالعبادة", "التعلّم بالمواقف", "المقارنة", "الاختيار الأخلاقي"],
      thinking: ["التمييز", "الربط", "تقويم السلوك", "نقل المعنى إلى موقف جديد"],
      methods: ["القصة", "الحوار العقدي", "النمذجة", "بطاقات المواقف"],
      activity: {
        name: "عزتي بطاعة الله وقدرتي للخير",
        corner: "build",
        meaning:
          "الله هو الغفور العزيز؛ نطلب مغفرته، ونطلب العزة منه بالطاعة، ونستعمل ما وهبنا من قدرة في الخير لا في الكبر.",
        strategy: "حل المواقف والبناء التعاوني",
        tools: ["مكعبات بناء", "بطاقات مواقف", "بطاقة اعتقاد مكرّمة لاسم الله العزيز"],
        steps: [
          "تبني المجموعة عملًا يحتاج تعاونًا.",
          "تعرض المعلمة موقف قوة أو خطأ.",
          "يختار الطفل استجابة: أستغفر / أطيع / أستعمل قدرتي في الخير.",
          "يذكر أن التوفيق والقوة والعزة من الله.",
        ],
        safeguard:
          "تُحفظ بطاقات أسماء الله من الامتهان، ولا تُستخدم قطعًا للّعب أو توضع على الأرض.",
      },
    },
    {
      test: /اللقاء الرابع.*الضمة/,
      subject: "lisani",
      vocabulary: ["الضمة", "مضموم", "فوق الحرف", "صوت الضمة", "المقطع", "التهجئة"],
      preparation:
        "تضم المعلمة شفتيها عند نطق صوت الضمة، ثم يكرر الأطفال الصوت أمام مرآة آمنة.",
      stimulus:
        "ما الذي يحدث لشفتَيّ عند نطق الضمة؟ وأين نضع رمزها؟",
      learning: ["الملاحظة الحركية الصوتية", "المحاكاة", "التطبيق اليدوي", "التصحيح الذاتي"],
      thinking: ["الملاحظة", "المقارنة", "الربط بين الحركة والصوت", "التحقق"],
      methods: ["النمذجة", "المرآة", "الترديد", "الممارسة الفردية"],
      activity: {
        name: "أضع الضمة في مكانها",
        corner: "sand",
        meaning:
          "الضمة توضع فوق الحرف ولها صوت قصير مميز، والانتباه لها يعين على سلامة القراءة.",
        strategy: "التعلّم الحسي الحركي والتمييز الصوتي",
        tools: ["صينية رمل نظيف", "بطاقات حروف", "نماذج ضمة", "فرشاة تسوية"],
        steps: [
          "يسمع الطفل الحرف المضموم.",
          "يرسم الحرف في الرمل.",
          "يضيف الضمة في موضعها فوقه.",
          "ينطق الحرف ويتحقق بمقارنته بالبطاقة.",
        ],
        safeguard:
          "لا تُكتب في الرمل آيات أو أسماء مكرّمة، وتقتصر المادة على الحروف والكلمات التعليمية المباحة.",
      },
    },
    {
      test: /كتابي المنير ٥/,
      subject: "kitabi",
      vocabulary: ["سورة الفجر", "الابتلاء", "الإحسان", "اليوم الآخر", "النفس المطمئنة", "التسميع"],
      preparation:
        "تعرض المعلمة أربعة رموز للمعاني الكبرى في السورة، ويسترجع الأطفال ما يتذكرونه قبل فتح المصحف.",
      stimulus:
        "كيف تجمع سورة الفجر بين موقفنا من النعمة، والإحسان، والاستعداد لليوم الآخر، والطمأنينة؟",
      learning: ["الاسترجاع", "الخريطة المفاهيمية", "التسميع المتدرّج", "الربط"],
      thinking: ["التسلسل", "التلخيص", "الربط بين المعاني", "التصحيح الذاتي"],
      methods: ["التلاوة", "التسميع", "الخريطة البصرية", "الأسئلة الجامعة"],
      activity: {
        name: "خريطة سورة الفجر",
        corner: "read",
        meaning:
          "تهدي سورة الفجر المؤمن إلى الشكر والإحسان والعمل للآخرة حتى يلقى الله بقلب مطمئن راجيًا رحمته.",
        strategy: "الاسترجاع وبناء الخريطة المفاهيمية",
        tools: ["مصحف على حامل", "بطاقات عناوين المعاني", "لوحة مسار السورة", "مؤشر قراءة"],
        steps: [
          "تراجع المجموعة السورة من المصحف باحترام.",
          "ترتب عناوين المعاني الكبرى دون تقطيع نص الآيات.",
          "يربط كل طفل معنى بسلوك تعلمه.",
          "يسمع مقدارًا مناسبًا لقدراته وتقدم المعلمة تغذية راجعة هادئة.",
        ],
        safeguard:
          "لا توضع الآيات في لعبة ترتيب أرضية؛ الترتيب لعناوين المعاني، أما النص القرآني فيبقى في المصحف أو بطاقة مكرّمة.",
      },
    },
    {
      test: /علّمني ربي ٥/,
      subject: "allamni",
      vocabulary: ["السكن", "السكينة", "قيام الليل", "الذكر", "الدعاء", "النوم", "النية", "أعمال الليل"],
      preparation:
        "يرتب الأطفال صور روتين المساء كما يقع في بيت مسلم: ذكر، صلاة، هدوء، استعداد للنوم.",
      stimulus:
        "جعل الله الليل سكنًا؛ فما الأعمال التي يحبها الله ويمكن أن نعمر بها ليلنا؟",
      learning: ["التسلسل", "التخطيط", "التعلّم بالروتين", "الاختيار"],
      thinking: ["الترتيب", "التصنيف", "التخطيط", "ربط العمل بالوقت"],
      methods: ["الحوار", "الصور المتسلسلة", "النمذجة", "لعب الدور"],
      activity: {
        name: "صفحات الطاعة في الليل",
        corner: "home",
        meaning:
          "جعل الله الليل سكنًا، وفيه راحة وعبادات وأعمال يحبها؛ ومن شكره أن نلتزم الذكر والطاعة والآداب.",
        strategy: "التعلّم بالروتين والتسلسل المصور",
        tools: ["بطاقات روتين الليل", "كتاب قماشي", "وسادة وغطاء لعب", "بطاقات ذكر للمعلمة"],
        steps: [
          "يختار الطفل بطاقة عمل ليلي.",
          "يضعها في ترتيب مناسب ضمن روتين البيت.",
          "يمثل الفعل بأدوات الركن تمثيلًا منضبطًا.",
          "يذكر كيف يستعين بالله على العمل ويحمده على نعمة الليل.",
        ],
        safeguard:
          "لا يُختزل الليل في النوم فقط، ولا تُنسب السكينة للأدوات أو الظلام؛ السكينة نعمة من الله.",
      },
    },
    {
      test: /أدب واقتداء.*آداب المساء/,
      subject: "adab",
      vocabulary: ["المساء", "كفوا صبيانكم", "أغلقوا الأبواب", "اذكروا اسم الله", "أوكوا السقاء", "غطوا الإناء", "أطفئوا المصابيح"],
      preparation:
        "تعرض المعلمة صورة بيت عند المساء وتسأل: ما الأعمال التي علّمنا النبي ﷺ أن نفعلها في هذا الوقت؟",
      stimulus:
        "كيف نقتدي بالنبي ﷺ عند دخول المساء، ومن الذي يحفظنا حقيقة؟",
      learning: ["الاقتداء العملي", "التسلسل", "لعب الدور", "المراجعة بالموقف"],
      thinking: ["التذكر", "الترتيب", "تطبيق السنة", "التمييز بين السبب والحافظ"],
      methods: ["النمذجة", "الترديد", "التطبيق العملي", "التغذية الراجعة"],
      activity: {
        name: "أذكر الله وأغلق وأغطي",
        corner: "home",
        meaning:
          "نقتدي بالنبي ﷺ في آداب المساء، ونأخذ بالأسباب المشروعة، والحفظ من الله وحده.",
        strategy: "التعلّم بالنمذجة والتسلسل العملي",
        tools: ["باب كرتوني", "إناء بغطاء", "مفتاح مصباح كهربائي آمن", "بطاقة الحديث للمعلمة"],
        steps: [
          "تقرأ المعلمة الأدب من الحديث وتعرض نموذجه.",
          "يقول الطفل «بسم الله» ثم يغلق الباب التمثيلي.",
          "يغطي الإناء ويطفئ المصباح الكهربائي الآمن.",
          "يرتب الأعمال ويقرر: «نفعل السنة، والله هو الحافظ».",
        ],
        safeguard:
          "لا تستخدم نار أو شموع، ولا يُقال إن إغلاق الباب أو تغطية الإناء يحفظان استقلالًا؛ الحفظ من الله وهذه أسباب أمر بها الشرع.",
      },
    },
  ];

  function normalize(value) {
    return String(value || "")
      .replace(/&amp;lt;br&amp;gt;|&lt;br&gt;|<br\s*\/?>/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function findLesson(title) {
    var value = normalize(title);
    for (var i = 0; i < LESSONS.length; i += 1) {
      if (LESSONS[i].test.test(value)) return LESSONS[i];
    }
    return null;
  }

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function list(items) {
    return (
      "<ul>" +
      (items || [])
        .map(function (item) {
          return "<li>" + esc(item) + "</li>";
        })
        .join("") +
      "</ul>"
    );
  }

  function icon(path, alt) {
    return (
      '<img class="gq-field-icon" src="' +
      esc(path) +
      '" alt="' +
      esc(alt || "") +
      '">'
    );
  }

  function addStyle(doc, subject) {
    if (doc.getElementById("gq-lesson-blueprint-v10-style")) return;
    var style = doc.createElement("style");
    style.id = "gq-lesson-blueprint-v10-style";
    style.textContent =
      ":root{--gq-bp-color:" +
      subject.color +
      ";--gq-bp-soft:" +
      subject.soft +
      "}" +
      "body.gq-premium-lesson .tabs .gq-blueprint-tab{display:inline-flex!important;align-items:center!important;gap:7px!important}" +
      "body.gq-premium-lesson .gq-blueprint-tab img{width:24px!important;height:24px!important;object-fit:contain!important;border:0!important;box-shadow:none!important;background:transparent!important}" +
      "body.gq-premium-lesson .gq-blueprint-panel{padding:18px!important;background:#fff!important}" +
      "body.gq-premium-lesson .gq-blueprint-panel .gq-plan-card{margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;overflow:visible!important;background:#fff!important}" +
      "body.gq-premium-lesson .gq-blueprint-panel .gq-plan-head{display:flex!important;align-items:center!important;gap:12px!important;padding:4px 0 14px!important;background:#fff!important;border:0!important;border-bottom:2px solid var(--gq-bp-color)!important}" +
      "body.gq-premium-lesson .gq-blueprint-panel .gq-plan-icon{display:none!important}" +
      "body.gq-premium-lesson .gq-blueprint-panel .gq-plan-head::before{content:'';width:44px!important;height:44px!important;flex:0 0 44px!important;background:url('" +
      subject.icon +
      "') center/contain no-repeat!important}" +
      "body.gq-premium-lesson .gq-blueprint-panel .gq-plan-head h3{margin:0!important;color:var(--gq-bp-color)!important;font-size:23px!important;line-height:1.45!important}" +
      "body.gq-premium-lesson .gq-blueprint-panel .gq-plan-head p{margin:2px 0 0!important;color:#6C665B!important;line-height:1.8!important}" +
      "body.gq-premium-lesson .gq-blueprint-panel .gq-plan-central{margin:14px 0 0!important;padding:13px 15px!important;background:var(--gq-bp-soft)!important;border:0!important;border-right:5px solid var(--gq-bp-color)!important;border-radius:10px!important;color:#18333A!important;line-height:1.95!important}" +
      "body.gq-premium-lesson .gq-blueprint-panel .gq-plan-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:0 22px!important;padding:8px 0 0!important;background:#fff!important}" +
      "body.gq-premium-lesson .gq-blueprint-panel .gq-plan-section{min-width:0!important;margin:0!important;padding:13px 0!important;background:#fff!important;border:0!important;border-bottom:1px solid #E9DDCA!important;border-radius:0!important;box-shadow:none!important}" +
      "body.gq-premium-lesson .gq-blueprint-panel .gq-plan-section.wide{grid-column:1/-1!important}" +
      "body.gq-premium-lesson .gq-blueprint-panel .gq-plan-section>b{display:flex!important;align-items:center!important;gap:8px!important;margin:0 0 7px!important;color:var(--gq-bp-color)!important;font-size:13px!important;line-height:1.6!important}" +
      "body.gq-premium-lesson .gq-blueprint-panel .gq-plan-section ul{margin:0!important;padding-inline-start:20px!important;line-height:1.9!important;color:#30484C!important}" +
      "body.gq-premium-lesson .gq-blueprint-panel .gq-plan-section li{margin:2px 0!important}" +
      "body.gq-premium-lesson .gq-blueprint-panel .gq-field-icon{width:25px!important;height:25px!important;flex:0 0 25px!important;object-fit:contain!important;margin:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}" +
      "body.gq-premium-lesson .gq-blueprint-panel .gq-plan-note{margin:14px 0 0!important;padding:11px 14px!important;background:#FFF8E8!important;border:1px solid #EBD8AC!important;border-right:5px solid #C79A3B!important;border-radius:9px!important;color:#6B4A10!important;line-height:1.9!important}" +
      "body.gq-premium-lesson .gq-activity-blueprint{grid-column:1/-1!important;padding:16px 0 4px!important;border-bottom:0!important}" +
      "body.gq-premium-lesson .gq-activity-heading{display:flex!important;align-items:center!important;gap:10px!important;margin:0 0 11px!important}" +
      "body.gq-premium-lesson .gq-activity-heading img{width:42px!important;height:42px!important;object-fit:contain!important;border:0!important;box-shadow:none!important}" +
      "body.gq-premium-lesson .gq-activity-heading strong{display:block!important;color:var(--gq-bp-color)!important;font-size:17px!important}" +
      "body.gq-premium-lesson .gq-activity-heading span{display:block!important;color:#6C665B!important;font-size:11.5px!important}" +
      "body.gq-premium-lesson .gq-activity-summary{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}" +
      "body.gq-premium-lesson .gq-activity-summary>div{padding:10px 12px!important;background:#FFFCF5!important;border:1px solid #E9DDCA!important;border-radius:9px!important;line-height:1.85!important}" +
      "body.gq-premium-lesson .gq-activity-summary b{display:block!important;color:var(--gq-bp-color)!important;margin-bottom:3px!important}" +
      "body.gq-premium-lesson .gq-activity-steps{grid-column:1/-1!important}" +
      "body.gq-premium-lesson .gq-activity-steps ol{margin:4px 0 0!important;padding-inline-start:22px!important;line-height:1.95!important}" +
      "body.gq-premium-lesson .gq-faith-safeguard{grid-column:1/-1!important;background:#F4F8F5!important;border-right:5px solid #2D7A4B!important}" +
      "@media(max-width:760px){body.gq-premium-lesson .gq-blueprint-panel{padding:12px!important}body.gq-premium-lesson .gq-blueprint-panel .gq-plan-grid,body.gq-premium-lesson .gq-activity-summary{grid-template-columns:1fr!important}body.gq-premium-lesson .gq-blueprint-panel .gq-plan-section.wide,body.gq-premium-lesson .gq-activity-blueprint,body.gq-premium-lesson .gq-activity-steps,body.gq-premium-lesson .gq-faith-safeguard{grid-column:1!important}}" +
      "@media print{body.gq-premium-lesson .gq-blueprint-panel{display:block!important}body.gq-premium-lesson .gq-blueprint-panel .gq-plan-section{break-inside:avoid!important}}";
    doc.documentElement.appendChild(style);
  }

  function field(doc, title, items, iconPath, className) {
    var div = doc.createElement("div");
    div.className = "gq-plan-section " + (className || "");
    div.setAttribute("data-gq-required-field", title);
    div.innerHTML =
      "<b>" + icon(iconPath, "") + esc(title) + "</b>" + list(items);
    return div;
  }

  function unique(items) {
    var seen = {};
    return items.filter(function (item) {
      var value = normalize(item);
      if (!value || seen[value]) return false;
      seen[value] = true;
      return true;
    });
  }

  function blockItems(doc, labelPattern) {
    var result = [];
    Array.prototype.slice
      .call(doc.querySelectorAll(".sb-block"))
      .forEach(function (block) {
        var label = block.querySelector(".sb-lbl");
        if (!label || !labelPattern.test(normalize(label.textContent))) return;
        Array.prototype.slice
          .call(
            block.querySelectorAll(
              ".sb-item,.obj-row span:last-child,li,.val-item,.strategy-chip",
            ),
          )
          .forEach(function (item) {
            var text = normalize(item.textContent);
            if (text && !/^[٠-٩0-9]+$/.test(text)) result.push(text);
          });
      });
    return unique(result).slice(0, 8);
  }

  function createPlanFromExisting(doc, lesson) {
    var emotional = blockItems(doc, /الأهداف الوجدانية/);
    var cognitive = blockItems(doc, /الأهداف المعرفية/);
    var skills = blockItems(
      doc,
      /الأهداف (السلوكية|المهارية|الإجرائية)/,
    );
    var means = blockItems(doc, /(المواد المساعدة|الأدوات|الوسائل)/);
    var strategies = blockItems(doc, /الاستراتيجيات/);
    var plan = doc.createElement("section");
    plan.className = "gq-plan-card";
    plan.dir = "rtl";
    plan.innerHTML =
      '<div class="gq-plan-head"><div><h3>بطاقة الدرس وخطة التنفيذ</h3>' +
      "<p>مرجع واحد يجمع عناصر التخطيط والتنفيذ والتقويم والنشاط المصاحب.</p></div></div>" +
      '<div class="gq-plan-central" data-gq-required-field="المعنى المركزي">' +
      "<b>المعنى المركزي</b><span>" +
      esc(lesson.activity.meaning) +
      "</span></div>" +
      '<div class="gq-plan-grid"></div>';
    var grid = plan.querySelector(".gq-plan-grid");
    grid.appendChild(
      field(
        doc,
        "الأهداف الوجدانية",
        emotional.length
          ? emotional
          : ["أن يعظّم الطفل الله ويشكره عند تعلّم معنى الدرس."],
        ICONS.objectives,
      ),
    );
    grid.appendChild(
      field(
        doc,
        "الأهداف المعرفية",
        cognitive.length
          ? cognitive
          : ["أن يعبّر الطفل عن المعنى المركزي بلغة مناسبة لعمره."],
        ICONS.objectives,
      ),
    );
    grid.appendChild(
      field(
        doc,
        "الأهداف المهارية والسلوكية",
        skills.length
          ? skills
          : ["أن يطبّق الطفل المعنى في موقف حياتي صحيح."],
        ICONS.objectives,
      ),
    );
    grid.appendChild(
      field(
        doc,
        "القيم والمفاهيم",
        ["تعظيم الله", "الشكر", "التفكّر", "العمل بالمعنى المتعلَّم"],
        ICONS.values,
      ),
    );
    grid.appendChild(
      field(
        doc,
        "استراتيجيات التعلّم",
        strategies.length ? strategies : lesson.learning,
        ICONS.learning,
      ),
    );
    grid.appendChild(
      field(
        doc,
        "الوسائل التعليمية",
        unique(means.concat(lesson.activity.tools)),
        ICONS.means,
      ),
    );
    grid.appendChild(
      field(
        doc,
        "التقويم أثناء اللقاء",
        [
          "يعبّر الطفل عن المعنى المركزي بعبارة صحيحة.",
          "يوظّف مفردتين من مفردات الدرس في سياقهما.",
          "ينفّذ خطوة من النشاط ويشرح صلتها بالمعنى المتعلَّم.",
        ],
        ICONS.assessment,
      ),
    );
    return plan;
  }

  function decorateExistingSections(doc, plan) {
    var sections = Array.prototype.slice.call(
      plan.querySelectorAll(".gq-plan-section"),
    );
    sections.forEach(function (section) {
      var heading = section.querySelector("b");
      if (!heading || heading.querySelector(".gq-field-icon")) return;
      var label = normalize(heading.textContent);
      var path = ICONS.objectives;
      if (/الأهداف/.test(label)) path = ICONS.objectives;
      else if (/القيم|المفاهيم/.test(label)) path = ICONS.values;
      else if (/استراتيج/.test(label)) {
        path = ICONS.learning;
        heading.childNodes.forEach(function (node) {
          if (node.nodeType === 3) {
            node.nodeValue = node.nodeValue.replace(
              /استراتيجيات التدريس/g,
              "استراتيجيات التعلّم",
            );
          }
        });
      } else if (/وسائل|أدوات/.test(label)) path = ICONS.means;
      else if (/تقويم|تقييم/.test(label)) path = ICONS.assessment;
      heading.insertAdjacentHTML("afterbegin", icon(path || ICONS.objectives, ""));
    });
  }

  function planHasHeading(plan, pattern) {
    return Array.prototype.slice
      .call(plan.querySelectorAll(".gq-plan-section>b"))
      .some(function (heading) {
        return pattern.test(normalize(heading.textContent));
      });
  }

  function activitySection(doc, lesson) {
    var activity = lesson.activity;
    var corner = CORNERS[activity.corner] || CORNERS.play;
    var section = doc.createElement("div");
    section.className = "gq-plan-section wide gq-activity-blueprint";
    section.setAttribute("data-gq-required-field", "النشاط المصاحب");
    section.innerHTML =
      '<div class="gq-activity-heading">' +
      icon(corner.icon, "") +
      "<div><strong>" +
      esc(activity.name) +
      "</strong><span>النشاط المصاحب · " +
      esc(corner.name) +
      "</span></div></div>" +
      '<div class="gq-activity-summary">' +
      "<div><b>المعنى المركزي في النشاط</b>" +
      esc(activity.meaning) +
      "</div>" +
      "<div><b>استراتيجية التعلّم</b>" +
      esc(activity.strategy) +
      "</div>" +
      "<div><b>الأدوات</b>" +
      list(activity.tools) +
      "</div>" +
      '<div class="gq-activity-steps"><b>خطوات التنفيذ</b><ol>' +
      activity.steps
        .map(function (step) {
          return "<li>" + esc(step) + "</li>";
        })
        .join("") +
      "</ol></div>" +
      '<div class="gq-faith-safeguard"><b>ضابط عقدي ومنهجي</b>' +
      esc(activity.safeguard) +
      "</div></div>";
    return section;
  }

  function activateBlueprint(doc, tab, panel) {
    Array.prototype.slice.call(doc.querySelectorAll(".tabs .tab")).forEach(
      function (item) {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
        item.setAttribute("tabindex", "-1");
      },
    );
    Array.prototype.slice.call(doc.querySelectorAll(".panel")).forEach(
      function (item) {
        item.classList.remove("active");
      },
    );
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");
    panel.classList.add("active");
  }

  function enhanceFrame(frame) {
    try {
      var title = frame.getAttribute("title") || "";
      var lesson = findLesson(title);
      if (!lesson) return;
      var doc = frame.contentDocument;
      if (!doc || !doc.body || !doc.documentElement) return;
      if (doc.documentElement.dataset.gqBlueprintV10 === "1") return;
      var tabs = doc.querySelector(".tabs");
      var plan = doc.querySelector(".gq-plan-card");
      if (!tabs) return;
      if (!plan) plan = createPlanFromExisting(doc, lesson);

      doc.documentElement.dataset.gqBlueprintV10 = "1";
      var subject = SUBJECTS[lesson.subject] || SUBJECTS.allamni;
      addStyle(doc, subject);

      var oldWrap = plan.closest(".gq-plan-in-sidebar");
      var panel = doc.createElement("div");
      panel.className = "panel gq-blueprint-panel";
      panel.id = "gq-blueprint-panel";
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-label", "بطاقة الدرس");

      var tab = doc.createElement("button");
      tab.type = "button";
      tab.className = "tab gq-blueprint-tab";
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", "false");
      tab.setAttribute("tabindex", "-1");
      tab.innerHTML = icon(subject.icon, "") + "<span>بطاقة الدرس</span>";
      tabs.insertBefore(tab, tabs.firstChild);
      tabs.insertAdjacentElement("afterend", panel);
      panel.appendChild(plan);
      if (oldWrap && !oldWrap.textContent.trim()) oldWrap.remove();

      var planHead = plan.querySelector(".gq-plan-head h3");
      if (planHead) planHead.textContent = "بطاقة الدرس وخطة التنفيذ";
      var planIntro = plan.querySelector(".gq-plan-head p");
      if (planIntro) {
        planIntro.textContent =
          "مرجع واحد يجمع عناصر التخطيط والتنفيذ والتقويم والنشاط المصاحب.";
      }
      var central = plan.querySelector(".gq-plan-central");
      if (central) {
        central.innerHTML = central.innerHTML.replace(
          /المعلومة المركزية/g,
          "المعنى المركزي",
        );
        central.setAttribute("data-gq-required-field", "المعنى المركزي");
      }

      var grid = plan.querySelector(".gq-plan-grid");
      if (!grid) {
        grid = doc.createElement("div");
        grid.className = "gq-plan-grid";
        plan.appendChild(grid);
      }
      decorateExistingSections(doc, plan);
      grid.appendChild(
        field(doc, "المفردات اللغوية", lesson.vocabulary, ICONS.vocabulary),
      );
      grid.appendChild(
        field(doc, "تهيئة الدرس", [lesson.preparation], ICONS.preparation),
      );
      grid.appendChild(
        field(doc, "المثير", [lesson.stimulus], ICONS.stimulus),
      );
      if (!planHasHeading(plan, /استراتيجيات التعلّم/)) {
        grid.appendChild(
          field(doc, "استراتيجيات التعلّم", lesson.learning, ICONS.learning),
        );
      }
      grid.appendChild(
        field(doc, "مهارات التفكير", lesson.thinking, ICONS.thinking),
      );
      grid.appendChild(
        field(doc, "طرق التدريس", lesson.methods, ICONS.methods),
      );
      grid.appendChild(activitySection(doc, lesson));

      tab.addEventListener("click", function (event) {
        event.preventDefault();
        activateBlueprint(doc, tab, panel);
      });
      Array.prototype.slice
        .call(tabs.querySelectorAll(".tab:not(.gq-blueprint-tab)"))
        .forEach(function (item) {
          item.addEventListener("click", function () {
            panel.classList.remove("active");
            tab.classList.remove("active");
            tab.setAttribute("aria-selected", "false");
            tab.setAttribute("tabindex", "-1");
          });
        });
    } catch {}
  }

  function upgradeProgram() {
    var frame = document.querySelector(
      'iframe[title="برنامج وحدة الليل والنهار التفصيلي"]',
    );
    if (!frame || frame.dataset.gqProgramV10 === "1") return;
    frame.dataset.gqProgramV10 = "1";
    frame.removeAttribute("data-gqsrc");
    frame.removeAttribute("srcdoc");
    frame.setAttribute("src", "program-final-v10.html?v=10.1");
  }

  function apply() {
    upgradeProgram();
    Array.prototype.slice.call(document.querySelectorAll("iframe")).forEach(
      function (frame) {
        enhanceFrame(frame);
        if (!frame.dataset.gqBlueprintLoadV10) {
          frame.dataset.gqBlueprintLoadV10 = "1";
          frame.addEventListener("load", function () {
            window.setTimeout(function () {
              enhanceFrame(frame);
            }, 30);
            window.setTimeout(function () {
              enhanceFrame(frame);
            }, 360);
          });
        }
      },
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
  window.addEventListener("load", function () {
    apply();
    window.setTimeout(apply, 500);
    window.setTimeout(apply, 1400);
  });
  document.addEventListener(
    "click",
    function () {
      window.setTimeout(apply, 80);
      window.setTimeout(apply, 500);
    },
    true,
  );
  try {
    new MutationObserver(function () {
      window.requestAnimationFrame(apply);
    }).observe(document.body, { childList: true, subtree: true });
  } catch {}
})();
