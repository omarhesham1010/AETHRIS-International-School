/* =============================================================
   AETHRIS — Internationalisation (EN · AR · FR · ES)
   Dictionary-based text-node translation covering the whole site.
   English is the source; switching a language walks every text node
   and swaps any string found in the dictionary (static + JS-rendered).
   ============================================================= */
(function () {
  "use strict";

  /* Each entry: English source → { ar, fr, es } */
  const D = {
    // ---- Nav / chrome ----
    "About": { ar: "من نحن", fr: "À propos", es: "Nosotros" },
    "Academics": { ar: "الأكاديميات", fr: "Académique", es: "Académico" },
    "Campus": { ar: "الحرم", fr: "Campus", es: "Campus" },
    "Student Life": { ar: "الحياة الطلابية", fr: "Vie étudiante", es: "Vida estudiantil" },
    "Faculty": { ar: "هيئة التدريس", fr: "Enseignants", es: "Profesorado" },
    "Admissions": { ar: "القبول", fr: "Admissions", es: "Admisiones" },
    "More": { ar: "المزيد", fr: "Plus", es: "Más" },
    "Events": { ar: "الفعاليات", fr: "Événements", es: "Eventos" },
    "Gallery": { ar: "المعرض", fr: "Galerie", es: "Galería" },
    "Success Stories": { ar: "قصص النجاح", fr: "Témoignages", es: "Historias de éxito" },
    "Contact": { ar: "تواصل معنا", fr: "Contact", es: "Contacto" },
    "Family Portal": { ar: "بوابة الأسرة", fr: "Portail famille", es: "Portal familiar" },
    "Home": { ar: "الرئيسية", fr: "Accueil", es: "Inicio" },
    "Portal": { ar: "البوابة", fr: "Portail", es: "Portal" },
    "International School": { ar: "مدرسة دولية", fr: "École internationale", es: "Escuela internacional" },

    // ---- Buttons / CTAs ----
    "Apply Now": { ar: "قدّم الآن", fr: "Postuler", es: "Aplicar ahora" },
    "Book a Private Tour": { ar: "احجز جولة خاصة", fr: "Réserver une visite privée", es: "Reservar visita privada" },
    "Book a private tour": { ar: "احجز جولة خاصة", fr: "Réserver une visite privée", es: "Reservar visita privada" },
    "Book a Tour": { ar: "احجز جولة", fr: "Réserver une visite", es: "Reservar visita" },
    "Book a Campus Tour": { ar: "احجز جولة في الحرم", fr: "Réserver une visite du campus", es: "Reservar visita al campus" },
    "Explore Campus": { ar: "استكشف الحرم", fr: "Explorer le campus", es: "Explorar el campus" },
    "Explore": { ar: "استكشف", fr: "Explorer", es: "Explorar" },
    "Register free": { ar: "سجّل مجاناً", fr: "Inscription gratuite", es: "Registro gratis" },
    "Register": { ar: "سجّل", fr: "S'inscrire", es: "Registrarse" },
    "Register your place": { ar: "سجّل مكانك", fr: "Réservez votre place", es: "Reserva tu lugar" },
    "Confirm Registration": { ar: "تأكيد التسجيل", fr: "Confirmer l'inscription", es: "Confirmar registro" },
    "Our Story": { ar: "قصتنا", fr: "Notre histoire", es: "Nuestra historia" },
    "Meet our leadership": { ar: "تعرّف على قيادتنا", fr: "Notre direction", es: "Nuestro liderazgo" },
    "Discover": { ar: "اكتشف", fr: "Découvrir", es: "Descubrir" },
    "Send Message": { ar: "أرسل الرسالة", fr: "Envoyer le message", es: "Enviar mensaje" },
    "Send me the prospectus": { ar: "أرسل لي الكتيّب", fr: "Envoyez-moi la brochure", es: "Envíenme el folleto" },
    "Download Prospectus": { ar: "حمّل الكتيّب", fr: "Télécharger la brochure", es: "Descargar folleto" },
    "Continue": { ar: "متابعة", fr: "Continuer", es: "Continuar" },
    "Back": { ar: "رجوع", fr: "Retour", es: "Atrás" },
    "Submit Application": { ar: "إرسال الطلب", fr: "Soumettre la demande", es: "Enviar solicitud" },
    "Request Tour": { ar: "اطلب جولة", fr: "Demander une visite", es: "Solicitar visita" },
    "Book Consultation": { ar: "احجز استشارة", fr: "Réserver une consultation", es: "Reservar consulta" },
    "Start your application": { ar: "ابدأ طلبك", fr: "Commencer votre demande", es: "Comenzar tu solicitud" },
    "Estimate tuition": { ar: "قدّر المصروفات", fr: "Estimer les frais", es: "Estimar la matrícula" },
    "Apply with these choices": { ar: "قدّم بهذه الخيارات", fr: "Postuler avec ces choix", es: "Aplicar con estas opciones" },
    "Retake quiz": { ar: "أعد الاختبار", fr: "Refaire le quiz", es: "Repetir el test" },
    "Done": { ar: "تم", fr: "Terminé", es: "Hecho" },
    "Close": { ar: "إغلاق", fr: "Fermer", es: "Cerrar" },
    "Back to Home": { ar: "العودة للرئيسية", fr: "Retour à l'accueil", es: "Volver al inicio" },
    "View Family Portal": { ar: "عرض بوابة الأسرة", fr: "Voir le portail famille", es: "Ver portal familiar" },
    "Take the quiz": { ar: "ابدأ الاختبار", fr: "Faire le quiz", es: "Hacer el test" },
    "Take the tour": { ar: "ابدأ الجولة", fr: "Faire la visite", es: "Hacer el recorrido" },

    // ---- Topbar / concierge ----
    "Admissions Concierge · Online": { ar: "مستشار القبول · متصل", fr: "Conseiller admissions · En ligne", es: "Asesor de admisiones · En línea" },
    "Curriculum": { ar: "المناهج", fr: "Programme", es: "Currículo" },
    "Fees": { ar: "المصروفات", fr: "Frais", es: "Cuotas" },
    "Transport": { ar: "المواصلات", fr: "Transport", es: "Transporte" },

    // ---- Common section words ----
    "By the numbers": { ar: "بالأرقام", fr: "En chiffres", es: "En cifras" },
    "Welcome to Aethris": { ar: "مرحباً بك في أثريس", fr: "Bienvenue à Aethris", es: "Bienvenido a Aethris" },
    "Academic Pathways": { ar: "المسارات الأكاديمية", fr: "Parcours académiques", es: "Rutas académicas" },
    "Innovation & STEM Leadership": { ar: "الابتكار وريادة STEM", fr: "Innovation & STEM", es: "Innovación y STEM" },
    "The Aethris Journey": { ar: "رحلة أثريس", fr: "Le parcours Aethris", es: "El viaje Aethris" },
    "Upcoming at Aethris": { ar: "قريباً في أثريس", fr: "À venir à Aethris", es: "Próximamente en Aethris" },
    "Voices of Aethris": { ar: "أصوات أثريس", fr: "Les voix d'Aethris", es: "Voces de Aethris" },
    "Begin Your Journey": { ar: "ابدأ رحلتك", fr: "Commencez votre parcours", es: "Comienza tu viaje" },
    "Our graduates progress to the world's leading universities": { ar: "يلتحق خريجونا بأرقى جامعات العالم", fr: "Nos diplômés intègrent les meilleures universités du monde", es: "Nuestros graduados acceden a las mejores universidades del mundo" },

    // ---- Stats labels ----
    "Nationalities on campus": { ar: "جنسية في الحرم", fr: "Nationalités sur le campus", es: "Nacionalidades en el campus" },
    "University acceptance": { ar: "قبول جامعي", fr: "Admission universitaire", es: "Aceptación universitaria" },
    "Advanced labs & studios": { ar: "مختبرات واستوديوهات متقدمة", fr: "Labos & studios avancés", es: "Laboratorios y estudios avanzados" },
    "Clubs & activities": { ar: "أندية وأنشطة", fr: "Clubs & activités", es: "Clubes y actividades" },
    "Student–teacher ratio": { ar: "نسبة الطالب للمعلم", fr: "Ratio élève–enseignant", es: "Proporción alumno–profesor" },
    "Future-ready learning": { ar: "تعلّم جاهز للمستقبل", fr: "Apprentissage tourné vers l'avenir", es: "Aprendizaje para el futuro" },
    "Nationalities": { ar: "جنسية", fr: "Nationalités", es: "Nacionalidades" },
    "Acre campus": { ar: "فدان مساحة الحرم", fr: "Campus (acres)", es: "Campus (acres)" },
    "Clubs & activities": { ar: "أندية وأنشطة", fr: "Clubs & activités", es: "Clubes y actividades" },
    "Sports teams": { ar: "فرق رياضية", fr: "Équipes sportives", es: "Equipos deportivos" },
    "Service hours / yr": { ar: "ساعة خدمة سنوياً", fr: "Heures de service / an", es: "Horas de servicio / año" },
    "Labs & studios": { ar: "مختبرات واستوديوهات", fr: "Labos & studios", es: "Laboratorios y estudios" },
    "Library titles": { ar: "عنوان في المكتبة", fr: "Titres en bibliothèque", es: "Títulos en biblioteca" },
    "Athletic venues": { ar: "منشآت رياضية", fr: "Sites sportifs", es: "Recintos deportivos" },
    "Security & care": { ar: "أمن ورعاية", fr: "Sécurité & soins", es: "Seguridad y cuidado" },

    // ---- Chips / labels ----
    "Featured Event": { ar: "فعالية مميزة", fr: "Événement à la une", es: "Evento destacado" },
    "Featured": { ar: "مميز", fr: "À la une", es: "Destacado" },
    "Live Demo · Sample Data": { ar: "عرض حي · بيانات تجريبية", fr: "Démo en direct · Données d'exemple", es: "Demo en vivo · Datos de muestra" },
    "Parent": { ar: "ولي أمر", fr: "Parent", es: "Padre/Madre" },
    "Student": { ar: "طالب", fr: "Élève", es: "Estudiante" },
    "Alumni": { ar: "خريج", fr: "Ancien élève", es: "Exalumno" },
    "Family": { ar: "عائلة", fr: "Famille", es: "Familia" },

    // ---- Hero (home fragments) ----
    "Where global ambition": { ar: "حيث يلتقي الطموح العالمي", fr: "Où l'ambition mondiale", es: "Donde la ambición global" },
    "meets": { ar: "بـ", fr: "rencontre", es: "se une a la" },
    "academic excellence.": { ar: "التميّز الأكاديمي.", fr: "l'excellence académique.", es: "excelencia académica." },
    "New Cairo · Est. 2004 · Fully Accredited": { ar: "القاهرة الجديدة · تأسست 2004 · معتمدة بالكامل", fr: "New Cairo · Fondée en 2004 · Pleinement accréditée", es: "Nuevo Cairo · Fundada en 2004 · Totalmente acreditada" },
    "Live campus film": { ar: "فيلم مباشر من الحرم", fr: "Film du campus en direct", es: "Vídeo del campus en vivo" },

    // ---- Section headings & intros (home) ----
    "Choose the path.": { ar: "اختر المسار.", fr: "Choisissez la voie.", es: "Elige el camino." },
    "future.": { ar: "المستقبل.", fr: "l'avenir.", es: "el futuro." },
    "42-Acre Campus": { ar: "حرم بمساحة 42 فداناً", fr: "Campus de 42 acres", es: "Campus de 42 acres" },
    "Drone footage": { ar: "لقطات بطائرة درون", fr: "Images par drone", es: "Imágenes con dron" },
    "The Learning Journey": { ar: "رحلة التعلّم", fr: "Le parcours d'apprentissage", es: "El viaje de aprendizaje" },

    // ---- Page hero eyebrows / subtexts (interior) ----
    "Our Story · Since 2004": { ar: "قصتنا · منذ 2004", fr: "Notre histoire · Depuis 2004", es: "Nuestra historia · Desde 2004" },
    "Academic Excellence": { ar: "التميّز الأكاديمي", fr: "Excellence académique", es: "Excelencia académica" },
    "42 Acres · New Cairo": { ar: "42 فداناً · القاهرة الجديدة", fr: "42 acres · New Cairo", es: "42 acres · Nuevo Cairo" },
    "Beyond the Classroom": { ar: "ما وراء الفصل الدراسي", fr: "Au-delà de la classe", es: "Más allá del aula" },
    "Meet Our Educators": { ar: "تعرّف على معلّمينا", fr: "Nos éducateurs", es: "Nuestros educadores" },
    "Admissions 2026–27 · Now Open": { ar: "القبول 2026–27 · مفتوح الآن", fr: "Admissions 2026–27 · Ouvertes", es: "Admisiones 2026–27 · Abiertas" },
    "A Window Into Aethris": { ar: "نافذة على أثريس", fr: "Une fenêtre sur Aethris", es: "Una ventana a Aethris" },
    "We'd Love to Hear From You": { ar: "يسعدنا تواصلك معنا", fr: "Nous serions ravis de vous entendre", es: "Nos encantaría saber de ti" },

    // ---- Programs (names / tags / short) ----
    "American Diploma": { ar: "الدبلومة الأمريكية", fr: "Diplôme américain", es: "Diploma Americano" },
    "British Curriculum": { ar: "المنهج البريطاني", fr: "Programme britannique", es: "Currículo Británico" },
    "International Baccalaureate": { ar: "البكالوريا الدولية", fr: "Baccalauréat international", es: "Bachillerato Internacional" },
    "STEM Excellence": { ar: "تميّز STEM", fr: "Excellence STEM", es: "Excelencia STEM" },
    "AI & Robotics": { ar: "الذكاء الاصطناعي والروبوتات", fr: "IA & Robotique", es: "IA y Robótica" },
    "Aviation & Aerospace": { ar: "الطيران والفضاء", fr: "Aviation & Aérospatiale", es: "Aviación y Aeroespacial" },
    "Entrepreneurship": { ar: "ريادة الأعمال", fr: "Entrepreneuriat", es: "Emprendimiento" },
    "Creative Arts": { ar: "الفنون الإبداعية", fr: "Arts créatifs", es: "Artes creativas" },
    "Sports Academy": { ar: "أكاديمية الرياضة", fr: "Académie de sport", es: "Academia deportiva" },
    "Global Languages": { ar: "اللغات العالمية", fr: "Langues mondiales", es: "Idiomas globales" },
    "All Programs": { ar: "كل البرامج", fr: "Tous les programmes", es: "Todos los programas" },
    "Core Curricula": { ar: "المناهج الأساسية", fr: "Programmes principaux", es: "Currículos principales" },
    "Signature Tracks": { ar: "المسارات المميزة", fr: "Filières signature", es: "Rutas distintivas" },
    "Enrichment": { ar: "الإثراء", fr: "Enrichissement", es: "Enriquecimiento" },

    // ---- Pathway stages ----
    "Early Years": { ar: "المرحلة المبكرة", fr: "Petite enfance", es: "Primera infancia" },
    "Elementary": { ar: "الابتدائية", fr: "Élémentaire", es: "Primaria" },
    "Middle School": { ar: "الإعدادية", fr: "Collège", es: "Secundaria" },
    "High School": { ar: "الثانوية", fr: "Lycée", es: "Bachillerato" },
    "Graduation": { ar: "التخرّج", fr: "Remise des diplômes", es: "Graduación" },
    "Global Universities": { ar: "الجامعات العالمية", fr: "Universités mondiales", es: "Universidades globales" },

    // ---- Values (about) ----
    "Excellence": { ar: "التميّز", fr: "Excellence", es: "Excelencia" },
    "Global Citizenship": { ar: "المواطنة العالمية", fr: "Citoyenneté mondiale", es: "Ciudadanía global" },
    "Innovation": { ar: "الابتكار", fr: "Innovation", es: "Innovación" },
    "Compassion": { ar: "التعاطف", fr: "Compassion", es: "Compasión" },
    "Integrity": { ar: "النزاهة", fr: "Intégrité", es: "Integridad" },
    "Courage": { ar: "الشجاعة", fr: "Courage", es: "Coraje" },

    // ---- Forms ----
    "Full name": { ar: "الاسم الكامل", fr: "Nom complet", es: "Nombre completo" },
    "Email": { ar: "البريد الإلكتروني", fr: "E-mail", es: "Correo electrónico" },
    "Phone": { ar: "الهاتف", fr: "Téléphone", es: "Teléfono" },
    "Message": { ar: "الرسالة", fr: "Message", es: "Mensaje" },
    "Name": { ar: "الاسم", fr: "Nom", es: "Nombre" },
    "Guests": { ar: "الضيوف", fr: "Invités", es: "Invitados" },
    "Parent name": { ar: "اسم ولي الأمر", fr: "Nom du parent", es: "Nombre del padre" },
    "Student name": { ar: "اسم الطالب", fr: "Nom de l'élève", es: "Nombre del estudiante" },
    "Preferred date": { ar: "التاريخ المفضّل", fr: "Date souhaitée", es: "Fecha preferida" },
    "Topic": { ar: "الموضوع", fr: "Sujet", es: "Tema" },
    "Interested in": { ar: "مهتم بـ", fr: "Intéressé par", es: "Interesado en" },
    "Grade level": { ar: "المستوى الدراسي", fr: "Niveau scolaire", es: "Nivel escolar" },
    "Transportation": { ar: "المواصلات", fr: "Transport", es: "Transporte" },
    "Required": { ar: "مطلوب", fr: "Requis", es: "Requerido" },
    "Valid email required": { ar: "بريد إلكتروني صحيح مطلوب", fr: "E-mail valide requis", es: "Correo válido requerido" },

    // ---- FAQ / misc ----
    "Questions?": { ar: "أسئلة؟", fr: "Des questions ?", es: "¿Preguntas?" },
    "Trusted & Accredited": { ar: "موثوقة ومعتمدة", fr: "Fiable & accréditée", es: "Confiable y acreditada" },
    "Our Legacy": { ar: "إرثنا", fr: "Notre héritage", es: "Nuestro legado" },
    "What We Stand For": { ar: "ما نؤمن به", fr: "Nos valeurs", es: "Lo que defendemos" },
    "The House System": { ar: "نظام البيوت", fr: "Le système des maisons", es: "El sistema de casas" },
    "Clubs & Activities": { ar: "الأندية والأنشطة", fr: "Clubs & activités", es: "Clubes y actividades" },
    "World-Class Facilities": { ar: "مرافق عالمية المستوى", fr: "Installations de classe mondiale", es: "Instalaciones de primer nivel" },
    "Interactive Campus Map": { ar: "خريطة تفاعلية للحرم", fr: "Plan interactif du campus", es: "Mapa interactivo del campus" },
    "All": { ar: "الكل", fr: "Tout", es: "Todo" },
    "Skip to content": { ar: "تخطّي إلى المحتوى", fr: "Aller au contenu", es: "Ir al contenido" },
    "Good morning, Nadia": { ar: "صباح الخير يا نادية", fr: "Bonjour, Nadia", es: "Buenos días, Nadia" },
    "Parent Portal": { ar: "بوابة ولي الأمر", fr: "Portail parent", es: "Portal de padres" },
    "Student Dashboard": { ar: "لوحة الطالب", fr: "Tableau élève", es: "Panel del estudiante" },
    "Teacher Dashboard": { ar: "لوحة المعلّم", fr: "Tableau enseignant", es: "Panel del profesor" },
    "Admissions CRM": { ar: "نظام إدارة القبول", fr: "CRM Admissions", es: "CRM de admisiones" },
    "Events Management": { ar: "إدارة الفعاليات", fr: "Gestion des événements", es: "Gestión de eventos" },
    "Announcements": { ar: "الإعلانات", fr: "Annonces", es: "Anuncios" },
    "Messages": { ar: "الرسائل", fr: "Messages", es: "Mensajes" },
    "Assignments": { ar: "الواجبات", fr: "Devoirs", es: "Tareas" },
    "Attendance": { ar: "الحضور", fr: "Présence", es: "Asistencia" },

    // ---- Section heading fragments (home) ----
    "A community measured in": { ar: "مجتمع يُقاس بـ", fr: "Une communauté qui se mesure en", es: "Una comunidad medida en" },
    "extraordinary outcomes": { ar: "نتائج استثنائية", fr: "résultats extraordinaires", es: "resultados extraordinarios" },
    "An education designed for a": { ar: "تعليم مُصمَّم من أجل", fr: "Une éducation conçue pour un", es: "Una educación diseñada para un" },
    "borderless world.": { ar: "عالم بلا حدود.", fr: "monde sans frontières.", es: "mundo sin fronteras." },
    "We'll shape the": { ar: "ونحن نصنع", fr: "Nous façonnerons", es: "Nosotros formamos el" },
    "A campus built for": { ar: "حرمٌ بُني لأجل", fr: "Un campus conçu pour", es: "Un campus creado para" },
    "wonder.": { ar: "الدهشة.", fr: "l'émerveillement.", es: "el asombro." },
    "Fluent in the": { ar: "إتقانٌ لـ", fr: "Maîtriser le", es: "Fluidez en el" },
    "language of the future.": { ar: "لغة المستقبل.", fr: "langage de l'avenir.", es: "lenguaje del futuro." },
    "From first steps to": { ar: "من الخطوات الأولى إلى", fr: "Des premiers pas aux", es: "De los primeros pasos a" },
    "global universities": { ar: "الجامعات العالمية", fr: "universités mondiales", es: "universidades globales" },
    "More than a school.": { ar: "أكثر من مجرد مدرسة.", fr: "Plus qu'une école.", es: "Más que una escuela." },
    "way of belonging.": { ar: "شعورٌ بالانتماء.", fr: "un sentiment d'appartenance.", es: "un sentido de pertenencia." },
    "Trusted by families": { ar: "محلّ ثقة العائلات", fr: "La confiance des familles", es: "La confianza de las familias" },
    "around the world": { ar: "حول العالم", fr: "du monde entier", es: "de todo el mundo" },
    "Life on campus,": { ar: "الحياة في الحرم،", fr: "La vie sur le campus,", es: "La vida en el campus," },
    "always in motion": { ar: "دائمًا في حركة", fr: "toujours en mouvement", es: "siempre en movimiento" },
    "extraordinary future": { ar: "المستقبل الاستثنائي", fr: "avenir extraordinaire", es: "futuro extraordinario" },
    "starts here.": { ar: "يبدأ من هنا.", fr: "commence ici.", es: "comienza aquí." },

    // ---- Section headings (interior, gold fragments) ----
    "global citizens": { ar: "مواطنين عالميين", fr: "citoyens du monde", es: "ciudadanos globales" },
    "borderless world": { ar: "عالم بلا حدود", fr: "monde sans frontières", es: "mundo sin fronteras" },
    "everything we do": { ar: "كل ما نقوم به", fr: "tout ce que nous faisons", es: "todo lo que hacemos" },
    "milestones": { ar: "محطات فارقة", fr: "jalons", es: "hitos" },
    "leading bodies": { ar: "الهيئات الرائدة", fr: "organismes de référence", es: "organismos líderes" },
    "a limitless future": { ar: "مستقبل بلا حدود", fr: "un avenir sans limites", es: "un futuro sin límites" },
    "best-fit program": { ar: "البرنامج الأنسب", fr: "programme idéal", es: "programa ideal" },
    "explore": { ar: "استكشف", fr: "explorer", es: "explorar" },
    "purpose-built": { ar: "مبنيّ لغرضه", fr: "conçu sur mesure", es: "diseñado a medida" },
    "protects and nurtures": { ar: "يحمي ويرعى", fr: "protège et épanouit", es: "protege y cultiva" },
    "passion": { ar: "شغفك", fr: "passion", es: "pasión" },
    "One family.": { ar: "عائلة واحدة.", fr: "Une seule famille.", es: "Una sola familia." },
    "grown, not born.": { ar: "يُصنعون ولا يولدون.", fr: "se forment, ils ne naissent pas.", es: "se forman, no nacen." },
    "Aethris, Aethris.": { ar: "أثريس أثريس.", fr: "Aethris, Aethris.", es: "Aethris, Aethris." },
    "visionary leaders": { ar: "قادة أصحاب رؤية", fr: "des leaders visionnaires", es: "líderes visionarios" },
    "every classroom": { ar: "كل فصل دراسي", fr: "chaque salle de classe", es: "cada aula" },
    "learners too.": { ar: "متعلّمون أيضًا.", fr: "aussi des apprenants.", es: "también aprendices." },
    "enrolment": { ar: "التسجيل", fr: "l'inscription", es: "la matrícula" },
    "application": { ar: "طلبك", fr: "votre demande", es: "tu solicitud" },
    "estimator": { ar: "تقدير المصروفات", fr: "estimateur", es: "estimador" },
    "sharing": { ar: "المشاركة", fr: "être partagées", es: "compartir" },
    "conversation.": { ar: "محادثة.", fr: "conversation.", es: "conversación." },
    "contacts": { ar: "جهات الاتصال", fr: "contacts", es: "contactos" },
    "video gallery": { ar: "معرض الفيديو", fr: "galerie vidéo", es: "galería de vídeo" },
    "in full colour.": { ar: "بكامل ألوانها.", fr: "en pleines couleurs.", es: "a todo color." },
    "always Aethris.": { ar: "تبقى أثريس دائمًا.", fr: "toujours Aethris.", es: "siempre Aethris." },
    "whole school life.": { ar: "حياتك المدرسية كاملة.", fr: "toute votre vie scolaire.", es: "toda tu vida escolar." },

    // ---- Hero subtitles (per page) ----
    "Aethris International School educates the leaders, innovators and changemakers of tomorrow — inside a campus built for curiosity, confidence and world-class achievement.": { ar: "تُعِدّ مدرسة أثريس الدولية قادة الغد ومبتكريه وصنّاع التغيير فيه — داخل حرمٍ بُني للفضول والثقة والتميّز العالمي.", fr: "L'École internationale Aethris forme les leaders, innovateurs et acteurs du changement de demain — au sein d'un campus conçu pour la curiosité, la confiance et l'excellence.", es: "La Escuela Internacional Aethris forma a los líderes, innovadores y agentes de cambio del mañana, en un campus creado para la curiosidad, la confianza y la excelencia." },
    "Aethris was founded on a simple, radical belief: that a truly great education develops not just brilliant minds, but good and courageous human beings.": { ar: "تأسست أثريس على قناعةٍ بسيطة وجذرية: أن التعليم العظيم حقًّا لا يصنع عقولًا لامعة فحسب، بل بشرًا طيّبين وشجعانًا.", fr: "Aethris est née d'une conviction simple et radicale : une éducation véritablement remarquable ne forme pas seulement des esprits brillants, mais aussi des êtres humains bons et courageux.", es: "Aethris nació de una convicción simple y radical: una educación verdaderamente excelente no solo forma mentes brillantes, sino seres humanos buenos y valientes." },
    "Three globally recognised curricula and a constellation of signature specialist tracks — each carefully mapped to real universities and real-world careers.": { ar: "ثلاثة مناهج معترف بها عالميًّا وباقة من المسارات المتخصصة المميّزة — كلٌّ منها مرتبط بجامعاتٍ حقيقية ومساراتٍ مهنية واقعية.", fr: "Trois programmes reconnus mondialement et une constellation de filières spécialisées — chacun relié à de vraies universités et à de vraies carrières.", es: "Tres currículos reconocidos mundialmente y una constelación de rutas especializadas, cada una vinculada a universidades reales y carreras reales." },
    "Cinematic architecture, world-class facilities and gardens that breathe — every space at Aethris is designed to inspire curiosity and achievement.": { ar: "عمارة سينمائية ومرافق عالمية المستوى وحدائق تتنفّس — كل مساحة في أثريس مصمّمة لتُلهم الفضول والإنجاز.", fr: "Une architecture cinématographique, des installations de classe mondiale et des jardins vivants — chaque espace d'Aethris inspire la curiosité et la réussite.", es: "Arquitectura cinematográfica, instalaciones de primer nivel y jardines que respiran: cada espacio de Aethris inspira curiosidad y logros." },
    "Friendships that span continents, clubs that spark passions, and a community where every student finds their place — and their people.": { ar: "صداقات تعبر القارات، وأندية تُشعل الشغف، ومجتمع يجد فيه كل طالب مكانه — وأهله.", fr: "Des amitiés qui traversent les continents, des clubs qui éveillent les passions et une communauté où chaque élève trouve sa place — et les siens.", es: "Amistades que cruzan continentes, clubes que despiertan pasiones y una comunidad donde cada estudiante encuentra su lugar y su gente." },
    "Educators from the world's finest universities, united by one belief — that every child deserves to be known, challenged and inspired.": { ar: "معلّمون من أرقى جامعات العالم، توحّدهم قناعة واحدة — أن كل طفل يستحق أن يُعرَف ويُتحدّى ويُلهَم.", fr: "Des éducateurs issus des meilleures universités du monde, unis par une conviction : chaque enfant mérite d'être connu, stimulé et inspiré.", es: "Educadores de las mejores universidades del mundo, unidos por una convicción: cada niño merece ser conocido, desafiado e inspirado." },
    "A warm, transparent and personal admissions journey — guided by our concierge every step of the way.": { ar: "رحلة قبول دافئة وشفافة وشخصية — يرافقك فيها مستشارنا في كل خطوة.", fr: "Un parcours d'admission chaleureux, transparent et personnalisé — accompagné par notre conseiller à chaque étape.", es: "Un proceso de admisión cálido, transparente y personal, guiado por nuestro asesor en cada paso." },
    "Science fairs, robotics championships, concerts and open houses. There's always a reason to be part of the Aethris community.": { ar: "معارض علمية وبطولات روبوتات وحفلات موسيقية وأيام مفتوحة. هناك دائمًا سبب لتكون جزءًا من مجتمع أثريس.", fr: "Foires scientifiques, championnats de robotique, concerts et journées portes ouvertes. Il y a toujours une raison de faire partie de la communauté Aethris.", es: "Ferias de ciencias, campeonatos de robótica, conciertos y jornadas de puertas abiertas. Siempre hay una razón para ser parte de la comunidad Aethris." },
    "Every image tells a story of curiosity, community and achievement. Click any photo to view it full-screen.": { ar: "كل صورة تروي قصة من الفضول والانتماء والإنجاز. انقر أي صورة لعرضها بملء الشاشة.", fr: "Chaque image raconte une histoire de curiosité, de communauté et de réussite. Cliquez sur une photo pour l'afficher en plein écran.", es: "Cada imagen cuenta una historia de curiosidad, comunidad y logros. Haz clic en cualquier foto para verla en pantalla completa." },
    "The truest measure of a school is the people it shapes. Here are their stories, in their own words.": { ar: "أصدق مقياس لأي مدرسة هو الأشخاص الذين تصنعهم. إليك قصصهم بكلماتهم.", fr: "La véritable mesure d'une école, ce sont les personnes qu'elle façonne. Voici leurs histoires, dans leurs propres mots.", es: "La verdadera medida de una escuela son las personas que forma. Estas son sus historias, en sus propias palabras." },
    "Whether you're ready to apply or simply curious, our team is here to help your family every step of the way.": { ar: "سواء كنت مستعدًّا للتقديم أو مجرد فضولي، فريقنا هنا لمساعدة عائلتك في كل خطوة.", fr: "Que vous soyez prêt à postuler ou simplement curieux, notre équipe est là pour accompagner votre famille à chaque étape.", es: "Ya sea que estés listo para aplicar o solo tengas curiosidad, nuestro equipo está aquí para ayudar a tu familia en cada paso." },
    "Parents, students, teachers and admissions — connected in one elegant, secure digital ecosystem. Explore each dashboard below.": { ar: "أولياء الأمور والطلاب والمعلمون والقبول — متصلون في منظومة رقمية أنيقة وآمنة. استكشف كل لوحة أدناه.", fr: "Parents, élèves, enseignants et admissions — connectés dans un écosystème numérique élégant et sécurisé. Explorez chaque tableau de bord ci-dessous.", es: "Padres, estudiantes, profesores y admisiones, conectados en un ecosistema digital elegante y seguro. Explora cada panel a continuación." },
  };

  const LANGS = ["en", "ar", "fr", "es"];
  let current = localStorage.getItem("aethris-lang") || "en";

  function trans(text) {
    const key = text.trim();
    if (!key) return null;
    if (current === "en") return null;
    const entry = D[key];
    return entry && entry[current] ? entry[current] : null;
  }

  const SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, CODE: 1, svg: 1, VIDEO: 1, SOURCE: 1 };

  function walk(root) {
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = node.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        if (SKIP[p.nodeName] || p.closest("[data-no-i18n]")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const nodes = [];
    let n; while ((n = tw.nextNode())) nodes.push(n);
    nodes.forEach(node => {
      // Always translate from the stored English original (supports lang→lang switches)
      const source = node.__i18nOrig !== undefined ? node.__i18nOrig : node.nodeValue;
      if (current === "en") {
        if (node.__i18nOrig !== undefined) { node.nodeValue = node.__i18nOrig; delete node.__i18nOrig; }
        return;
      }
      const key = source.trim();
      const entry = key && D[key];
      const t = entry && entry[current];
      if (t) {
        if (node.__i18nOrig === undefined) node.__i18nOrig = node.nodeValue; // capture English original once
        const lead = (source.match(/^\s*/) || [""])[0];
        const trail = (source.match(/\s*$/) || [""])[0];
        node.nodeValue = lead + t + trail;
      }
      // No dictionary entry → leave the node untouched (never clobber dynamic content like counters)
    });
    // placeholders
    root.querySelectorAll("input[placeholder], textarea[placeholder]").forEach(el => {
      if (el.__phOrig === undefined) el.__phOrig = el.getAttribute("placeholder");
      const t = current === "en" ? el.__phOrig : (trans(el.__phOrig) || el.__phOrig);
      el.setAttribute("placeholder", t);
    });
  }

  function ensureArabicFont() {
    if (document.getElementById("ae-ar-font")) return;
    const l = document.createElement("link");
    l.id = "ae-ar-font"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap";
    document.head.appendChild(l);
  }

  function apply(lang) {
    if (!LANGS.includes(lang)) lang = "en";
    current = lang;
    localStorage.setItem("aethris-lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
    document.documentElement.classList.toggle("is-rtl", lang === "ar");
    if (lang === "ar") ensureArabicFont();
    walk(document.body);
  }

  function refresh() { if (current !== "en") walk(document.body); }

  window.aeI18n = { apply, refresh, get lang() { return current; }, langs: LANGS };

  // Apply saved language once the DOM & shared components are ready
  function boot() { if (current !== "en") apply(current); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
