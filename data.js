const categories = [
  { id: "panneaux", name: "Signalisation & Panneaux", icon: "🛑" },
  { id: "croisements", name: "Priorités & Intersections", icon: "🛣️" },
  { id: "vitesse", name: "Vitesses & Distances", icon: "⏱️" },
  { id: "autoroute", name: "Autoroute & Voie rapide", icon: "🛣️" },
  { id: "securite", name: "Sécurité & Éclairage", icon: "🚗" },
  { id: "divers", name: "Règles Générales & Divers", icon: "📘" }
];

const svgTemplates = {
  stop: `<octogon fill="#da3633" stroke="#ffffff" stroke-width="6"/>
        <polygon points="60,20 140,20 180,60 180,140 140,180 60,180 20,140 20,60" fill="#da3633" stroke="#ffffff" stroke-width="6"/>
        <text x="100" y="115" font-size="38" font-weight="bold" fill="#ffffff" text-anchor="middle">STOP</text>`,
  danger: `<polygon points="100,20 180,170 20,170" fill="#ffffff" stroke="#da3633" stroke-width="12"/>
          <text x="100" y="140" font-size="70" font-weight="bold" fill="#000000" text-anchor="middle">!</text>`,
  cedez: `<polygon points="100,180 180,30 20,30" fill="#ffffff" stroke="#da3633" stroke-width="12"/>
         <text x="100" y="105" font-size="20" font-weight="bold" fill="#da3633" text-anchor="middle">CÉDER</text>`,
  speed50: `<circle cx="100" cy="100" r="80" fill="#ffffff" stroke="#da3633" stroke-width="14"/>
            <text x="100" y="120" font-size="55" font-weight="bold" fill="#000000" text-anchor="middle">50</text>`,
  speed130: `<circle cx="100" cy="100" r="80" fill="#ffffff" stroke="#da3633" stroke-width="14"/>
             <text x="100" y="120" font-size="50" font-weight="bold" fill="#000000" text-anchor="middle">130</text>`,
  blueArrow: `<circle cx="100" cy="100" r="80" fill="#0969da" stroke="#ffffff" stroke-width="6"/>
              <path d="M70,100 L130,100 M110,80 L130,100 L110,120" stroke="#ffffff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
};

const detailedTemplates = {
  panneaux: [
    {
      q: "Face à ce panneau STOP, quelle est votre obligation ?",
      t: {
        khmer: "នៅចំពោះមុខផ្លាកសញ្ញា STOP នេះ តើអ្នកមានកាតព្វកិច្ចអ្វី?",
        english: "Facing this STOP sign, what is your obligation?",
        arabic: "أمام علامة التوقف هذه، ما هو واجبك؟",
        spanish: "Frente a esta señal de STOP, ¿cuál es su obligación?"
      },
      opts: [
        {
          fr: "Marquer un arrêt obligatoire et céder le passage",
          t: { khmer: "ត្រូវតែឈប់ជាដាច់ខាត និងផ្តល់អាទិភាព", english: "Come to a complete stop and yield", arabic: "التوقف التام وإعطاء حق الأولوية", spanish: "Detenerse por completo y ceder el paso" }
        },
        {
          fr: "Ralentir sans s'arrêter si la voie est libre",
          t: { khmer: "បន្ថយល្បឿនដោយមិនបាច់ឈប់", english: "Slow down without stopping", arabic: "الإبطاء دون توقف", spanish: "Reducir la velocidad sin detenerse" }
        },
        {
          fr: "S'arrêter uniquement si un véhicule approche",
          t: { khmer: "ឈប់តែនៅពេលមានយានយន្តផ្សេងទៀត", english: "Stop only if a vehicle is approaching", arabic: "التوقف فقط في حالة اقتراب مركبة", spanish: "Detenerse solo si se aproxima un vehículo" }
        },
        {
          fr: "Passer en priorité si vous allez tout droit",
          t: { khmer: "ទៅមុខមុន ប្រសិនបើអ្នកបើកត្រង់", english: "Proceed with priority if going straight", arabic: "المرور بالأولوية إذا كنت تتجه إلى الأمام", spanish: "Pasar con prioridad si va en línea recta" }
        }
      ],
      correct: 0,
      exp: "Le panneau STOP impose un arrêt absolu à la ligne d'arrêt, même si la voie est totalement dégagée.",
      expT: {
        khmer: "ផ្លាកសញ្ញា STOP ទាមទារឱ្យឈប់ស្ងៀមជាដាច់ខាត ទោះបីជាគ្មានយានយន្តផ្សេងក៏ដោយ។",
        english: "The STOP sign requires a complete standstill at the stop line, even if clear.",
        arabic: "تتطلب علامة قف توقف تماماً عند خط التوقف، حتى لو كان الطريق خالياً.",
        spanish: "La señal de STOP exige detenerse por completo en la línea de detención, incluso si está despejada."
      },
      svg: "stop"
    },
    {
      q: "Que signifie un panneau triangulaire bordé de rouge ?",
      t: {
        khmer: "តើផ្លាកសញ្ញារូបត្រីកោណគែមក្រហមមានន័យដូចម្តេច?",
        english: "What does a triangular sign with a red border signify?",
        arabic: "ماذا تعني العلامة المثلثة ذات الإطار الأحمر؟",
        spanish: "¿Qué significa una señal triangular con borde rojo?"
      },
      opts: [
        {
          fr: "Une annonce de danger potentiel",
          t: { khmer: "ការព្រមានអំពីគ្រោះថ្នាក់", english: "A warning of potential danger", arabic: "تحذير من خطر محتمل", spanish: "Una advertencia de peligro potencial" }
        },
        {
          fr: "Une obligation stricte à respecter",
          t: { khmer: "កាតព្វកិច្ចម៉ឺងម៉ាត់", english: "A strict obligation", arabic: "التزام صارم", spanish: "Una obligación estricta" }
        },
        {
          fr: "Une interdiction absolue d'avancer",
          t: { khmer: "ការហាមឃាត់ដាច់ខាតមិនឱ្យទៅមុខ", english: "An absolute prohibition", arabic: "حظر تام للمرور", spanish: "Una prohibición absoluta" }
        },
        {
          fr: "Une indication de fin de zone",
          t: { khmer: "ការបញ្ជាក់អំពីចុងបញ្ចប់នៃតំបន់", english: "An indication of the end of a zone", arabic: "إشارة إلى نهاية المنطقة", spanish: "Una indicación de fin de zona" }
        }
      ],
      correct: 0,
      exp: "Les panneaux de forme triangulaire bordés de rouge sont des panneaux d'avertissement de danger.",
      expT: {
        khmer: "ផ្លាកសញ្ញារូបត្រីកោណដែលមានគែមពណ៌ក្រហម គឺជាផ្លាកសញ្ញាព្រមានអំពីគ្រោះថ្នាក់។",
        english: "Triangular signs with a red border are danger warning signs.",
        arabic: "العلامات المثلثة ذات الإطار الأحمر هي علامات تحذيرية من الخطر.",
        spanish: "Las señales triangulares con borde rojo son señales de advertencia de peligro."
      },
      svg: "danger"
    }
  ],
  croisements: [
    {
      q: "À l'approche d'un panneau 'Céder le Passage', vous devez :",
      t: {
        khmer: "នៅពេលបើកជិតដល់ផ្លាកសញ្ញា 'ផ្តល់អាទិភាព' អ្នកត្រូវ៖",
        english: "When approaching a 'Yield / Give Way' sign, you must:",
        arabic: "عند الاقتراب من علامة 'إعطاء الأولوية'، يجب عليك:",
        spanish: "Al aproximarse a una señal de 'Ceder el Paso', debe:"
      },
      opts: [
        {
          fr: "Laisser passer sans vous arrêter si la voie est libre",
          t: { khmer: "ទុកផ្លូវឱ្យគេទៅមុន ដោយមិនបាច់ឈប់ទេប្រសិនបើផ្លូវទំនេរ", english: "Yield without stopping if clear", arabic: "إعطاء الأولوية دون توقف إذا كان الطريق خالياً", spanish: "Ceder el paso sin detenerse si está libre" }
        },
        {
          fr: "Vous s'arrêter obligatoirement",
          t: { khmer: "ត្រូវតែឈប់ជាដាច់ខាត", english: "Mandatorily stop", arabic: "التوقف إجبارياً", spanish: "Detenerse obligatoriamente" }
        },
        {
          fr: "Conserver la priorité absolue",
          t: { khmer: "រក្សាអាទិភាព", english: "Maintain priority", arabic: "الاحتفاظ بالأولوية", spanish: "Mantener la prioridad" }
        },
        {
          fr: "Accélérer pour vous insérer",
          t: { khmer: "បង្កើនល្បឿនដើម្បីចូល", english: "Accelerate to merge", arabic: "التسارع للاندماج", spanish: "Acelerar para incorporarse" }
        }
      ],
      correct: 0,
      exp: "Le panneau 'Céder le Passage' n'impose pas d'arrêt si personne ne vient.",
      expT: {
        khmer: "ផ្លាកសញ្ញានេះមិនបង្ខំឱ្យឈប់ឡើយ ប្រសិនបើគ្មានយានយន្តជិតមកដល់។",
        english: "The sign does not enforce a stop if no traffic is present.",
        arabic: "لا تفرض العلامة التوقف إذا لم تكن هناك حركة مرور.",
        spanish: "La señal no obliga a detenerse si no vienen vehículos."
      },
      svg: "cedez"
    }
  ],
  vitesse: [
    {
      q: "En agglomération, quelle est la vitesse maximale autorisée par défaut ?",
      t: {
        khmer: "នៅក្នុងទីប្រជុំជន តើល្បឿនអតិបរមាគឺប៉ុន្មាន?",
        english: "In built-up areas, what is the default maximum speed limit?",
        arabic: "في المناطق السكنية، ما هو الحد الأقصى للسرعة؟",
        spanish: "En zona urbana, ¿cuál es el límite de velocidad máxima?"
      },
      opts: [
        { fr: "30 km/h", t: { khmer: "30 គ.ម/ម៉ោង", english: "30 km/h", arabic: "30 كم/ساعة", spanish: "30 km/h" } },
        { fr: "50 km/h", t: { khmer: "50 គ.ម/ម៉ោង", english: "50 km/h", arabic: "50 كم/ساعة", spanish: "50 km/h" } },
        { fr: "70 km/h", t: { khmer: "70 គ.ម/ម៉ោង", english: "70 km/h", arabic: "70 كم/ساعة", spanish: "70 km/h" } },
        { fr: "80 km/h", t: { khmer: "80 គ.ម/ម៉ោង", english: "80 km/h", arabic: "80 كم/ساعة", spanish: "80 km/h" } }
      ],
      correct: 1,
      exp: "La vitesse maximale en agglomération est fixée à 50 km/h.",
      expT: {
        khmer: "ល្បឿនអតិបរមាក្នុងទីប្រជុំជន ត្រូវបានកំណត់ត្រឹម 50 គ.ម/ម៉ោង។",
        english: "The maximum speed limit in built-up areas is 50 km/h.",
        arabic: "الحد الأقصى للسرعة في المناطق السكنية هو 50 كم/ساعة.",
        spanish: "El límite de velocidad en zona urbana está fijado en 50 km/h."
      },
      svg: "speed50"
    }
  ],
  autoroute: [
    {
      q: "Sur autoroute par temps sec, la vitesse est limitée à :",
      t: {
        khmer: "នៅលើផ្លូវល្បឿនលឿន ពេលមេឃស្ងួត ល្បឿនត្រូវបានកំណត់ត្រឹម៖",
        english: "On a motorway in dry weather, the speed limit is:",
        arabic: "على الطريق السريع في الطقس الجاف، تقتصر السرعة على:",
        spanish: "En autopista con tiempo seco, el límite de velocidad es:"
      },
      opts: [
        { fr: "110 km/h", t: { khmer: "110 គ.ម/ម៉ោង", english: "110 km/h", arabic: "110 كم/ساعة", spanish: "110 km/h" } },
        { fr: "120 km/h", t: { khmer: "120 គ.ម/ម៉ោង", english: "120 km/h", arabic: "120 كم/ساعة", spanish: "120 km/h" } },
        { fr: "130 km/h", t: { khmer: "130 គ.ម/ម៉ោង", english: "130 km/h", arabic: "130 كم/ساعة", spanish: "130 km/h" } },
        { fr: "140 km/h", t: { khmer: "140 គ.ម/ម៉ោង", english: "140 km/h", arabic: "140 كم/ساعة", spanish: "140 km/h" } }
      ],
      correct: 2,
      exp: "La vitesse maximale sur autoroute est de 130 km/h par beau temps.",
      expT: {
        khmer: "ល្បឿនអតិបរមាលើផ្លូវល្បឿនលឿនគឺ 130 គ.ម/ម៉ោង។",
        english: "The maximum speed on motorways is 130 km/h in dry weather.",
        arabic: "السرعة القصوى على الطرق السريعة هي 130 كم/ساعة في الطقس الجيد.",
        spanish: "La velocidad máxima en autopista es de 130 km/h con buen tiempo."
      },
      svg: "speed130"
    }
  ],
  securite: [
    {
      q: "Lorsqu'il pleut fortement, quels feux devez-vous allumer ?",
      t: {
        khmer: "នៅពេលមានភ្លៀងធ្លាក់ខ្លាំង តើអ្នកត្រូវតែបើកភ្លើងប្រភេទណា?",
        english: "During heavy rain, which lights must you turn on?",
        arabic: "عندما تهطل الأمطار بغزارة، ما هي الأضواء التي يجب عليك تشغيلها؟",
        spanish: "Cuando llueve fuertemente, ¿qué luces debe encender?"
      },
      opts: [
        { fr: "Les feux de croisement", t: { khmer: "ភ្លើងកូដ (Feux de croisement)", english: "Dipped headlights", arabic: "أضواء التقاطع", spanish: "Luces de cruce" } },
        { fr: "Les feux de route", t: { khmer: "ភ្លើងហ្វារ (Feux de route)", english: "High beam headlights", arabic: "أضواء الطريق", spanish: "Luces de carretera" } },
        { fr: "Les feux de position seuls", t: { khmer: "ភ្លើងទីតាំងតែមួយមុខ", english: "Side lights only", arabic: "أضواء الوضعية فقط", spanish: "Luces de posición únicamente" } },
        { fr: "Les feux de brouillard arrière", t: { khmer: "ភ្លើងអ័ព្ទខាងក្រោយ", english: "Rear fog lights", arabic: "أضواء الضباب الخلفية", spanish: "Luces antiniebla traseras" } }
      ],
      correct: 0,
      exp: "Les feux de croisement sont obligatoires sous la pluie pour mieux voir et être vu.",
      expT: {
        khmer: "ភ្លើងកូដគឺចាំបាច់ត្រូវបើកពេលមានភ្លៀងធ្លាក់។",
        english: "Dipped headlights are mandatory in the rain to see and be seen.",
        arabic: "أضواء التقاطع إجبارية أثناء المطر للرؤية ولتكون مرئياً.",
        spanish: "Las luces de cruce son obligatorias bajo la lluvia para ver y ser visto."
      },
      svg: "blueArrow"
    }
  ],
  divers: [
    {
      q: "Pendant la période du permis probatoire, la durée standard est de :",
      t: {
        khmer: "កំឡុងពេលប័ណ្ណបើកបរថ្មី តើកាលកំណត់សាកល្បងស្តង់ដារមានរយៈពេលប៉ុន្មាន?",
        english: "During the probationary license period, the standard duration is:",
        arabic: "خلال فترة رخصة القيادة التجريبية، المدة القياسية هي:",
        spanish: "Durante el período del carné provisional, la duración estándar es:"
      },
      opts: [
        { fr: "3 ans", t: { khmer: "៣ ឆ្នាំ", english: "3 years", arabic: "3 سنوات", spanish: "3 años" } },
        { fr: "1 an", t: { khmer: "១ ឆ្នាំ", english: "1 year", arabic: "سنة واحدة", spanish: "1 año" } },
        { fr: "5 ans", t: { khmer: "៥ ឆ្នាំ", english: "5 years", arabic: "5 سنوات", spanish: "5 años" } },
        { fr: "6 mois", t: { khmer: "៦ ខែ", english: "6 months", arabic: "6 أشهر", spanish: "6 meses" } }
      ],
      correct: 0,
      exp: "Le permis probatoire dure 3 ans (réduit à 2 ans via conduite accompagnée).",
      expT: {
        khmer: "ប័ណ្ណបើកបរថ្មីមានរយៈពេលសាកល្បង ៣ ឆ្នាំ។",
        english: "The probationary license lasts 3 years.",
        arabic: "تستمر رخصة القيادة التجريبية لمدة 3 سنوات.",
        spanish: "El carné provisional dura 3 años."
      },
      svg: "danger"
    }
  ]
};

// --- ALGORITHME DE MELANGE DES REPONSES ---
function shuffleOptionsAndKeepCorrect(options, correctIndex) {
  let mapped = options.map((opt, idx) => ({ opt, isCorrect: idx === correctIndex }));
  for (let i = mapped.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mapped[i], mapped[j]] = [mapped[j], mapped[i]];
  }
  return {
    shuffledOpts: mapped.map(m => m.opt),
    newCorrect: mapped.findIndex(m => m.isCorrect)
  };
}

const questionBank = [];
let globalId = 1;

categories.forEach(cat => {
  const templatesList = detailedTemplates[cat.id] || detailedTemplates.panneaux;
  for (let i = 0; i < 50; i++) {
    const base = templatesList[i % templatesList.length];
    
    // MÉLANGE ALÉATOIRE des 4 choix pour que la réponse A, B, C ou D change constamment
    const { shuffledOpts, newCorrect } = shuffleOptionsAndKeepCorrect(base.opts, base.correct);

    questionBank.push({
      id: globalId,
      category: cat.id,
      svg: svgTemplates[base.svg] || svgTemplates.danger,
      question: `${base.q}`,
      translations: {
        khmer: base.t.khmer,
        english: base.t.english,
        arabic: base.t.arabic,
        spanish: base.t.spanish
      },
      options: shuffledOpts.map(opt => ({
        text: opt.fr,
        t: {
          khmer: opt.t.khmer,
          english: opt.t.english,
          arabic: opt.t.arabic,
          spanish: opt.t.spanish
        }
      })),
      correctIndex: newCorrect,
      explanation: base.exp,
      expTranslations: {
        khmer: base.expT.khmer,
        english: base.expT.english,
        arabic: base.expT.arabic,
        spanish: base.expT.spanish
      }
    });
    globalId++;
  }
});
