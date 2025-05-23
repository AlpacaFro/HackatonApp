import React from "react";
import InfoCard from "../Components/InfoCard";

import dikaonImg from "../infoImage/icoDikaon2.svg";
import ovdanutImg from "../infoImage/icoOvdanut2.svg";
import alimotImg from "../infoImage/icoAlimut2.svg";
import atzmitImg from "../infoImage/icoAtzmi2.svg";
import eatingImg from "../infoImage/icoEating2.svg";
import warImg from "../infoImage/sahar_WarTrauma_icon_NEW-01.svg";
import haradaImg from "../infoImage/sahar_Anxiety_icon-01.svg";
import hafraaImg from "../infoImage/icoAfraha2.svg";

interface InfoCardData {
  title: string;
  imgSrc: string;
  altText: string;
  modalTextTitle: string;
  modalText: string;
}

const Info: React.FC = () => {
  const infoCardsData: InfoCardData[] = [
    {
      title: "דיכאון",
      imgSrc: dikaonImg,
      altText: "Dikaon-img",
      modalTextTitle: "מה גורם לדכאון?",
      modalText: `על פי אומדן של ה-National Institute of Mental Health, כ-17 מיליון אמריקאים סובלים מדיכאון בכל שנה. רבים מהם כלל לא מכירים בעובדה שהם סובלים מהפרעה שיכולה להיות מטופלת בצורה אפקטיבית. המאמר הבא בנוי כשאלות ותשובות ודן בדיכאון תוך התמקדות בדרכים שבהן טיפול נפשי יכול לעזור לאדם המדוכא להחליo. מה ההבדל בין דיכאון לעצב רגיל? כולם מרגישים עצובים לעתים. אנשים נקלעים לדכדוך עקב התנסויות קשות בחיים, כמו מחלה קשה, אובדן משרה, מוות במשפחה, או גירושין. רגשות אלו נחלשים מעצמם ככל שעובר הזמן.`,
    },
    {
      title: "טראומת לחימה",
      imgSrc: warImg,
      altText: "war-trauma-img",
      modalTextTitle: "פוסט טראומה על רקע צבאי",
      modalText: `מהם התסמינים של פוסט טראומה ואיך מתמודדים עם זכרונות מכאיבים ורגשות אשמה. שיחה עם ברק בן דיין, פסיכולוג קליני ומטפל במרפאת משרד הביטחון בבית החולים רמב"ם.`,
    },
    {
      title: "אובדנות",
      imgSrc: ovdanutImg,
      altText: "ovdanut-img",
      modalTextTitle: "הבנה והתמודדות עם סכנת התאבדות",
      modalText:
        "מטופלים, משפחה, חברים ואנשי מקצוע בתחום הבריאות צריכים לגלות גישה של דאגה ורחמים כשעולה האפשרות של התאבדות. התאבדות יכולה להיות תוצאה של דיכאון שאינו מטופל, התנסות טראומטית, בעיות בריאות, פציעה, או הצטברות הדרגתית ובלתי מורגשת של אירועים גורמי מתח או טראגיים. רגשות והתנהגויות אובדניים כמעט תמיד מזוהים עם סימפטומים של דיכאון, חרדה, או כתוצאה מבעיה רפואית הקשורה לחוסר איזון כימי. הבנה של המחשבות, הרגשות וההתנהגויות האובדניות מהווה את הצעד הראשון בזיהוי הרגע הנכון לפנות לעזרה.",
    },
    {
      title: "אלימות",
      imgSrc: alimotImg,
      altText: "alimut-img",
      modalTextTitle: "אלימות במשפחה כנגד נשים",
      modalText: `אלימות במשפחה מנוגדת לחוק ברוב המדינות הסטטיסטיקה לגבי מקרי האלימות בקרב המשפחה אינה מדויקת, אבל השכיחות היא כל-כך גבוהה שאנחנו יכולים להיות בטוחים שמדובר בבעיה משמעותית מבחינת בריאותו של אדם.
* בארה"ב, הכאה היא הגורם הראשי לפציעות או לאשפוזים בקרב נשים.
* בארה"ב, כל תשע שניות אישה עוברת התעללות מידי בעלה או בן-זוגה. זה מתורגם לארבע מיליון פציעות של נשים לשנה.`,
    },
    {
      title: "פגיעה עצמית",
      imgSrc: atzmitImg,
      altText: "pgiaa-atzmit-img",
      modalTextTitle: "פציעה עצמית – רקע כללי",
      modalText: `כשמדברים על פציעה עצמית הכוונה היא לגרימת כאב מכוון לעצמך ללא כוונת התאבדות. מלבד 'פציעה-עצמית' משתמשים גם במונחים 'התעללות-עצמית' ו- 'פגיעה-עצמית'. רוב אלו שעוסקים בפציעה עצמית הן נשים. הסיבה העיקרית לכך היא שגברים נוטים להפנות את האגרסיה/פגיעות/כאב החוצה כלפי אנשים או אובייקטים אחרים. נשים, לעומת זאת, נוטות להפנות את הפגיעה והכאב הזה פנימה, כלפי עצמן. רוב הנשים שפוצעות את עצמן עברו התעללות מינית או פיזית.`,
    },
    {
      title: "הפרעות אכילה",
      imgSrc: eatingImg,
      altText: "hafraot-achila-img",
      modalTextTitle: "קבלת עזרה",
      modalText: `למצוא עזרה זה לא קל. לשם כך דרוש רצון להחלים, ומוטיבציה למצוא מה מתאים לכם ועובד בשבילכם. הצעד הראשון הוא להגיע פנימה אל עצמכם. להודות בפני עצמכם שיש לכם בעיה שדורשת עזרה וטיפול, ולקבל את ההחלטה לעשות זאת. זה לוקח זמן, ואל תרדו על עצמכם אם זה ייקח לכם שבועות או חודשים לעשות את הטלפון הראשון. ברגע שתקבלו את ההחלטה – תעשו זאת.

מיצאו רופא שאיתו אתם מרגישים בנוח. כל אחד זכאי לכך. זכרו שהרופא שלכם מחוייב בסודיות מקצועית, ושכל מה שתספרו לו ישמר אך ורק ביניכם בסודיות מרבית. דברו עם הרופא, וודאו שהיא/הוא נענים לצרכים שלכם ואל תפחדו לשאול שאלות או לידע אותו/ה על דברים שאינו/ה יודע/ת.`,
    },
    {
      title: "חרדה",
      imgSrc: haradaImg,
      altText: "harada-img",
      modalTextTitle: "חרדה חברתית – אתם לא לבד!",
      modalText: `גם אם טרם שמעתם על המונח חרדה חברתית (social anxiety) – קיים סיכוי סביר שאתם סובלים מאחד או יותר מהתסמינים המאפיינים את החרדה הזו – אחת החרדות הנפוצות ביותר בימינו. יתר על כן, שכיחות החרדה גבוהה כל כך שנכון להיום היא בעיית בריאות הנפש השלישית בשכיחותה ברחבי העולם שפוגעת ב-7% מהאוכלוסיה בכל רגע נתון. למעשה, ההערכה היא שכ-13% מכלל האוכלוסיה עלולים לפתח הפרעת חרדה חברתית במהלך חייהם.`,
    },
    {
      title: "הפרעה נפשית",
      imgSrc: hafraaImg,
      altText: "hafraa-nafshit-img",
      modalTextTitle: "מה היא הפרעה דו-קוטבית (מאניה דיפרסיה)?",
      modalText: `"מאניה-דפרסיה מעוותת מצבי-רוח ומחשבות, מסיתה להתנהגויות איומות, הורסת את הבסיס למחשבה רציונאלית ולעיתים יותר מידי קרובות שוחקת את התשוקה והרצון לחיות. זוהי מחלה שמקורותיה ביולוגיים, אבל מורגשת פסיכולוגית בחוויה שלה. מחלה שהיא מיוחדת בעונג שהיא עשויה להסב והיכולת להיוועץ, אך גם כזו שמביאה עמה ייסורים בלתי-נסבלים ולעיתים גם התאבדות.
אני ברת-מזל שלא נפטרתי ממחלתי, ברת-מזל שקיבלתי את הטיפול הרפואי האפשרי הטוב ביותר, וברת-מזל שיש לי את החברים, העמיתים והמשפחה שיש לי".
(קיי רדפילד ג'יימיסון, 1995)`,
    },
  ];

  return (
    <div
      className="p-6 w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg mb-6"
      style={{ direction: "rtl" }}
    >
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        אחי, ידע שיעזור לך
      </h1>
      <p className="text-gray-600 text-lg mb-5">
        צעד ראשון בדרך להקלה הוא להסתכל לקושי בעיניים, להבין שהוא קיים וללמוד
        עליו. אפשר למצוא חומרים עדכניים כמעט על כל מצוקה. שווה לך לקרוא.
      </p>

      {/* קונטיינר לקארדים */}
      <div className="flex flex-wrap -mx-4">
        {infoCardsData.map((card, index) => (
          <div key={index} className="w-1/2 px-2 mb-4">
            <InfoCard
              title={card.title}
              imgSrc={card.imgSrc}
              altText={card.altText}
              modalTextTitle={card.modalTextTitle}
              modalText={card.modalText}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
