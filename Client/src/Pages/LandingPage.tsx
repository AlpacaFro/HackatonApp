import { Link } from 'react-router-dom';
import SosIcon from '@mui/icons-material/Sos';
import SOSButton from '../Components/SOSButton';

const LandingPage = () => {
  return (
    <>
      <div className="relative w-screen h-screen">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/src/assets/soldiers_hugging_g.jpg')",
            backgroundSize: "cover", // Stretch the image to fully cover the area
            backgroundRepeat: "no-repeat", // Prevent the image from repeating
            backgroundPosition: "center", // Center the image
            filter: "blur(3px)", // Apply blur only to the background
            zIndex: 0, // Ensure it's behind the content
          }}
        ></div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col p-10 text-white">
          <div className="m-auto mt-16 mb-16 text-4xl bg-gradient-to-b from-cyan-800 to-cyan-700 p-8 rounded-3xl tracking-widest  ">שתף🫂אחי</div>
          <div
            style={{
              direction: 'rtl',
            }}
          >
            <p className='bg-gradient-to-b from-cyan-800 to-cyan-700 rounded-xl p-5'>
              האתר מספק מרחב אנונימי תומך ומחבק  עם אפשרות לצ'אט אנונימי או מקצועי ,
              כפתור מצוקה{' '}
              <span className="hover:text-3xl hover:text-red-400 transition-all hover:font-bold">
                SOS
              </span>{' '}
              ולוח פעילויות קהילתיות. הפלטפורמה נועדה לחבר בין חברי הקהילה,
              להעניק תמיכה מהירה ולסייע במצבי חירום.
            </p>
          </div>
          <div className="mt-20 flex gap-2">
            <Link to="/home">
              <button className="bg-gradient-to-b from-cyan-800 to-cyan-600 w-44 h-24 rounded-lg font-semibold animate-bounce">
                לכניסה לחץ כאן 
              </button>
            </Link>
            <div  className="bg-gradient-to-b from-red-800 to-red-600 content-center w-32 px-2 rounded-lg font-semibold pl-6">
              <SOSButton />
              <br />
              <SosIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
